import React, { useState, useEffect } from 'react';
import { X, FileSpreadsheet, ClipboardCheck, BarChart3, Download } from 'lucide-react';
import './ExportDataModal.css';

const ExportDataModal = ({ isOpen, onClose, eventName, attendeesCount }) => {
    const [exportFormat, setExportFormat] = useState('csv');
    const [filters, setFilters] = useState({
        contactInfo: true,
        timestamps: false,
        onlyCheckedIn: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Prevent background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFilterChange = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const handleExport = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate download delay
        setTimeout(() => {
            setIsLoading(false);
            alert(`Download complete: ${exportFormat.toUpperCase()} for ${eventName}`);
            onClose();
        }, 1500);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const formatOptions = [
        {
            id: 'csv',
            title: 'CSV Spreadsheet',
            description: 'Standard roster with name, regNo, dept, email, ticketId',
            icon: <FileSpreadsheet size={20} />
        },
        {
            id: 'attendance',
            title: 'Attendance Sheet',
            description: 'Only checked-in attendees with check-in timestamps',
            icon: <ClipboardCheck size={20} />
        },
        {
            id: 'summary',
            title: 'Event Executive Summary',
            description: 'Stats, counts, turnouts, and overall event performance',
            icon: <BarChart3 size={20} />
        }
    ];

    return (
        <div className="export-modal-backdrop" onClick={handleBackdropClick}>
            <div className="export-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="export-modal-header">
                    <div>
                        <h2 className="export-modal-title">Export Event Data</h2>
                        <p className="export-modal-subtitle">
                            {eventName} • {attendeesCount} Attendees
                        </p>
                    </div>
                    <button className="export-modal-close-btn" onClick={onClose} aria-label="Close modal">
                        <X size={24} />
                    </button>
                </div>

                <div className="export-modal-body">
                    <form id="exportForm" onSubmit={handleExport}>

                        <h3 className="export-section-title">Format Selection</h3>
                        <div className="export-format-grid">
                            {formatOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className={`export-format-label ${exportFormat === option.id ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="exportFormat"
                                        value={option.id}
                                        checked={exportFormat === option.id}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                        className="export-format-input"
                                    />
                                    <div className="export-format-icon">
                                        {option.icon}
                                    </div>
                                    <div className="export-format-details">
                                        <span className="export-format-name">{option.title}</span>
                                        <span className="export-format-desc">{option.description}</span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <h3 className="export-section-title">Filter Checklist</h3>
                        <div className="export-filter-list">
                            <label className="export-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.contactInfo}
                                    onChange={() => handleFilterChange('contactInfo')}
                                    className="export-checkbox-input"
                                />
                                <div className="export-checkbox-custom"></div>
                                Include contact info (email & phone)
                            </label>

                            <label className="export-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.timestamps}
                                    onChange={() => handleFilterChange('timestamps')}
                                    className="export-checkbox-input"
                                />
                                <div className="export-checkbox-custom"></div>
                                Include check-in timestamps
                            </label>

                            <label className="export-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.onlyCheckedIn}
                                    onChange={() => handleFilterChange('onlyCheckedIn')}
                                    className="export-checkbox-input"
                                />
                                <div className="export-checkbox-custom"></div>
                                Only checked-in participants
                            </label>
                        </div>

                    </form>
                </div>

                <div className="export-modal-footer">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="exportForm"
                        className="btn-primary-gradient"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="loader-spinner"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Download size={18} />
                                Download Export
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportDataModal;
