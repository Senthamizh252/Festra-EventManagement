import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiFilter, FiDownload, FiMaximize, FiCheckCircle, FiClock, FiEye } from 'react-icons/fi';
import './ManageEvents.css';

const MOCK_ATTENDEES = [
    { id: 1, name: 'Sanjay Kumar', regNo: '731621CS143', dept: 'CSE', ticketId: 'FEST-84920', checkedIn: true },
    { id: 2, name: 'Priya Sharma', regNo: '731621IT092', dept: 'IT', ticketId: 'FEST-93821', checkedIn: false },
    { id: 3, name: 'Rahul Dravid', regNo: '731621EC045', dept: 'ECE', ticketId: 'FEST-10293', checkedIn: false },
    { id: 4, name: 'Ananya Singh', regNo: '731621ME112', dept: 'MECH', ticketId: 'FEST-48291', checkedIn: true },
    { id: 5, name: 'Vikram Aditya', regNo: '731621CS088', dept: 'CSE', ticketId: 'FEST-57382', checkedIn: false },
    { id: 6, name: 'Megha Reddy', regNo: '731621AI034', dept: 'AIDS', ticketId: 'FEST-68291', checkedIn: true },
];

const ManageEvents = () => {
    const navigate = useNavigate();
    const [attendees, setAttendees] = useState(MOCK_ATTENDEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Metrics
    const totalRegistered = attendees.length;
    const totalCheckedIn = attendees.filter(a => a.checkedIn).length;
    const capacityLeft = 100 - totalRegistered; // Assuming capacity is 100

    // Handlers
    const handleToggleCheckIn = (id) => {
        setAttendees(prev => prev.map(attendee =>
            attendee.id === id ? { ...attendee, checkedIn: !attendee.checkedIn } : attendee
        ));
    };

    const handleExportCSV = () => {
        console.log("Exporting CSV data...");
        alert("CSV Export feature triggered!");
    };

    const filteredAttendees = attendees.filter(attendee => {
        const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attendee.regNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' ? true :
            statusFilter === 'Checked-in' ? attendee.checkedIn : !attendee.checkedIn;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="manage-events-container">
            {/* Header Section */}
            <div className="me-header-section">
                <button className="me-back-btn" onClick={() => navigate('/organizer')}>
                    <FiArrowLeft /> Back to Dashboard
                </button>

                <div className="me-event-overview">
                    <div className="me-event-info">
                        <h1>AI & Future Tech Summit</h1>
                        <div className="me-event-meta">
                            <span>🗓️ Oct 24, 2026</span>
                            <span>📍 Main Auditorium</span>
                            <span className="me-status-badge active-event">Active</span>
                        </div>
                    </div>
                    <div className="me-actions-top">
                        <button className="me-btn-secondary" onClick={handleExportCSV}>
                            <FiDownload /> Export CSV
                        </button>
                        <button className="me-btn-primary" onClick={() => navigate('/organizer/scan')}>
                            <FiMaximize /> Open QR Scanner
                        </button>
                    </div>
                </div>

                {/* Global Metrics */}
                <div className="me-metrics-grid">
                    <div className="me-metric-card">
                        <div className="me-metric-value">{totalRegistered}</div>
                        <div className="me-metric-label">Total Registered</div>
                    </div>
                    <div className="me-metric-card success">
                        <div className="me-metric-value">{totalCheckedIn}</div>
                        <div className="me-metric-label">Total Checked-in</div>
                    </div>
                    <div className="me-metric-card warning">
                        <div className="me-metric-value">{capacityLeft}</div>
                        <div className="me-metric-label">Capacity Left</div>
                    </div>
                </div>
            </div>

            {/* Participants Management Section */}
            <div className="me-content-section">
                <div className="me-table-toolbar">
                    <div className="me-search-bar">
                        <FiSearch className="me-search-icon" />
                        <input
                            type="text"
                            placeholder="Search by Name or Register Number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="me-filter-dropdown">
                        <FiFilter className="me-filter-icon" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="Checked-in">Checked-in</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="me-table-wrapper">
                    <table className="me-participants-table">
                        <thead>
                            <tr>
                                <th>Participant Name</th>
                                <th>Register Number</th>
                                <th>Department</th>
                                <th>Registration ID</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendees.length > 0 ? (
                                filteredAttendees.map(attendee => (
                                    <tr key={attendee.id}>
                                        <td>
                                            <div className="me-attendee-name">{attendee.name}</div>
                                        </td>
                                        <td>{attendee.regNo}</td>
                                        <td><span className="me-dept-pill">{attendee.dept}</span></td>
                                        <td><span className="me-mono-text">{attendee.ticketId}</span></td>
                                        <td>
                                            {attendee.checkedIn ? (
                                                <span className="me-status-pill checked-in"><FiCheckCircle /> Checked In</span>
                                            ) : (
                                                <span className="me-status-pill pending"><FiClock /> Pending</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="me-row-actions">
                                                <button
                                                    className={`me-action-btn ${attendee.checkedIn ? 'undo-btn' : 'checkin-btn'}`}
                                                    onClick={() => handleToggleCheckIn(attendee.id)}
                                                    title={attendee.checkedIn ? 'Undo Check-in' : 'Check In'}
                                                >
                                                    {attendee.checkedIn ? 'Undo' : 'Check In'}
                                                </button>
                                                <button className="me-action-btn view-btn" title="View Pass">
                                                    <FiEye />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="me-empty-state">
                                        No participants found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEvents;
