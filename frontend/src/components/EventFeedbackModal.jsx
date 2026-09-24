import React, { useState, useEffect } from 'react';
import { X, Star, Check } from 'lucide-react';
import './EventFeedbackModal.css';

const MAX_CHARS = 300;
const CATEGORIES = [
    { id: 'organization', label: 'Event Organization' },
    { id: 'speaker', label: 'Speaker & Content' },
    { id: 'venue', label: 'Venue & Facilities' }
];

const PILL_OPTIONS = ['Poor', 'Fair', 'Good', 'Excellent'];

const EventFeedbackModal = ({ isOpen, onClose, eventName, onSubmitFeedback }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [categoryRatings, setCategoryRatings] = useState({
        organization: '',
        speaker: '',
        venue: ''
    });
    const [comments, setComments] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setHoverRating(0);
            setCategoryRatings({ organization: '', speaker: '', venue: '' });
            setComments('');
            setIsAnonymous(false);
            setIsSuccess(false);
            setIsSubmitting(false);

            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && !isSubmitting && !isSuccess) {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, isSubmitting, isSuccess, onClose]);

    if (!isOpen) return null;

    const handlePillSelect = (categoryId, value) => {
        setCategoryRatings(prev => ({
            ...prev,
            [categoryId]: value
        }));
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isSubmitting && !isSuccess) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prevent submitting without overall rating
        if (rating === 0) return;

        setIsSubmitting(true);

        const feedbackData = {
            eventName,
            rating,
            categoryRatings,
            comments,
            isAnonymous
        };

        // Simulate API submission delay
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            if (onSubmitFeedback) {
                onSubmitFeedback(feedbackData);
            }

            // Auto close after showing success message
            setTimeout(() => {
                onClose();
            }, 2500);

        }, 1500);
    };

    return (
        <div className="feedback-modal-backdrop" onClick={handleBackdropClick}>
            <div className="feedback-modal-container" onClick={(e) => e.stopPropagation()}>

                {isSuccess ? (
                    <div className="success-view">
                        <div className="success-icon-wrapper">
                            <Check size={32} strokeWidth={3} />
                        </div>
                        <h3 className="success-title">Thank you for your feedback!</h3>
                        <p className="success-desc">
                            Your review helps organizers improve future events and deliver better experiences.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="feedback-modal-header">
                            <div>
                                <h2 className="feedback-modal-title">Write a Review</h2>
                                <p className="feedback-modal-subtitle">Share your experience at {eventName}</p>
                            </div>
                            <button
                                className="feedback-close-btn"
                                onClick={onClose}
                                disabled={isSubmitting}
                                aria-label="Close modal"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} id="feedbackForm">
                            <div className="feedback-modal-body">

                                {/* Overall Interactive Rating */}
                                <div className="feedback-section" style={{ textAlign: 'center' }}>
                                    <label className="feedback-label">Overall Rating</label>
                                    <div className="star-rating-container" onMouseLeave={() => setHoverRating(0)}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className={`star-btn ${(rating >= star) ? 'active' : ''} ${(hoverRating >= star) ? 'hovered' : ''}`}
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                aria-label={`Rate ${star} stars`}
                                            >
                                                <Star />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Categorical Pill Ratings */}
                                {CATEGORIES.map(category => (
                                    <div className="feedback-section" key={category.id}>
                                        <label className="feedback-label">{category.label}</label>
                                        <div className="pill-rating-group">
                                            {PILL_OPTIONS.map(option => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    className={`pill-btn ${categoryRatings[category.id] === option ? 'selected' : ''}`}
                                                    onClick={() => handlePillSelect(category.id, option)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Text Feedback */}
                                <div className="feedback-section">
                                    <label className="feedback-label" htmlFor="feedbackComments">
                                        What did you enjoy most, and what can we improve?
                                    </label>
                                    <div className="feedback-textarea-wrapper">
                                        <textarea
                                            id="feedbackComments"
                                            className="feedback-textarea"
                                            placeholder="Share your thoughts..."
                                            maxLength={MAX_CHARS}
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        />
                                        <div className={`char-counter ${comments.length >= MAX_CHARS ? 'limit-reached' : ''}`}>
                                            {comments.length} / {MAX_CHARS}
                                        </div>
                                    </div>
                                </div>

                                {/* Anonymous Checkbox Submit */}
                                <label className="anon-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="anon-checkbox"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                    />
                                    Submit feedback anonymously
                                </label>

                            </div>

                            <div className="feedback-modal-footer">
                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting || rating === 0}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="btn-spinner"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Review'
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventFeedbackModal;
