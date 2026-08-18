import React from 'react';

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    isLoading = false,
    fullWidth = true,
    className = '',
    icon,
}) {
    const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-55 disabled:pointer-events-none text-[17px] sm:text-[19px] px-6 py-4';

    const widthStyle = fullWidth ? 'w-full' : '';

    const variants = {
        primary: 'text-white bg-gradient-to-r from-primary via-secondary to-accent hover:brightness-105 active:brightness-95 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transform hover:-translate-y-[1px] active:translate-y-0 focus:ring-primary',
        secondary: 'bg-white text-festra-text-primary border border-slate-200 hover:bg-slate-50 focus:ring-slate-350 hover:border-slate-300 hover:shadow-2xs active:bg-slate-100',
        outline: 'bg-white text-primary border border-primary/30 hover:border-primary hover:bg-light-purple/30 focus:ring-primary shadow-2xs hover:shadow-xs active:bg-light-purple/50',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${widthStyle} ${variants[variant]} ${className}`}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    {/* Loading spinner */}
                    <svg className="animate-spin h-5 w-5 text-current animate-duration-750" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </span>
            ) : (
                <span className="flex items-center justify-center gap-2">
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {children}
                </span>
            )}
        </button>
    );
}
