import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './context/QueryContext';
import LandingPage from './pages/LandingPage';
import SubmitQuery from './pages/Student/SubmitQuery';
import Courses from './pages/Courses';
import { theme } from './styles/theme';

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
      <QueryProvider>
        <Router>
          <Routes>
            {/* Main Website Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/student/support" element={<SubmitQuery />} />

            {/* Navigation back to Admin happens via window.location in MPA */}
          </Routes>
        </Router>
      </QueryProvider>
    </div>
  );
}

export default App;
