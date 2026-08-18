import React, { useState } from 'react';
import ParticipantLayout from '../layouts/ParticipantLayout';
import WelcomeSection from '../components/WelcomeSection';
import StatsCard from '../components/StatsCard';
import EventCard from '../components/EventCard';
import QRPassCard from '../components/QRPassCard';
import CertificateCard from '../components/CertificateCard';
import { CalendarDays, Ticket, CalendarCheck, Award, ArrowRight } from 'lucide-react';

const mockEvents = [
    {
        id: 1,
        title: "AI & Future Tech Summit",
        category: "Technology",
        date: "15 September 2026",
        time: "10:00 AM",
        location: "KSRCE Auditorium",
        organizer: "Tech Club",
        status: "Registered",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
    },
    {
        id: 2,
        title: "Hackathon 2026",
        category: "Hackathon",
        date: "20 September 2026",
        time: "9:00 AM",
        location: "Innovation Hall",
        organizer: "Coding Club",
        status: "Registered",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
    },
    {
        id: 3,
        title: "Data Science Workshop",
        category: "Workshop",
        date: "25 September 2026",
        time: "10:30 AM",
        location: "Seminar Hall",
        organizer: "Data Science Club",
        status: "Open",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    }
];

const mockCertificates = [
    { id: 1, title: 'AI Workshop 2026', date: 'Aug 10, 2026' },
    { id: 2, title: 'Data Science Seminar', date: 'Jul 22, 2026' },
];

export default function ParticipantDashboard() {
    return (
        <ParticipantLayout>

            <div className="animate-fade-in-up space-y-10 pb-10">
                {/* 1. Welcome Section */}
                <WelcomeSection participantName="Senthamizh" />

                {/* 2. Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                {/* 3. Upcoming Events Section */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[22px] font-bold text-festra-text-primary tracking-tight">
                            Upcoming Events
                        </h2>
                        <button className="text-[15px] font-bold text-primary hover:text-[#7C3AED] flex items-center gap-1.5 transition-colors group">
                            View All <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {mockEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>

                {/* 4. QR Pass / Certificate Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                    <div className="space-y-4">
                        <h2 className="text-[22px] font-bold text-festra-text-primary tracking-tight">
                            Active QR Pass
                        </h2>
                        <QRPassCard
                            title="AI & Future Tech Summit"
                            participant="Senthamizh"
                            date="15 Sep 2026"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-[22px] font-bold text-festra-text-primary tracking-tight">
                            Recent Certificates
                        </h2>
                        <div className="space-y-4">
                            {mockCertificates.map(cert => (
                                <CertificateCard key={cert.id} title={cert.title} date={cert.date} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </ParticipantLayout>
    );
}
