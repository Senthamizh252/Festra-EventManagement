import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';
import './EventTimeline.css';

const DEFAULT_SCHEDULE = [
    {
        id: 1,
        day: 1,
        startTime: '09:00 AM',
        endTime: '09:30 AM',
        title: 'Registration & Welcome Breakfast',
        speaker: '',
        track: 'Break',
        venue: 'Main Foyer',
        description: 'Check-in, collect your badges, and enjoy some morning refreshments before the event begins.',
        isLive: false,
    },
    {
        id: 2,
        day: 1,
        startTime: '09:30 AM',
        endTime: '10:45 AM',
        title: 'Keynote: Scalable Microservices Architecture',
        speaker: 'Dr. A. Sharma, Lead Cloud Architect',
        track: 'Keynote',
        venue: 'Main Audi - Hall B',
        description: 'Discover the foundational principles of microservices and how they enable massive scalability in modern applications.',
        isLive: true,
    },
    {
        id: 3,
        day: 1,
        startTime: '11:00 AM',
        endTime: '12:30 PM',
        title: 'Hands-on Web Animations Workshop',
        speaker: 'Sarah Jenkins, UI Engineer',
        track: 'Workshop',
        venue: 'Lab 304',
        description: 'Learn how to use CSS and Framer Motion to build delightful UI interactions. Prerequisites: Basic React knowledge.',
        isLive: false,
    },
    {
        id: 4,
        day: 2,
        startTime: '10:00 AM',
        endTime: '11:30 AM',
        title: 'Panel Discussion: AI in Frontend Development',
        speaker: 'Industry Experts Panel',
        track: 'Panel',
        venue: 'Conference Hall A',
        description: 'A deep dive into how generative AI tools are restructuring the daily workflows of frontend engineers.',
        isLive: false,
    }
];

const EventTimeline = ({ schedule = DEFAULT_SCHEDULE }) => {
    const [activeDay, setActiveDay] = useState(1);

    // Extract unique days from the schedule data and sort them
    const eventDays = [...new Set(schedule.map(item => item.day))].sort((a, b) => a - b);

    // Filter schedule based on active tab
    const filteredSchedule = schedule.filter(item => item.day === activeDay);

    // Utility to convert track string to a valid CSS class (e.g., "Keynote" -> "keynote")
    const getTrackClass = (trackStr) => {
        if (!trackStr) return '';
        return trackStr.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className="timeline-container">

            {/* Day Selector Tabs */}
            {eventDays.length > 0 && (
                <div className="timeline-tabs">
                    {eventDays.map(day => (
                        <button
                            key={day}
                            className={`timeline-tab ${activeDay === day ? 'active' : ''}`}
                            onClick={() => setActiveDay(day)}
                        >
                            Day {day}
                        </button>
                    ))}
                </div>
            )}

            {/* Timeline Stream Node List */}
            <div className="timeline-list">
                {filteredSchedule.map((session) => (
                    <div key={session.id} className="timeline-item">

                        {/* Timestamp block (left-aligned usually) */}
                        <div className="timeline-time">
                            <span className="time-start">{session.startTime}</span>
                            {session.endTime && <span className="time-end">{session.endTime}</span>}
                        </div>

                        {/* Center connecting node with dot */}
                        <div className="timeline-node">
                            <div className={`timeline-dot ${session.isLive ? 'is-live' : ''}`}></div>
                        </div>

                        {/* Detail Card Content */}
                        <div className="timeline-content">
                            <div className={`timeline-card ${session.isLive ? 'is-live' : ''}`}>

                                {session.track && (
                                    <span className={`track-tag ${getTrackClass(session.track)}`}>
                                        {session.track}
                                    </span>
                                )}

                                <div className="timeline-card-header">
                                    <h3 className="timeline-title">{session.title}</h3>
                                    {session.isLive && (
                                        <span className="live-badge">Live Now</span>
                                    )}
                                </div>

                                <div className="timeline-meta">
                                    {session.speaker && (
                                        <div className="meta-item">
                                            <User size={16} />
                                            <span>{session.speaker}</span>
                                        </div>
                                    )}
                                    {session.venue && (
                                        <div className="meta-item">
                                            <MapPin size={16} />
                                            <span>{session.venue}</span>
                                        </div>
                                    )}
                                </div>

                                {session.description && (
                                    <p className="timeline-desc">{session.description}</p>
                                )}

                            </div>
                        </div>
                    </div>
                ))}

                {filteredSchedule.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                        No sessions scheduled for Day {activeDay}.
                    </div>
                )}
            </div>

        </div>
    );
};

export default EventTimeline;
