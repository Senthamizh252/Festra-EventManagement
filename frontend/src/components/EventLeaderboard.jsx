import React, { useState } from 'react';
import { Trophy, Medal, Award, CheckCircle2, ListFilter, Activity } from 'lucide-react';
import './EventLeaderboard.css';

const DEFAULT_STANDINGS = [
    { id: 1, rank: 1, teamName: 'Cyber Ninjas', project: 'AI Traffic Analyzer', score: 98.5, dept: 'Computer Science', prize: 'Cash Prize + Certificate' },
    { id: 2, rank: 2, teamName: 'Circuit Breakers', project: 'Smart IoT Grid', score: 95.0, dept: 'Electronics', prize: 'Merit Trophy + Certificate' },
    { id: 3, rank: 3, teamName: 'Mech Mavens', project: 'Solar Drone', score: 91.2, dept: 'Mechanical Engineering', prize: 'Certificate of Merit' },
    { id: 4, rank: 4, teamName: 'Code Black', project: 'Blockchain Ledger', score: 88.5, dept: 'Information Tech', prize: 'Certificate' },
    { id: 5, rank: 5, teamName: 'Build Bros', project: 'Modular Housing', score: 85.0, dept: 'Civil Engineering', prize: 'Certificate' },
    { id: 6, rank: 6, teamName: 'Byte Me', project: 'Data Visualization JS', score: 82.5, dept: 'Computer Science', prize: 'Certificate' }
];

const FILTERS = ['All Teams', 'Round 1', 'Final Round'];

const EventLeaderboard = ({ standings = DEFAULT_STANDINGS, isFinal = false }) => {
    const [activeFilter, setActiveFilter] = useState('All Teams');

    // Defensive fallback in case array is magically empty
    const hasStandings = standings && standings.length > 0;

    // Split standings structurally
    const topThree = hasStandings ? standings.slice(0, 3) : [];
    const remainingStandings = hasStandings ? standings.slice(3) : [];

    // Safely index Top 3 explicitly
    const rank1 = topThree.find(t => t.rank === 1);
    const rank2 = topThree.find(t => t.rank === 2);
    const rank3 = topThree.find(t => t.rank === 3);

    return (
        <div className="lb-container">

            {/* Header and Status Badges */}
            <div className="lb-header">
                <div className="lb-header-top">
                    <h2 className="lb-title">
                        <Trophy size={24} color="#f59e0b" /> Competition Leaderboard & Results
                    </h2>

                    {isFinal ? (
                        <div className="lb-status-badge lb-status-final">
                            <CheckCircle2 size={14} /> Official Final Results
                        </div>
                    ) : (
                        <div className="lb-status-badge lb-status-live">
                            <div className="lb-status-dot"></div>
                            Live Scoring
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="lb-filters">
                    <ListFilter size={16} color="#9ca3af" style={{ margin: '0.2rem 0.5rem 0 0' }} />
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            className={`lb-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {hasStandings ? (
                <>
                    {/* Top 3 Visual Podium Section */}
                    <div className="lb-podium-section">

                        {/* Rank 2 (Left) */}
                        {rank2 && (
                            <div className="lb-podium-item lb-podium-2nd">
                                <div className="lb-podium-card">
                                    <div className="lb-avatar-wrapper silver">
                                        <Medal size={32} />
                                    </div>
                                    <h3 className="lb-podium-team">{rank2.teamName}</h3>
                                    <p className="lb-podium-project">{rank2.project}</p>
                                    <div className="lb-podium-score">{rank2.score} pts</div>
                                </div>
                                <div className="lb-podium-stand lb-stand-2">2nd</div>
                            </div>
                        )}

                        {/* Rank 1 (Center) */}
                        {rank1 && (
                            <div className="lb-podium-item lb-podium-1st">
                                <div className="lb-podium-card">
                                    <div className="lb-avatar-wrapper gold">
                                        <Award size={36} />
                                    </div>
                                    <h3 className="lb-podium-team">{rank1.teamName}</h3>
                                    <p className="lb-podium-project">{rank1.project}</p>
                                    <div className="lb-podium-score">{rank1.score} pts</div>
                                </div>
                                <div className="lb-podium-stand lb-stand-1">1st</div>
                            </div>
                        )}

                        {/* Rank 3 (Right) */}
                        {rank3 && (
                            <div className="lb-podium-item lb-podium-3rd">
                                <div className="lb-podium-card">
                                    <div className="lb-avatar-wrapper bronze">
                                        <Medal size={28} />
                                    </div>
                                    <h3 className="lb-podium-team">{rank3.teamName}</h3>
                                    <p className="lb-podium-project">{rank3.project}</p>
                                    <div className="lb-podium-score">{rank3.score} pts</div>
                                </div>
                                <div className="lb-podium-stand lb-stand-3">3rd</div>
                            </div>
                        )}

                    </div>

                    {/* Remaining Ranked Standings Data */}
                    {remainingStandings.length > 0 && (
                        <div className="lb-list-section">
                            <h4 className="lb-list-header">Complete Standings</h4>

                            {remainingStandings.map(team => (
                                <div className="lb-row" key={team.id}>

                                    <div className="lb-row-rank">
                                        #{team.rank}
                                    </div>

                                    <div className="lb-row-details">
                                        <h5 className="lb-row-team">{team.teamName}</h5>
                                        <p className="lb-row-meta">
                                            {team.project} • {team.dept}
                                        </p>
                                    </div>

                                    {team.prize && (
                                        <div className="lb-row-prize">
                                            {team.prize}
                                        </div>
                                    )}

                                    <div className="lb-row-score">
                                        {team.score}
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                /* Empty State */
                <div className="lb-empty">
                    <div className="lb-empty-icon">
                        <Activity size={32} />
                    </div>
                    <p className="lb-empty-text">Scoring is currently underway. Results will be published soon!</p>
                </div>
            )}

        </div>
    );
};

export default EventLeaderboard;
