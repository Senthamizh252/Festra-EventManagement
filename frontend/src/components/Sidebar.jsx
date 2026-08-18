import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Ticket, QrCode, Award, User, Settings, LogOut, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/participant-dashboard', icon: Home, label: 'Dashboard' },
        { path: '/events', icon: Search, label: 'Discover Events' },
        { path: '/my-events', icon: Ticket, label: 'My Events' },
        { path: '/my-qr-pass', icon: QrCode, label: 'My QR Pass' },
        { path: '/certificates', icon: Award, label: 'Certificates' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    const bottomItems = [
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const handleClose = () => {
        if (setIsOpen) setIsOpen(false);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-festra-text-primary/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={handleClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-[240px] bg-white border-r border-gray-150 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>

                {/* Header / Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <Logo size="md" />
                    <button className="lg:hidden text-festra-text-secondary hover:text-festra-text-primary focus:outline-none" onClick={handleClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto pt-6 pb-5 px-4 space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleClose}
                                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-semibold text-[13.5px] transition-all duration-200 group ${isActive
                                        ? 'bg-gradient-to-r from-primary to-[#7C3AED] text-white shadow-lg shadow-primary/25'
                                        : 'text-gray-500 hover:bg-slate-50 hover:text-festra-text-primary'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Bottom Navigation */}
                <div className="p-4 border-t border-gray-100 space-y-1.5">
                    {bottomItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleClose}
                                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-semibold text-[13.5px] text-gray-500 hover:bg-slate-50 hover:text-festra-text-primary transition-all duration-200 group"
                            >
                                <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-transform group-hover:scale-110" />
                                {item.label}
                            </NavLink>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-semibold text-[13.5px] text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group focus:outline-none"
                    >
                        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-transform group-hover:scale-110" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
