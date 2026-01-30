import React, { createContext, useContext, useState, useEffect } from 'react';

const QueryContext = createContext();

export const useQueries = () => useContext(QueryContext);

const STORAGE_KEY = 'educode_queries_v1';

export const QueryProvider = ({ children }) => {
    const [queries, setQueries] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved queries", e);
                return [];
            }
        }
        // Initial demo data for first load
        return [
            {
                id: 'TKT-7821',
                name: 'Akash Chaudhary',
                email: 'akashchoudhary9368@gmail.com',
                whatsapp: '9368644199',
                regNo: '12310625',
                subject: 'Problem downloading / running app',
                category: 'Downloading / Installation',
                description: 'The app stucks at the loading screen in my Windows 11 machine. I have tried clearing cache but it did not help.',
                status: 'Pending',
                timestamp: new Date().toISOString()
            },
            {
                id: 'TKT-8902',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                whatsapp: '+1 234 567 8901',
                regNo: 'UG-2024-0012',
                subject: 'Error while giving test / data issues',
                category: 'Test / Data Error',
                description: 'During the mid-term assessment, the editor stopped saving my progress. Need help recovering the code.',
                status: 'Resolved',
                timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
            }
        ];
    });

    // Persist to localStorage whenever queries change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
    }, [queries]);

    const addQuery = (newQuery) => {
        const queryWithMetadata = {
            ...newQuery,
            id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Pending',
            timestamp: new Date().toISOString()
        };
        setQueries(prev => [queryWithMetadata, ...prev]);
    };

    const updateStatus = (id, status) => {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    };

    const deleteQuery = (id) => {
        setQueries(prev => prev.filter(q => q.id !== id));
    };

    const getStats = () => {
        return {
            total: queries.length,
            pending: queries.filter(q => q.status === 'Pending').length,
            resolved: queries.filter(q => q.status === 'Resolved').length
        };
    };

    return (
        <QueryContext.Provider value={{ queries, addQuery, updateStatus, deleteQuery, getStats }}>
            {children}
        </QueryContext.Provider>
    );
};
