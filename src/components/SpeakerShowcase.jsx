import React, { useState, useEffect } from 'react';
import './SpeakerShowcase.css';

const defaultSpeakers = [
  {
    id: 1,
    name: 'Dr. Elena Rostova',
    title: 'Principal AI Researcher @ SynthCorp',
    track: 'Keynote Speaker',
    avatarUrl: '', // leave empty to show initials fallback
    talkTitle: 'The Future of General Artificial Intelligence',
    bio: 'Dr. Rostova has spent the last decade working on highly scalable distributed systems and AI architectures. Her keynote explores the pathways to AGI and the ethical implications for the next decade of software engineering. She holds a PhD in Machine Learning from MIT and has published over 40 papers in top-tier conferences.',
    socials: { linkedin: '#', twitter: '#', github: '#' }
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Sr. Cloud Architect @ TechForge',
    track: 'Cloud Security',
    avatarUrl: '',
    talkTitle: 'Zero Trust in Cloud Native Environments',
    bio: 'Marcus leads the cloud infrastructure team at TechForge. He will deep dive into implementing Zero Trust networks using Kubernetes and Envoy proxy, providing actionable insights for engineering leads building highly secure platforms.',
    socials: { github: '#', linkedin: '#' }
  },
  {
    id: 3,
    name: 'Aisha Rahman',
    title: 'VP of Product @ DevFlow',
    track: 'Generative AI',
    avatarUrl: '',
    talkTitle: 'Integrating Gen-AI into Product Workflows',
    bio: 'Aisha brings a unique perspective on bridging the gap between product management and generative AI technologies. Join her panel to learn about building AI-first features that users actually love, scaling them, and maintaining data privacy.',
    socials: { twitter: '#', website: '#' }
  }
];

const SpeakerShowcase = ({ speakers = defaultSpeakers }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedSpeaker) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Re-enable scrolling on the body
      document.body.style.overflow = 'auto';
    };
  }, [selectedSpeaker]);

  const openModal = (speaker) => setSelectedSpeaker(speaker);
  const closeModal = () => setSelectedSpeaker(null);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <section className="speaker-showcase-section">
      <div className="speaker-showcase-container">
        <div className="speaker-header">
          <h2>Featured Speakers & Panelists</h2>
          <p>Learn from industry experts, tech leads, and academic leaders</p>
        </div>

        <div className="speaker-grid">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="speaker-card">
              <div className="speaker-card-header">
                {speaker.avatarUrl ? (
                  <img src={speaker.avatarUrl} alt={speaker.name} className="speaker-avatar" />
                ) : (
                  <div className="speaker-avatar-fallback">
                    {getInitials(speaker.name)}
                  </div>
                )}
                <span className="speaker-track-badge">{speaker.track}</span>
              </div>
              
              <div className="speaker-card-body">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-title">{speaker.title}</p>
                <div className="speaker-snippet">
                  <strong>Talk: </strong> {speaker.talkTitle}
                </div>
              </div>
              
              <div className="speaker-card-footer">
                <button 
                  className="btn-view-bio" 
                  onClick={() => openModal(speaker)}
                  type="button"
                >
                  View Bio & Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Detail Modal */}
      {selectedSpeaker && (
        <div className="speaker-modal-overlay" onClick={closeModal}>
          <div className="speaker-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="btn-close-modal" 
              onClick={closeModal} 
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <div className="modal-header-profile">
              {selectedSpeaker.avatarUrl ? (
                <img src={selectedSpeaker.avatarUrl} alt={selectedSpeaker.name} className="modal-avatar" />
              ) : (
                <div className="modal-avatar-fallback">
                  {getInitials(selectedSpeaker.name)}
                </div>
              )}
              <div className="modal-profile-info">
                <h3>{selectedSpeaker.name}</h3>
                <p className="modal-title">{selectedSpeaker.title}</p>
                <span className="modal-track">{selectedSpeaker.track}</span>
              </div>
            </div>
            
            <div className="modal-body">
              <h4>Talk: {selectedSpeaker.talkTitle}</h4>
              <p>{selectedSpeaker.bio}</p>
            </div>

            <div className="modal-footer">
              <div className="social-links">
                {selectedSpeaker.socials?.linkedin && (
                  <a href={selectedSpeaker.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                )}
                {selectedSpeaker.socials?.github && (
                  <a href={selectedSpeaker.socials.github} target="_blank" rel="noreferrer">GitHub</a>
                )}
                {selectedSpeaker.socials?.twitter && (
                  <a href={selectedSpeaker.socials.twitter} target="_blank" rel="noreferrer">Twitter</a>
                )}
                {selectedSpeaker.socials?.website && (
                  <a href={selectedSpeaker.socials.website} target="_blank" rel="noreferrer">Website</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpeakerShowcase;
