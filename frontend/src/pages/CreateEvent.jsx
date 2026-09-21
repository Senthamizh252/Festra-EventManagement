import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const CreateEvent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        organizer: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        capacity: '',
        bannerUrl: '',
        description: '',
        rules: '',
        schedule: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event Creating...', formData);

        // Show success banner
        setShowSuccess(true);

        // Simulate network delay and navigation
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/organizer');
        }, 2000);
    };

    return (
        <div className="create-event-page">
            <div className="create-event-header">
                <h1>Create New Event</h1>
                <p>Fill in the details below to publish an event for participants</p>
            </div>

            <div className="create-event-container">
                {showSuccess && (
                    <div className="success-banner">
                        Event created successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="create-event-form">
                    {/* Section 1 */}
                    <div className="form-section">
                        <h2>Basic Details</h2>
                        <div className="input-grid">
                            <div className="input-group full-width">
                                <label>Event Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Tech Symposium 2026" />
                            </div>
                            <div className="input-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="" disabled>Select Category</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Organizer / Club Name</label>
                                <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} required placeholder="e.g., Coding Club" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="form-section">
                        <h2>Date, Time & Venue</h2>
                        <div className="input-grid three-cols">
                            <div className="input-group">
                                <label>Event Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>Start Time</label>
                                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                            </div>
                            <div className="input-group">
                                <label>End Time</label>
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="input-group mt-1">
                            <label>Venue / Auditorium</label>
                            <input type="text" name="venue" value={formData.venue} onChange={handleChange} required placeholder="e.g., Main Auditorium" />
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="form-section">
                        <h2>Event Capacity & Media</h2>
                        <div className="input-grid">
                            <div className="input-group">
                                <label>Max Registrations</label>
                                <input type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} required placeholder="e.g., 200" />
                            </div>
                            <div className="input-group">
                                <label>Banner Image URL</label>
                                <input type="url" name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="form-section">
                        <h2>Detailed Info</h2>
                        <div className="input-group">
                            <label>Short Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required placeholder="Brief overview of the event..."></textarea>
                        </div>
                        <div className="input-group">
                            <label>Rules & Guidelines</label>
                            <textarea name="rules" value={formData.rules} onChange={handleChange} rows="3" required placeholder="Rules for participation..."></textarea>
                        </div>
                        <div className="input-group">
                            <label>Event Schedule (Optional)</label>
                            <textarea name="schedule" value={formData.schedule} onChange={handleChange} rows="2" placeholder="Outline the timeline of the event..."></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/organizer')}>
                            Cancel
                        </button>
                        <button type="submit" className="publish-btn">
                            Publish Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
