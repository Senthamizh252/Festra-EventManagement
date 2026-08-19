import React from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ event }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:-translate-y-[2px] hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col group h-full">
            {/* Visual Header */}
            <div className="h-[180px] bg-gray-100 flex-shrink-0 relative overflow-hidden">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F4F1FF] to-[#FCE7F3] flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 10% 20%, rgb(91, 75, 219) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgb(236, 72, 153) 0%, transparent 20%)` }}></div>
                    </div>
                )}

            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#F4F1FF] text-primary text-[12px] font-bold uppercase tracking-wider mb-3">
                        {event.category}
                    </span>
                    <h3 className="text-[19px] sm:text-[20px] font-bold text-festra-text-primary leading-tight line-clamp-2">
                        {event.title}
                    </h3>
                </div>

                <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-3 text-[14.5px] text-gray-500 font-medium">
                        <Calendar className="w-4.5 h-4.5 text-primary/70" />
                        <span>{event.date}</span>
                    </div>
                    {/* Fallback to organizer if conductedBy is not present for Dashboard mock data compatibility */}
                    {(event.conductedBy || event.organizer) && (
                        <div className="flex items-center gap-3 text-[14.5px] text-gray-500 font-medium">
                            <User className="w-4.5 h-4.5 text-primary/70" />
                            <span className="truncate">Conducted by {event.conductedBy || event.organizer}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end">
                    <button onClick={handleViewDetails} className="text-[14.5px] font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors group/btn">
                        View Details <ChevronRight className="w-4.5 h-4.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
