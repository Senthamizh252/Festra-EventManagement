import React, { useState } from 'react';
import { Users, Trash2, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import './TeamRegistrationForm.css';

const MAX_TEAM_SIZE = 4;
const MIN_TEAM_SIZE = 2; // Including leader

const DEPARTMENTS = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Artificial Intelligence',
    'Other / Interdisciplinary'
];

const INITIAL_MEMBER = {
    fullName: '',
    email: '',
    regNo: '',
    department: ''
};

// Mock leader data (simulating a logged-in user state)
const MOCK_LEADER = {
    fullName: 'Arjun Kumar',
    email: 'arjun.k@college.edu',
    regNo: '23CS104',
    department: 'Computer Science'
};

const TeamRegistrationForm = () => {
    const [teamName, setTeamName] = useState('');
    // Initialize with ONE empty member row (so total size = leader + 1 = 2)
    const [members, setMembers] = useState([{ ...INITIAL_MEMBER }]);

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [assignedTeamId, setAssignedTeamId] = useState('');

    const totalTeamSize = members.length + 1; // +1 for the Leader

    const handleMemberChange = (index, field, value) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);

        // Clear field error on typing
        if (errors[`member_${index}_${field}`]) {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs[`member_${index}_${field}`];
                return newErrs;
            });
        }
    };

    const clearTeamNameError = () => {
        if (errors.teamName) {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs.teamName;
                return newErrs;
            });
        }
    };

    const addMember = () => {
        if (totalTeamSize < MAX_TEAM_SIZE) {
            setMembers([...members, { ...INITIAL_MEMBER }]);
        }
    };

    const removeMember = (indexToRemove) => {
        if (totalTeamSize > MIN_TEAM_SIZE) {
            setMembers(members.filter((_, idx) => idx !== indexToRemove));
        }
    };

    const validate = () => {
        let isValid = true;
        const newErrors = {};

        if (!teamName.trim()) {
            newErrors.teamName = 'Team name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        members.forEach((m, index) => {
            if (!m.fullName.trim()) {
                newErrors[`member_${index}_fullName`] = 'Name is required';
                isValid = false;
            }
            if (!m.email.trim()) {
                newErrors[`member_${index}_email`] = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(m.email)) {
                newErrors[`member_${index}_email`] = 'Invalid email format';
                isValid = false;
            }
            if (!m.regNo.trim()) {
                newErrors[`member_${index}_regNo`] = 'Required';
                isValid = false;
            }
            if (!m.department) {
                newErrors[`member_${index}_department`] = 'Select dept';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                teamName,
                leader: MOCK_LEADER,
                teammates: members,
                totalSize: totalTeamSize
            };

            console.log("Mock Submission Payload:", payload);

            // Generate a mock ID
            const mockId = `FEST-${Math.floor(1000 + Math.random() * 9000)}`;
            setAssignedTeamId(mockId);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <div className="tr-container">
                <div className="tr-success">
                    <div className="tr-success-icon">
                        <CheckCircle size={36} strokeWidth={2.5} />
                    </div>
                    <h2 className="tr-success-title">Registration Successful!</h2>
                    <p className="tr-success-desc">
                        Your squad is locked in. Share the Team ID below with your members.
                    </p>

                    <div className="tr-team-badge-preview">
                        <span className="tr-team-badge-label">Registered Team Name</span>
                        <h3 className="tr-team-badge-name">{teamName}</h3>
                        <span className="tr-team-badge-label" style={{ marginTop: '1.5rem' }}>Assigned Team ID</span>
                        <div className="tr-team-badge-id">{assignedTeamId}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tr-container">
            <div className="tr-header">
                <h2 className="tr-title">Team Registration</h2>
                <p className="tr-subtitle">Register your squad for group events and hackathons</p>
                <div className="tr-badge">
                    <Users size={16} /> Team Size: {MIN_TEAM_SIZE} to {MAX_TEAM_SIZE} Members
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="tr-body">

                    {/* Team Details Block */}
                    <div className="tr-field-group" style={{ marginBottom: '2rem' }}>
                        <label className="tr-label">Team Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input
                            type="text"
                            className={`tr-input ${errors.teamName ? 'error' : ''}`}
                            placeholder="e.g. Cyber Ninjas"
                            value={teamName}
                            onChange={(e) => {
                                setTeamName(e.target.value);
                                clearTeamNameError();
                            }}
                        />
                        {errors.teamName && <span className="tr-error-text">{errors.teamName}</span>}
                    </div>

                    <h3 className="tr-section-title">
                        Team Leader (You)
                        <ShieldCheck size={20} color="#10b981" />
                    </h3>

                    <div className="tr-grid" style={{ marginBottom: '2.5rem' }}>
                        <div className="tr-field-group">
                            <label className="tr-label">Full Name</label>
                            <input type="text" className="tr-input" value={MOCK_LEADER.fullName} disabled />
                        </div>
                        <div className="tr-field-group">
                            <label className="tr-label">College Email</label>
                            <input type="text" className="tr-input" value={MOCK_LEADER.email} disabled />
                        </div>
                        <div className="tr-field-group">
                            <label className="tr-label">Register Number</label>
                            <input type="text" className="tr-input" value={MOCK_LEADER.regNo} disabled />
                        </div>
                        <div className="tr-field-group">
                            <label className="tr-label">Department</label>
                            <input type="text" className="tr-input" value={MOCK_LEADER.department} disabled />
                        </div>
                    </div>

                    <h3 className="tr-section-title">Add Team Members</h3>

                    {members.map((member, index) => (
                        <div key={index} className="tr-member-card">
                            <div className="tr-member-header">
                                <h4 className="tr-member-title">Teammate {index + 1}</h4>
                                <button
                                    type="button"
                                    className="tr-btn-remove"
                                    onClick={() => removeMember(index)}
                                    disabled={totalTeamSize <= MIN_TEAM_SIZE}
                                    title={totalTeamSize <= MIN_TEAM_SIZE ? "Minimum team size reached" : "Remove member"}
                                >
                                    <Trash2 size={16} /> Remove
                                </button>
                            </div>

                            <div className="tr-grid">
                                <div className="tr-field-group">
                                    <label className="tr-label">Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        className={`tr-input ${errors[`member_${index}_fullName`] ? 'error' : ''}`}
                                        placeholder="John Doe"
                                        value={member.fullName}
                                        onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
                                    />
                                    {errors[`member_${index}_fullName`] && <span className="tr-error-text">{errors[`member_${index}_fullName`]}</span>}
                                </div>

                                <div className="tr-field-group">
                                    <label className="tr-label">College Email <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="email"
                                        className={`tr-input ${errors[`member_${index}_email`] ? 'error' : ''}`}
                                        placeholder="john@college.edu"
                                        value={member.email}
                                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                    />
                                    {errors[`member_${index}_email`] && <span className="tr-error-text">{errors[`member_${index}_email`]}</span>}
                                </div>

                                <div className="tr-field-group">
                                    <label className="tr-label">Register Number <span style={{ color: '#ef4444' }}>*</span></label>
                                    <input
                                        type="text"
                                        className={`tr-input ${errors[`member_${index}_regNo`] ? 'error' : ''}`}
                                        placeholder="23XX100"
                                        value={member.regNo}
                                        onChange={(e) => handleMemberChange(index, 'regNo', e.target.value)}
                                    />
                                    {errors[`member_${index}_regNo`] && <span className="tr-error-text">{errors[`member_${index}_regNo`]}</span>}
                                </div>

                                <div className="tr-field-group">
                                    <label className="tr-label">Department <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select
                                        className={`tr-input tr-select ${errors[`member_${index}_department`] ? 'error' : ''}`}
                                        value={member.department}
                                        onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                                    >
                                        <option value="" disabled>Select Department</option>
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    {errors[`member_${index}_department`] && <span className="tr-error-text">{errors[`member_${index}_department`]}</span>}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="tr-btn-add"
                        onClick={addMember}
                        disabled={totalTeamSize >= MAX_TEAM_SIZE}
                    >
                        <Plus size={20} />
                        {totalTeamSize >= MAX_TEAM_SIZE ? 'Maximum Constraints Reached' : 'Add Another Member'}
                    </button>

                </div>

                <div className="tr-footer">
                    <span className="tr-member-count">
                        {totalTeamSize} / {MAX_TEAM_SIZE} Members Added
                    </span>
                    <button type="submit" className="tr-btn-submit">
                        Complete Team Registration
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TeamRegistrationForm;
