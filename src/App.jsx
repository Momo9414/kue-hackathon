import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import LoadingScreen from './components/common/LoadingScreen';
import Toast from './components/common/Toast';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('particulier');
  const [activeModule, setActiveModule] = useState('chat');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulation du chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveModule('chat');
            break;
          case '2':
            e.preventDefault();
            setActiveModule('documents');
            break;
          case '3':
            e.preventDefault();
            setActiveModule('history');
            break;
          case '4':
            e.preventDefault();
            setActiveModule('jurisprudence');
            break;
          case '5':
            e.preventDefault();
            setActiveModule('quiz');
            break;
          case '6':
            e.preventDefault();
            setActiveModule('analytics');
            break;
          case '7':
            e.preventDefault();
            setActiveModule('settings');
            break;
          case 'b':
            e.preventDefault();
            handleToggleSidebar();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUserTypeChange = (newType) => {
    setCurrentUser(newType);
    // Ici on pourrait ajouter une logique pour adapter l'interface selon le type d'utilisateur
  };

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    // Fermer la sidebar sur mobile après sélection
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppProvider>
      <div className={`app ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        {/* Overlay pour mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`sidebar-container ${isMobile && sidebarOpen ? 'mobile-open' : ''}`}>
          <Sidebar
            activeModule={activeModule}
            onModuleChange={handleModuleChange}
            collapsed={sidebarCollapsed}
            onToggle={handleToggleSidebar}
          />
        </div>

        {/* Contenu principal */}
        <div className="main-container">
          <Header
            currentUser={currentUser}
            onUserTypeChange={handleUserTypeChange}
            onToggleSidebar={handleToggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />

          <MainContent
            activeModule={activeModule}
            currentUser={currentUser}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>

        {/* Toast notifications */}
        <Toast />
      </div>
    </AppProvider>
  );
}

export default App;