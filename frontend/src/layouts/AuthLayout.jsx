import React from 'react';
import Logo from '../components/Logo';
import DashboardMockup from '../components/DashboardMockup';
import Footer from '../components/Footer';
import BackgroundDecorations from '../components/BackgroundDecorations';

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden overflow-y-auto bg-[#F8F7FF] font-sans z-0">
            {/* Ambient Background Gradient Glows & Blobs */}
            <BackgroundDecorations />

            {/* Content Container */}
            <div className="flex-1 flex flex-col md:flex-row relative z-10">

                {/* LEFT SECTION - BRANDING & ILLUSTRATION (50% Width on Desktop) */}
                <div className="w-full md:w-[50%] border-b-2 md:border-b-0 md:border-r-2 border-indigo-100/90 flex flex-col justify-between p-8 lg:p-12 bg-gradient-to-br from-[#AA9DF0] via-[#9181E9] to-[#7964DF] select-none">

                    {/* Header Logo - Top Area */}
                    <div className="mb-8 md:mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <Logo size="lg" textClassName="text-white" />
                    </div>

                    {/* Branding Content - Centered Composition */}
                    <div className="flex-1 flex flex-col justify-center items-center max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto w-full py-6">
                        {/* Heading & description composition */}
                        <div className="space-y-4 md:space-y-6 mb-8 lg:mb-12 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <h1 className="text-[38px] lg:text-[50px] xl:text-5.5xl font-extrabold text-white tracking-tight leading-tight">
                                Every Event.{' '}
                                <span className="bg-gradient-to-r from-[#FCE7F3] via-light-purple to-[#EC4899] bg-clip-text text-transparent drop-shadow-sm block sm:inline mt-2 sm:mt-0">
                                    One Experience.
                                </span>
                            </h1>
                            <p className="text-[18px] lg:text-[20px] xl:text-[22px] text-[#D9D6FE] leading-relaxed font-normal px-2 max-w-xl mx-auto">
                                Discover, organize, and manage events effortlessly &mdash; from registration to attendance and certificates.
                            </p>
                        </div>

                        {/* SaaS Mockup / Illustration Panel */}
                        <div className="w-full flex items-center justify-center hidden md:flex transform -translate-y-12 lg:-translate-y-20 xl:scale-110 2xl:scale-125 origin-top animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
                            <DashboardMockup />
                        </div>
                    </div>

                    {/* Bottom Spacer to keep layout balanced */}
                    <div className="h-4 hidden md:block" />
                </div>

                {/* RIGHT SECTION - AUTHENTICATION CARD (50% Width on Desktop) */}
                <div className="w-full md:w-[50%] relative flex flex-col items-center justify-center py-16 px-6 sm:px-10 lg:px-12 bg-[#F4F1FF] min-h-[600px] md:min-h-screen">

                    {/* Centered Auth Card Container */}
                    <div className="w-full max-w-[540px] sm:w-[90%] lg:w-[100%] lg:px-8 xl:max-w-[700px] 2xl:max-w-[800px] z-10 my-auto">
                        {children}
                    </div>

                    {/* Subtle Footer absolute at bottom on desktop, flows naturally on mobile */}
                    <div className="w-full mt-10 md:mt-0 md:absolute md:bottom-6 md:left-0 md:right-0 md:px-12 animate-fade-in-up z-20 text-center" style={{ animationDelay: '0.5s' }}>
                        <Footer />
                    </div>
                </div>

            </div>
        </div>
    );
}
