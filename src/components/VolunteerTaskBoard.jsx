import React, { useState } from 'react';
import './VolunteerTaskBoard.css';

// SVG Icons
const Icons = {
  Plus: () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
};

// Fallback Mock Data
const MOCK_TASKS = [
  { 
    id: 1, 
    title: 'Manage Gate 2 Pass Verification', 
    department: 'Registration Desk', 
    assignee: 'Jane Doe', 
    assigneeInitials: 'JD', 
    phone: '+1 234-567-890', 
    priority: 'High', 
    status: 'In Progress' 
  },
  { 
    id: 2, 
    title: 'Distribute Speaker Kits', 
    department: 'VIP Lounge', 
    assignee: 'Alex Smith', 
    assigneeInitials: 'AS', 
    phone: '+1 987-654-321', 
    priority: 'Medium', 
    status: 'To Do' 
  },
  { 
    id: 3, 
    title: 'Setup Main Stage Mics', 
    department: 'Stage A Tech', 
    assignee: 'Chris Lee', 
    assigneeInitials: 'CL', 
    phone: '+1 122-334-455', 
    priority: 'High', 
    status: 'Completed' 
  },
  { 
    id: 4, 
    title: 'Restock Water Stations', 
    department: 'Logistics', 
    assignee: 'Unassigned', 
    assigneeInitials: '?', 
    phone: '', 
    priority: 'Low', 
    status: 'To Do' 
  },
  { 
    id: 5, 
    title: 'Direct Attendees to Hall B', 
    department: 'Crowd Control', 
    assignee: 'Sam Rivera', 
    assigneeInitials: 'SR', 
    phone: '+1 555-000-111', 
    priority: 'Medium', 
    status: 'In Progress' 
  }
];

const VOLUNTEERS = ["Unassigned", "Jane Doe", "Alex Smith", "Chris Lee", "Sam Rivera", "Taylor Swift", "Jordan Peele"];
const DEPARTMENTS = ["Registration Desk", "VIP Lounge", "Stage A Tech", "Logistics", "Crowd Control", "Media Team"];
const PRIORITIES = ["High", "Medium", "Low"];

const VolunteerTaskBoard = ({ tasks = MOCK_TASKS }) => {
  const [tasksList, setTasksList] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal Form State
  const [formData, setFormData] = useState({
    title: '',
    department: DEPARTMENTS[0],
    assignee: VOLUNTEERS[0],
    priority: 'Medium'
  });

  // Derived Metrics
  const activeVolunteersCount = new Set(
    tasksList.filter(t => t.assignee !== 'Unassigned').map(t => t.assignee)
  ).size;
  
  const pendingTasksCount = tasksList.filter(t => t.status === 'To Do' || t.status === 'In Progress').length;
  const completedTasksCount = tasksList.filter(t => t.status === 'Completed').length;

  // Actions
  const handleStatusChange = (taskId, newStatus) => {
    setTasksList(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getInitials = (name) => {
    if (!name || name === 'Unassigned') return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: formData.title,
      department: formData.department,
      assignee: formData.assignee,
      assigneeInitials: getInitials(formData.assignee),
      phone: formData.assignee === 'Unassigned' ? '' : '+1 000-000-000', // Mock phone
      priority: formData.priority,
      status: 'To Do'
    };

    setTasksList([newTask, ...tasksList]);
    setIsModalOpen(false);
    setFormData({ title: '', department: DEPARTMENTS[0], assignee: VOLUNTEERS[0], priority: 'Medium' });
  };

  const renderLane = (statusName, accentClass) => {
    const laneTasks = tasksList.filter(t => t.status === statusName);
    
    return (
      <div className={`vtb-lane ${accentClass}`}>
        <div className="vtb-lane-header">
          {statusName} 
          <span className="vtb-lane-count">{laneTasks.length}</span>
        </div>
        
        <div className="vtb-card-list">
          {laneTasks.map(task => (
            <div key={task.id} className="vtb-task-card">
              <div className="vtb-card-top">
                <span className="vtb-department-tag">{task.department}</span>
                <span className={`vtb-priority vtb-priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              
              <h4 className="vtb-task-title">{task.title}</h4>
              
              <div className="vtb-card-footer">
                <div className="vtb-assignee-info">
                  <div className={`vtb-avatar ${task.assignee !== 'Unassigned' ? 'active-avatar' : ''}`}>
                    {task.assigneeInitials}
                  </div>
                  <div className="vtb-assignee-details">
                    <span className="vtb-assignee-name">{task.assignee}</span>
                    {task.phone && (
                      <a href={`tel:${task.phone.replace(/[^0-9+]/g, '')}`} className="vtb-assignee-phone">
                        {task.phone}
                      </a>
                    )}
                  </div>
                </div>
                
                <select 
                  className="vtb-status-select"
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
          
          {laneTasks.length === 0 && (
            <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', padding: '20px 0' }}>
              No tasks here
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="vtb-container">
      {/* Header Area */}
      <div className="vtb-header-section">
        <div>
          <div className="vtb-header-text">
            <h2>Crew & Volunteer Task Dispatcher</h2>
            <p>Assign venue responsibilities and monitor real-time task completion</p>
          </div>
          
          <div className="vtb-metrics-row" style={{ marginTop: '24px' }}>
            <div className="vtb-metric-card">
              <span className="vtb-metric-value">{activeVolunteersCount}</span>
              <span className="vtb-metric-label">Active Volunteers</span>
            </div>
            <div className="vtb-metric-card">
              <span className="vtb-metric-value">{pendingTasksCount}</span>
              <span className="vtb-metric-label">Pending Tasks</span>
            </div>
            <div className="vtb-metric-card">
              <span className="vtb-metric-value">{completedTasksCount}</span>
              <span className="vtb-metric-label">Completed Duties</span>
            </div>
          </div>
        </div>

        <button className="vtb-assign-btn" onClick={() => setIsModalOpen(true)}>
          <Icons.Plus /> Assign New Duty
        </button>
      </div>

      {/* Kanban Board */}
      <div className="vtb-kanban-board">
        {renderLane('To Do', 'vtb-lane-todo')}
        {renderLane('In Progress', 'vtb-lane-inprogress')}
        {renderLane('Completed', 'vtb-lane-completed')}
      </div>

      {/* Quick Assignment Modal */}
      {isModalOpen && (
        <div className="vtb-modal-overlay">
          <div className="vtb-modal-content">
            <div className="vtb-modal-header">
              <h3>Dispatch New Duty</h3>
              <button className="vtb-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleNewTaskSubmit}>
              <div className="vtb-form-group">
                <label>Duty Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange}
                  className="vtb-input" 
                  placeholder="e.g. Check VIP Credentials at Door"
                  autoFocus
                  required
                />
              </div>
              
              <div className="vtb-form-group">
                <label>Location / Zone</label>
                <select name="department" value={formData.department} onChange={handleFormChange} className="vtb-select">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              
              <div className="vtb-form-group">
                <label>Assignee</label>
                <select name="assignee" value={formData.assignee} onChange={handleFormChange} className="vtb-select">
                  {VOLUNTEERS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              
              <div className="vtb-form-group">
                <label>Priority Level</label>
                <select name="priority" value={formData.priority} onChange={handleFormChange} className="vtb-select">
                  {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              
              <div className="vtb-modal-footer">
                <button type="button" className="vtb-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="vtb-submit-btn">Dispatch Duty</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerTaskBoard;
