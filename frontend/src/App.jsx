import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ParticipantDashboard from './pages/ParticipantDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />

        {/* Participant Routes */}
        <Route path="/participant-dashboard" element={<ParticipantDashboard />} />
        <Route path="/events" element={<ParticipantDashboard />} /> {/* Placeholder */}
        <Route path="/my-events" element={<ParticipantDashboard />} /> {/* Placeholder */}
        <Route path="/my-qr-pass" element={<ParticipantDashboard />} /> {/* Placeholder */}
        <Route path="/certificates" element={<ParticipantDashboard />} /> {/* Placeholder */}
        <Route path="/profile" element={<ParticipantDashboard />} /> {/* Placeholder */}

        {/* Fallback route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
