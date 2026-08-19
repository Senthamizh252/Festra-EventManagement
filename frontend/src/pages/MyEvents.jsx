import React, { useState } from 'react';
import ParticipantLayout from '../layouts/ParticipantLayout';
import EventCard from '../components/EventCard';
import { Search } from 'lucide-react';
import { mockEvents } from '../data/mockEvents';

export default function MyEvents() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [activeCategory, setActiveCategory] = useState('All Categories');

    const tabs = ['All', 'Upcoming', 'Completed'];
    const categories = ['All Categories', 'Technology', 'Hackathon', 'Workshop', 'Seminar', 'Cultural', 'Sports'];

    // Filter events
    const filteredEvents = mockEvents.filter(event => {
        // Exclude completely unregistered events from My Events filtering (they belong in Explore)
        if (event.registrationStatus === 'NOT_REGISTERED' || event.status === 'Open') return false;

        // Tab filter
        if (activeTab === 'Upcoming' && (event.registrationStatus === 'COMPLETED' || event.status === 'Completed')) return false;
        if (activeTab === 'Completed' && (event.registrationStatus !== 'COMPLETED' && event.status !== 'Completed')) return false;

        // Category filter
        if (activeCategory !== 'All Categories' && event.category !== activeCategory) return false;

        // Search filter
        if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        return true;
    });

    return (
        <ParticipantLayout>
            <div className="animate-fade-in-up space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[28px] font-bold text-festra-text-primary tracking-tight mb-2">
                        My Events
                    </h1>
                    <p className="text-gray-500 text-[16px]">
                        Manage and view details for all the events you have registered for.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">

                    {/* Top row: Tabs and Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Tabs */}
                        <div className="flex items-center p-1 bg-slate-50 rounded-xl overflow-x-auto hide-scroll-bar border border-gray-100">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 rounded-lg text-[14.5px] font-bold transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                        }`}
                                >
                                    {tab === 'All' ? 'All Events' : tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search your events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-[15px] font-medium text-festra-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-2xs"
                            />
                        </div>
                    </div>

                    {/* Bottom row: Categories */}
                    <div className="pt-5 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-1.5 rounded-full text-[13.5px] font-bold transition-all border ${activeCategory === category
                                        ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary/30 hover:bg-[#F4F1FF]'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Event Cards Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl">
                        <p className="text-[17px] font-bold text-gray-400">
                            No events found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </ParticipantLayout>
    );
}
