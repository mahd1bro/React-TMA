import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <header className="hero-section">
        <div className="wavy-background"></div>
        <div className="hero-content">
          <h1 className="app-name">Ticflow</h1>
          <p className="catchy-description">
            Streamline your workflow with intelligent ticket management
          </p>
        </div>
      </header>
    </div>
  );
};

export default Landing;