import React from 'react';
import './DigitalTicketCard.css';

const DigitalTicketCard = ({ ticketData }) => {
    if (!ticketData) {
        return null;
    }

    const {
        category,
        eventName,
        organizer,
        date,
        time,
        venue,
        image,
        attendeeName,
        registerNumber,
        registrationId,
        qrImageUrl,
        isValid
    } = ticketData;

    return (
        <div className="dtc-wrapper">
            <div className="dtc-card">
                {/* Top Section: Event Info */}
                <div className="dtc-top">
                    <div className="dtc-header">
                        <span className="dtc-category">{category}</span>
                        <span className="dtc-status">✓ REGISTERED</span>
                    </div>

                    <div className="dtc-event-info">
                        <div className="dtc-image-wrapper">
                            {image ? (
                                <img src={image} alt={eventName} className="dtc-image" />
                            ) : (
                                <div className="dtc-image-placeholder">No Image</div>
                            )}
                        </div>

                        <div className="dtc-details">
                            <h2 className="dtc-title">{eventName}</h2>
                            <p className="dtc-organizer">By {organizer}</p>

                            <div className="dtc-datetime">
                                <span className="dtc-icon-text">
                                    <span className="dtc-icon">📅</span> {date}
                                </span>
                                <span className="dtc-icon-text">
                                    <span className="dtc-icon">🕐</span> {time}
                                </span>
                            </div>

                            <div className="dtc-venue">
                                <span className="dtc-icon">📍</span> {venue}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider with Cutouts */}
                <div className="dtc-divider-container">
                    <div className="dtc-divider"></div>
                </div>

                {/* Bottom Section: Attendee & QR */}
                <div className="dtc-bottom">
                    <div className="dtc-info-grid">
                        <div className="dtc-info-block">
                            <span className="dtc-label">ATTENDEE</span>
                            <strong className="dtc-value">{attendeeName}</strong>
                            <span className="dtc-subtext">{registerNumber}</span>
                        </div>

                        <div className="dtc-info-block text-right">
                            <span className="dtc-label">REGISTRATION ID</span>
                            <strong className="dtc-value">{registrationId}</strong>
                        </div>
                    </div>

                    <div className="dtc-qr-section">
                        <span className="dtc-label mb-2">QR PASS</span>
                        <div className="dtc-qr-box">
                            {qrImageUrl ? (
                                <img src={qrImageUrl} alt="QR Code" className="dtc-qr" />
                            ) : (
                                <div className="dtc-qr-placeholder">QR</div>
                            )}
                        </div>
                        {isValid && <span className="dtc-valid-badge">✓ VALID</span>}
                    </div>

                    <div className="dtc-actions">
                        <button className="dtc-btn dtc-btn-outline">View Event</button>
                        <button className="dtc-btn dtc-btn-primary">Download Pass</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalTicketCard;
