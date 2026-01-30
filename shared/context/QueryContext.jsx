import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const QueryContext = createContext();

export const useQueries = () => useContext(QueryContext);

export const QueryProvider = ({ children }) => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to Firestore queries in real-time
        const q = query(collection(db, 'queries'), orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const queryData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setQueries(queryData);
            setLoading(false);
        }, (error) => {
            console.error("Query loading error:", error);
            setLoading(false);
        });

        // Safety timeout - ensure app isn't stuck loading forever
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => {
            unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const addQuery = async (queryData) => {
        try {
            await addDoc(collection(db, 'queries'), {
                ...queryData,
                status: 'pending',
                timestamp: serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error("Error adding query:", error);
            return { success: false, message: error.message };
        }
    };

    const getStats = () => {
        return {
            total: queries.length,
            pending: queries.filter(q => q.status?.toLowerCase() === 'pending').length,
            resolved: queries.filter(q => q.status?.toLowerCase() === 'resolved' || q.status?.toLowerCase() === 'completed').length
        };
    };

    const updateQueryStatus = async (id, status) => {
        try {
            const queryRef = doc(db, 'queries', id);
            await updateDoc(queryRef, { status });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const deleteQuery = async (id) => {
        try {
            const queryRef = doc(db, 'queries', id);
            await deleteDoc(queryRef);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    return (
        <QueryContext.Provider value={{ queries, addQuery, updateStatus: updateQueryStatus, deleteQuery, getStats, loading }}>
            {children}
        </QueryContext.Provider>
    );
};
