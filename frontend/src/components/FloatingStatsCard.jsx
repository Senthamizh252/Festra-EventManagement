import React from 'react';

export default function FloatingStatsCard({
    icon: Icon,
    iconColor = 'text-primary',
    iconBg = 'bg-primary/10',
    title,
    subtitle,
    badge,
    className = '',
    animationDelay = '0s'
}) {
    return (
        <div
            className={`absolute bg-white/92 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl p-3.5 flex items-center gap-3.5 hover:-translate-y-1 transition-all duration-300 pointer-events-auto z-20 animate-float ${className}`}
            style={{ animationDelay }}
        >
            {Icon && (
                <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
                    <Icon className="h-4.5 w-4.5" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                {title && (
                    <span className="text-[12px] font-semibold text-festra-text-secondary uppercase tracking-wider block">
                        {title}
                    </span>
                )}
                {subtitle && (
                    <h5 className="text-[15px] font-bold text-festra-text-primary mt-0.5 leading-tight truncate">
                        {subtitle}
                    </h5>
                )}
            </div>
            {badge && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center gap-0.5">
                    {badge}
                </span>
            )}
        </div>
    );
}
