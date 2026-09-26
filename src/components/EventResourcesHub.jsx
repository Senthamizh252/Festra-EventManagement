import React, { useState } from 'react';
import './EventResourcesHub.css';

// SVG Icons
const Icons = {
  Download: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  ExternalLink: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Lock: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Globe: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  User: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Calendar: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  FileEmpty: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
};

// Fallback Mock Data
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Deep Learning Workshop Starter Code",
    type: "GITHUB",
    category: "Code & Repos",
    author: "Prof. Raghavan",
    size: "N/A",
    uploadDate: "Oct 24, 2026",
    access: "Public Access",
    url: "#"
  },
  {
    id: 2,
    title: "Session Keynote Presentation",
    type: "SLIDES",
    category: "Presentations",
    author: "Dr. Sarah Mitchell",
    size: "24.5 MB",
    uploadDate: "Oct 25, 2026",
    access: "Registered Attendees Only",
    url: "#"
  },
  {
    id: 3,
    title: "Dataset CSV (50MB)",
    type: "ZIP",
    category: "Datasets & Docs",
    author: "Data Science Club",
    size: "50.0 MB",
    uploadDate: "Oct 26, 2026",
    access: "Registered Attendees Only",
    url: "#"
  },
  {
    id: 4,
    title: "Workshop Guidelines & Syllabus",
    type: "PDF",
    category: "Datasets & Docs",
    author: "Festra Organizers",
    size: "2.1 MB",
    uploadDate: "Oct 20, 2026",
    access: "Public Access",
    url: "#"
  }
];

const FILTERS = ["All", "Presentations", "Code & Repos", "Datasets & Docs"];

const EventResourcesHub = ({ resources = MOCK_RESOURCES }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResources = resources.filter((res) =>
    activeFilter === "All" ? true : res.category === activeFilter
  );

  return (
    <div className="erh-container">
      {/* Header Area */}
      <div className="erh-header">
        <div className="erh-header-text">
          <h2>Event Resources & Workshop Digital Kit</h2>
          <p>Handouts, code repositories, slide decks, and prerequisite assets</p>
        </div>
        <div className="erh-counter-badge">
          <Icons.Download />
          <span>{resources.length} Resources Available</span>
        </div>
      </div>

      {/* Filter Pills */}
      {resources.length > 0 && (
        <div className="erh-filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`erh-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Resource List */}
      <div className="erh-list">
        {resources.length === 0 ? (
          <div className="erh-empty-state">
            <Icons.FileEmpty />
            <h3>No resources published yet</h3>
            <p>Check back during or after the session!</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="erh-empty-state">
            <Icons.FileEmpty />
            <h3>No matching resources</h3>
            <p>Try selecting a different category filter.</p>
          </div>
        ) : (
          filteredResources.map((res) => (
            <div key={res.id} className="erh-card">
              <div className="erh-card-main">
                <div className={`erh-type-badge type-${res.type.toLowerCase()}`}>
                  {res.type}
                </div>
                
                <div className="erh-card-details">
                  <h4 className="erh-card-title">{res.title}</h4>
                  
                  <div className="erh-card-meta">
                    <span className="erh-meta-item">
                      <Icons.User />
                      {res.author}
                    </span>
                    <span className="erh-bullet">&bull;</span>
                    <span className="erh-meta-item">
                      <Icons.Calendar />
                      {res.uploadDate}
                    </span>
                    {res.size !== "N/A" && (
                      <>
                        <span className="erh-bullet">&bull;</span>
                        <span className="erh-meta-item">{res.size}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="erh-card-actions">
                <div 
                  className={`erh-access-badge ${
                    res.access.includes("Registered") ? "access-registered" : "access-public"
                  }`}
                >
                  {res.access.includes("Registered") ? <Icons.Lock /> : <Icons.Globe />}
                  {res.access}
                </div>
                
                <a 
                  href={res.url}
                  className="erh-download-btn"
                  onClick={(e) => { e.preventDefault(); alert(`Downloading: ${res.title}`); }}
                >
                  {res.type === "GITHUB" ? <Icons.ExternalLink /> : <Icons.Download />}
                  {res.type === "GITHUB" ? "Open" : "Download"}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventResourcesHub;
