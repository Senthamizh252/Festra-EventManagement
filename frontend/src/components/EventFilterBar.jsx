import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import './EventFilterBar.css';

const EventFilterBar = ({ onFilterChange }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [dateRange, setDateRange] = useState('All');

    // Trigger callback when filters change
    useEffect(() => {
        onFilterChange({
            search,
            category,
            dateRange
        });
    }, [search, category, dateRange, onFilterChange]);

    const handleClearFilters = () => {
        setSearch('');
        setCategory('All Categories');
        setDateRange('All');
    };

    const hasActiveFilters = search !== '' || category !== 'All Categories' || dateRange !== 'All';

    const dateFilters = ['All', 'Today', 'This Week', 'This Month'];

    return (
        <div className="efb-container">
            <div className="efb-top-row">

                {/* Search Input */}
                <div className="efb-search-wrapper">
                    <FiSearch className="efb-search-icon" />
                    <input
                        type="text"
                        placeholder="Search events or organizers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="efb-search-input"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="efb-category-wrapper">
                    <FiFilter className="efb-category-icon" />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="efb-category-select"
                    >
                        <option value="All Categories">All Categories</option>
                        <option value="Technical">Technical</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Sports">Sports</option>
                        <option value="Seminars">Seminars</option>
                    </select>
                </div>
            </div>

            <div className="efb-bottom-row">
                <div className="efb-date-pills">
                    <span className="efb-date-label">Date:</span>
                    {dateFilters.map((filter) => (
                        <button
                            key={filter}
                            className={`efb-pill ${dateRange === filter ? 'active' : ''}`}
                            onClick={() => setDateRange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {hasActiveFilters && (
                    <button className="efb-clear-btn" onClick={handleClearFilters}>
                        <FiX /> Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
};

export default EventFilterBar;
