import React, { useState } from 'react';
import './LiveQuestions.css';

// Simple Icons
const Icons = {
  UpArrow: ({ filled }) => (
    <svg 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={filled ? 1 : 2} d="M5 15l7-7 7 7" />
    </svg>
  ),
  CheckCircle: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Clock: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  User: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
};

// Fallback Mock Data
const INITIAL_QUESTIONS = [
  {
    id: 1,
    text: "Will the slide deck be available for download after this session?",
    author: "Alex Morgan",
    department: "Computer Science",
    timestamp: "2 mins ago",
    upvotes: 45,
    hasUpvoted: false,
    status: "Answered by Speaker",
    reply: {
      author: "Organizer",
      text: "Yes! All slides and the starter code repository will be uploaded to the Event Resources Hub right after the session concludes."
    }
  },
  {
    id: 2,
    text: "Can you elaborate on how you handled the state synchronization issue in the background workers?",
    author: "Anonymous Attendee",
    department: "",
    timestamp: "5 mins ago",
    upvotes: 32,
    hasUpvoted: true,
    status: "Live Pending",
    reply: null
  },
  {
    id: 3,
    text: "What alternatives did you consider before settling on this specific architecture?",
    author: "Sam Rivera",
    department: "Engineering",
    timestamp: "12 mins ago",
    upvotes: 18,
    hasUpvoted: false,
    status: "Live Pending",
    reply: null
  }
];

const MAX_CHARS = 250;
const TABS = ["Most Upvoted", "Recent", "Answered"];

const LiveQuestions = ({ questions = INITIAL_QUESTIONS }) => {
  const [questionsList, setQuestionsList] = useState(questions);
  const [activeTab, setActiveTab] = useState("Most Upvoted");
  
  // Form State
  const [newQuestionText, setNewQuestionText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Handle typing in textarea
  const handleTextChange = (e) => {
    if (e.target.value.length <= MAX_CHARS) {
      setNewQuestionText(e.target.value);
    }
  };

  // Submit new question
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQuestion = {
      id: Date.now(),
      text: newQuestionText.trim(),
      author: isAnonymous ? "Anonymous Attendee" : "Current User",
      department: isAnonymous ? "" : "Attendee",
      timestamp: "Just now",
      upvotes: 1,
      hasUpvoted: true,
      status: "Live Pending",
      reply: null
    };

    setQuestionsList([newQuestion, ...questionsList]);
    setNewQuestionText("");
    setIsAnonymous(false);
    setActiveTab("Recent"); // Automatically switch to recent to show their post
  };

  // Toggle upvote
  const handleUpvote = (id) => {
    setQuestionsList(questionsList.map(q => {
      if (q.id === id) {
        const isCurrentlyUpvoted = q.hasUpvoted;
        return {
          ...q,
          hasUpvoted: !isCurrentlyUpvoted,
          upvotes: isCurrentlyUpvoted ? q.upvotes - 1 : q.upvotes + 1
        };
      }
      return q;
    }));
  };

  // Filtering & Sorting Logic
  const getFilteredAndSortedQuestions = () => {
    let filtered = [...questionsList];
    
    if (activeTab === "Answered") {
      filtered = filtered.filter(q => q.status === "Answered by Speaker");
    }

    return filtered.sort((a, b) => {
      if (activeTab === "Most Upvoted") {
        return b.upvotes - a.upvotes;
      }
      // For "Recent" and "Answered" fallback to ID-based chronological sorting
      return b.id - a.id; 
    });
  };

  const displayedQuestions = getFilteredAndSortedQuestions();

  return (
    <div className="lq-container">
      {/* Header Area */}
      <div className="lq-header">
        <h2>Live Audience Q&A</h2>
        <p>Ask speakers questions directly or upvote peers' queries</p>
        
        <div className="lq-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`lq-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Ask Question Form */}
      <form className="lq-form" onSubmit={handleSubmit}>
        <textarea
          className="lq-textarea"
          placeholder="Type your question for the speakers or organizers..."
          value={newQuestionText}
          onChange={handleTextChange}
        />
        <div className="lq-form-footer">
          <div className="lq-form-controls">
            <span className={`lq-char-counter ${
              newQuestionText.length >= MAX_CHARS ? 'at-limit' : 
              newQuestionText.length > MAX_CHARS * 0.8 ? 'near-limit' : ''
            }`}>
              {newQuestionText.length} / {MAX_CHARS}
            </span>
            <label className="lq-checkbox-label">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)} 
              />
              Post anonymously
            </label>
          </div>
          <button 
            type="submit" 
            className="lq-submit-btn"
            disabled={!newQuestionText.trim()}
          >
            Submit Question
          </button>
        </div>
      </form>

      {/* Feed */}
      <div className="lq-feed">
        {displayedQuestions.length === 0 ? (
          <div className="lq-empty">
            No questions found in this category. Be the first to ask!
          </div>
        ) : (
          displayedQuestions.map(q => (
            <div key={q.id} className="lq-card">
              {/* Upvote Column */}
              <div className="lq-upvote-col">
                <button 
                  className={`lq-upvote-btn ${q.hasUpvoted ? 'active' : ''}`}
                  onClick={() => handleUpvote(q.id)}
                  aria-label="Upvote question"
                >
                  <Icons.UpArrow filled={q.hasUpvoted} />
                  <span className="lq-upvote-count">{q.upvotes}</span>
                </button>
              </div>

              {/* Content Column */}
              <div className="lq-card-content">
                <div className="lq-card-header">
                  <div className="lq-meta">
                    <Icons.User />
                    <span className="lq-author">{q.author}</span>
                    {q.department && <span className="lq-badge">{q.department}</span>}
                    <span>•</span>
                    <span className="lq-timestamp">{q.timestamp}</span>
                  </div>
                  <div className={`lq-status ${q.status.includes("Answered") ? "answered" : "pending"}`}>
                    {q.status.includes("Answered") ? <Icons.CheckCircle /> : <Icons.Clock />}
                    {q.status}
                  </div>
                </div>
                
                <p className="lq-question-text">{q.text}</p>

                {/* Organizer Reply Block */}
                {q.reply && (
                  <div className="lq-reply">
                    <div className="lq-reply-header">
                      <Icons.CheckCircle />
                      {q.reply.author} Reply
                    </div>
                    <p className="lq-reply-text">{q.reply.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveQuestions;
