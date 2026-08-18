import React from 'react';

export default function StatsCard({ icon: Icon, value, label, subtext, colorClass, bgClass }) {
    return (
        <div className="bg-white rounded-[20px] p-6 h-full border border-gray-150 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-[14px] ${bgClass} ${colorClass}`}>
                    <Icon className="w-5.5 h-5.5 flex-shrink-0" />
                </div>
            </div>
            <div>
                <h4 className="text-[28px] font-bold text-festra-text-primary tracking-tight leading-none mb-1.5">{value}</h4>
                <p className="text-[13px] font-medium text-gray-500">{label}</p>
                {subtext && <p className="text-[11px] text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
