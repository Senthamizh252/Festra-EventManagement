import React, { useState } from 'react';
import ParticipantLayout from '../layouts/ParticipantLayout';
import EventCard from '../components/EventCard';
import './MyEvents.css';

export default function MyEvents() {
    const [activeTab, setActiveTab] = useState('Upcoming');

    // Array of dummy data representing registered events
    const dummyEvents = [
        {
            id: 1,
            category: 'Technology',
            eventName: 'Tech Nova 2026',
            title: 'Tech Nova 2026', // Passed for compatibility with EventCard
            organizer: 'Computer Science Dept',
            date: 'Oct 15, 2026',
            time: '10:00 AM',
            venue: 'Main Auditorium',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60',
            status: 'upcoming',
            registrationStatus: 'REGISTERED' // Compatibility with EventCard Badges
        },
        {
            id: 2,
            category: 'Workshop',
            eventName: 'React Masterclass',
            title: 'React Masterclass',
            organizer: 'Web Dev Club',
            date: 'Nov 02, 2026',
            time: '02:00 PM',
            venue: 'Lab 4',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60',
            status: 'upcoming',
            registrationStatus: 'REGISTERED'
        },
        {
            id: 3,
            category: 'Cultural',
            eventName: 'Festra Dance Night',
            title: 'Festra Dance Night',
            organizer: 'Arts Society',
            date: 'Sep 01, 2026',
            time: '06:00 PM',
            venue: 'Open Air Theatre',
            image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60',
            status: 'past',
            registrationStatus: 'COMPLETED'
        },
        {
            id: 4,
            category: 'Hackathon',
            eventName: 'CodeBrew 48Hrs',
            title: 'CodeBrew 48Hrs',
            organizer: 'Institution Innovation Council',
            date: 'Aug 10, 2026',
            time: '09:00 AM',
            venue: 'Innovation Hub',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60',
            status: 'past',
            registrationStatus: 'COMPLETED'
        }
    ];

    // Filter events array based on currently active tab
    const filteredEvents = dummyEvents.filter(event => {
        if (activeTab === 'Upcoming') {
            return event.status === 'upcoming';
        }
        return event.status === 'past';
    });

    return (
        <ParticipantLayout>
            <div className="my-events-container">
                {/* Header Section */}
                <header className="my-events-header">
                    <h1 className="my-events-title">
                        My Registered Events
                    </h1>
                </header>

                {/* Tabbed Navigation */}
                <div className="my-events-tabs">
                    <button
                        className={`my-events-tab ${activeTab === 'Upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Upcoming')}
                    >
                        Upcoming Events
                    </button>
                    <button
                        className={`my-events-tab ${activeTab === 'Past' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Past')}
                    >
                        Past Events
                    </button>
                </div>

                {/* Responsive Grid for Event Cards */}
                {filteredEvents.length > 0 ? (
                    <div className="my-events-grid">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} isPastEvent={activeTab === 'Past'} />
                        ))}
                    </div>
                ) : (
                    <div className="my-events-empty">
                        <p>No {activeTab.toLowerCase()} events found.</p>
                    </div>
                )}
            </div>
        </ParticipantLayout>
    );
}
