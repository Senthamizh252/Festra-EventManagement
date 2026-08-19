import React from 'react';

export default function StatsCard({ icon: Icon, value, label, subtext, colorClass, bgClass }) {
    return (
        <div className="bg-white rounded-2xl p-5 h-full border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${bgClass} ${colorClass}`}>
                    <Icon className="w-5 h-5 flex-shrink-0" />
                </div>
                <p className="text-[15px] font-bold text-gray-600 leading-tight">{label}</p>
            </div>
            <div>
                <h4 className="text-[32px] font-bold text-festra-text-primary tracking-tight leading-none mb-1">{value}</h4>
                {subtext && <p className="text-[13px] text-gray-400">{subtext}</p>}
            </div>
        </div>
    );
}
