import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Participant Pages & Layout
import ParticipantLayout from './layouts/ParticipantLayout';
import ParticipantDashboard from './pages/ParticipantDashboard';
import MyEvents from './pages/MyEvents';
import MyQRPass from './pages/MyQRPass';
import Certificates from './pages/Certificates';
import ProfileSettings from './pages/ProfileSettings';
import EventDetails from './pages/EventDetails';
import EventRegistration from './pages/EventRegistration';

// Organizer Pages
import OrganizerDashboard from './pages/OrganizerDashboard';
import CreateEvent from './pages/CreateEvent';
import ManageEvents from './pages/ManageEvents';
import QRScanner from './pages/QRScanner';
import GenerateCertificates from './pages/GenerateCertificates';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default / Fallback Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Participant Routes (Wrapped in Layout) */}
        <Route element={<ParticipantLayout />}>
          <Route path="/dashboard" element={<ParticipantDashboard />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/my-qr-pass" element={<MyQRPass />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/profile" element={<ProfileSettings />} />

          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/register" element={<EventRegistration />} />
        </Route>

        {/* Organizer Routes */}
        <Route path="/organizer" element={<Navigate to="/organizer/dashboard" replace />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/organizer/create-event" element={<CreateEvent />} />
        <Route path="/organizer/manage-events" element={<ManageEvents />} />
        <Route path="/organizer/scan" element={<QRScanner />} />
        <Route path="/organizer/certificates" element={<GenerateCertificates />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
