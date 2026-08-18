import React from 'react';
import { QrCode, ArrowRight } from 'lucide-react';
import Button from './Button';

export default function QRPassCard({ title, participant, date }) {
    return (
        <div className="bg-gradient-to-br from-[#5B4BDB] to-[#EC4899] rounded-[24px] p-0.5 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
            <div className="bg-white rounded-[23px] p-6 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <QrCode className="w-5.5 h-5.5" />
                        </div>
                        <h3 className="text-xl font-bold text-festra-text-primary tracking-tight">My QR Pass</h3>
                    </div>

                    <div className="space-y-1 mb-8">
                        <p className="text-[15px] font-bold text-primary mb-1.5">{title}</p>
                        <p className="text-[12.5px] font-medium text-gray-500">Participant: <span className="font-bold text-festra-text-primary">{participant}</span></p>
                        <p className="text-[12.5px] font-medium text-gray-500">Date: <span className="font-bold text-festra-text-primary">{date}</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {/* Visual QR Placeholder */}
                    <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center p-2 shadow-sm flex-shrink-0">
                        <div className="w-full h-full bg-festra-text-primary grid grid-cols-5 gap-[1px] p-1 rounded-md">
                            {[...Array(25)].map((_, i) => (
                                <div key={i} className={`rounded-sm ${i % 2 === 0 || i % 7 === 0 || i === 12 ? 'bg-white' : 'bg-transparent'}`} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed mb-3">
                            Scan this QR code at the event entrance for quick check-in.
                        </p>
                        <button className="text-[12.5px] font-bold text-primary hover:text-[#EC4899] flex items-center gap-1.5 transition-colors uppercase tracking-wider group">
                            VIEW QR PASS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
