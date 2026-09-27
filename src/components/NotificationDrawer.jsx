import React, { useState, useEffect } from 'react';
import './NotificationDrawer.css';

const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    type: 'registration',
    title: 'Ticket Confirmed',
    summary: 'Your pass for "AI in Healthcare" workshop is ready.',
    timestamp: '5m ago',
    unread: true,
    action: { label: 'View Pass', url: '#' }
  },
  {
    id: 2,
    type: 'schedule',
    title: 'Schedule Alert',
    summary: 'Keynote Delayed by 15 mins. Please stay seated.',
    timestamp: '30m ago',
    unread: true
  },
  {
    id: 3,
    type: 'certificate',
    title: 'Certificate Ready',
    summary: 'Your participation certificate is available for download.',
    timestamp: '2h ago',
    unread: false,
    action: { label: 'Download PDF', url: '#' }
  },
  {
    id: 4,
    type: 'general',
    title: 'Lunch Service Open',
    summary: 'Lunch service is now open at Dining Hall B.',
    timestamp: '3h ago',
    unread: false,
    action: { label: 'Open Map', url: '#' }
  }
];

const NotificationDrawer = ({
  isOpen = false,
  onClose,
  notifications: propNotifications,
  onMarkAsRead
}) => {
  const [internalNotifications, setInternalNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isClosing, setIsClosing] = useState(false);

  // Sync props to internal state if provided
  useEffect(() => {
    if (propNotifications) {
      setInternalNotifications(propNotifications);
    }
  }, [propNotifications]);

  const notifications = propNotifications || internalNotifications;
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      if (onClose) onClose();
    }, 300); // Matches CSS animation duration
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleItemClick = (id) => {
    if (onMarkAsRead) {
      onMarkAsRead(id);
    } else {
      setInternalNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, unread: false } : n)
      );
    }
  };

  const markAllAsRead = () => {
    if (onMarkAsRead) {
      notifications.forEach(n => {
        if (n.unread) onMarkAsRead(n.id);
      });
    } else {
      setInternalNotifications(prev =>
        prev.map(n => ({ ...n, unread: false }))
      );
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'Unread') return n.unread;
    if (activeFilter === 'Alerts') return n.type === 'schedule';
    return true; // 'All'
  });

  const getTypeStyles = (type) => {
    switch (type) {
      case 'registration':
        return { icon: '🎟️', colorClass: 'badge-emerald' };
      case 'schedule':
        return { icon: '⚠️', colorClass: 'badge-amber' };
      case 'certificate':
        return { icon: '🎓', colorClass: 'badge-purple' };
      case 'general':
      default:
        return { icon: '📢', colorClass: 'badge-blue' };
    }
  };

  return (
    <div className="drawer-overlay" onClick={handleClose}>
      <div 
        className={`drawer-container ${isClosing ? 'slide-out' : 'slide-in'}`}
        onClick={e => e.stopPropagation()}
      >
        <header className="drawer-header">
          <div className="drawer-header-title">
            <h3>Notifications</h3>
            {unreadCount > 0 && <span className="unread-pill">{unreadCount} New</span>}
          </div>
          <div className="drawer-header-actions">
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
            <button className="close-drawer-btn" onClick={handleClose} aria-label="Close drawer">
              &times;
            </button>
          </div>
        </header>

        <div className="drawer-filters">
          {['All', 'Unread', 'Alerts'].map(filter => (
            <button
              key={filter}
              className={`drawer-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="drawer-content">
          {filteredNotifications.length > 0 ? (
            <ul className="notification-list">
              {filteredNotifications.map(notification => {
                const { icon, colorClass } = getTypeStyles(notification.type);
                return (
                  <li 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                    onClick={() => handleItemClick(notification.id)}
                  >
                    <div className="notification-icon-wrapper">
                      <span className={`notification-icon ${colorClass}`}>{icon}</span>
                      {notification.unread && <span className="unread-dot"></span>}
                    </div>
                    <div className="notification-details">
                      <div className="notification-top">
                        <h4>{notification.title}</h4>
                        <span className="notification-time">{notification.timestamp}</span>
                      </div>
                      <p className="notification-summary">{notification.summary}</p>
                      {notification.action && (
                        <a 
                          href={notification.action.url} 
                          className="notification-action-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {notification.action.label}
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="drawer-empty-state">
              <div className="empty-icon">✨</div>
              <p>All caught up! No new notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;
