import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckSquare, Square, AlertCircle, CheckCircle } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Form Validations
    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!validateForm()) return;

        setIsLoading(true);
        console.log('Initiating authentication for client:', { email, rememberMe });

        // Simulate API latency
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Form validated successfully! POST /api/auth/login integration is pending backend development.');

            setTimeout(() => {
                // If email contains 'organizer' let's redirect to organizer dashboard, else participant for testing convenience
                if (email.toLowerCase().includes('organizer')) {
                    navigate('/organizer/dashboard');
                } else {
                    navigate('/participant-dashboard');
                }
            }, 1800);
        }, 1500);
    };

    const handleGoogleLogin = () => {
        setSuccessMessage('Google Single Sign-On authentication is structured (Mock Mode).');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    return (
        <AuthLayout>
            <AuthCard>
                {/* LOGIN HEADER */}
                <div className="text-center mb-6">
                    <h2 className="text-2.5xl sm:text-[27px] font-black font-sans text-festra-text-primary tracking-tight">
                        Welcome Back 👋
                    </h2>
                    <p className="text-sm sm:text-base text-festra-text-secondary mt-1.5 font-medium">
                        Sign in to continue to Festra
                    </p>
                </div>

                {/* BANNER NOTIFICATIONS */}
                {successMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold flex items-start gap-2.5 animate-fade-in-up">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0" />
                        <div>
                            <p>{successMessage}</p>
                            <p className="text-[10px] text-emerald-600/90 font-medium mt-1">Redirecting you to dashboard preview...</p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 p-4.5 rounded-xl bg-red-55/10 border border-red-100 text-festra-error text-xs font-semibold flex items-center gap-2.5 animate-fade-in-up">
                        <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* INPUTS FORM */}
                <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>

                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email (e.g. organizer@festra.com)"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        icon={Mail}
                        error={errors.email}
                        required
                    />

                    <PasswordInput
                        id="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: null });
                        }}
                        error={errors.password}
                        required
                    />

                    {/* REMEMBER ME / FORGOT PASSWORD */}
                    <div className="flex items-center justify-between text-[13.5px] sm:text-sm select-none pt-1">
                        <button
                            type="button"
                            onClick={() => setRememberMe((prev) => !prev)}
                            className="flex items-center gap-2.5 text-festra-text-secondary hover:text-festra-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 rounded-md py-1 px-1.5 -ml-1.5"
                        >
                            {rememberMe ? (
                                <CheckSquare className="h-5 w-5 text-primary fill-primary/10" />
                            ) : (
                                <Square className="h-5 w-5 text-slate-350" />
                            )}
                            <span className="font-semibold">Remember me</span>
                        </button>

                        <a
                            href="/forgot-password"
                            onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}
                            className="text-accent hover:text-accent/90 hover:brightness-95 font-bold focus:outline-none focus:underline transition-colors"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </div>

                </form>

                {/* OR DIVIDER */}
                <div className="my-6 flex items-center justify-center gap-3 select-none">
                    <div className="h-[1px] bg-slate-150 flex-1"></div>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest">OR</span>
                    <div className="h-[1px] bg-slate-150 flex-1"></div>
                </div>

                {/* GOOGLE AUTH BUTTON */}
                <Button
                    variant="secondary"
                    onClick={handleGoogleLogin}
                    icon={
                        <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] flex-shrink-0" fill="currentColor">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                fill="#EA4335"
                            />
                        </svg>
                    }
                >
                    Continue with Google
                </Button>

                {/* CREATE ACCOUNT INVITATION */}
                <div className="mt-8 pt-7 border-t border-slate-100 flex flex-col items-center gap-4">
                    <p className="text-sm sm:text-[15px] font-semibold text-festra-text-secondary">
                        Don't have an account?
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/register')}
                    >
                        Create Account
                    </Button>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}
