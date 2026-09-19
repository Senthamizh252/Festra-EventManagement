import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
    const navigate = useNavigate();

    // Mock Data
    const stats = {
        activeEvents: 3,
        totalRegistrations: 452,
        overallAttendance: '85%'
    };

    const recentEvents = [
        { id: 1, name: 'Tech Symposium 2024', date: '2024-10-15', registrations: 120, status: 'Upcoming' },
        { id: 2, name: 'AI Workshop', date: '2024-09-20', registrations: 85, status: 'Upcoming' },
        { id: 3, name: 'Coding Bootcamp', date: '2024-08-10', registrations: 247, status: 'Completed' },
    ];

    return (
        <div className="org-dashboard-page">
            <div className="org-header">
                <h1>Welcome back, <span className="highlight-name">Alex Smith</span> (Tech Club)</h1>
                <p>Your command center for event management</p>
            </div>

            <section className="org-stats-section">
                <div className="stat-card">
                    <div className="stat-icon purple-bg">📅</div>
                    <div className="stat-details">
                        <h3>{stats.activeEvents}</h3>
                        <p>Total Active Events</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon pink-bg">👥</div>
                    <div className="stat-details">
                        <h3>{stats.totalRegistrations}</h3>
                        <p>Total Registrations</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon gradient-bg">📈</div>
                    <div className="stat-details">
                        <h3>{stats.overallAttendance}</h3>
                        <p>Overall Attendance</p>
                    </div>
                </div>
            </section>

            <section className="org-quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button
                        className="action-btn primary-btn"
                        onClick={() => navigate('/organizer/create-event')}
                    >
                        <span className="btn-icon">➕</span> Create New Event
                    </button>
                    <button className="action-btn secondary-btn">
                        <span className="btn-icon">📷</span> Scan QR Pass
                    </button>
                    <button className="action-btn secondary-btn">
                        <span className="btn-icon">📝</span> View Registrations
                    </button>
                </div>
            </section>

            <section className="org-recent-events">
                <h2>Recent Events</h2>
                <div className="table-responsive">
                    <table className="events-table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Registrations</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentEvents.map(event => (
                                <tr key={event.id}>
                                    <td className="fw-600">{event.name}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.registrations}</td>
                                    <td>
                                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="manage-btn">Manage / Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default OrganizerDashboard;
