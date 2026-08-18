import React from 'react';
import { Award, Download } from 'lucide-react';

export default function CertificateCard({ title, date }) {
    return (
        <div className="bg-white border border-gray-100 rounded-[14px] p-3.5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 transition-all duration-300 group cursor-pointer">
            <div className="w-10 h-10 rounded-[10px] bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-bold text-festra-text-primary truncate">{title}</h4>
                <p className="text-[14px] text-gray-500 font-medium mt-0.5">{date}</p>
            </div>
            <button className="w-9 h-9 rounded-full bg-slate-50 text-gray-400 group-hover:bg-[#5B4BDB]/10 group-hover:text-[#5B4BDB] flex items-center justify-center transition-colors">
                <Download className="w-4.5 h-4.5" />
            </button>
        </div>
    );
}
