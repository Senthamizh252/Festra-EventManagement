import React from 'react';

export default function WelcomeSection({ participantName = 'Senthamizh' }) {
    return (
        <div className="bg-gradient-to-r from-[#5B4BDB] via-[#7C3AED] to-[#EC4899] rounded-[24px] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-primary/20 z-0">
            {/* Decorative Bg Patterns */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-56 h-56 bg-pink-300 opacity-20 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight mb-2 text-white drop-shadow-sm">
                    Welcome back, {participantName}! 👋
                </h1>
                <p className="text-white/90 text-[15px] sm:text-[16px] leading-relaxed mb-5 max-w-lg">
                    Discover exciting events and keep track of your experiences.<br className="hidden sm:block" />
                    Ready for your next big learning opportunity?
                </p>
                <div className="inline-block">
                    <button className="bg-white text-[#5B4BDB] font-bold px-6 py-2.5 rounded-[12px] text-[15px] border border-transparent hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center">
                        Explore Events
                    </button>
                </div>
            </div>
        </div>
    );
}
