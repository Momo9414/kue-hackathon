import React from 'react';
import './ModulePlaceholder.css';

const ModulePlaceholder = ({ moduleName, description, icon }) => (
  <div className="module-placeholder">
    <div className="placeholder-icon">{icon}</div>
    <h2>{moduleName}</h2>
    <p>{description}</p>
    <div className="coming-soon">
      <span>Module en cours de développement</span>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  </div>
);

export default ModulePlaceholder;
