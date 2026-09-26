import React, { useState } from 'react';
import './LivePollWidget.css';

// SVG Icons
const Icons = {
  Check: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Lock: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Refresh: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Users: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const DEFAULT_POLL_DATA = {
  id: 'poll_1',
  question: 'Which tech track are you most excited to build in during the hackathon?',
  options: [
    { id: 'opt_1', text: 'Generative AI & LLMs', initialVotes: 64 },
    { id: 'opt_2', text: 'Web3 & Decentralized Tech', initialVotes: 21 },
    { id: 'opt_3', text: 'IoT & Embedded Robotics', initialVotes: 15 },
    { id: 'opt_4', text: 'Cloud Native Microservices', initialVotes: 48 }
  ]
};

const LivePollWidget = ({ pollData = DEFAULT_POLL_DATA }) => {
  // Setup local mock votes dictionary
  const initialVotes = {};
  pollData.options.forEach(opt => {
    initialVotes[opt.id] = opt.initialVotes;
  });

  // State
  const [votes, setVotes] = useState(initialVotes);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isPollActive, setIsPollActive] = useState(true);

  // Computed Values
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  
  const getPercentage = (optionVotes) => {
    if (totalVotes === 0) return 0;
    return Math.round((optionVotes / totalVotes) * 100);
  };

  // Find max votes for highlighting winner if poll ended
  const maxVotes = Math.max(...Object.values(votes));

  // Handlers
  const handleSelect = (id) => {
    if (!isPollActive || hasVoted) return;
    setSelectedOptionId(id);
  };

  const handleSubmitVote = () => {
    if (!selectedOptionId || hasVoted || !isPollActive) return;
    
    // Increment the selected option's votes
    setVotes(prev => ({
      ...prev,
      [selectedOptionId]: prev[selectedOptionId] + 1
    }));
    
    setHasVoted(true);
  };

  const handleResetPoll = () => {
    setVotes(initialVotes);
    setSelectedOptionId(null);
    setHasVoted(false);
    setIsPollActive(true);
  };

  const handleEndPoll = () => {
    setIsPollActive(false);
    // Auto-reveal results if ended by organizer
    if (!hasVoted) setHasVoted(true);
  };

  return (
    <div className="lpw-container">
      {/* Header */}
      <div className="lpw-header">
        <div className="lpw-header-top">
          <div>
            <h2 className="lpw-title">Live Audience Pulse & Polls</h2>
            <p className="lpw-subtitle">Cast your vote and view real-time audience distributions</p>
          </div>
          
          <div className="lpw-status-badges">
            {isPollActive ? (
              <div className="lpw-live-badge">
                <div className="lpw-live-indicator"></div>
                Live Poll Active
              </div>
            ) : (
              <div className="lpw-locked-badge">
                <Icons.Lock />
                Poll Closed
              </div>
            )}
            
            <div className="lpw-vote-count">
              <Icons.Users /> {totalVotes} Votes Cast
            </div>
          </div>
        </div>
      </div>

      {/* Poll Question */}
      <div className="lpw-question">
        {pollData.question}
      </div>

      {/* Options List */}
      <div className="lpw-options-list">
        {pollData.options.map(option => {
          const isSelected = selectedOptionId === option.id;
          const optionVotes = votes[option.id];
          const pct = getPercentage(optionVotes);
          const isWinner = !isPollActive && optionVotes === maxVotes;

          // View 1: Results (User has voted or poll ended)
          if (hasVoted || !isPollActive) {
            return (
              <div key={option.id} className={`lpw-result-row ${isWinner ? 'is-winner' : ''}`}>
                <div 
                  className="lpw-result-bar" 
                  style={{ '--target-width': `${pct}%` }}
                ></div>
                
                <div className="lpw-result-content">
                  {isSelected && (
                    <div className="lpw-user-choice-badge" title="Your Vote">
                      <Icons.Check />
                    </div>
                  )}
                  <span>{option.text}</span>
                </div>
                
                <div className="lpw-result-pct">
                  {pct}%
                </div>
              </div>
            );
          }

          // View 2: Pre-Vote Options
          return (
            <div 
              key={option.id} 
              className={`lpw-option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(option.id)}
            >
              <div className="lpw-radio-circle">
                <div className="lpw-radio-inner"></div>
              </div>
              <span className="lpw-option-text">{option.text}</span>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="lpw-actions">
        {isPollActive && !hasVoted && (
          <button 
            className="lpw-submit-btn" 
            disabled={!selectedOptionId}
            onClick={handleSubmitVote}
          >
            Submit Vote
          </button>
        )}

        {/* Organizer Controls */}
        <div className="lpw-organizer-ribbon">
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginRight: 'auto', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Organizer Controls
          </span>
          <button className="lpw-org-btn" onClick={handleResetPoll} title="Reset to initial data">
            <Icons.Refresh /> Reset Poll
          </button>
          {isPollActive && (
            <button className="lpw-org-btn lock-btn" onClick={handleEndPoll}>
              <Icons.Lock /> End Voting & Lock Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePollWidget;
