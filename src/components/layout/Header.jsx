import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Header.css';

const Header = ({ currentUser, onUserTypeChange, onToggleSidebar, sidebarCollapsed }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { state } = useApp();

  const userTypeLabels = {
    particulier: 'Particulier',
    professionnel: 'Professionnel',
    etudiant: 'Étudiant'
  };

  const handleUserTypeChange = (newType) => {
    onUserTypeChange(newType);
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className={`hamburger ${sidebarCollapsed ? 'collapsed' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          
          <div className="logo-section">
            <h1 className="logo">KUE</h1>
            <span className="tagline">Assistant Juridique Intelligent</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="notifications">
            <button className="notification-btn">
              <span className="notification-icon">🔔</span>
              {state.notifications.length > 0 && (
                <span className="notification-badge">{state.notifications.length}</span>
              )}
            </button>
          </div>
          
          <div className="user-section">
            <div className="user-type-selector">
              <button 
                className="user-type-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-icon">👤</span>
                <span className="user-type">{userTypeLabels[currentUser]}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <span>Type d'utilisateur</span>
                  </div>
                  {Object.entries(userTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      className={`dropdown-item ${currentUser === key ? 'active' : ''}`}
                      onClick={() => handleUserTypeChange(key)}
                    >
                      <span className="item-icon">
                        {key === 'particulier' && '👤'}
                        {key === 'professionnel' && '💼'}
                        {key === 'etudiant' && '🎓'}
                      </span>
                      <span>{label}</span>
                      {currentUser === key && <span className="check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;