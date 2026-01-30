import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryProvider } from '../shared/context/QueryContext';
import { AuthProvider, useAuth } from '../shared/context/AuthContext';
import LandingPage from './pages/LandingPage';
import SubmitQuery from './pages/Student/SubmitQuery';
import Courses from './pages/Courses';
import StudentSignup from './pages/Student/Signup';
import StudentLogin from './pages/Student/Login';
import Profile from './pages/Student/Profile';
import { theme } from '../shared/styles/theme';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) return <Navigate to="/login" />;
    return children;
};

function App() {
    const appStyle = {
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        color: theme.colors.foreground,
        fontFamily: theme.font.sans,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    };

    return (
        <div style={appStyle}>
            <AuthProvider>
                <QueryProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/student/support" element={
                                <ProtectedRoute>
                                    <SubmitQuery />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/signup" element={<StudentSignup />} />
                            <Route path="/login" element={<StudentLogin />} />
                        </Routes>
                    </Router>
                </QueryProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
