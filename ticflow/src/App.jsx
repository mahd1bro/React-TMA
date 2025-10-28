import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/Layout/Navbar';
import Landing from './pages/Landing';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import './App.css';

// Main app content that handles routing
const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authMode, setAuthMode] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

    // Define handleNavigate function
  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  // Define handleToggleSidebar function
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  if (loading) {
    return (
      <>
      <div className="header">
          <div className="loading-container">
            <div className="loading-spinner">Ticflow</div>
          </div>
      </div>
      
      </>
      
    );
  }

  if (!user) {
    return (
      <div className="app">
        {authMode === 'login' ? (
          <Login onSwitchToSignup={() => setAuthMode('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  // Render appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'tickets':
        return <Tickets />;
      case 'dashboard':
      default:
        return <Dashboard onNavigateToTickets={() => handleNavigate('tickets')} />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleSidebar={handleToggleSidebar}
      />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
};

// Main App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
     
  );
}

export default App;