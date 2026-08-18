import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import AuthCard from '../components/AuthCard';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';

export default function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(''); // Initialized to empty to make "No role selected" validate works
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form Validations
    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) {
            newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirmation password is required';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!role) {
            newErrors.role = 'Please choose your role to proceed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) return;

        setIsLoading(true);
        console.log('Initiating registration for client:', { fullName, email, phone, role });

        setTimeout(() => {
            setIsLoading(false);
            setSuccessMessage('Account registered successfully! Redirecting you to login...');

            setTimeout(() => {
                navigate('/login');
            }, 2200);
        }, 1500);
    };

    return (
        <AuthLayout>
            <AuthCard>
                {/* REGISTRATION HEADER */}
                <div className="text-center mb-6">
                    <h2 className="text-2.5xl sm:text-[29px] font-black font-sans text-festra-text-primary tracking-tight">
                        Create Your Account ✨
                    </h2>
                    <p className="text-[16px] sm:text-[18px] text-festra-text-secondary mt-1.5 font-medium">
                        Join Festra and start managing your events
                    </p>
                </div>

                {/* BANNER NOTIFICATION */}
                {successMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-[14px] font-semibold flex items-start gap-2.5 animate-fade-in-up">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0" />
                        <div>
                            <p>{successMessage}</p>
                            <p className="text-[12px] text-emerald-600/90 font-medium mt-1">Directing you to login screen...</p>
                        </div>
                    </div>
                )}

                {/* REGISTRATION FORM */}
                <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>

                    <Input
                        id="fullName"
                        type="text"
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: null });
                        }}
                        icon={User}
                        error={errors.fullName}
                        required
                    />

                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        icon={Mail}
                        error={errors.email}
                        required
                    />

                    <Input
                        id="phone"
                        type="tel"
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                        icon={Phone}
                        error={errors.phone}
                        required
                    />

                    {/* ROLE SELECT SEGMENTS */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[15px] sm:text-[16px] font-semibold text-festra-text-primary tracking-wide block">
                            Choose your role <span className="text-festra-error">*</span>
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Participant Role Option */}
                            <button
                                type="button"
                                onClick={() => {
                                    setRole('Participant');
                                    if (errors.role) setErrors({ ...errors, role: null });
                                }}
                                className={`py-3 px-4.5 rounded-xl border-2 text-center transition-all cursor-pointer font-bold text-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 ${role === 'Participant'
                                    ? 'border-primary bg-primary/5 text-primary shadow-xs'
                                    : 'border-slate-150 bg-white text-festra-text-secondary hover:border-slate-350 hover:bg-slate-50/50 hover:text-festra-text-primary'
                                    }`}
                            >
                                Participant
                            </button>

                            {/* Organizer Role Option */}
                            <button
                                type="button"
                                onClick={() => {
                                    setRole('Organizer');
                                    if (errors.role) setErrors({ ...errors, role: null });
                                }}
                                className={`py-3 px-4.5 rounded-xl border-2 text-center transition-all cursor-pointer font-bold text-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 ${role === 'Organizer'
                                    ? 'border-primary bg-primary/5 text-primary shadow-xs'
                                    : 'border-slate-150 bg-white text-festra-text-secondary hover:border-slate-350 hover:bg-slate-50/50 hover:text-festra-text-primary'
                                    }`}
                            >
                                Organizer
                            </button>
                        </div>
                        {errors.role && (
                            <span className="text-[14px] text-festra-error flex items-center gap-1 mt-1 animate-fade-in-up" role="alert">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{errors.role}</span>
                            </span>
                        )}
                    </div>

                    {/* PASSWORD FIELD */}
                    <div className="space-y-2">
                        <PasswordInput
                            id="password"
                            label="Password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: null });
                            }}
                            error={errors.password}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <PasswordInput
                            id="confirmPassword"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                            }}
                            error={errors.confirmPassword}
                            required
                        />

                        {/* PASSWORDS MATCH SUBTLE SUCCESS GRAPHIC */}
                        {confirmPassword && password === confirmPassword && !errors.confirmPassword && (
                            <span className="text-[13px] text-emerald-600 flex items-center gap-1.5 mt-1.5 font-bold animate-fade-in-up">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                <span>Passwords match</span>
                            </span>
                        )}
                    </div>

                    {/* REGISTER SUBMIT BUTTON */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                        >
                            Create Account
                        </Button>
                    </div>

                </form>

                {/* TRANSITION BACK TO LOGIN */}
                <div className="mt-8 pt-7 border-t border-slate-100 flex flex-col items-center gap-4">
                    <p className="text-[16px] sm:text-[17px] font-semibold text-festra-text-secondary">
                        Already have an account?
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </div>
            </AuthCard>
        </AuthLayout>
    );
}
