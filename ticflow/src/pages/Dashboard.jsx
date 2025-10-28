// import React from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { 
//   FaTicketAlt, 
//   FaChartBar, 
//   FaUser, 
//   FaCog, 
//   FaSignOutAlt,
//   FaExclamationTriangle,
//   FaClock,
//   FaCheckCircle,
//   FaPlus
// } from 'react-icons/fa';
// import { MdDashboard, MdAdd } from 'react-icons/md';
// import './Dashboard.css';

// const Dashboard = ({ onNavigateToTickets }) => {
//   const { user, logout } = useAuth();

//   const stats = {
//     totalTickets: 24,
//     openTickets: 8,
//     inProgressTickets: 6,
//     resolvedTickets: 10,
//     highPriority: 3,
//     urgentTickets: 1
//   };

//     const handleCreateTicket = () => {
//     // This would navigate to tickets page with create mode
//     if (onNavigateToTickets) {
//       onNavigateToTickets();
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="dashboard">
//       <div className="container">
//         {/* Welcome Section */}
//         <section className="welcome-section">
//           <h1 className="welcome-title">
//             Welcome back, {user?.name}!
//           </h1>
//           <p className="welcome-subtitle">
//             Here's what's happening with your tickets today.
//           </p>
//         </section>

//         {/* Stats Overview */}
//         <section className="stats-section">
//           <h2 className="section-title">
//             Overview
//           </h2>
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon total">
//                 <FaTicketAlt />
//               </div>
//               <div className="stat-content">
//                 <h3>Total Tickets</h3>
//                 <span className="stat-number">{stats.totalTickets}</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon open">
//                 <FaExclamationTriangle />
//               </div>
//               <div className="stat-content">
//                 <h3>Open Tickets</h3>
//                 <span className="stat-number">{stats.openTickets}</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon progress">
//                 <FaClock />
//               </div>
//               <div className="stat-content">
//                 <h3>In Progress</h3>
//                 <span className="stat-number">{stats.inProgressTickets}</span>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="stat-icon resolved">
//                 <FaCheckCircle />
//               </div>
//               <div className="stat-content">
//                 <h3>Resolved</h3>
//                 <span className="stat-number">{stats.resolvedTickets}</span>
//               </div>
//             </div>
//           </div>
//         </section>  

//         <section className="features-section">
//           <div className="feature-card">
//             <h2 className="feature-title">Smart Tracking</h2>
//             <p className="feature-text">
//               Monitor ticket progress with real-time updates and automated notifications.
//             </p>
//           </div>

//           <div className="feature-card">
//             <h2 className="feature-title">Team Collaboration</h2>
//             <p className="feature-text">
//               Empower your team with shared visibility and efficient task management tools.
//             </p>
//           </div>

//           <div className="feature-card">
//             <h2 className="feature-title">Detailed Analytics</h2>
//             <p className="feature-text">
//               Gain insights with powerful analytics and improve your resolution rates.
//             </p>
//           </div>
//         </section>
        
//       </div>
//       <footer className="footer">
//           <p className="footer-text">
//             © {new Date().getFullYear()} TicketEase. All rights reserved.
//           </p>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  FaTicketAlt, 
  FaExclamationTriangle,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ onNavigateToTickets }) => {
  const { user } = useAuth();

  const stats = {
    totalTickets: 24,
    openTickets: 8,
    inProgressTickets: 6,
    resolvedTickets: 10,
    highPriority: 3,
    urgentTickets: 1
  };

  const handleCreateTicket = () => {
    if (onNavigateToTickets) {
      onNavigateToTickets();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, {user?.name}!
            </h1>
            <p className="welcome-subtitle">
              Here's what's happening with your tickets today.
            </p>
          </section>

          {/* Stats Overview */}
          <section className="stats-section">
            <h2 className="section-title">
              Overview
            </h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon total">
                  <FaTicketAlt />
                </div>
                <div className="stat-content">
                  <h3>Total Tickets</h3>
                  <span className="stat-number">{stats.totalTickets}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon open">
                  <FaExclamationTriangle />
                </div>
                <div className="stat-content">
                  <h3>Open Tickets</h3>
                  <span className="stat-number">{stats.openTickets}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon progress">
                  <FaClock />
                </div>
                <div className="stat-content">
                  <h3>In Progress</h3>
                  <span className="stat-number">{stats.inProgressTickets}</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon resolved">
                  <FaCheckCircle />
                </div>
                <div className="stat-content">
                  <h3>Resolved</h3>
                  <span className="stat-number">{stats.resolvedTickets}</span>
                </div>
              </div>
            </div>
          </section>  

          {/* Features Section */}
          <section className="features-section">
            <div className="feature-card">
              <h2 className="feature-title">Smart Tracking</h2>
              <p className="feature-text">
                Monitor ticket progress with real-time updates and automated notifications.
              </p>
            </div>

            <div className="feature-card">
              <h2 className="feature-title">Team Collaboration</h2>
              <p className="feature-text">
                Empower your team with shared visibility and efficient task management tools.
              </p>
            </div>

            <div className="feature-card">
              <h2 className="feature-title">Detailed Analytics</h2>
              <p className="feature-text">
                Gain insights with powerful analytics and improve your resolution rates.
              </p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer at bottom */}
      <footer className="footer">
        <p className="footer-text">
          © {new Date().getFullYear()} Ticflow. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;