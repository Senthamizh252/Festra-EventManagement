import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCamera, FiRefreshCcw, FiCheckCircle, FiXCircle, FiClock, FiSearch } from 'react-icons/fi';
import './QRScanner.css';

const QRScanner = () => {
    const navigate = useNavigate();

    // State
    const [manualId, setManualId] = useState('');
    const [scanStatus, setScanStatus] = useState('idle'); // 'idle', 'success', 'duplicate', 'invalid'
    const [scannedData, setScannedData] = useState(null);
    const [recentScans, setRecentScans] = useState([
        { id: '1', name: 'Sanjay Kumar', regNo: '731621CS143', timestamp: '09:30 AM' },
        { id: '2', name: 'Ananya Singh', regNo: '731621ME112', timestamp: '09:28 AM' },
    ]);

    const EventName = "AI & Future Tech Summit";

    // Simulators
    const simulateValidScan = () => {
        setScannedData({
            name: 'Senthamizh',
            regNo: '23CSE001',
            eventName: EventName,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setScanStatus('success');
    };

    const simulateDuplicateScan = () => {
        setScanStatus('duplicate');
    };

    const simulateInvalidScan = () => {
        setScanStatus('invalid');
    };

    const handleManualVerify = () => {
        if (!manualId.trim()) return;
        if (manualId.toUpperCase() === 'DUPLICATE') simulateDuplicateScan();
        else if (manualId.toUpperCase() === 'INVALID') simulateInvalidScan();
        else simulateValidScan();
    };

    const confirmCheckIn = () => {
        if (scannedData) {
            setRecentScans(prev => [scannedData, ...prev].slice(0, 5));
        }
        resetScanner();
    };

    const resetScanner = () => {
        setScanStatus('idle');
        setScannedData(null);
        setManualId('');
    };

    return (
        <div className="qr-scanner-wrapper">
            {/* Header */}
            <div className="qr-header">
                <button className="qr-back-btn" onClick={() => navigate('/organizer/manage-events')}>
                    <FiArrowLeft /> Back
                </button>
                <h1 className="qr-title">Scan Participant Pass</h1>
                <div className="qr-header-placeholder"></div>
            </div>

            {/* Main Content Split: Scanner & Recent Check-ins */}
            <div className="qr-content-wrapper">

                {/* Left/Top: Scanner Section */}
                <div className="qr-scanner-container">
                    <div className="qr-camera-controls">
                        <button className="qr-camera-toggle"><FiRefreshCcw /> Switch Camera</button>
                    </div>

                    <div className="qr-viewfinder-wrapper">
                        <div className="qr-viewfinder-box">
                            <div className="qr-laser-line"></div>
                            {/* Corner brackets */}
                            <div className="qr-bracket top-left"></div>
                            <div className="qr-bracket top-right"></div>
                            <div className="qr-bracket bottom-left"></div>
                            <div className="qr-bracket bottom-right"></div>
                        </div>

                        <div className="qr-status-overlay">
                            {scanStatus === 'idle' && <span className="qr-badge scanning"><FiCamera /> System Ready</span>}
                        </div>
                    </div>

                    <div className="qr-simulator-actions">
                        <span>Test Controls:</span>
                        <button className="qr-btn-test valid" onClick={simulateValidScan}>Valid</button>
                        <button className="qr-btn-test duplicate" onClick={simulateDuplicateScan}>Duplicate</button>
                        <button className="qr-btn-test invalid" onClick={simulateInvalidScan}>Invalid</button>
                    </div>

                    <div className="qr-manual-entry">
                        <label>Can't scan? Enter Registration ID manually</label>
                        <div className="qr-manual-input-rx">
                            <input
                                type="text"
                                placeholder="e.g. FEST-12345"
                                value={manualId}
                                onChange={e => setManualId(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleManualVerify()}
                            />
                            <button onClick={handleManualVerify}><FiSearch /> Verify</button>
                        </div>
                    </div>
                </div>

                {/* Right/Bottom: Recent Scans */}
                <div className="qr-recent-container">
                    <h3 className="qr-recent-title">Recent Check-Ins</h3>
                    <div className="qr-recent-list">
                        {recentScans.map((scan, index) => (
                            <div className="qr-recent-item" key={index}>
                                <div className="qr-recent-info">
                                    <div className="qr-recent-name">{scan.name}</div>
                                    <div className="qr-recent-reg">{scan.regNo}</div>
                                </div>
                                <div className="qr-recent-time">
                                    <FiClock /> {scan.timestamp}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals & Overlays based on scan status */}
            {scanStatus !== 'idle' && (
                <div className="qr-modal-overlay">

                    {scanStatus === 'success' && (
                        <div className="qr-modal success">
                            <div className="qr-modal-icon pulse"><FiCheckCircle /></div>
                            <h2>Scan Successful</h2>
                            <div className="qr-attendee-card">
                                <div className="qr-ac-row"><span className="qr-ac-label">Name:</span> <span className="qr-ac-val">{scannedData?.name}</span></div>
                                <div className="qr-ac-row"><span className="qr-ac-label">Reg No:</span> <span className="qr-ac-val">{scannedData?.regNo}</span></div>
                                <div className="qr-ac-row"><span className="qr-ac-label">Event:</span> <span className="qr-ac-val">{scannedData?.eventName}</span></div>
                                <div className="qr-ac-row"><span className="qr-ac-label">Time:</span> <span className="qr-ac-val">{scannedData?.timestamp}</span></div>
                            </div>
                            <div className="qr-modal-actions">
                                <button className="qr-btn-secondary" onClick={resetScanner}>Cancel</button>
                                <button className="qr-btn-primary" onClick={confirmCheckIn}>Confirm Check-In</button>
                            </div>
                        </div>
                    )}

                    {scanStatus === 'duplicate' && (
                        <div className="qr-modal duplicate">
                            <div className="qr-modal-icon shake"><FiXCircle /></div>
                            <h2>Wait, Already Scanned!</h2>
                            <p className="qr-modal-msg">This pass was already checked in at 09:45 AM.</p>
                            <button className="qr-btn-primary full-width" onClick={resetScanner}>Scan Next</button>
                        </div>
                    )}

                    {scanStatus === 'invalid' && (
                        <div className="qr-modal invalid">
                            <div className="qr-modal-icon shake"><FiXCircle /></div>
                            <h2>Invalid Pass</h2>
                            <p className="qr-modal-msg">This QR code does not belong to this event or is malformed.</p>
                            <button className="qr-btn-secondary full-width" onClick={resetScanner}>Try Again</button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default QRScanner;
