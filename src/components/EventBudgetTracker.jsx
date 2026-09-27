import React, { useState, useMemo } from 'react';
import './EventBudgetTracker.css';

const DEFAULT_BUDGET = 180000; 

const DEFAULT_EXPENSES = [
  { id: 1, name: 'Main Auditorium Booking', category: 'Venue', amount: 50000, date: '2023-10-01', status: 'Paid', receipt: '#' },
  { id: 2, name: 'Guest Speaker Flight', category: 'Hospitality', amount: 25000, date: '2023-10-05', status: 'Reimbursed', receipt: '#' },
  { id: 3, name: 'Hackathon Cash Prizes', category: 'Prizes', amount: 40000, date: '2023-10-10', status: 'Pending Approval', receipt: '' },
  { id: 4, name: 'Social Media Ads', category: 'Marketing', amount: 7500, date: '2023-10-12', status: 'Paid', receipt: '#' },
  { id: 5, name: 'Catering (Day 1)', category: 'Food & Catering', amount: 10000, date: '2023-10-15', status: 'Paid', receipt: '#' }
];

const FILTER_CATEGORIES = ["All", "Venue", "Hospitality", "Prizes", "Marketing"];
const FORM_CATEGORIES = ["Venue", "Hospitality", "Prizes", "Marketing", "Food & Catering", "AV & Tech", "Misc"];
const STATUSES = ["Paid", "Pending Approval", "Reimbursed"];

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const EventBudgetTracker = ({ budgetData = { total: DEFAULT_BUDGET, expenses: DEFAULT_EXPENSES } }) => {
  const [expenses, setExpenses] = useState(budgetData.expenses);
  const [totalBudget, setTotalBudget] = useState(budgetData.total);
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', category: 'Venue', amount: '', paymentMethod: 'Card', date: '', status: 'Pending Approval', receipt: ''
  });

  const totalSpent = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  const remainingBalance = totalBudget - totalSpent;
  const percentageSpent = Math.min((totalSpent / totalBudget) * 100, 100);

  const getProgressColor = (percentage) => {
    if (percentage > 90) return '#ef4444'; // Red
    if (percentage >= 70) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const filteredExpenses = useMemo(() => {
    if (activeFilter === "All") return expenses;
    return expenses.filter(exp => exp.category.includes(activeFilter)); 
  }, [expenses, activeFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.date) return;
    
    const newExpense = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
      status: formData.status,
      receipt: formData.receipt || null
    };

    setExpenses([newExpense, ...expenses]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Venue', amount: '', paymentMethod: 'Card', date: '', status: 'Pending Approval', receipt: '' });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Reimbursed': return 'status-reimbursed';
      case 'Pending Approval': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="budget-tracker-container">
      <header className="budget-header">
        <div className="header-titles">
          <h2>Event Budget & Expenditure Ledger</h2>
          <p>Track club allocations, approved disbursements, and receipt records</p>
        </div>
        <button className="add-expense-btn" onClick={() => setIsModalOpen(true)}>
          + Log New Expense
        </button>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Total Allocated Budget</h4>
          <p className="metric-value">{formatCurrency(totalBudget)}</p>
        </div>
        <div className="metric-card">
          <h4>Total Spent / Disbursed</h4>
          <p className="metric-value spent">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="metric-card balance-card">
          <h4>Remaining Balance</h4>
          <p className={`metric-value balance-pill ${remainingBalance < 0 ? 'negative' : 'positive'}`}>
            {formatCurrency(remainingBalance)}
          </p>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Budget Consumed</span>
          <span>{percentageSpent.toFixed(1)}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${percentageSpent}%`, 
              backgroundColor: getProgressColor(percentageSpent)
            }}
          ></div>
        </div>
      </div>

      <div className="ledger-section">
        <div className="ledger-filters">
          {FILTER_CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="ledger-table-container desktop-view">
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Expense Item</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? filteredExpenses.map(exp => (
                <tr key={exp.id}>
                  <td className="item-name">{exp.name}</td>
                  <td><span className="category-tag">{exp.category}</span></td>
                  <td className="item-amount">{formatCurrency(exp.amount)}</td>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(exp.status)}`}>
                      {exp.status}
                    </span>
                  </td>
                  <td>
                    {exp.receipt ? (
                      <a href={exp.receipt} className="receipt-link" target="_blank" rel="noreferrer">View</a>
                    ) : (
                      <span className="no-receipt">-</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="empty-table">No expenses found for this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="ledger-cards-container mobile-view">
          {filteredExpenses.length > 0 ? filteredExpenses.map(exp => (
            <div key={exp.id} className="expense-mobile-card">
              <div className="mobile-card-top">
                <span className="item-name">{exp.name}</span>
                <span className="item-amount">{formatCurrency(exp.amount)}</span>
              </div>
              <div className="mobile-card-mid">
                <span className="category-tag">{exp.category}</span>
                <span className="item-date">{new Date(exp.date).toLocaleDateString()}</span>
              </div>
              <div className="mobile-card-bottom">
                <span className={`status-badge ${getStatusClass(exp.status)}`}>{exp.status}</span>
                {exp.receipt ? (
                  <a href={exp.receipt} className="receipt-link" target="_blank" rel="noreferrer">Receipt</a>
                ) : (
                  <span className="no-receipt">No Receipt</span>
                )}
              </div>
            </div>
          )) : (
            <div className="empty-table">No expenses found.</div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Log New Expense</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddExpense} className="expense-form">
              <div className="form-group">
                <label>Item Title</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Venue Booking" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    {FORM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required min="0" placeholder="0.00" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Receipt URL / Attachment (Optional)</label>
                <input type="text" name="receipt" value={formData.receipt} onChange={handleInputChange} placeholder="https://link-to-invoice..." />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBudgetTracker;
