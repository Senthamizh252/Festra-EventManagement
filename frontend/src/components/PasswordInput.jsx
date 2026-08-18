import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
    label,
    id,
    placeholder = 'Enter password',
    value,
    onChange,
    disabled = false,
    required = false,
    error,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-[13px] sm:text-sm font-semibold text-festra-text-primary tracking-wide block"
                >
                    {label} {required && <span className="text-festra-error">*</span>}
                </label>
            )}

            <div className="relative rounded-xl shadow-2xs">
                {/* Lock Icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4.5 w-4.5" />
                </div>

                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`block w-full py-3.5 pl-11 pr-11 bg-slate-50/50 focus:bg-white border rounded-xl text-sm sm:text-[15.5px] text-festra-text-primary placeholder:text-gray-450/90 focus:outline-none focus:ring-2 transition-all duration-200 ${error
                        ? 'border-festra-error focus:ring-festra-error/20 focus:border-festra-error'
                        : 'border-slate-200/90 hover:border-slate-300 focus:ring-primary/20 focus:border-primary'
                        } disabled:bg-gray-50 disabled:text-gray-400`}
                    {...props}
                />

                {/* Eye/Toggle Icon Button */}
                <button
                    type="button"
                    onClick={toggleVisibility}
                    disabled={disabled}
                    tabIndex={0}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-festra-text-primary focus:outline-none transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                        <Eye className="h-4.5 w-4.5" />
                    )}
                </button>
            </div>

            {error && (
                <span className="text-xs text-festra-error flex items-center gap-1 mt-0.5 animate-fade-in-up" role="alert">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
}

