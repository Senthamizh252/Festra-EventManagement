import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParticipantLayout from '../layouts/ParticipantLayout';
import { mockEvents } from '../data/mockEvents';
import {
    Calendar,
    Clock,
    MapPin,
    User,
    ChevronRight,
    ArrowLeft,
    Users,
    Mail,
    Phone,
    FileCheck,
    AlertCircle,
    CopyCheck,
    Mic
} from 'lucide-react';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const event = mockEvents.find(e => e.id === parseInt(id));

    if (!event) {
        return (
            <ParticipantLayout>
                <div className="flex flex-col flex-1 items-center justify-center p-10 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
                    <p className="text-gray-500 mb-6">The event you are looking for does not exist.</p>
                    <button
                        onClick={() => navigate('/my-events')}
                        className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
                    >
                        Back to My Events
                    </button>
                </div>
            </ParticipantLayout>
        );
    }

    return (
        <ParticipantLayout>
            <div className="animate-fade-in-up pb-12">

                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-400 mb-6">
                    <button onClick={() => navigate('/my-events')} className="hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to My Events
                    </button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary">Event Details</span>
                </div>

                {/* Main Hero Header */}
                <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm mb-8">
                    {/* Event Banner */}
                    <div className="h-[240px] sm:h-[320px] md:h-[400px] bg-gray-100 relative">
                        {event.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#F4F1FF] to-[#FCE7F3] flex items-center justify-center">
                                <span className="text-gray-400 font-bold">No Image Available</span>
                            </div>
                        )}
                        <div className="absolute top-6 left-6 inline-block px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-primary text-[13px] font-bold uppercase tracking-wider shadow-sm">
                            {event.category}
                        </div>
                    </div>

                    {/* Header Info */}
                    <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100">
                        <div>
                            <h1 className="text-[28px] sm:text-[34px] font-bold text-festra-text-primary tracking-tight leading-tight mb-3">
                                {event.title}
                            </h1>
                            <div className="flex items-center gap-3 text-gray-500 font-semibold text-[15px]">
                                <User className="w-5 h-5 text-primary/70" />
                                <span>Conducted by: <span className="text-gray-700">{event.conductedBy}</span></span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-shrink-0 gap-3">
                            {(event.registrationStatus === 'NOT_REGISTERED' || (!event.registrationStatus && event.status !== 'Registered' && event.status !== 'Completed' && event.status !== 'Cancelled')) && (
                                <button
                                    onClick={() => navigate(`/events/${event.id}/register`)}
                                    className="px-6 py-3 bg-gradient-to-r from-primary to-[#7C3AED] text-white font-bold text-[15px] rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto text-center"
                                >
                                    Register Now
                                </button>
                            )}
                            {(event.registrationStatus === 'REGISTERED' || event.status === 'Registered') && (
                                <button
                                    onClick={() => navigate('/my-qr-pass')}
                                    className="px-6 py-3 bg-gradient-to-r from-primary to-[#7C3AED] text-white font-bold text-[15px] rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto text-center"
                                >
                                    View QR Pass
                                </button>
                            )}
                            {(event.registrationStatus === 'COMPLETED' || event.status === 'Completed') && event.certificateAvailable && (
                                <button
                                    onClick={() => navigate('/certificates')}
                                    className="px-6 py-3 bg-emerald-500 text-white font-bold text-[15px] rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all w-full md:w-auto text-center flex items-center justify-center gap-2"
                                >
                                    <FileCheck className="w-5 h-5" />
                                    View Certificate
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About the Event */}
                        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-[20px] font-bold text-festra-text-primary mb-4 flex items-center gap-2">
                                <AlignLeft className="w-5 h-5 text-primary" /> About the Event
                            </h2>
                            <p className="text-gray-500 text-[15.5px] leading-relaxed">
                                {event.description}
                            </p>
                        </section>

                        {/* Rules and Guidelines */}
                        {event.rules && event.rules.length > 0 && (
                            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h2 className="text-[20px] font-bold text-festra-text-primary mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-[#F59E0B]" /> Rules & Guidelines
                                </h2>
                                <ul className="space-y-3">
                                    {event.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-500 text-[15px] font-medium">
                                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2"></span>
                                            <span className="leading-relaxed">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Event Schedule Timeline */}
                        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="mb-8">
                                <h2 className="text-[20px] font-bold text-festra-text-primary flex items-center gap-2 mb-1">
                                    <Clock className="w-5 h-5 text-primary" /> Event Schedule
                                </h2>
                                <p className="text-gray-500 text-[14.5px]">Explore the sessions and activities planned for this event.</p>
                            </div>

                            {event.schedule && event.schedule.length > 0 ? (
                                <div className="relative before:absolute before:inset-0 before:left-[95px] md:before:left-[143px] before:-translate-x-[1px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent space-y-6 md:space-y-8">
                                    {event.schedule.map((item, index) => {
                                        const isBreak = item.type === 'Break';
                                        return (
                                            <div key={index} className="relative flex items-start gap-4 md:gap-6 group">
                                                {/* Time */}
                                                <div className="w-[4.5rem] md:w-28 shrink-0 flex flex-col items-center md:items-end pt-1">
                                                    <span className="text-[13.5px] md:text-[14.5px] font-bold text-festra-text-primary text-center md:text-right w-full">{item.time}</span>
                                                    {item.endTime && (
                                                        <>
                                                            <span className="text-[12px] text-gray-400 font-medium leading-none mb-0.5 text-center md:text-right w-full">–</span>
                                                            <span className="text-[13px] text-gray-500 font-semibold text-center md:text-right w-full">{item.endTime}</span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Timeline Indicator */}
                                                <div className="flex flex-col items-center justify-start z-10 shrink-0 pt-1.5 md:pt-1 -ml-[3px] md:-ml-0">
                                                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ring-white ${isBreak ? 'bg-gray-300' : 'bg-primary'} shadow-sm transition-transform duration-300 group-hover:scale-110`}></div>
                                                </div>

                                                {/* Session Card */}
                                                <div className={`flex-1 rounded-[16px] border ${isBreak ? 'bg-slate-50 border-slate-150' : 'bg-white border-gray-100'} p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                        <h3 className={`text-[16.5px] font-bold leading-tight ${isBreak ? 'text-gray-600' : 'text-festra-text-primary'}`}>{item.title}</h3>
                                                        {item.type && !isBreak && (
                                                            <span className="self-start sm:self-auto px-2.5 py-1 bg-[#F4F1FF] text-primary text-[11px] font-bold uppercase tracking-wider rounded-lg shrink-0">
                                                                {item.type}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {item.description && (
                                                        <p className="text-gray-500 text-[14px] leading-relaxed mb-4">{item.description}</p>
                                                    )}

                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto">
                                                        {item.location && (
                                                            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                                                                <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
                                                                {item.location}
                                                            </div>
                                                        )}
                                                        {item.speaker && (
                                                            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                                                                <Mic className="w-4 h-4 text-primary/70 shrink-0" />
                                                                {item.speaker}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-slate-50 border border-dashed border-gray-200 rounded-2xl md:mx-4">
                                    <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                    <p className="text-[15px] font-medium text-gray-500">No schedule has been added for this event yet.</p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column - Sidebar Info */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Fast Info Grid */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-[14px] bg-[#F4F1FF] text-primary flex items-center justify-center shrink-0">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Event Date</p>
                                    <p className="text-[16px] font-bold text-festra-text-primary">{event.date}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-[14px] bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Time</p>
                                    <p className="text-[16px] font-bold text-festra-text-primary">{event.time}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-[14px] bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Venue</p>
                                    <p className="text-[16px] font-bold text-festra-text-primary">{event.venue}</p>
                                    <p className="text-[14px] text-gray-500 mt-1">{event.address}, {event.city}</p>
                                </div>
                            </div>

                        </div>

                        {/* Registration Information */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                            <h3 className="text-[18px] font-bold text-festra-text-primary flex items-center gap-2">
                                <CopyCheck className="w-5 h-5 text-primary" /> Registration
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[15px]">
                                    <span className="text-gray-500 font-semibold">Status</span>
                                    <span className={`px-2.5 py-1 rounded-md text-[13px] font-bold ${(event.registrationStatus === 'REGISTERED' || event.status === 'Registered') ? 'bg-emerald-50 text-emerald-600' :
                                        (event.registrationStatus === 'NOT_REGISTERED' || event.status === 'Open') ? 'bg-blue-50 text-blue-600' :
                                            (event.registrationStatus === 'CANCELLED' || event.status === 'Cancelled') ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {(event.registrationStatus || event.status).replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[15px]">
                                    <span className="text-gray-500 font-semibold">Max Participants</span>
                                    <span className="font-bold text-festra-text-primary">{event.maxParticipants}</span>
                                </div>
                                <div className="flex justify-between items-center text-[15px]">
                                    <span className="text-gray-500 font-semibold">Deadline</span>
                                    <span className="font-bold text-festra-text-primary">{event.registrationDeadline}</span>
                                </div>
                            </div>
                        </div>

                        {/* Organizer Contact */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                            <h3 className="text-[18px] font-bold text-festra-text-primary">Conducted By</h3>

                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                    <Users className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-festra-text-primary text-[15px]">{event.conductedBy}</p>
                                    <p className="text-[13px] text-gray-400 font-semibold">Organizer</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {event.contactEmail && (
                                    <div className="flex items-center gap-3 text-[14.5px] text-gray-500 font-medium">
                                        <Mail className="w-4.5 h-4.5 text-primary/70" />
                                        <span>{event.contactEmail}</span>
                                    </div>
                                )}
                                {event.contactNumber && (
                                    <div className="flex items-center gap-3 text-[14.5px] text-gray-500 font-medium">
                                        <Phone className="w-4.5 h-4.5 text-primary/70" />
                                        <span>{event.contactNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Certificate Info */}
                        <div className={`p-5 rounded-2xl border ${event.certificateAvailable ? 'bg-[#F4F1FF] border-[#E0D8FE]' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex items-start gap-3">
                                <FileCheck className={`w-6 h-6 shrink-0 ${event.certificateAvailable ? 'text-primary' : 'text-slate-400'}`} />
                                <div>
                                    <h4 className="font-bold text-festra-text-primary text-[15px] mb-1">Certificate</h4>
                                    <p className={`text-[13.5px] font-medium leading-snug ${event.certificateAvailable ? 'text-primary' : 'text-slate-500'}`}>
                                        {event.certificateAvailable
                                            ? "✓ Certificate will be provided to participants upon successful completion."
                                            : "Certificate is not available for this event."}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </ParticipantLayout>
    );
}

// Added small lucide-react icon fix for missing AlignLeft import
function AlignLeft(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="15" x2="3" y1="12" y2="12" />
            <line x1="17" x2="3" y1="18" y2="18" />
        </svg>
    );
}
