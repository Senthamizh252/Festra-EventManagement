import React from 'react';
import { Calendar, Award, Sparkles, CheckCircle } from 'lucide-react';

export default function BackgroundDecorations() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Soft Ambient Background Gradient */}
            <div className="absolute inset-0 bg-[#F8F7FF] bg-gradient-to-tr from-light-purple/30 via-white to-light-pink/30"></div>

            {/* Glowing Gradient Blobs */}
            {/* Glow Behind Logo / Branding */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#EDE9FE] to-transparent opacity-65 blur-3xl animate-pulse-slow"></div>

            {/* Pink Glow Around Center Right */}
            <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#FCE7F3] via-[#EDE9FE]/50 to-transparent opacity-60 blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

            {/* Purple Glow Around Bottom Left */}
            <div className="absolute -bottom-10 left-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#EDE9FE] to-transparent opacity-50 blur-3xl"></div>

            {/* Dotted Patterns */}
            {/* Top Center Grid */}
            <div className="absolute top-[12%] left-[45%] text-[#EDE9FE] grid grid-cols-6 gap-2 opacity-50 hidden lg:grid">
                {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-current rounded-full" />
                ))}
            </div>

            {/* Mid Right Grid */}
            <div className="absolute bottom-[20%] right-[3%] text-[#FCE7F3] grid grid-cols-4 gap-2 opacity-60 hidden md:grid">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-current rounded-full" />
                ))}
            </div>

            {/* Subtle Abstract Icons Floating in Background */}
            <div className="absolute top-20 right-[40%] text-[#5B4BDB]/5 opacity-15 animate-float hidden lg:block">
                <Calendar size={64} strokeWidth={1} />
            </div>

            <div className="absolute bottom-40 left-[35%] text-[#EC4899]/5 opacity-15 animate-float-delayed hidden lg:block">
                <Award size={72} strokeWidth={1} />
            </div>

            <div className="absolute top-[45%] left-12 text-[#7C3AED]/5 opacity-10 animate-float hidden md:block">
                <Sparkles size={48} strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-16 right-[35%] text-[#10B981]/5 opacity-10 animate-float-delayed hidden xl:block">
                <CheckCircle size={56} strokeWidth={1} />
            </div>

            {/* Tiny Geometric Elements */}
            <div className="absolute top-[8%] left-[8%] w-4 h-4 border-2 border-primary/10 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-[10%] right-[8%] w-6 h-6 border border-accent/15 rounded-lg animate-float"></div>
            <div className="absolute top-[60%] right-[40%] w-3 h-3 bg-secondary/15 rounded-xs transform rotate-45 animate-float-delayed"></div>
        </div>
    );
}
