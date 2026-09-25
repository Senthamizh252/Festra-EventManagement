import React, { useState } from 'react';
import './EventFAQ.css';

const defaultFaqs = [
    {
        question: "Who is eligible to participate?",
        answer: "All currently enrolled university students with a valid college ID are eligible. Some specific hackathons or technical events might have branch or year restrictions."
    },
    {
        question: "Will refreshments or lunch be provided?",
        answer: "Yes, lunch and high tea will be provided for all registered attendees. Water dispensers are available throughout the venue."
    },
    {
        question: "Do I need to bring my own laptop/equipment?",
        answer: "For technical events like hackathons and workshops, you are required to bring your own laptop and charger. Standard electrical outlets and WiFi are provided."
    },
    {
        question: "How and when will certificates be distributed?",
        answer: "Digital participation certificates will be emailed to your registered email address within 48 hours after the conclusion of the event."
    },
    {
        question: "Can I cancel my registration or transfer my pass?",
        answer: "Registrations are non-refundable. However, pass transfers are allowed up to 24 hours before the event starts. Contact the helpdesk for transfer requests."
    }
];

const defaultContactInfo = {
    club: "Tech Club Core Committee",
    name: "Alex Johnson",
    designation: "Event Coordinator",
    email: "support@festra.tech",
    phone: "+91 98765 43210",
    hours: "Available 9:00 AM - 6:00 PM"
};

const EventFAQ = ({ faqs = defaultFaqs, contactInfo = defaultContactInfo }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="event-faq-container">
            {/* FAQ Left Column */}
            <div className="faq-section">
                <div className="faq-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Everything you need to know before attending</p>
                </div>
                <div className="faq-accordion">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`accordion-item ${isOpen ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="accordion-header">
                                    <h3>{faq.question}</h3>
                                    <span className={`chevron-icon ${isOpen ? 'open' : ''}`}>
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>
                                </div>

                                {/* Expandable Content Area */}
                                <div
                                    className="accordion-content-wrapper"
                                    style={{
                                        display: 'grid',
                                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                                        transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <div className="accordion-content" style={{ overflow: 'hidden' }}>
                                        <div className="accordion-content-inner">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Contact Right Column */}
            <div className="contact-section">
                <div className="sticky-contact-card">
                    <div className="contact-card-header">
                        <span className="club-badge">{contactInfo.club}</span>
                        <h3>Organizer Helpdesk</h3>
                    </div>

                    <div className="coordinator-info">
                        <div className="avatar-placeholder">
                            {contactInfo.name.charAt(0)}
                        </div>
                        <div className="coordinator-details">
                            <h4>{contactInfo.name}</h4>
                            <p>{contactInfo.designation}</p>
                        </div>
                    </div>

                    <div className="contact-links">
                        <a href={`mailto:${contactInfo.email}`} className="contact-link-item">
                            <span className="icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </span>
                            {contactInfo.email}
                        </a>
                        <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                            <span className="icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </span>
                            {contactInfo.phone}
                        </a>
                    </div>

                    <div className="hours-badge">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {contactInfo.hours}
                    </div>

                    <a href={`mailto:${contactInfo.email}?subject=Inquiry regarding Event`} className="send-inquiry-btn">
                        Send Inquiry
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventFAQ;
