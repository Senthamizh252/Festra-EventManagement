import React, { useState } from 'react';
import ParticipantLayout from '../layouts/ParticipantLayout';
import DigitalPassCard from '../components/DigitalPassCard';
import { Search, Compass, Ticket, CalendarDays, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPasses = [
    {
        id: 1,
        eventName: "AI & Future Tech Summit",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        date: "15 September 2026",
        time: "10:00 AM",
        venue: "KSRCE Auditorium",
        organizer: "Tech Club",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2026-00124",
        status: "Registered",
        isActive: true
    },
    {
        id: 2,
        eventName: "Hackathon 2026",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
        date: "20 September 2026",
        time: "9:00 AM",
        venue: "Innovation Hall",
        organizer: "Coding Club",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2026-00982",
        status: "Registered",
        isActive: true
    },
    {
        id: 3,
        eventName: "Data Science Workshop",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        date: "25 September 2026",
        time: "10:30 AM",
        venue: "Seminar Hall",
        organizer: "Data Science Club",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2026-01550",
        status: "Registered",
        isActive: true
    },
    {
        id: 4,
        eventName: "AI Workshop 2026",
        category: "Workshop",
        image: "https://images.unsplash.com/photo-1485796826113-174aa68fd81b?w=800&q=80",
        date: "10 August 2026",
        time: "09:00 AM",
        venue: "Computer Lab 1",
        organizer: "AI Society",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2026-00045",
        status: "Checked In",
        isActive: false
    },
    {
        id: 5,
        eventName: "Data Science Seminar",
        category: "Seminar",
        image: null,
        date: "05 August 2026",
        time: "02:00 PM",
        venue: "Main Auditorium",
        organizer: "Tech Club",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2026-00012",
        status: "Checked In",
        isActive: false
    },
    {
        id: 6,
        eventName: "Web Development Bootcamp",
        category: "Bootcamp",
        image: "https://images.unsplash.com/photo-1627398246734-d2eab164cf88?w=800&q=80",
        date: "20 July 2026",
        time: "10:00 AM",
        venue: "Virtual",
        organizer: "Web Dev Society",
        participantName: "Senthamizh",
        registerNumber: "23CSE001",
        department: "Computer Science and Engineering",
        registrationId: "FES-2025-09941",
        status: "Event Completed",
        isActive: false
    }
];

export default function MyQRPass() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Active Passes');

    const activeCount = mockPasses.filter(p => p.isActive).length;
    const pastCount = mockPasses.filter(p => !p.isActive).length;

    // For this example, let's say all active are upcoming for the stats
    const upcomingCount = activeCount;

    // Tabs array with counts
    const tabs = [
        { name: 'Active Passes', count: activeCount },
        { name: 'Past Passes', count: pastCount }
    ];

    const filteredPasses = mockPasses.filter(pass => {
        if (activeTab === 'Active Passes') return pass.isActive;
        if (activeTab === 'Past Passes') return !pass.isActive;
        return true;
    });

    return (
        <ParticipantLayout>
            <div className="animate-fade-in-up space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[28px] font-bold text-festra-text-primary tracking-tight mb-2">
                        My QR Pass
                    </h1>
                    <p className="text-gray-500 text-[16px]">
                        Access your registered event passes and use your QR code for quick check-in.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Small Summary Statistics */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Ticket className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Active</p>
                                <p className="text-[15px] font-bold text-festra-text-primary leading-none">{activeCount}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
                                <CalendarDays className="w-4 h-4 text-[#9333EA]" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Upcoming</p>
                                <p className="text-[15px] font-bold text-festra-text-primary leading-none">{upcomingCount}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                <History className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Past</p>
                                <p className="text-[15px] font-bold text-festra-text-primary leading-none">{pastCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="inline-flex items-center p-1 bg-slate-100/80 rounded-xl border border-gray-100 shadow-inner md:w-max">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[14.5px] font-bold transition-all whitespace-nowrap ${activeTab === tab.name
                                        ? 'bg-gradient-to-r from-primary to-[#EC4899] text-white shadow-sm shadow-primary/25'
                                        : 'text-gray-500 hover:text-festra-text-primary hover:bg-white/60'
                                    }`}
                            >
                                {tab.name}
                                <span className={`px-2 py-0.5 rounded-md text-[12px] ${activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Passes List */}
                {filteredPasses.length > 0 ? (
                    <div className="space-y-8">
                        {filteredPasses.map(pass => (
                            <DigitalPassCard key={pass.id} pass={pass} isActive={pass.isActive} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-[20px] font-bold text-festra-text-primary mb-2">No Active Passes</h3>
                        <p className="text-[15px] text-gray-500 mb-6 max-w-sm mx-auto">
                            You haven't registered for any upcoming events yet.
                        </p>
                        <button
                            onClick={() => navigate('/participant-dashboard')}
                            className="px-6 py-2.5 bg-primary text-white text-[15px] font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <Compass className="w-4.5 h-4.5" /> Explore Events
                        </button>
                    </div>
                )}
            </div>
        </ParticipantLayout>
    );
}
