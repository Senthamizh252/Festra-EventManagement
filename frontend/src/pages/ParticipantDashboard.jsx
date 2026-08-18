import React, { useState } from 'react';
import ParticipantLayout from '../layouts/ParticipantLayout';
import WelcomeSection from '../components/WelcomeSection';
import StatsCard from '../components/StatsCard';
import EventCard from '../components/EventCard';
import QRPassCard from '../components/QRPassCard';
import CertificateCard from '../components/CertificateCard';
import { CalendarDays, Ticket, CalendarCheck, Award } from 'lucide-react';

const mockEvents = [
    {
        id: 1,
        title: "AI & Future Tech Summit",
        date: "15 Sep 2026",
        time: "10:00 AM",
        location: "KSRCE Auditorium",
        category: "Technology",
        status: "Registered"
    },
    {
        id: 2,
        title: "Hackathon 2026",
        date: "20 Sep 2026",
        time: "9:00 AM",
        location: "Innovation Hall",
        category: "Hackathon",
        status: "Registered"
    }
];

const mockCertificates = [
    { id: 1, title: 'AI Workshop 2026', date: 'Aug 10, 2026' },
    { id: 2, title: 'Data Science Seminar', date: 'Jul 22, 2026' },
];

const categories = ['All', 'Technology', 'Workshop', 'Hackathon', 'Cultural', 'Sports', 'Seminar'];

export default function ParticipantDashboard() {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <ParticipantLayout>

            <div className="animate-fade-in-up space-y-6">
                <WelcomeSection participantName="Senthamizh" />

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatsCard
                        icon={Ticket}
                        value="12"
                        label="Registered Events"
                        bgClass="bg-[#EFF2FE]"
                        colorClass="text-[#3B82F6]"
                    />
                    <StatsCard
                        icon={CalendarDays}
                        value="4"
                        label="Upcoming Events"
                        bgClass="bg-[#F3E8FF]"
                        colorClass="text-[#9333EA]"
                    />
                    <StatsCard
                        icon={CalendarCheck}
                        value="8"
                        label="Attended Events"
                        bgClass="bg-[#ECFDF5]"
                        colorClass="text-[#10B981]"
                    />
                    <StatsCard
                        icon={Award}
                        value="5"
                        label="Certificates"
                        bgClass="bg-[#FFF7ED]"
                        colorClass="text-[#F97316]"
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 pt-2">

                    {/* Left Column - Priority Events */}
                    <div className="xl:col-span-2 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                            <h2 className="text-[17px] font-bold text-festra-text-primary tracking-tight">
                                Upcoming Events
                            </h2>

                            {/* Category Filter */}
                            <div className="flex gap-2 overflow-x-auto scrollbar-none">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3.5 py-1.5 rounded-[10px] text-[12.5px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${activeCategory === cat
                                            ? 'bg-[#5B4BDB] text-white shadow-sm'
                                            : 'bg-transparent text-gray-500 hover:bg-white hover:text-festra-text-primary'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {mockEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Passes & Certs */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-[17px] font-bold text-festra-text-primary tracking-tight mb-4">
                                Active QR Pass
                            </h2>
                            <QRPassCard
                                title="AI & Future Tech Summit"
                                participant="Senthamizh"
                                date="15 Sep 2026"
                            />
                        </div>

                        <div>
                            <h2 className="text-[17px] font-bold text-festra-text-primary tracking-tight mb-4">
                                Recent Certificates
                            </h2>
                            <div className="space-y-3.5">
                                {mockCertificates.map(cert => (
                                    <CertificateCard key={cert.id} title={cert.title} date={cert.date} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </ParticipantLayout>
    );
}
