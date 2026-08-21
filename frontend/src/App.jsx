import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OrganizerDashboard from './pages/OrganizerDashboard';
import ParticipantDashboard from './pages/ParticipantDashboard';
import MyEvents from './pages/MyEvents';
import EventDetails from './pages/EventDetails';
import EventRegistration from './pages/EventRegistration';
import MyQRPass from './pages/MyQRPass';
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
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/my-qr-pass" element={<MyQRPass />} />
        <Route path="/certificates" element={<ParticipantDashboard />} /> {/* Placeholder */}
        <Route path="/profile" element={<ParticipantDashboard />} /> {/* Placeholder */}

        {/* Fallback route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
