import React, { useState } from 'react';
import './ProfileSettings.css';

const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: 'Senthamizh',
        email: 'senthamizh@example.com',
        regNumber: '23CSE001',
        phone: '+91 9876543210',
        department: 'Computer Science',
        role: 'Participant',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate save by showing the success banner, then hiding it after 3 seconds
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="profile-settings-page">
            <div className="profile-header">
                <h1>Profile & Settings</h1>
                <p>Manage your account information and preferences</p>
            </div>

            <div className="profile-container">
                <div className="profile-sidebar">
                    <button
                        className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal Information
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security & Password
                    </button>
                </div>

                <div className="profile-content">
                    {showSuccess && (
                        <div className="success-banner">
                            Your changes have been saved successfully!
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="profile-form">
                        {activeTab === 'personal' && (
                            <div className="form-section fade-in">
                                <h2>Personal Details</h2>
                                <div className="input-grid">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Register Number</label>
                                        <input type="text" name="regNumber" value={formData.regNumber} onChange={handleChange} required disabled />
                                    </div>
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Department</label>
                                        <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                                    </div>
                                    <div className="input-group">
                                        <label>Role</label>
                                        <input type="text" name="role" value={formData.role} onChange={handleChange} required disabled />
                                    </div>
                                </div>

                                <div className="danger-zone">
                                    <h3>Danger Zone</h3>
                                    <button type="button" className="danger-btn">Delete Account</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="form-section fade-in">
                                <h2>Change Password</h2>
                                <div className="input-group">
                                    <label>Current Password</label>
                                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>New Password</label>
                                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                                </div>
                                <div className="input-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        <div className="form-actions">
                            <button type="submit" className="save-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
