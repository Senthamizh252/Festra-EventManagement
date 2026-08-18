import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer';
import BackgroundDecorations from '../components/BackgroundDecorations';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        if (!email) {
            setError('Please enter your email address.');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API latency for sending password reset email
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-x-hidden p-6 bg-gradient-to-br from-[#F8F7FF] via-[#EDE9FE] to-[#FCE7F3] font-sans z-0">
            {/* Ambient Background Gradient Glows & Blobs */}
            <BackgroundDecorations />

            {/* Central Content Column */}
            <div className="w-full relative z-10 flex flex-col items-center flex-1 justify-center max-w-[440px] transform -translate-y-6">

                {/* Branding Top */}
                <div className="mb-6 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Logo size="lg" />
                    <p className="mt-3 text-[#5B4BDB] font-semibold text-[16px] tracking-wide bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/50">
                        Every Event. One Experience.
                    </p>
                </div>

                {/* Form Card */}
                <AuthCard className="w-full">
                    {!isSuccess ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-[26px] sm:text-[27px] font-black font-sans text-festra-text-primary tracking-tight">
                                    Forgot Password 🔐
                                </h2>
                                <p className="text-[15.5px] sm:text-[17px] text-festra-text-secondary mt-2 font-medium leading-relaxed">
                                    Don't worry! Enter your email address and we'll help you reset your password.
                                </p>
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <div className="space-y-1">
                                    <Input
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        icon={Mail}
                                        error={error}
                                        required
                                    />
                                    <p className="text-[12px] text-gray-400 font-semibold text-center mt-2.5">
                                        For your security, we'll never reveal whether an account exists.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        isLoading={isLoading}
                                    >
                                        Send Reset Link
                                    </Button>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* Success State View */
                        <div className="text-center py-4 animate-fade-in-scale">
                            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                                <CheckCircle className="h-8 w-8 text-[#10B981]" />
                            </div>
                            <h2 className="text-[26px] font-black text-festra-text-primary mb-2.5">
                                Reset Link Sent!
                            </h2>
                            <p className="text-[16px] font-medium text-festra-text-secondary leading-relaxed mb-6">
                                We've sent password reset instructions to <span className="font-bold text-primary">{email}</span>. Please check your inbox.
                            </p>
                        </div>
                    )}

                    {/* Footer Nav */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
                        <p className="text-[16px] sm:text-[16.5px] font-semibold text-festra-text-secondary">
                            Remember your password?
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/login')}
                        >
                            Back to Login
                        </Button>
                    </div>
                </AuthCard>

            </div>

            {/* Absolute Footer */}
            <div className="w-full absolute bottom-6 z-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Footer />
            </div>

        </div>
    );
}
