// Main Layout Component
import React, { useState } from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  {
    key: 'repo-map',
    icon: '🗺️',
    title: 'Repository Map',
    description: 'Tree-like visualization of current and planned structure'
  },
  {
    key: 'project-plan',
    icon: '📋',
    title: 'Project Plan',
    description: 'Advanced project roadmap and timeline'
  },
  {
    key: 'data-flow',
    icon: '🔄',
    title: 'Data Flow',
    description: 'Relational index and data flow visualization'
  },
  {
    key: 'architecture',
    icon: '🏗️',
    title: 'Architecture',
    description: 'System architecture and component relationships'
  }
];

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            <span className="logo-text">Akilah Portal</span>
          </div>
          <div className="header-actions">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '☰' : '×'}
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="navigation">
            <div className="nav-header">
              <h3>Navigation</h3>
            </div>
            <ul className="nav-list">
              {navigationItems.map(item => (
                <li key={item.key} className="nav-item">
                  <button
                    className={`nav-button ${currentPage === item.key ? 'active' : ''}`}
                    onClick={() => onPageChange(item.key)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <div className="nav-text">
                      <span className="nav-title">{item.title}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <div className="project-status">
              <h4>Project Status</h4>
              <div className="status-item">
                <span className="status-label">Current Phase:</span>
                <span className="status-value">Foundation Setup</span>
              </div>
              <div className="status-item">
                <span className="status-label">Progress:</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '15%' }}></div>
                </div>
                <span className="status-value">15%</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="content">
          {children}
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Akilah Portal - Advanced Business Management System</p>
          <div className="footer-links">
            <a href="https://github.com/incrediblesadi/portal.akilah.io" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
            <a href="https://github.com/incrediblesadi/amplify-ui-dashboard" target="_blank" rel="noopener noreferrer">
              UI Reference
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;