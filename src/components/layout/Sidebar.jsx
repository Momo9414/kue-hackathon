import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeModule, onModuleChange }) => {
  const modules = [
    { id: 'chat', name: 'Assistant IA', icon: '💬' },
    { id: 'documents', name: 'Documents', icon: '📄' },
    { id: 'history', name: 'Historique', icon: '📋' },
    { id: 'jurisprudence', name: 'Jurisprudence', icon: '⚖️' },
    { id: 'quiz', name: 'Quiz/Formation', icon: '🎯' },
    { id: 'news', name: 'Actualités', icon: '📰' },
    { id: 'analysis', name: 'Analyse Docs', icon: '🔍' },
    { id: 'voice', name: 'Mode Vocal', icon: '🎤' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {modules.map(module => (
          <button
            key={module.id}
            className={`nav-item ${activeModule === module.id ? 'active' : ''}`}
            onClick={() => onModuleChange(module.id)}
          >
            <span className="nav-icon">{module.icon}</span>
            <span className="nav-text">{module.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;