import React from 'react';
import { Calendar, Clock, MapPin, UserCheck, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function EventCard({ event }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col group h-full">
            {/* Visual Header Placeholder */}
            <div className="h-32 bg-gray-50 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F4F1FF] to-[#FCE7F3]">
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-festra-text-primary shadow-sm uppercase tracking-wider">
                    {event.category}
                </div>
                {/* Abstract geometric pattern */}
                <div className="absolute inset-0 opacity-40" style={{
                    backgroundImage: `radial-gradient(circle at 10% 20%, rgb(91, 75, 219) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgb(236, 72, 153) 0%, transparent 20%)`
                }}></div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-[17px] font-black text-festra-text-primary leading-tight line-clamp-2">
                        {event.title}
                    </h3>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-festra-text-secondary font-medium">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-festra-text-secondary font-medium">
                        <Clock className="w-4 h-4 text-primary/70" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-festra-text-secondary font-medium">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-[#10B981] text-xs font-bold border border-emerald-100 uppercase tracking-wide">
                        <UserCheck className="w-3.5 h-3.5" />
                        {event.status}
                    </span>
                    <button className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors">
                        Details <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
