import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Toast from '../components/UI/Toast';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaFilter,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './Tickets.css';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Load tickets from localStorage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('ticflow_tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  // Save tickets to localStorage
  useEffect(() => {
    localStorage.setItem('ticflow_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Create new ticket
  const handleCreateTicket = () => {
    setEditingTicket(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'open'
    });
    setErrors({});
    setShowForm(true);
  };

  // Edit existing ticket
  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status
    });
    setErrors({});
    setShowForm(true);
  };

  // Delete ticket with confirmation
  const handleDeleteTicket = (ticketId) => {
    setDeleteConfirm(ticketId);
  };

  // Confirm deletion
  const confirmDelete = () => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== deleteConfirm);
    setTickets(updatedTickets);
    setDeleteConfirm(null);
    showToast('Ticket deleted successfully', 'success');
  };

  // Submit form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingTicket) {
      // Update existing ticket
      const updatedTickets = tickets.map(ticket =>
        ticket.id === editingTicket.id
          ? { 
              ...ticket, 
              ...formData, 
              updatedAt: new Date().toISOString() 
            }
          : ticket
      );
      setTickets(updatedTickets);
      showToast('Ticket updated successfully', 'success');
    } else {
      // Create new ticket
      const newTicket = {
        id: `TIC-${Date.now()}`,
        ...formData,
        createdBy: user?.name || 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTickets(prev => [newTicket, ...prev]);
      showToast('Ticket created successfully', 'success');
    }

    // Reset form
    setShowForm(false);
    setEditingTicket(null);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'open'
    });
  };

  // Show toast notification
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  // Filter tickets by status
  const filteredTickets = filterStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filterStatus);

  // Get priority icon and color
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'low': return { icon: <FaCheckCircle />, color: '#28a745' };
      case 'medium': return { icon: <FaClock />, color: '#ffc107' };
      case 'high': return { icon: <FaExclamationCircle />, color: '#fd7e14' };
      case 'urgent': return { icon: <FaTimesCircle />, color: '#dc3545' };
      default: return { icon: <FaClock />, color: '#6c757d' };
    }
  };

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return { icon: <FaExclamationCircle />, color: '#dc3545' };
      case 'in progress': return { icon: <FaClock />, color: '#fd7e14' };
      case 'resolved': return { icon: <FaCheckCircle />, color: '#28a745' };
      case 'closed': return { icon: <FaTimesCircle />, color: '#6c757d' };
      default: return { icon: <FaClock />, color: '#6c757d' };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="tickets-page">
      {/* Header */}
      <header className="tickets-header">
        <div className="container">
          <div className="header-content">
            <div className="header-info">
              <h1>Ticket Management</h1>
              <p>Manage and track all your support tickets</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleCreateTicket}
            >
              <FaPlus className="btn-icon" />
              Create New Ticket
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Stats and Filters */}
        <div className="tickets-controls">
          <div className="stats-overview">
            <div className="stat-item">
              <span className="stat-number">{tickets.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {tickets.filter(t => t.status === 'open').length}
              </span>
              <span className="stat-label">Open</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {tickets.filter(t => t.status === 'in progress').length}
              </span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {tickets.filter(t => t.status === 'resolved').length}
              </span>
              <span className="stat-label">Resolved</span>
            </div>
          </div>

          <div className="filter-controls">
            <FaFilter className="filter-icon" />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tickets</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Ticket Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  <MdClose />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Enter ticket title"
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={errors.description ? 'error' : ''}
                    placeholder="Describe the issue or request..."
                    rows="4"
                  />
                  {errors.description && (
                    <span className="error-message">{errors.description}</span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="open">Open</option>
                      <option value="in progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content delete-confirm">
              <div className="modal-header">
                <h2>Confirm Delete</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  <FaTrash className="btn-icon" />
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Grid */}
        <div className="tickets-grid">
          {filteredTickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tickets found</h3>
              <p>
                {filterStatus === 'all' 
                  ? 'Create your first ticket to get started' 
                  : `No ${filterStatus} tickets found`
                }
              </p>
              {filterStatus === 'all' && (
                <button 
                  className="btn btn-primary"
                  onClick={handleCreateTicket}
                >
                  <FaPlus className="btn-icon" />
                  Create Your First Ticket
                </button>
              )}
            </div>
          ) : (
            filteredTickets.map(ticket => {
              const priorityInfo = getPriorityIcon(ticket.priority);
              const statusInfo = getStatusIcon(ticket.status);

              return (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <div className="ticket-actions">
                      <button 
                        className="icon-btn edit"
                        onClick={() => handleEditTicket(ticket)}
                        title="Edit ticket"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="icon-btn delete"
                        onClick={() => handleDeleteTicket(ticket.id)}
                        title="Delete ticket"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <p className="ticket-description">{ticket.description}</p>

                  <div className="ticket-meta">
                    <div className="meta-tags">
                      <span 
                        className="status-tag"
                        style={{ backgroundColor: statusInfo.color }}
                      >
                        {statusInfo.icon}
                        {ticket.status}
                      </span>
                      <span 
                        className="priority-tag"
                        style={{ backgroundColor: priorityInfo.color }}
                      >
                        {priorityInfo.icon}
                        {ticket.priority}
                      </span>
                    </div>

                    <div className="meta-info">
                      <span className="ticket-id">{ticket.id}</span>
                      <span className="ticket-created">
                        Created: {formatDate(ticket.createdAt)}
                      </span>
                      {ticket.updatedAt !== ticket.createdAt && (
                        <span className="ticket-updated">
                          Updated: {formatDate(ticket.updatedAt)}
                        </span>
                      )}
                      <span className="ticket-author">By: {ticket.createdBy}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Tickets;