import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParticipantLayout from '../layouts/ParticipantLayout';
import { mockEvents } from '../data/mockEvents';
import { ArrowLeft, Calendar, MapPin, CheckCircle, Ticket, Loader2, Clock, User, QrCode } from 'lucide-react';

export default function EventRegistration() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Convert id param to integer when searching in mockEvents
    const event = mockEvents.find(e => e.id === parseInt(id));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [registrationId, setRegistrationId] = useState('');

    const [formData, setFormData] = useState({
        registerNumber: '',
        phone: '',
        department: '',
        yearOfStudy: '',
        teamName: '',
        teamSize: '',
        specialRequirements: ''
    });

    const [errors, setErrors] = useState({});
    const [agreed, setAgreed] = useState(false);

    // Mock User Data
    const userName = "Senthamizh";
    const userEmail = "senthamizh@example.com";

    // Dynamic field check based on category (Example logic for optional fields)
    const requiresTeam = event?.category === 'Hackathon' || event?.category === 'Competition';

    if (!event) {
        return (
            <ParticipantLayout>
                <div className="flex flex-col items-center justify-center p-16 text-center h-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
                    <p className="text-gray-500 mb-6">The event you are trying to register for doesn't seem to exist.</p>
                    <button
                        onClick={() => navigate('/participant-dashboard')}
                        className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </ParticipantLayout>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.registerNumber.trim()) {
            newErrors.registerNumber = "Register Number is required";
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.registerNumber)) {
            newErrors.registerNumber = "Must be alphanumeric";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required";
        } else if (!/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (!formData.department) {
            newErrors.department = "Department is required";
        }

        if (!formData.yearOfStudy) {
            newErrors.yearOfStudy = "Year of Study is required";
        }

        if (requiresTeam) {
            if (!formData.teamName.trim()) newErrors.teamName = "Team Name is required";
            if (!formData.teamSize) newErrors.teamSize = "Team Size is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate network request for registration processing
        setTimeout(() => {
            setIsSubmitting(false);
            setRegistrationId(`FEST-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <ParticipantLayout>
            <div className="animate-fade-in-up pb-12 max-w-6xl mx-auto px-4 sm:px-6 mt-4">
                <div className="flex items-center gap-2 text-[14px] font-bold text-gray-400 mb-6">
                    <button onClick={() => navigate(`/events/${event.id}`)} className="hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to Event Details
                    </button>
                </div>

                {isSuccess ? (
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-10 max-w-3xl mx-auto text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-pink-500"></div>
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex flex-col items-center justify-center mb-6 mx-auto ring-8 ring-emerald-50/50">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-[28px] font-bold text-festra-text-primary mb-2">Registration Successful!</h2>
                        <p className="text-gray-500 text-[16px] mb-8">
                            You are successfully registered for <span className="font-bold text-festra-text-primary">{event.title}</span>.
                        </p>

                        <div className="bg-[#F8F9FA] rounded-2xl p-6 text-left mb-8 border border-gray-100 flex flex-col sm:flex-row justify-between gap-6">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Registration ID</p>
                                <p className="text-primary font-bold text-lg">{registrationId}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-festra-text-primary font-bold text-sm">{event.date}</p>
                                        <p className="text-gray-500 text-sm">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                                    <p className="text-festra-text-primary font-bold text-sm">{event.venue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/my-events')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                View My Events
                            </button>
                            <button
                                onClick={() => navigate('/my-qr-pass')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-pink-500 text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all"
                            >
                                <QrCode className="w-5 h-5" /> View QR Pass
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Side: Event Summary Card Design */}
                        <div className="w-full lg:w-4/12 h-fit sticky top-24 rounded-[24px] overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col">
                            {event.image && (
                                <div className="h-48 w-full relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[12px] font-bold uppercase tracking-wider rounded-lg">
                                        {event.category}
                                    </span>
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-[22px] font-bold text-festra-text-primary leading-tight mb-2 tracking-tight">
                                    {event.title}
                                </h2>
                                <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                                    {event.description}
                                </p>

                                <div className="space-y-4 bg-[#F8F9FA] p-4 rounded-xl border border-gray-100 mt-auto">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[13px] text-festra-text-primary font-bold">{event.date}</p>
                                            <p className="text-[12px] text-gray-500">{event.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[13px] text-festra-text-primary font-bold">{event.venue}</p>
                                        </div>
                                    </div>
                                    {event.conductedBy && (
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <User className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[13px] text-festra-text-primary font-bold">Organized by</p>
                                                <p className="text-[12px] text-gray-500">{event.conductedBy}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Registration Form */}
                        <div className="w-full lg:w-8/12 bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 sm:p-10 relative">
                            <div className={`transition-opacity duration-300 ${isSubmitting ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                <h3 className="text-[24px] font-bold text-festra-text-primary mb-6">Participant Details</h3>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Account Info - Read Only */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-[#F4F1FF]/40 border border-[#F4F1FF] rounded-2xl">
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-gray-500">Full Name</label>
                                            <input type="text" value={userName} readOnly className="w-full px-4 py-2.5 bg-gray-50/50 border border-transparent rounded-xl text-[14.5px] font-medium text-gray-600 cursor-not-allowed" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-gray-500">Email Address</label>
                                            <input type="email" value={userEmail} readOnly className="w-full px-4 py-2.5 bg-gray-50/50 border border-transparent rounded-xl text-[14.5px] font-medium text-gray-600 cursor-not-allowed" />
                                        </div>
                                    </div>

                                    {/* Dynamic Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[13.5px] font-bold text-gray-700">Register Number / Student ID <span className="text-red-500">*</span></label>
                                            <input type="text" name="registerNumber" value={formData.registerNumber} onChange={handleChange} placeholder="e.g. 731620104612" className={`w-full px-4 py-3 bg-white border ${errors.registerNumber ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm`} />
                                            {errors.registerNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.registerNumber}</p>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13.5px] font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={`w-full px-4 py-3 bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm`} />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-[13.5px] font-bold text-gray-700">Department <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <select name="department" value={formData.department} onChange={handleChange} className={`w-full px-4 py-3 bg-white border ${errors.department ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary appearance-none hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm cursor-pointer`}>
                                                    <option value="" disabled>Choose department...</option>
                                                    <option value="CSE">Computer Science and Engineering</option>
                                                    <option value="IT">Information Technology</option>
                                                    <option value="ECE">Electronics and Communication Engineering</option>
                                                    <option value="EEE">Electrical and Electronics Engineering</option>
                                                    <option value="MECH">Mechanical Engineering</option>
                                                    <option value="CIVIL">Civil Engineering</option>
                                                    <option value="AIDS">AI and Data Science</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            {errors.department && <p className="text-red-500 text-xs mt-1 font-medium">{errors.department}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[13.5px] font-bold text-gray-700">Year of Study <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className={`w-full px-4 py-3 bg-white border ${errors.yearOfStudy ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary appearance-none hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm cursor-pointer`}>
                                                    <option value="" disabled>Select year...</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                            {errors.yearOfStudy && <p className="text-red-500 text-xs mt-1 font-medium">{errors.yearOfStudy}</p>}
                                        </div>
                                    </div>

                                    {requiresTeam && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <h3 className="text-[18px] font-bold text-festra-text-primary mb-4">Additional Information</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-1.5">
                                                    <label className="text-[13.5px] font-bold text-gray-700">Team Name <span className="text-red-500">*</span></label>
                                                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} placeholder="e.g. Code Ninjas" className={`w-full px-4 py-3 bg-white border ${errors.teamName ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm`} />
                                                    {errors.teamName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.teamName}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[13.5px] font-bold text-gray-700">Team Size <span className="text-red-500">*</span></label>
                                                    <div className="relative">
                                                        <select name="teamSize" value={formData.teamSize} onChange={handleChange} className={`w-full px-4 py-3 bg-white border ${errors.teamSize ? 'border-red-500' : 'border-gray-200'} rounded-xl text-[14.5px] font-medium text-festra-text-primary appearance-none hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm cursor-pointer`}>
                                                            <option value="" disabled>Select size...</option>
                                                            <option value="2">2 Members</option>
                                                            <option value="3">3 Members</option>
                                                            <option value="4">4 Members</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                        </div>
                                                    </div>
                                                    {errors.teamSize && <p className="text-red-500 text-xs mt-1 font-medium">{errors.teamSize}</p>}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 mt-5">
                                                <label className="text-[13.5px] font-bold text-gray-700">Special Requirements (Optional)</label>
                                                <textarea name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} placeholder="Any specific needs or requests?" rows="3" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14.5px] font-medium text-festra-text-primary hover:border-gray-300 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm resize-none"></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {/* Summary & Terms */}
                                    <div className="pt-6 border-t border-gray-100">
                                        <div className="bg-[#F8F9FA] rounded-xl p-5 mb-6">
                                            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-3">Registration Summary</p>
                                            <div className="grid grid-cols-2 gap-y-2 text-[14px]">
                                                <span className="text-gray-500">Event:</span>
                                                <span className="font-bold text-festra-text-primary truncate">{event.title}</span>
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-bold text-festra-text-primary truncate">{event.date}</span>
                                                <span className="text-gray-500">Venue:</span>
                                                <span className="font-bold text-festra-text-primary truncate">{event.venue}</span>
                                                <span className="text-gray-500">Participant:</span>
                                                <span className="font-bold text-festra-text-primary truncate">{userName}</span>
                                            </div>
                                        </div>

                                        <label className="flex items-start gap-3.5 cursor-pointer group">
                                            <div className="mt-0.5 flex shrink-0 items-center justify-center relative w-5 h-5">
                                                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[6px] checked:bg-primary checked:border-primary transition-all cursor-pointer" required />
                                                <CheckCircle className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-[14px] text-gray-600 leading-relaxed">
                                                I agree to follow the <a href="#" className="text-primary font-bold hover:underline">event rules</a> and confirm that the information provided is accurate.
                                            </span>
                                        </label>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/events/${event.id}`)}
                                            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-gray-200 text-gray-600 font-bold text-[14.5px] rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !agreed}
                                            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-pink-500 text-white font-bold text-[15.5px] rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                            ) : (
                                                <><Ticket className="w-5 h-5" /> Confirm Registration</>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ParticipantLayout>
    );
}
