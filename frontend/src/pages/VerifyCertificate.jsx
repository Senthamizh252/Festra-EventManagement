import React, { useState } from 'react';
import './VerifyCertificate.css';

const VerifyCertificate = () => {
    const [certId, setCertId] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [certData, setCertData] = useState(null);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!certId.trim()) return;

        setStatus('loading');

        // Simulate API verification call
        setTimeout(() => {
            // Mock validation logic
            if (certId.toUpperCase() === 'FST-2026-CS8901') {
                setCertData({
                    recipientName: 'Senthamizh S',
                    eventName: 'AI & Future Tech Summit',
                    organizingClub: 'Google Developer Student Club',
                    issueDate: 'October 15, 2026 (14:30 IST)',
                    achievement: '1st Place Winner',
                    signatureHash: '0x8f2d9a92bc3e...4b1c7e93f',
                    certificateId: 'FST-2026-CS8901'
                });
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1800);
    };

    return (
        <div className="verify-portal-container">
            <div className="verify-portal-content">
                <div className="verify-header">
                    <h1>Festra Credential Verification</h1>
                    <p>Verify the authenticity of digital certificates issued by collegiate clubs and events.</p>
                </div>

                <div className="verify-search-section">
                    <form className="verify-form" onSubmit={handleVerify}>
                        <div className="input-group">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="Enter Certificate ID (e.g., FST-2026-CS8901)"
                                value={certId}
                                onChange={(e) => setCertId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="verify-btn" disabled={status === 'loading' || !certId.trim()}>
                            {status === 'loading' ? 'Verifying...' : 'Verify Credential'}
                        </button>
                    </form>
                </div>

                <div className="verify-results-area">
                    {status === 'loading' && (
                        <div className="loading-state">
                            <div className="spinner-wrapper">
                                <div className="spinner-ring"></div>
                                <div className="spinner-ring-inner"></div>
                            </div>
                            <p>Checking cryptographically signed certificate registry...</p>
                        </div>
                    )}

                    {status === 'success' && certData && (
                        <div className="result-card success-card">
                            <div className="badge-banner success">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                <h2>Official & Authenticated Credential</h2>
                            </div>

                            <div className="cert-details-grid">
                                <div className="detail-item">
                                    <span className="label">Recipient Name</span>
                                    <span className="value primary-value">{certData.recipientName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Event Name</span>
                                    <span className="value">{certData.eventName}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Organizing Club</span>
                                    <span className="value">{certData.organizingClub}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Issue Date & Timestamp</span>
                                    <span className="value mono">{certData.issueDate}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Role / Achievement</span>
                                    <span className="value achievement-badge">{certData.achievement}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Digital Signature Hash</span>
                                    <span className="value mono crypto-hash" title={certData.signatureHash}>{certData.signatureHash}</span>
                                </div>
                            </div>

                            <div className="cert-actions">
                                <button className="action-btn download-btn">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Download Verified PDF
                                </button>
                                <button className="action-btn linkedin-btn">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                    Share on LinkedIn
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="result-card error-card">
                            <div className="badge-banner error">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                                </svg>
                                <h2>Certificate Not Found or Revoked</h2>
                            </div>
                            <div className="error-guidance">
                                <p>The Certificate ID you entered does not match any valid credential in our secure registry.</p>
                                <ul className="guidance-list">
                                    <li>Check for typos (e.g., confusing 'O' with '0', or 'I' with '1').</li>
                                    <li>Ensure you are entering the full alphanumeric ID format (e.g., FST-2026-XXXXX).</li>
                                    <li>Reach out to the organizing club if you believe the certificate was issued recently and might be pending in the decentralized queue.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
