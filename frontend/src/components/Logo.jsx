import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '', textClassName = '' }) {
    const isLarge = size === 'lg';
    const isSmall = size === 'sm';

    const iconSize = isLarge ? 'h-12 w-12' : isSmall ? 'h-7 w-7' : 'h-9 w-9';
    const textSize = isLarge ? 'text-[32px] sm:text-[38px]' : isSmall ? 'text-[20px]' : 'text-[26px]';

    return (
        <div className={`flex items-center gap-3.5 select-none ${className}`}>
            {/* Festra Gradient Icon */}
            <div className={`relative ${iconSize} flex-shrink-0 group cursor-pointer`}>
                {/* Decorative background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-2xl blur-[3px] opacity-75 group-hover:opacity-100 group-hover:blur-md transition-all duration-300"></div>
                {/* Main Icon Body */}
                <div className="relative inset-0 h-full w-full bg-gradient-to-tr from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-1/2 h-1/2 text-white"
                    >
                        {/* Elegant F shape representation with event sparks */}
                        <path d="M5 3h14c1 0 1 1 1 2v4c0 1-1 1-1 1H9v4h8c1 0 1 1 1 2v2c0 1-1 1-1 1H9v5" />
                    </svg>
                </div>
            </div>

            {showText && (
                <span className={`font-sans font-extrabold tracking-tight ${textSize} ${textClassName || 'bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'} hover:brightness-105 transition-all duration-300`}>
                    FESTRA
                </span>
            )}
        </div>
    );
}

