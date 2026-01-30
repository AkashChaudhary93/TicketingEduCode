import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const { uid, email, displayName } = user;
                    const userDoc = await getDoc(doc(db, 'users', uid));

                    if (userDoc.exists()) {
                        setCurrentUser({ uid, email, displayName, ...userDoc.data() });
                    } else {
                        setCurrentUser({ uid, email, displayName, role: 'student' });
                    }
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Auth sync error:", error);
                if (user) {
                    const { uid, email, displayName } = user;
                    setCurrentUser({ uid, email, displayName });
                }
            } finally {
                setLoading(false);
            }
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

    const signup = async (name, regNumber, whatsapp, password, role = 'student') => {
        try {
            // Map Reg Number to an internal email for Firebase Auth
            const internalEmail = role === 'teacher' ? regNumber : `${regNumber.toLowerCase()}@educode.com`;

            const userCredential = await createUserWithEmailAndPassword(auth, internalEmail, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            const userData = {
                uid: user.uid,
                name,
                email: internalEmail,
                regNumber: role === 'student' ? regNumber : null,
                whatsapp: role === 'student' ? whatsapp : null,
                role,
                createdAt: new Date().toISOString()
            };
            await setDoc(doc(db, 'users', user.uid), userData);

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const login = async (identifier, password) => {
        try {
            // If it's a student login (no @ sign), map it to our internal domain
            const internalEmail = identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@educode.com`;

            const userCredential = await signInWithEmailAndPassword(auth, internalEmail, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const role = userDoc.exists() ? userDoc.data().role : 'student';

            return { success: true, role };
        } catch (error) {
            return { success: false, message: 'Invalid registration number / email or password' };
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = async (identifier) => {
        try {
            // Map reg number to internal email if needed
            const internalEmail = identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@educode.com`;
            await sendPasswordResetEmail(auth, internalEmail);
            return { success: true, message: 'Password reset email sent! Check your inbox.' };
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return { success: false, message: 'No account found with this email/registration number.' };
            }
            return { success: false, message: error.message };
        }
    };

    const updateProfile = async (updatedData) => {
        try {
            if (!currentUser?.uid) {
                return { success: false, message: 'No user logged in' };
            }

            const userRef = doc(db, 'users', currentUser.uid);
            // Use setDoc with merge:true to create doc if it doesn't exist
            await setDoc(userRef, {
                ...updatedData,
                uid: currentUser.uid,
                email: currentUser.email
            }, { merge: true });

            // Update local state
            setCurrentUser(prev => ({ ...prev, ...updatedData }));

            return { success: true, message: 'Profile updated successfully!' };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, message: error.message };
        }
    };

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
