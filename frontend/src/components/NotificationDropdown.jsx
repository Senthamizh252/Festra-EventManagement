import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, Clock } from 'lucide-react';

const mockNotifications = [
    {
        id: 1,
        type: 'registration',
        message: "Your registration for AI & Future Tech Summit is confirmed.",
        time: "2 hours ago",
        read: false,
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },
    {
        id: 2,
        type: 'reminder',
        message: "Your event starts tomorrow: Hackathon 2026.",
        time: "Yesterday",
        read: false,
        color: 'text-purple-500',
        bg: 'bg-purple-50'
    },
    {
        id: 3,
        type: 'certificate',
        message: "Your certificate is now available for Data Science Workshop.",
        time: "2 days ago",
        read: true,
        color: 'text-[#10B981]',
        bg: 'bg-emerald-50'
    }
];

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleMarkAllRead = (e) => {
        e.stopPropagation();
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Notifications"
            >
                <Bell className="w-5.5 h-5.5 text-festra-text-secondary" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Card */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in-scale origin-top-right">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-festra-text-primary text-[15px]">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs font-semibold text-primary hover:text-secondary transition-colors"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[350px] overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`px-4 py-3.5 border-b border-gray-50 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${notif.read ? 'opacity-70' : 'bg-white'}`}
                                >
                                    <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-transparent border border-gray-300' : 'bg-primary animate-pulse'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-[13.5px] leading-snug ${notif.read ? 'text-festra-text-secondary font-medium' : 'text-festra-text-primary font-bold'}`}>
                                            {notif.message}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400 font-medium">
                                            <Clock className="w-3 h-3" />
                                            <span>{notif.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-sm text-festra-text-secondary">
                                No new notifications.
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-100 bg-white">
                        <button className="w-full py-2 text-sm font-bold text-festra-text-primary hover:text-primary transition-colors rounded-lg hover:bg-slate-50">
                            View all
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
