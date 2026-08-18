import React from 'react';
import { Award, Download } from 'lucide-react';

export default function CertificateCard({ title, date }) {
    return (
        <div className="bg-white border border-gray-150 rounded-[14px] p-3.5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 transition-all duration-300 group cursor-pointer">
            <div className="w-10 h-10 rounded-[10px] bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-festra-text-primary truncate mb-0.5">{title}</h4>
                <p className="text-[11.5px] text-gray-500 font-medium">{date}</p>
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-50 text-gray-400 group-hover:bg-[#5B4BDB]/10 group-hover:text-[#5B4BDB] flex items-center justify-center transition-colors">
                <Download className="w-4 h-4" />
            </button>
        </div>
    );
}
