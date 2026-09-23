import React, { useState } from 'react';
import { FiTrendingUp, FiUsers, FiUserX, FiBarChart2 } from 'react-icons/fi';
import './EventAnalyticsCard.css';

const DEFAULT_MOCK_DATA = {
    kpis: {
        totalRegistrations: 420,
        turnoutRate: '88.5%',
        noShows: 48,
    },
    departments: [
        { name: 'CSE', count: 145, percentage: 85 },
        { name: 'IT', count: 110, percentage: 65 },
        { name: 'ECE', count: 85, percentage: 50 },
        { name: 'AI&DS', count: 50, percentage: 30 },
        { name: 'MECH', count: 30, percentage: 15 },
    ]
};

const EventAnalyticsCard = ({ data = DEFAULT_MOCK_DATA }) => {
    const [timeframe, setTimeframe] = useState('Last 7 Days');

    const timeframes = ['Last 7 Days', 'Last 30 Days', 'Overall'];

    const { kpis, departments } = data;

    // Find max percentage to highlight the top department
    const maxPercentage = Math.max(...departments.map(d => d.percentage));

    return (
        <div className="eac-container">
            {/* Header Section */}
            <div className="eac-header">
                <div className="eac-title-group">
                    <div className="eac-icon-wrapper">
                        <FiBarChart2 />
                    </div>
                    <h2 className="eac-title">Attendance & Registration Insights</h2>
                </div>

                <div className="eac-timeframes">
                    {timeframes.map((range) => (
                        <button
                            key={range}
                            className={`eac-time-pill ${timeframe === range ? 'active' : ''}`}
                            onClick={() => setTimeframe(range)}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPIs Micro-Grid */}
            <div className="eac-kpi-grid">
                <div className="eac-kpi-card">
                    <div className="eac-kpi-icon blue"><FiUsers /></div>
                    <div className="eac-kpi-info">
                        <div className="eac-kpi-value">{kpis.totalRegistrations}</div>
                        <div className="eac-kpi-label">Total Registrations</div>
                    </div>
                </div>

                <div className="eac-kpi-card">
                    <div className="eac-kpi-icon green"><FiTrendingUp /></div>
                    <div className="eac-kpi-info">
                        <div className="eac-kpi-value">{kpis.turnoutRate}</div>
                        <div className="eac-kpi-label">Check-In Turnout</div>
                    </div>
                </div>

                <div className="eac-kpi-card">
                    <div className="eac-kpi-icon red"><FiUserX /></div>
                    <div className="eac-kpi-info">
                        <div className="eac-kpi-value">{kpis.noShows}</div>
                        <div className="eac-kpi-label">No-Show Count</div>
                    </div>
                </div>
            </div>

            {/* Pure CSS Progress Bar Chart */}
            <div className="eac-chart-section">
                <h3 className="eac-chart-title">Department-wise Breakdown</h3>
                <div className="eac-chart-list">
                    {departments.map((dept, index) => {
                        const isHighest = dept.percentage === maxPercentage;
                        return (
                            <div className="eac-chart-row" key={index}>
                                <div className="eac-chart-label-group">
                                    <span className="eac-dept-name">{dept.name}</span>
                                    <span className="eac-dept-count">{dept.count} Attendees</span>
                                </div>
                                <div className="eac-bar-track">
                                    <div
                                        className={`eac-bar-fill ${isHighest ? 'highest' : 'standard'}`}
                                        style={{ width: `${dept.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventAnalyticsCard;
