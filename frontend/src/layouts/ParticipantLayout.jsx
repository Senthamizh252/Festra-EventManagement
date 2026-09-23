import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './ParticipantLayout.css';

const ParticipantLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Navigate back to login
        navigate('/login');
    };

    return (
        <div className="pl-layout-container">
            <nav className="pl-navbar">
                <div className="pl-nav-content">
                    <div className="pl-brand" onClick={() => navigate('/dashboard')}>
                        FESTRA
                    </div>

                    <div className="pl-nav-links">
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'pl-nav-link active' : 'pl-nav-link'}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/my-events" className={({ isActive }) => isActive ? 'pl-nav-link active' : 'pl-nav-link'}>
                            My Events
                        </NavLink>
                        <NavLink to="/my-qr-pass" className={({ isActive }) => isActive ? 'pl-nav-link active' : 'pl-nav-link'}>
                            My QR Pass
                        </NavLink>
                        <NavLink to="/certificates" className={({ isActive }) => isActive ? 'pl-nav-link active' : 'pl-nav-link'}>
                            Certificates
                        </NavLink>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? 'pl-nav-link active' : 'pl-nav-link'}>
                            Profile
                        </NavLink>
                    </div>

                    <div className="pl-nav-actions">
                        <button className="pl-logout-btn" onClick={handleLogout}>
                            <FiLogOut /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pl-main-viewport">
                <Outlet />
            </main>
        </div>
    );
};

export default ParticipantLayout;
