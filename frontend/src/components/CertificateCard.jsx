import React from 'react';
import { Download, Maximize2, Award } from 'lucide-react';

export default function CertificateCard({ certificate }) {
    const handleDownload = () => {
        alert('Downloading certificate...');
        console.log('Downloading certificate:', certificate.eventName);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
            {/* Image Preview Area */}
            <div className="h-48 bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                {certificate.certificateImageUrl ? (
                    <img
                        src={certificate.certificateImageUrl}
                        alt={`${certificate.eventName} Certificate`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Award className="w-12 h-12 mb-2 text-primary/30" />
                        <span className="text-sm font-medium">No Preview Available</span>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-1 line-clamp-2">
                        {certificate.eventName}
                    </h3>
                    <p className="text-[14px] text-gray-500 font-medium">
                        Issued by {certificate.organizer}
                    </p>
                    <p className="text-[13px] text-gray-400 mt-2 flex items-center gap-1.5">
                        Issued on {certificate.issueDate}
                    </p>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-[13.5px] font-bold rounded-xl transition-colors border border-gray-200"
                    >
                        <Maximize2 className="w-4 h-4" /> View
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-white text-[13.5px] font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
                        style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899)' }}
                    >
                        <Download className="w-4 h-4" /> Download
                    </button>
                </div>
            </div>
        </div>
    );
}
