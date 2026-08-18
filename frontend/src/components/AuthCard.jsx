import React from 'react';

export default function AuthCard({ children, className = '' }) {
    return (
        <div className={`bg-white/92 backdrop-blur-md rounded-[20px] shadow-[0_15px_40px_-15px_rgba(91,75,219,0.12),0_1px_2px_rgba(0,0,0,0.05)] border border-white/50 p-8 sm:p-10 xl:p-12 w-full hover:shadow-[0_20px_50px_-12px_rgba(91,75,219,0.18)] transition-all duration-500 animate-fade-in-up ${className}`}>
            {children}
        </div>
    );
}
