import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  FaTicketAlt, 
  FaChartBar, 
  FaHome, 
  FaSignOutAlt,
  FaUser,
  FaBars
} from 'react-icons/fa';
import './Navbar.css';
const Navbar = ({ currentPage, onNavigate, onToggleSidebar }) => {
  const { user, logout } =  useAuth();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      path: '/dashboard'
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: <FaTicketAlt />,
      path: '/tickets'
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section - Brand & Menu Toggle */}
        <div className="navbar-left">
          <button 
            className="menu-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
          <div className="navbar-brand">
            <div className='ticflow-icon'>T</div>
            <span className="brand-text">Ticflow</span>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Section - User Info & Actions */}
        <div className="navbar-right">
          <div className="user-info">
            <FaUser className="user-icon" />
            <span className="user-name">{user?.name}</span>
          </div>
          <button 
            className="nav-item logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="nav-icon" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;