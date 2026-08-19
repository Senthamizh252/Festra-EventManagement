import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Ticket, QrCode, Award, User, Settings, LogOut, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/participant-dashboard', icon: Home, label: 'Dashboard' },
        { path: '/my-events', icon: Ticket, label: 'My Events' },
        { path: '/my-qr-pass', icon: QrCode, label: 'My QR Pass' },
        { path: '/certificates', icon: Award, label: 'Certificates' },
    ];

    const bottomItems = [
        { path: '/profile', icon: User, label: 'Profile' },
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
            <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-gray-150 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>

                {/* Header / Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    <Logo size="md" />
                    <button className="lg:hidden text-festra-text-secondary hover:text-festra-text-primary focus:outline-none" onClick={handleClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Sections */}
                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">

                    {/* MAIN SECTION */}
                    <div>
                        <p className="px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Main</p>
                        <div className="space-y-1.5">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path || (item.path === '/participant-dashboard' && location.pathname === '/');
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={handleClose}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-[17px] transition-all duration-200 group ${isActive
                                            ? 'bg-gradient-to-r from-primary to-[#7C3AED] text-white shadow-lg shadow-primary/25'
                                            : 'text-gray-500 hover:bg-slate-50 hover:text-festra-text-primary'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                                        {item.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* ACCOUNT SECTION */}
                    <div>
                        <p className="px-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Account</p>
                        <div className="space-y-1.5">
                            {bottomItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={handleClose}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-[17px] transition-all duration-200 group ${isActive
                                            ? 'bg-gradient-to-r from-primary to-[#7C3AED] text-white shadow-lg shadow-primary/25'
                                            : 'text-gray-500 hover:bg-slate-50 hover:text-festra-text-primary'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                                        {item.label}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Logout */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-[17px] text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group focus:outline-none"
                    >
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-transform group-hover:scale-110" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
