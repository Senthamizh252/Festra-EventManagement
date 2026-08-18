import React from 'react';
import { Search, Menu, ChevronDown, User } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function TopNavbar({ toggleSidebar }) {
    return (
        <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-gray-150 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0">

            {/* Left section: Hamburger & Search */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-festra-text-secondary lg:hidden transition-colors"
                    aria-label="Toggle Navigation"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative w-full max-w-lg hidden lg:block">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-[17px] rounded-xl pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all font-medium text-festra-text-primary placeholder:text-slate-400 shadow-2xs"
                    />
                </div>
            </div>

            {/* Right section: Notifications & Profile */}
            <div className="flex items-center gap-4 sm:gap-6">

                <NotificationDropdown />

                <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

                <button className="flex items-center gap-3 p-1 rounded-full sm:rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 pr-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center shadow-sm">
                        <span className="text-[16px] font-bold font-sans">S</span>
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-[17px] font-bold text-festra-text-primary leading-tight">Senthamizh</p>
                        <p className="text-[14px] font-semibold text-festra-text-secondary">Participant</p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 hidden sm:block" />
                </button>

            </div>
        </header>
    );
}
