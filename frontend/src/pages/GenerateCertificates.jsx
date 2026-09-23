import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiShield, FiFileText, FiAward } from 'react-icons/fi';
import './GenerateCertificates.css';

const MOCK_ATTENDEES = [
    { id: 1, name: 'Sanjay Kumar', regNo: '731621CS143', checkInTime: '09:12 AM', status: 'Ready' },
    { id: 2, name: 'Priya Sharma', regNo: '731621IT092', checkInTime: '09:20 AM', status: 'Issued' },
    { id: 3, name: 'Ananya Singh', regNo: '731621ME112', checkInTime: '09:28 AM', status: 'Ready' },
    { id: 4, name: 'Vikram Aditya', regNo: '731621CS088', checkInTime: '09:41 AM', status: 'Ready' },
    { id: 5, name: 'Megha Reddy', regNo: '731621AI034', checkInTime: '10:05 AM', status: 'Ready' },
];

const GenerateCertificates = () => {
    const navigate = useNavigate();

    // Template State
    const [certTitle, setCertTitle] = useState('Certificate of Participation');
    const [signatory, setSignatory] = useState('Dr. Alan Turing');
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);

    // Attendees State
    const [attendees, setAttendees] = useState(MOCK_ATTENDEES);
    const [selectedIds, setSelectedIds] = useState([]);

    // Generation Simulator State
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generationComplete, setGenerationComplete] = useState(false);

    // Eligible calculation
    const totalEligible = attendees.length;
    const totalReady = attendees.filter(a => a.status === 'Ready').length;

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allReadyIds = attendees.filter(a => a.status === 'Ready').map(a => a.id);
            setSelectedIds(allReadyIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id, checked) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleGenerate = () => {
        if (selectedIds.length === 0) return;

        setIsGenerating(true);
        setProgress(0);
        setGenerationComplete(false);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setGenerationComplete(true);

                    // Update status in table
                    setAttendees(prevAttendees =>
                        prevAttendees.map(a =>
                            selectedIds.includes(a.id) ? { ...a, status: 'Issued' } : a
                        )
                    );
                    setSelectedIds([]); // Clear selection

                    return 100;
                }
                return prev + Math.floor(Math.random() * 20) + 10; // Increment 10-30%
            });
        }, 500);
    };

    const closeSimulator = () => {
        setIsGenerating(false);
        setProgress(0);
        setGenerationComplete(false);
    };

    return (
        <div className="gc-wrapper">
            <div className="gc-header-section">
                <button className="gc-back-btn" onClick={() => navigate('/organizer')}>
                    <FiArrowLeft /> Back to Dashboard
                </button>

                <div className="gc-header-row">
                    <h1 className="gc-title">Certificate Generation & Issuance</h1>
                    <div className="gc-event-select-wrapper">
                        <select className="gc-event-select">
                            <option value="ai-summit">AI & Future Tech Summit - Completed</option>
                            <option value="hackathon">Hackathon 2026 - Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="gc-content-grid">
                {/* Left Column: Template Customization & Preview */}
                <div className="gc-col-left">
                    <div className="gc-card">
                        <div className="gc-card-header">
                            <h3><FiFileText /> Template Settings</h3>
                        </div>

                        <div className="gc-form-group">
                            <label>Certificate Title</label>
                            <input
                                type="text"
                                value={certTitle}
                                onChange={(e) => setCertTitle(e.target.value)}
                            />
                        </div>
                        <div className="gc-form-group">
                            <label>Signatory Name</label>
                            <input
                                type="text"
                                value={signatory}
                                onChange={(e) => setSignatory(e.target.value)}
                            />
                        </div>
                        <div className="gc-form-group">
                            <label>Issue Date</label>
                            <input
                                type="date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                            />
                        </div>

                        <div className="gc-preview-label">Live Preview</div>
                        <div className="gc-certificate-preview">
                            <div className="gc-cert-border">
                                <div className="gc-cert-logo"><FiAward /> FESTRA</div>
                                <h4 className="gc-cert-title">{certTitle}</h4>
                                <p className="gc-cert-text">This is proudly presented to</p>
                                <div className="gc-cert-name">[Participant Name]</div>
                                <p className="gc-cert-text">for successfully participating in<br /><strong>AI & Future Tech Summit</strong></p>

                                <div className="gc-cert-footer">
                                    <div className="gc-cert-sig">
                                        <div className="gc-sig-line"></div>
                                        <div className="gc-sig-name">{signatory}</div>
                                        <div className="gc-sig-title">Event Organizer</div>
                                    </div>
                                    <div className="gc-cert-meta">
                                        <div>Date: {issueDate}</div>
                                        <div>ID: FEST-[Auto-Gen]</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Attendees Table */}
                <div className="gc-col-right">
                    <div className="gc-card">
                        <div className="gc-card-header gc-flex-between">
                            <h3><FiCheckCircle /> Verified Attendees</h3>
                            <div className="gc-metric-pill">
                                {totalEligible} / 50 Attendees Eligible
                            </div>
                        </div>

                        <div className="gc-table-wrapper">
                            <table className="gc-attendees-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.length === totalReady && totalReady > 0}
                                                onChange={handleSelectAll}
                                                disabled={totalReady === 0}
                                            />
                                        </th>
                                        <th>Participant Name</th>
                                        <th>Register No</th>
                                        <th>Check-In Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendees.map(attendee => (
                                        <tr key={attendee.id} className={attendee.status === 'Issued' ? 'issued-row' : ''}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(attendee.id)}
                                                    onChange={(e) => handleSelectOne(attendee.id, e.target.checked)}
                                                    disabled={attendee.status === 'Issued'}
                                                />
                                            </td>
                                            <td className="gc-fw-600">{attendee.name}</td>
                                            <td className="gc-mono">{attendee.regNo}</td>
                                            <td>{attendee.checkInTime}</td>
                                            <td>
                                                <span className={`gc-status-pill ${attendee.status.toLowerCase()}`}>
                                                    {attendee.status === 'Ready' ? 'Ready to Issue' : 'Already Issued'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="gc-action-bar">
                            <div className="gc-selected-count">
                                {selectedIds.length} participant(s) selected
                            </div>
                            <button
                                className="gc-btn-generate"
                                disabled={selectedIds.length === 0}
                                onClick={handleGenerate}
                            >
                                Generate & Send Certificates ({selectedIds.length})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Simulator Modal */}
            {isGenerating && (
                <div className="gc-modal-overlay">
                    <div className="gc-modal">
                        {!generationComplete ? (
                            <>
                                <h2>Generating Certificates...</h2>
                                <p>Processing {selectedIds.length} files securely.</p>
                                <div className="gc-progress-track">
                                    <div className="gc-progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                </div>
                                <div className="gc-progress-text">{Math.min(progress, 100)}% Complete</div>
                            </>
                        ) : (
                            <>
                                <div className="gc-success-icon"><FiShield /></div>
                                <h2>Success!</h2>
                                <p>{selectedIds.length} Certificates issued and made available to participants!</p>
                                <button className="gc-btn-secondary full-width mt-4" onClick={closeSimulator}>
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default GenerateCertificates;
