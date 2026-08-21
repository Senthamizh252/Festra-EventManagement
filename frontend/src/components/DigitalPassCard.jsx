import React from 'react';
import { CalendarDays, MapPin, Clock, Download, CheckCircle2, QrCode, Ticket, ArrowRight, User, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DigitalPassCard({ pass, isActive }) {
    const navigate = useNavigate();

    // Status styles
    let statusConfig = { bg: 'bg-primary/10', text: 'text-primary', label: pass.status, icon: Ticket };

    if (isActive) {
        statusConfig = { bg: 'bg-[#ECFDF5]', text: 'text-[#10B981]', label: 'REGISTERED', icon: CheckCircle2 };
    } else {
        if (pass.status.toLowerCase() === 'checked in') {
            statusConfig = { bg: 'bg-slate-100', text: 'text-gray-500', label: 'CHECKED IN', icon: CheckCircle2 };
        } else {
            statusConfig = { bg: 'bg-slate-100', text: 'text-gray-400', label: 'EXPIRED', icon: CalendarDays };
        }
    }

    return (
        <div className={`bg-white rounded-[24px] border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col w-full max-w-3xl mx-auto overflow-hidden ${!isActive ? 'opacity-90' : ''}`}>

            {/* 1. CARD HEADER */}
            <div className="flex justify-between items-center px-6 pt-6 pb-4">
                <span className="text-[12px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-md uppercase tracking-wider">
                    {pass.category}
                </span>
                <span className={`text-[12px] font-bold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text}`}>
                    {statusConfig.label}
                </span>
            </div>

            {/* 2. MAIN EVENT SECTION */}
            <div className="flex flex-col sm:flex-row px-6 pb-6 gap-6">
                {/* Event Image */}
                <div className="w-full sm:w-[180px] h-[120px] rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 relative">
                    {pass.image ? (
                        <img src={pass.image} alt={pass.eventName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                            <Ticket className="w-8 h-8 text-primary/30" />
                        </div>
                    )}
                </div>

                {/* Event Information */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-[22px] font-bold text-festra-text-primary tracking-tight leading-snug mb-1">
                        {pass.eventName}
                    </h3>
                    <p className="text-[14px] text-gray-500 font-medium mb-4">
                        By {pass.organizer}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-primary" />
                            <span>{pass.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{pass.time}</span>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto mt-1 sm:mt-0">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="truncate">{pass.venue}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. TICKET DIVIDER */}
            <div className="relative w-full h-8 flex items-center justify-center -my-2">
                <div className="absolute left-0 w-4 h-8 bg-[#F8F7FF] rounded-r-full border-r border-y border-gray-200 -ml-[1px]" />
                <div className="w-full border-t border-dashed border-gray-300 mx-5" />
                <div className="absolute right-0 w-4 h-8 bg-[#F8F7FF] rounded-l-full border-l border-y border-gray-200 -mr-[1px]" />
            </div>

            {/* Bottom Half: Attendee & QR */}
            <div className="flex flex-col sm:flex-row px-6 pt-4 pb-6 gap-6 sm:gap-4 justify-between items-start">

                {/* 4. ATTENDEE SECTION */}
                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Attendee</p>
                        <p className="text-[16px] font-bold text-festra-text-primary">{pass.participantName}</p>
                        <p className="text-[14px] text-gray-500 mt-0.5">{pass.registerNumber}</p>
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Registration ID</p>
                        <p className="text-[16px] font-bold font-mono text-festra-text-primary tracking-tight">{pass.registrationId}</p>
                    </div>
                </div>

                {/* 5. QR PASS SECTION */}
                <div className="w-full sm:w-auto flex flex-col items-center sm:items-end justify-center">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 sm:text-right w-full">QR Pass</p>
                    <div className={`p-2 border border-gray-200 rounded-xl bg-white shadow-sm mb-2 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
                        {/* Mock QR Code Pattern */}
                        <div className="w-24 h-24 bg-festra-text-primary rounded-lg p-1.5 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-0.5 p-1">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className={`bg-white ${[0, 1, 3, 5, 8, 12, 14, 16, 19, 21, 23].includes(i) ? 'opacity-100' : 'opacity-0'} rounded-[1px]`} />
                                ))}
                            </div>
                            <div className="absolute top-1 left-1 w-5 h-5 border-[3px] border-white rounded-sm"></div>
                            <div className="absolute top-1 right-1 w-5 h-5 border-[3px] border-white rounded-sm"></div>
                            <div className="absolute bottom-1 left-1 w-5 h-5 border-[3px] border-white rounded-sm"></div>
                            <div className="absolute w-5 h-5 bg-white rounded-md flex items-center justify-center">
                                <QrCode className="w-3.5 h-3.5 text-primary" />
                            </div>
                        </div>
                    </div>
                    {isActive ? (
                        <div className="flex flex-col flex-wrap text-center items-center justify-center gap-0.5 mt-2">
                            <span className="text-[12px] font-extrabold text-emerald-600 tracking-wider flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> VALID</span>
                            <p className="text-[11px] text-gray-500 max-w-[140px] px-1">Scan this QR code at the event entrance</p>
                        </div>
                    ) : (
                        <span className="text-[12px] font-extrabold text-gray-400 tracking-wider">EXPIRED</span>
                    )}
                </div>
            </div>

            {/* 6. ACTION BUTTONS */}
            <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row justify-end gap-3 w-full border-t border-gray-100/50">
                {isActive && (
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-200 text-festra-text-primary text-[14px] font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download Pass
                    </button>
                )}
                <button
                    onClick={() => navigate(`/events/${pass.id}`)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-primary to-[#EC4899] text-white text-[14px] font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
                >
                    View Event <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
