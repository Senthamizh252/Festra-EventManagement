import React, { useState } from 'react';
import { Megaphone, Bell, Clock } from 'lucide-react';
import './LiveAnnouncements.css';

const DEFAULT_ANNOUNCEMENTS = [
    {
        id: 1,
        priority: 'Urgent',
        timeLabel: '10 mins ago',
        title: 'Venue Relocated: Keynote moved to Main Audi - Hall A',
        description: 'Due to overwhelming turnout, the keynote address by Dr. Sharma has been shifted to Hall A to accommodate everyone. Please take your seats 10 minutes early.',
        author: 'Announced by Event Organizers',
        isPinned: true
    },
    {
        id: 2,
        priority: 'Schedule',
        timeLabel: '1 hour ago',
        title: 'Lunch Break Commences',
        description: 'The lunch counters are now open at the South Food Court. Vegetarian and Non-Vegetarian stalls are labeled. Present your ID for the meal token.',
        author: 'Announced by Hospitality Team',
        isPinned: false
    },
    {
        id: 3,
        priority: 'General',
        timeLabel: '12:15 PM',
        title: 'WiFi Access Passwords Updated',
        description: 'If you are experiencing drops on the guest network, please reconnect using the new SSID "Festra_Guest_5G" (Password: fs2026enjoy).',
        author: 'Announced by Tech Club Core',
        isPinned: false
    }
];

const FILTERS = ['All Updates', 'Urgent / Critical', 'General Info'];

const LiveAnnouncements = ({ announcements = DEFAULT_ANNOUNCEMENTS }) => {
    const [activeFilter, setActiveFilter] = useState('All Updates');

    // Filter the announcements based on active header tab
    const filteredAnnouncements = announcements.filter(announcement => {
        if (activeFilter === 'All Updates') return true;
        if (activeFilter === 'Urgent / Critical') return announcement.priority === 'Urgent';
        if (activeFilter === 'General Info') return announcement.priority !== 'Urgent';
        return true;
    });

    const getPriorityClass = (priority) => {
        return priority.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className="la-container">

            {/* Header Area */}
            <div className="la-header">
                <div className="la-header-top">
                    <h2 className="la-title">Live Event Bulletins & Updates</h2>
                    <div className="la-live-badge">
                        <div className="la-live-dot"></div>
                        Live
                    </div>
                </div>

                {/* Filters */}
                <div className="la-filters">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            className={`la-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed Rendering */}
            <div className="la-feed">
                {filteredAnnouncements.length > 0 ? (
                    filteredAnnouncements.map(item => (
                        <div key={item.id} className={`la-item ${item.isPinned ? 'pinned' : ''}`}>

                            <div className="la-item-header">
                                <span className={`la-tag ${getPriorityClass(item.priority)}`}>
                                    {item.priority}
                                </span>
                                <span className="la-timestamp">
                                    {item.timeLabel}
                                </span>
                            </div>

                            <h3 className="la-item-title">{item.title}</h3>

                            <p className="la-item-desc">{item.description}</p>

                            <div className="la-item-footer">
                                <Megaphone size={14} />
                                <span>{item.author}</span>
                            </div>

                        </div>
                    ))
                ) : (
                    /* Empty State Node */
                    <div className="la-empty">
                        <div className="la-empty-icon">
                            <Bell size={48} strokeWidth={1.5} />
                        </div>
                        <p>No recent announcements. You're all caught up!</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default LiveAnnouncements;
