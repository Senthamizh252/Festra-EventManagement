import React from 'react';
import { Calendar, Users, QrCode, Sparkles, CheckCircle2, Ticket, BarChart3, ShieldCheck } from 'lucide-react';
import FloatingStatsCard from './FloatingStatsCard';

export default function DashboardMockup() {
    return (
        <div className="relative w-full max-w-xl xl:max-w-2xl mx-auto py-8 px-6 flex items-center justify-center select-none animate-fade-in-scale">

            {/* Decorative background grid behind visual */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-25 rounded-3xl z-0"></div>

            {/* Floating Stats Cards for depth in SaaS preview */}
            <FloatingStatsCard
                icon={Users}
                iconColor="text-primary"
                iconBg="bg-primary/10"
                title="Registrations"
                subtitle="1,248 Attendees"
                badge="+14.2%"
                className="-top-4 -left-6 hidden xl:flex w-52 shadow-2xl"
                animationDelay="0s"
            />

            <FloatingStatsCard
                icon={ShieldCheck}
                iconColor="text-[#10B981]"
                iconBg="bg-green-50"
                title="Status"
                subtitle="Attendance Verified"
                className="top-[45%] -right-10 hidden xl:flex w-52 shadow-2xl"
                animationDelay="2.5s"
            />

            <FloatingStatsCard
                icon={QrCode}
                iconColor="text-accent"
                iconBg="bg-accent/10"
                title="QR Code"
                subtitle="QR Pass Ready"
                className="-bottom-4 -left-2 hidden lg:flex w-46 shadow-2xl"
                animationDelay="5s"
            />

            {/* Main SaaS Brand Dashboard Container */}
            <div className="relative w-full bg-white/95 backdrop-blur-xs rounded-2xl border border-gray-150 shadow-[0_20px_50px_rgba(91,75,219,0.15)] overflow-hidden hover:scale-[1.01] hover:shadow-[0_25px_60px_rgba(91,75,219,0.22)] transition-all duration-500 z-10">

                {/* Browser Mockup Window Header */}
                <div className="flex items-center justify-between px-4 py-3.5 bg-gray-50/80 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-sm"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400/90 shadow-sm"></span>
                    </div>
                    <div className="text-[10px] font-semibold text-gray-400 font-sans tracking-wider flex items-center gap-1 bg-white px-3 py-0.5 rounded-full border border-gray-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        dashboard.festra.com
                    </div>
                    <div className="w-[36px]" />
                </div>

                {/* Dashboard Grid Content */}
                <div className="p-4.5 grid grid-cols-3 gap-3.5">

                    {/* Main overview banner (Colspan 3) */}
                    <div className="col-span-3 bg-gradient-to-r from-primary via-secondary to-accent/90 rounded-xl p-4 text-white flex justify-between items-center relative overflow-hidden shadow-inner">
                        <div className="relative z-10">
                            <span className="text-[9px] font-bold tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full uppercase">
                                Active Event
                            </span>
                            <h4 className="text-base font-extrabold mt-1.5 font-sans leading-tight tracking-tight">
                                Tech Summit 2026
                            </h4>
                            <p className="text-[10px] text-white/80 mt-0.5 font-medium">
                                Hosted by Festra Organizers
                            </p>
                        </div>

                        {/* Calendar Widget Overlay */}
                        <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 text-center text-white min-w-[55px] relative z-10 border border-white/10 shadow-sm">
                            <span className="text-[8px] font-black uppercase tracking-wider block text-pink-200">AUG</span>
                            <span className="text-xl font-black block leading-none">24</span>
                        </div>

                        {/* Sparkles Decorative overlay */}
                        <Sparkles className="absolute right-16 top-2 h-4 w-4 text-white/30 animate-pulse" />
                    </div>

                    {/* Registrations Chart Panel container */}
                    <div className="col-span-2 bg-gray-50/60 rounded-xl border border-gray-100/80 p-3.5 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-festra-text-secondary uppercase tracking-wider">
                                Growth Stats
                            </span>
                            <span className="text-[9px] text-[#10B981] font-bold bg-[#10B981]/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                <BarChart3 className="w-2.5 h-2.5" /> +14.2%
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-2.5">
                            <span className="text-xl font-black text-festra-text-primary tracking-tight">1,248</span>
                            <span className="text-[9px] text-festra-text-secondary font-medium">reg. this week</span>
                        </div>

                        {/* Mini Registration Bar Chart representation */}
                        <div className="flex items-end gap-1.5 h-10 mt-3">
                            <div className="w-full h-[25%] bg-primary/20 rounded-sm"></div>
                            <div className="w-full h-[45%] bg-primary/30 rounded-sm"></div>
                            <div className="w-full h-[35%] bg-primary/40 rounded-sm"></div>
                            <div className="w-full h-[65%] bg-primary/50 rounded-sm"></div>
                            <div className="w-full h-[85%] bg-primary rounded-sm"></div>
                            <div className="w-full h-[55%] bg-accent/70 rounded-sm"></div>
                            <div className="w-full h-[95%] bg-accent rounded-sm shadow-xs"></div>
                        </div>
                    </div>

                    {/* Schedule slots quick indicator */}
                    <div className="col-span-1 bg-gray-50/60 rounded-xl border border-gray-100/80 p-3 flex flex-col items-center justify-center text-center">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary mb-1.5 shadow-sm">
                            <Calendar className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[10px] font-bold text-festra-text-primary">Schedule</span>
                        <span className="text-[8px] font-semibold text-festra-text-secondary mt-0.5">3 Tracks</span>
                    </div>

                    {/* Attended Users real time (Colspan 2) */}
                    <div className="col-span-2 bg-gray-50/60 rounded-xl border border-gray-100/80 p-3">
                        <div className="flex justify-between items-center mb-2.5">
                            <span className="text-[9px] font-bold text-festra-text-secondary uppercase tracking-wider">
                                Live Attendees
                            </span>
                            <span className="text-[8px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-primary animate-ping"></span> Live check-in
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-accent/15 text-accent text-[9px] font-bold flex items-center justify-center">
                                        JD
                                    </div>
                                    <span className="text-[10px] font-bold text-festra-text-primary">John Doe</span>
                                </div>
                                <span className="text-[8px] font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="h-2 w-2" /> Verified
                                </span>
                            </div>

                            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center">
                                        SR
                                    </div>
                                    <span className="text-[10px] font-bold text-festra-text-primary">Sarah R.</span>
                                </div>
                                <span className="text-[8px] font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle2 className="h-2 w-2" /> Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* QR scanner details */}
                    <div className="col-span-1 bg-gray-50/60 rounded-xl border border-gray-100/80 p-3 flex flex-col items-center justify-center text-center relative group">
                        <div className="p-2 bg-accent/10 rounded-xl text-accent mb-1.5 shadow-sm">
                            <QrCode className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[10px] font-bold text-festra-text-primary">Scanner</span>
                        <span className="text-[8px] text-[#10B981] font-bold mt-0.5">Active</span>
                    </div>

                </div>

            </div>

            {/* Float Ticket Representation (Shown on larger screen sizes too) */}
            <div className="absolute bottom-6 right-2 sm:right-6 lg:-right-4 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 shadow-2xl p-3.5 flex items-center gap-3 w-52 hover:-translate-y-1 transition-all duration-300 pointer-events-auto z-20 animate-float-delayed">
                <div className="p-2.5 bg-gradient-to-tr from-accent to-secondary rounded-xl text-white shadow-md">
                    <Ticket className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <span className="text-[8px] font-bold text-festra-text-secondary uppercase tracking-wider block">
                        VIP Pass
                    </span>
                    <h5 className="text-[11px] font-black text-festra-text-primary mt-0.5 leading-tight truncate">
                        Tech Pass Verified
                    </h5>
                    <span className="text-[9px] font-semibold text-primary block mt-0.5">
                        Active Entry
                    </span>
                </div>
                <div className="border-l border-dashed border-gray-200 pl-2.5 flex-shrink-0">
                    {/* Mini QR representation */}
                    <div className="w-7 h-7 border border-primary/20 rounded-lg p-0.5 bg-gray-50 flex items-center justify-center shadow-2xs">
                        <div className="w-full h-full bg-festra-text-primary grid grid-cols-3 gap-0.5 p-0.5">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className={`rounded-xs ${i % 2 === 0 ? 'bg-primary' : 'bg-transparent'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
