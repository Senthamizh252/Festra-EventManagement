import React from 'react';
import { Award, Download } from 'lucide-react';

export default function CertificateCard({ title, date }) {
    return (
        <div className="bg-white border border-gray-150 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-festra-text-primary truncate">{title}</h4>
                <p className="text-xs text-festra-text-secondary font-medium">{date}</p>
            </div>
            <button className="w-8 h-8 rounded-full bg-slate-50 text-festra-text-secondary hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors shadow-2xs">
                <Download className="w-4 h-4" />
            </button>
        </div>
    );
}
