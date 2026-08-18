import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

export default function ParticipantDashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-festra-bg font-sans p-6 md:p-12 flex flex-col justify-between">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-10">
                    <Logo size="md" />
                    <Button
                        variant="outline"
                        fullWidth={false}
                        onClick={() => navigate('/login')}
                    >
                        Logout
                    </Button>
                </header>

                {/* Dashboard Title */}
                <main className="bg-white rounded-2xl border border-gray-150 p-8 shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-2 bg-accent/15 text-accent rounded-xl font-bold text-sm">
                            ROLE: PARTICIPANT
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-festra-text-primary tracking-tight">
                        Participant Dashboard
                    </h2>
                    <p className="text-festra-text-secondary mt-3 max-w-2xl leading-relaxed">
                        Welcome to your Festra hub. This space allows you to browse public events, sign up for registrations, check in using your QR ticket/pass, receive announcements, and download certificates of attendance.
                    </p>

                    {/* Planned Features List Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                        {[
                            { title: 'Browse Events', desc: 'Find local and global workshops, conferences, and meetups.' },
                            { title: 'Digital QR Ticket', desc: 'Scan code at entrance to check in instantly.' },
                            { title: 'Notifications', desc: 'Get updates and alerts directly from organizers.' },
                            { title: 'Earn Certifications', desc: 'Retrieve verifiable achievement certificates.' },
                            { title: 'Leave Feedback', desc: 'Submit ratings and reviews to organizers.' },
                        ].map((item, index) => (
                            <div key={index} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                <h4 className="font-bold text-festra-text-primary text-sm">{item.title}</h4>
                                <p className="text-xs text-festra-text-secondary mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <footer className="text-center text-xs text-festra-text-secondary mt-10">
                &copy; 2026 Festra. All rights reserved.
            </footer>
        </div>
    );
}
