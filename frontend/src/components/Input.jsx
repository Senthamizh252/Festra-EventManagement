import React from 'react';

export default function Input({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    icon: Icon,
    error,
    ...props
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-[17px] sm:text-[18px] font-semibold text-festra-text-primary tracking-wide block"
                >
                    {label} {required && <span className="text-festra-error">*</span>}
                </label>
            )}

            <div className="relative rounded-xl shadow-2xs">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Icon className="h-5 w-5 transition-colors duration-200" />
                    </div>
                )}

                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    className={`block w-full py-4 ${Icon ? 'pl-11' : 'pl-4.5'
                        } pr-4.5 bg-slate-50/50 focus:bg-white border rounded-xl text-[18px] sm:text-[19px] text-festra-text-primary placeholder:text-gray-450/90 focus:outline-none focus:ring-2 transition-all duration-200 ${error
                            ? 'border-festra-error focus:ring-festra-error/20 focus:border-festra-error'
                            : 'border-slate-200/90 hover:border-slate-300 focus:ring-primary/20 focus:border-primary'
                        } disabled:bg-gray-50 disabled:text-gray-405 disabled:border-gray-200`}
                    {...props}
                />
            </div>

            {error && (
                <span className="text-[14px] text-festra-error flex items-center gap-1 mt-0.5 animate-fade-in-up" role="alert">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
}

