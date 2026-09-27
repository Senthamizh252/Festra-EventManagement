import React, { useState, useEffect, useCallback } from 'react';
import './EventGalleryWall.css';

const DEFAULT_PHOTOS = [
  { 
    id: 1, 
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', 
    category: 'Keynote Sessions', 
    credit: 'Tech Club', 
    likes: 124, 
    caption: 'Opening keynote by industry leaders.' 
  },
  { 
    id: 2, 
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', 
    category: 'Hackathon Floor', 
    credit: 'DevSoc', 
    likes: 89, 
    caption: 'Teams brainstorming ideas at 2 AM.' 
  },
  { 
    id: 3, 
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', 
    category: 'Cultural Night', 
    credit: 'Arts Comm', 
    likes: 256, 
    caption: 'Spectacular dance performance.' 
  },
  { 
    id: 4, 
    url: 'https://images.unsplash.com/photo-1523580494112-071d16940a45?auto=format&fit=crop&w=800&q=80', 
    category: 'Awards Ceremony', 
    credit: 'Media Cell', 
    likes: 178, 
    caption: 'Celebrating the winners of this year.' 
  },
  { 
    id: 5, 
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80', 
    category: 'Keynote Sessions', 
    credit: 'Tech Club', 
    likes: 145, 
    caption: 'Deep dive into AI trends.' 
  },
  { 
    id: 6, 
    url: 'https://images.unsplash.com/photo-1559223607-b4d05dbca4a0?auto=format&fit=crop&w=800&q=80', 
    category: 'Hackathon Floor', 
    credit: 'DevSoc', 
    likes: 112, 
    caption: 'Final presentations begin.' 
  }
];

const CATEGORIES = ["All Moments", "Keynote Sessions", "Hackathon Floor", "Awards Ceremony", "Cultural Night"];

const EventGalleryWall = ({ photos = DEFAULT_PHOTOS }) => {
  const [activeFilter, setActiveFilter] = useState("All Moments");
  const [photoData, setPhotoData] = useState(photos);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredPhotos = activeFilter === "All Moments" 
    ? photoData 
    : photoData.filter(p => p.category === activeFilter);

  const handleLike = (e, id) => {
    e.stopPropagation();
    setPhotoData(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1, liked: true } : p));
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredPhotos.length - 1) {
      setLightboxIndex(prev => prev + 1);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback((e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(prev => prev - 1);
    }
  }, [lightboxIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  return (
    <section className="gallery-wall-container">
      {/* Header & Controls */}
      <header className="gallery-header">
        <div className="header-text">
          <h2>Event Moments & Gallery Wall</h2>
          <p>Explore high-resolution captures from workshops, keynotes, and ceremonies</p>
        </div>
        <button className="upload-btn">Upload Your Photo</button>
      </header>

      {/* Filter Pills */}
      <div className="filter-pills">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Masonry / Image Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="gallery-grid">
          {filteredPhotos.map((photo, index) => (
            <div key={photo.id} className="photo-card" onClick={() => openLightbox(index)}>
              <div className="photo-wrapper">
                <img src={photo.url} alt={photo.caption} loading="lazy" />
                <span className="category-badge">{photo.category}</span>
              </div>
              <div className="photo-details">
                <div className="credit-tag">📸 {photo.credit}</div>
                <button 
                  className={`like-btn ${photo.liked ? 'liked' : ''}`}
                  onClick={(e) => handleLike(e, photo.id)}
                >
                  {photo.liked ? '❤️' : '🤍'} {photo.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No photos found for "{activeFilter}". Be the first to upload one!</p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            {lightboxIndex > 0 && (
              <button className="nav-arrow prev" onClick={prevPhoto}>&#10094;</button>
            )}
            
            <div className="lightbox-image-container">
              <img 
                src={filteredPhotos[lightboxIndex].url} 
                alt={filteredPhotos[lightboxIndex].caption} 
                className="lightbox-image"
              />
              <div className="lightbox-footer">
                <div className="lightbox-info">
                  <p className="lightbox-caption">{filteredPhotos[lightboxIndex].caption}</p>
                  <p className="lightbox-credit">By {filteredPhotos[lightboxIndex].credit}</p>
                </div>
                <a 
                  href={filteredPhotos[lightboxIndex].url} 
                  download 
                  target="_blank" 
                  rel="noreferrer"
                  className="download-btn"
                >
                  Download Original (High Res)
                </a>
              </div>
            </div>

            {lightboxIndex < filteredPhotos.length - 1 && (
              <button className="nav-arrow next" onClick={nextPhoto}>&#10095;</button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default EventGalleryWall;
