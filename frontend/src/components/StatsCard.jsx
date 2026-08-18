import React from 'react';

export default function StatsCard({ icon: Icon, value, label, subtext, colorClass, bgClass }) {
    return (
        <div className="bg-white rounded-[20px] p-6 h-full border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-5">
                <div className={`p-3.5 rounded-[14px] ${bgClass} ${colorClass}`}>
                    <Icon className="w-6 h-6 flex-shrink-0" />
                </div>
            </div>
            <div>
                <h4 className="text-[38px] font-bold text-festra-text-primary tracking-tight leading-none mb-2">{value}</h4>
                <p className="text-[16px] font-semibold text-gray-500">{label}</p>
                {subtext && <p className="text-[14px] text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
