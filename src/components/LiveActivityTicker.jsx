import React, { useState, useEffect } from 'react';
import './LiveActivityTicker.css';

const Icons = {
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Award: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  File: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Pause: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ),
  MapPin: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Activity: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  )
};

const DEFAULT_MOCK_ACTIVITIES = [
  { id: 101, type: 'check-in', text: 'Rahul Sharma verified at Gate 1', time: '12s ago', location: 'Gate 1', initials: 'RS' },
  { id: 102, type: 'team', text: 'Team \'ByteBrawlers\' finalized 4 members', time: '1m ago', location: 'Innovation Hub', initials: 'BB' },
  { id: 103, type: 'certificate', text: 'Priya K. claimed Merit Certificate', time: '3m ago', location: 'Main Stage', initials: 'PK' },
  { id: 104, type: 'resource', text: 'Hackathon Starter Kit downloaded', time: '5m ago', location: 'Virtual', initials: 'HS' },
];

const NEW_PING_POOL = [
  { type: 'check-in', text: 'Ananya Gupta verified at Gate 3', location: 'Gate 3', initials: 'AG' },
  { type: 'team', text: 'Team \'CodeCrafters\' joined Hackathon', location: 'Lab 2', initials: 'CC' },
  { type: 'certificate', text: 'Arjun Verma claimed Participation Cert', location: 'Help Desk', initials: 'AV' },
  { type: 'resource', text: 'Event Schedule PDF downloaded', location: 'App', initials: 'ES' },
  { type: 'check-in', text: 'Neha Singh verified at Main Auditorium North', location: 'Main Aud North', initials: 'NS' },
  { type: 'check-in', text: 'Vikram Patel verified at VIP Lounge', location: 'VIP Lounge', initials: 'VP' },
  { type: 'team', text: 'Team \'AI Ninjas\' updated roster', location: 'Workshop Room A', initials: 'AN' },
  { type: 'certificate', text: 'Sneha Rao claimed Excellence Award', location: 'Main Stage', initials: 'SR' }
];

const getTypeConfig = (type) => {
  switch (type) {
    case 'check-in':
      return { icon: <Icons.Check />, colorClass: 'lat-emerald', label: 'Gate Scan' };
    case 'team':
      return { icon: <Icons.Users />, colorClass: 'lat-blue', label: 'Team Formation' };
    case 'certificate':
      return { icon: <Icons.Award />, colorClass: 'lat-purple', label: 'Certificate Claim' };
    case 'resource':
      return { icon: <Icons.File />, colorClass: 'lat-slate', label: 'Resource Download' };
    default:
      return { icon: <Icons.Activity />, colorClass: 'lat-slate', label: 'Activity' };
  }
};

const LiveActivityTicker = ({ initialActivities = DEFAULT_MOCK_ACTIVITIES }) => {
  const [activities, setActivities] = useState(initialActivities);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState('All Activity');
  
  const [stats, setStats] = useState({
    rate: 18,
    peakGate: 'Main Aud North',
    totalOnSite: 482,
    maxCapacity: 600
  });

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomActivity = NEW_PING_POOL[Math.floor(Math.random() * NEW_PING_POOL.length)];
      
      const newActivity = {
        ...randomActivity,
        id: Date.now(),
        time: 'Just now',
        isNew: true
      };

      setActivities(prev => {
        // Simple mock time progression
        const updatedPrev = prev.map(act => {
          if (act.time === 'Just now') return { ...act, time: '4s ago', isNew: false };
          if (act.time === '4s ago') return { ...act, time: '8s ago', isNew: false };
          if (act.time === '8s ago') return { ...act, time: '12s ago', isNew: false };
          if (act.time === '12s ago') return { ...act, time: '16s ago', isNew: false };
          return { ...act, isNew: false };
        });
        
        return [newActivity, ...updatedPrev].slice(0, 50);
      });

      // Simulate live changing stats
      if (Math.random() > 0.6) {
        setStats(prev => ({
          ...prev,
          rate: Math.floor(Math.random() * 6) + 15,
          totalOnSite: Math.min(prev.totalOnSite + (randomActivity.type === 'check-in' ? 1 : 0), prev.maxCapacity)
        }));
      }

    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => setIsPaused(!isPaused);

  const filteredActivities = activities.filter(act => {
    if (filter === 'All Activity') return true;
    if (filter === 'Gate Scans Only') return act.type === 'check-in';
    if (filter === 'Milestones') return act.type === 'certificate' || act.type === 'team';
    return true;
  });

  return (
    <div className="lat-container">
      {/* Header Section */}
      <div className="lat-header-container">
        <div className="lat-header-content">
          <h2 className="lat-title">Live Event Activity &amp; Verification Pulse</h2>
          <p className="lat-subtitle">Real-time gate check-ins, certificate claims, and registration streams</p>
        </div>
        <div className={`lat-status-badge ${isPaused ? 'paused' : 'active'}`}>
          <div className="lat-pulse-dot"></div>
          <span className="lat-status-text">{isPaused ? 'STREAM PAUSED' : 'STREAM CONNECTED'}</span>
        </div>
      </div>

      {/* Velocity Strip / Telemetry */}
      <div className="lat-velocity-strip">
        <div className="lat-telemetry-pill">
          <span className="lat-telemetry-label">Check-in Rate</span>
          <span className="lat-telemetry-value">{stats.rate} scans/min</span>
        </div>
        <div className="lat-telemetry-pill">
          <span className="lat-telemetry-label">Peak Gate</span>
          <span className="lat-telemetry-value">{stats.peakGate}</span>
        </div>
        <div className="lat-telemetry-pill">
          <span className="lat-telemetry-label">Total On-Site</span>
          <span className="lat-telemetry-value">{stats.totalOnSite} / {stats.maxCapacity} Attendees</span>
        </div>
      </div>

      {/* Stream Controls */}
      <div className="lat-stream-controls">
        <button className="lat-pause-toggle" onClick={togglePause} aria-label={isPaused ? "Resume Stream" : "Pause Stream"}>
          {isPaused ? <Icons.Play /> : <Icons.Pause />}
          {isPaused ? 'Resume Stream' : 'Pause Stream'}
        </button>
        <div className="lat-filters">
          {['All Activity', 'Gate Scans Only', 'Milestones'].map(f => (
            <button 
              key={f}
              className={`lat-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stream Feed */}
      <div className="lat-stream-feed">
        {filteredActivities.length === 0 ? (
          <div className="lat-empty-state">No activities matching this filter.</div>
        ) : (
          <div className="lat-activities-list">
            {filteredActivities.map((activity) => {
              const config = getTypeConfig(activity.type);
              
              return (
                <div key={activity.id} className={`lat-activity-card ${activity.isNew ? 'is-new' : ''}`}>
                  <div className={`lat-initials-circle ${config.colorClass}`}>
                    {activity.initials}
                  </div>
                  
                  <div className="lat-activity-content">
                    <div className="lat-activity-meta-top">
                      <span className={`lat-type-badge ${config.colorClass}`}>
                        {config.icon} {config.label}
                      </span>
                      <span className="lat-time">{activity.time}</span>
                    </div>
                    <p className="lat-activity-text">{activity.text}</p>
                    <div className="lat-activity-location">
                      <Icons.MapPin /> {activity.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveActivityTicker;
