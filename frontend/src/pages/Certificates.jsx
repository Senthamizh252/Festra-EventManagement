import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticipantLayout from '../layouts/ParticipantLayout';
import CertificateCard from '../components/CertificateCard';
import './Certificates.css';
import { Award } from 'lucide-react';

export default function Certificates() {
    const navigate = useNavigate();

    const mockCertificates = [
        {
            id: 1,
            eventName: 'AI & Future Tech Summit',
            organizer: 'Tech Club',
            issueDate: '15 Sept 2026',
            certificateImageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 2,
            eventName: 'React Masterclass Workshop',
            organizer: 'Web Dev Club',
            issueDate: '02 Nov 2026',
            certificateImageUrl: 'https://images.unsplash.com/photo-1598012891964-b040a455a163?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 3,
            eventName: 'Festra Dance Night',
            organizer: 'Arts Society',
            issueDate: '01 Sept 2026',
            certificateImageUrl: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 4,
            eventName: 'CodeBrew 48Hrs Hackathon',
            organizer: 'Innovation Council',
            issueDate: '10 Aug 2026',
            certificateImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80'
        }
    ];

    return (
        <ParticipantLayout>
            <div className="certificates-container">
                <header className="certificates-header">
                    <h1 className="certificates-title">My Certificates</h1>
                    <p className="certificates-subtitle">Your verified event attendance and achievements</p>
                </header>

                {mockCertificates.length > 0 ? (
                    <div className="certificates-grid">
                        {mockCertificates.map(cert => (
                            <CertificateCard key={cert.id} certificate={cert} />
                        ))}
                    </div>
                ) : (
                    <div className="certificates-empty">
                        <div className="certificates-empty-icon">
                            <Award className="w-10 h-10 text-[#8b5cf6]" />
                        </div>
                        <h3>No Certificates Yet</h3>
                        <p>You haven't earned any certificates yet. Attend an event to get your first one!</p>
                        <button
                            className="browse-events-btn"
                            onClick={() => navigate('/events')}
                        >
                            Browse Events
                        </button>
                    </div>
                )}
            </div>
        </ParticipantLayout>
    );
}
