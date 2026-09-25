import React from 'react';
import './EventBadgePass.css';

const defaultAttendee = {
  id: 'FESTRA-2024-88492',
  firstName: 'Jane',
  lastName: 'Doe',
  department: 'Product Design',
  registerNumber: 'REG-90871',
  accessTier: 'VIP', // Options: 'ALL ACCESS', 'VIP', 'GENERAL DELEGATE'
  avatarUrl: '', // Leave empty to show initials fallback
  eventTitle: 'Festra Tech Summit 2024',
  eventDate: 'October 15-17, 2024',
  venueZone: 'Zone A - Main Stage'
};

const EventBadgePass = ({ attendee = {} }) => {
  const data = { ...defaultAttendee, ...attendee };

  const getInitials = (first, last) => {
    return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Placeholder for actual download functionality (e.g. html2canvas/jsPDF)
    alert('Downloading Digital Pass...');
  };

  const tierClassMap = {
    'ALL ACCESS': 'tier-all-access',
    'VIP': 'tier-vip',
    'GENERAL DELEGATE': 'tier-general-delegate'
  };

  const tierClassName = tierClassMap[data.accessTier.toUpperCase()] || 'tier-general-delegate';

  return (
    <div className="event-badge-container">
      {/* Action Buttons - hidden during print */}
      <div className="badge-actions no-print">
        <button className="btn-print" onClick={handlePrint} type="button">
          Print Badge
        </button>
        <button className="btn-download" onClick={handleDownload} type="button">
          Download Digital Pass
        </button>
      </div>

      {/* The Printable Badge Card */}
      <div className="badge-card">
        <div className="badge-header">
          <h2 className="badge-logo">FESTRA</h2>
          <p className="badge-subtitle">OFFICIAL ATTENDEE BADGE</p>
        </div>

        <div className="badge-body">
          <div className="badge-avatar-section">
            {data.avatarUrl ? (
              <img 
                src={data.avatarUrl} 
                alt={`${data.firstName} ${data.lastName}`} 
                className="badge-avatar" 
              />
            ) : (
              <div className="badge-avatar-placeholder">
                {getInitials(data.firstName, data.lastName)}
              </div>
            )}
          </div>

          <div className="badge-user-info">
            <h3 className="badge-name">{data.firstName} {data.lastName}</h3>
            <p className="badge-department">{data.department}</p>
            <p className="badge-reg-number">{data.registerNumber}</p>
          </div>

          <div className={`badge-access-tier ${tierClassName}`}>
            {data.accessTier}
          </div>

          <div className="badge-qr-placeholder">
            <div className="qr-box">
              <span className="qr-text">QR CODE</span>
              <span className="qr-id">{data.id}</span>
            </div>
          </div>
        </div>

        <div className="badge-footer">
          <p className="badge-event-title">{data.eventTitle}</p>
          <p className="badge-event-date">{data.eventDate}</p>
          <p className="badge-venue">{data.venueZone}</p>
        </div>
      </div>
    </div>
  );
};

export default EventBadgePass;
