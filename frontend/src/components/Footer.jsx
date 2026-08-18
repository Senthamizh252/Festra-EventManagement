import React from 'react';

export default function Footer() {
    const currentYear = 2026; // As specified in requirements

    return (
        <footer className="w-full text-center py-4 px-6 mt-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-festra-text-secondary select-none">
                <span>&copy; {currentYear} Festra. All rights reserved.</span>
                <div className="flex items-center gap-4">
                    <a
                        href="#privacy"
                        className="hover:text-primary transition-colors focus:outline-none focus:underline"
                        onClick={(e) => e.preventDefault()}
                    >
                        Privacy Policy
                    </a>
                    <span className="text-gray-300 hidden sm:inline">&bull;</span>
                    <a
                        href="#terms"
                        className="hover:text-primary transition-colors focus:outline-none focus:underline"
                        onClick={(e) => e.preventDefault()}
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
