import React, { useState } from 'react';
import './FeedbackAnalyticsCard.css';

const DEFAULT_FEEDBACK = {
  averageScore: 4.8,
  totalReviews: 142,
  recommendationPercentage: 94,
  distribution: {
    5: 102,
    4: 28,
    3: 8,
    2: 3,
    1: 1
  },
  dimensions: [
    { name: "Content & Speaker Quality", score: 4.9 },
    { name: "Venue & Facilities", score: 4.6 },
    { name: "Organization & Schedule Adherence", score: 4.7 }
  ],
  quotes: [
    { id: 1, text: "The keynote speaker was incredibly inspiring. I learned so much!", sentiment: "Positive", type: "Top Praises" },
    { id: 2, text: "Great event, but the WiFi in Hall B was a bit spotty. Hard to follow along with the interactive poll.", sentiment: "Constructive Suggestion", type: "Areas to Improve" },
    { id: 3, text: "Loved the networking sessions, very well organized and engaging.", sentiment: "Positive", type: "Top Praises" },
    { id: 4, text: "Would have loved longer Q&A segments after technical talks. They felt rushed.", sentiment: "Constructive Suggestion", type: "Areas to Improve" },
    { id: 5, text: "Best hackathon I've attended this year! The mentors were super helpful.", sentiment: "Positive", type: "Top Praises" }
  ]
};

const FeedbackAnalyticsCard = ({ feedbackSummary = DEFAULT_FEEDBACK }) => {
  const [activeFilter, setActiveFilter] = useState("All Quotes");

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="star full">★</span>)}
        {hasHalfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="star empty">☆</span>)}
      </div>
    );
  };

  const getPercentage = (count) => ((count / feedbackSummary.totalReviews) * 100).toFixed(1);

  const filteredQuotes = feedbackSummary.quotes.filter(q => {
    if (activeFilter === "All Quotes") return true;
    return q.type === activeFilter;
  });

  return (
    <div className="feedback-analytics-container">
      <header className="feedback-header">
        <div className="header-titles">
          <h2>Attendee Feedback & Satisfaction Analytics</h2>
          <p>Aggregated post-event survey data and participant sentiment breakdown</p>
        </div>
        <button className="export-csv-btn">
          <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Feedback CSV
        </button>
      </header>

      <div className="feedback-content-grid">
        {/* Left Column: Hero & Breakdowns */}
        <div className="analytics-left">
          
          <div className="hero-score-block">
            <div className="hero-score-left">
              <div className="big-score-wrapper">
                <span className="big-score">{feedbackSummary.averageScore.toFixed(1)}</span>
                <span className="max-score">/ 5.0</span>
              </div>
              <div className="stars-wrapper">
                {renderStars(feedbackSummary.averageScore)}
              </div>
              <span className="review-count">Based on {feedbackSummary.totalReviews} verified attendee submissions</span>
            </div>
            <div className="hero-score-right">
              <div className="recommendation-pill">
                <span className="fire-emoji">🔥</span> {feedbackSummary.recommendationPercentage}% Would Attend Again
              </div>
            </div>
          </div>

          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="dist-row">
                <span className="dist-label">{star} Stars</span>
                <div className="dist-bar-container">
                  <div 
                    className="dist-bar-fill" 
                    style={{ '--target-width': `${getPercentage(feedbackSummary.distribution[star])}%` }}
                  ></div>
                </div>
                <span className="dist-count">
                  {feedbackSummary.distribution[star]} 
                  <span className="dist-percent">({getPercentage(feedbackSummary.distribution[star])}%)</span>
                </span>
              </div>
            ))}
          </div>

          <div className="categorical-dimensions">
            <h3 className="section-title">Category Performance</h3>
            <div className="dimensions-grid">
              {feedbackSummary.dimensions.map(dim => (
                <div key={dim.name} className="dim-row">
                  <div className="dim-info">
                    <span className="dim-name">{dim.name}</span>
                    <span className="dim-score">{dim.score.toFixed(1)}/5.0</span>
                  </div>
                  <div className="dim-bar-container">
                    <div 
                      className="dim-bar-fill" 
                      style={{ '--target-width': `${(dim.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Qualitative Stream */}
        <div className="analytics-right">
          <div className="stream-header">
            <h3 className="section-title">Qualitative Highlights</h3>
            <div className="quote-filters">
              {["All Quotes", "Top Praises", "Areas to Improve"].map(filter => (
                <button 
                  key={filter} 
                  className={`quote-filter-btn ${activeFilter === filter ? 'active' : ''}`} 
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="quotes-stream">
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map(quote => (
                <div key={quote.id} className="quote-card">
                  <p className="quote-text">"{quote.text}"</p>
                  <span className={`sentiment-tag ${quote.sentiment === 'Positive' ? 'positive' : 'constructive'}`}>
                    {quote.sentiment}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-quotes">
                <p>No feedback available for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalyticsCard;
