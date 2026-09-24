import React from 'react';
import {
    Map,
    MapPin,
    Wind,
    Accessibility,
    ArrowUpToLine,
    Car,
    Navigation,
    MapIcon
} from 'lucide-react';
import './VenueMapCard.css';

const DEFAULT_VENUE = {
    name: "Main Auditorium",
    block: "Block C",
    floor: "2nd Floor",
    mapUrl: "https://maps.google.com",
    coordinates: "12.9716° N, 77.5946° E",
    directions: [
        "Enter through Gate 2 (Opposite Library)",
        "Proceed to Block C and take Elevator A to Level 2",
        "Check-in at Desk 3 before entering the main hall"
    ],
    amenities: [
        { icon: <Wind size={14} />, label: "Air Conditioned" },
        { icon: <Accessibility size={14} />, label: "Wheelchair Accessible" },
        { icon: <ArrowUpToLine size={14} />, label: "Elevator Nearby" }
    ]
};

const VenueMapCard = ({ venue = DEFAULT_VENUE }) => {
    return (
        <div className="v-card-container">

            {/* Header & Location Badging */}
            <div className="v-card-header">
                <h2 className="v-card-title">
                    <Map size={24} color="#8b3dff" /> Venue & Navigation Guide
                </h2>

                <div className="v-location-badge">
                    <MapPin size={18} />
                    {venue.name}, {venue.block}, {venue.floor}
                </div>

                <div className="v-amenities-group">
                    {venue.amenities && venue.amenities.map((item, index) => (
                        <div key={index} className="v-amenity-pill">
                            {item.icon} {item.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="v-card-body">

                {/* Mock Floor Map Visual Area */}
                <div className="v-map-visual">
                    <div className="v-mock-label entry">Entry Gate</div>
                    <div className="v-mock-label desk">Registration Desk</div>
                    <div className="v-mock-label hall">Main Hall</div>

                    {/* Animated Destination Pin */}
                    <div className="v-map-pin-wrapper">
                        <div className="v-map-pin-ring"></div>
                        <MapPin size={38} fill="#ef4444" color="white" strokeWidth={1.5} />
                        <span style={{ fontWeight: 700, color: '#374151', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                            You are heading here
                        </span>
                    </div>

                    <div className="v-map-actions">
                        <button className="v-btn-secondary">
                            <MapIcon size={16} /> View Floor Layout
                        </button>
                        <a
                            href={venue.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="v-btn-primary"
                        >
                            <Navigation size={16} /> Open in Google Maps
                        </a>
                    </div>
                </div>

                {/* Step-by-step Sequential Directions */}
                <h3 className="v-directions-title">How to get there</h3>
                <div className="v-steps-list">
                    {venue.directions && venue.directions.map((step, index) => (
                        <div key={index} className="v-step-item">
                            <div className="v-step-number">{index + 1}</div>
                            <p className="v-step-text">{step}</p>
                        </div>
                    ))}
                </div>

                {/* Parking & Transit Information Box */}
                <div className="v-tip-box">
                    <div className="v-tip-icon">
                        <Car size={24} />
                    </div>
                    <div className="v-tip-content">
                        <h4>Parking & Transit</h4>
                        <p>
                            Two-wheeler and Four-wheeler parking is available in the North Basement.
                            Shuttle services run every 15 minutes from the main gate to Block C.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default VenueMapCard;
