// Architecture Overview Component
import React, { useState } from 'react';
import './ArchitectureOverview.css';

interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  components: ArchitectureComponent[];
  color: string;
  icon: string;
}

interface ArchitectureComponent {
  id: string;
  name: string;
  description: string;
  status: 'implemented' | 'planned' | 'missing';
  technologies: string[];
  dependencies: string[];
  responsibilities: string[];
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'presentation',
    name: 'Presentation Layer',
    description: 'User interface components and pages',
    color: '#e3f2fd',
    icon: '🎨',
    components: [
      {
        id: 'react-pages',
        name: 'React Pages',
        description: 'Business management pages and components',
        status: 'planned',
        technologies: ['React', 'TypeScript', 'Amplify UI'],
        dependencies: ['business-logic'],
        responsibilities: [
          'User interface rendering',
          'Form handling and validation',
          'Navigation and routing',
          'State management (local)'
        ]
      },
      {
        id: 'layout-components',
        name: 'Layout Components',
        description: 'Reusable UI components and layouts',
        status: 'planned',
        technologies: ['React', 'CSS-in-JS', 'Responsive Design'],
        dependencies: ['design-system'],
        responsibilities: [
          'Consistent UI patterns',
          'Responsive design',
          'Accessibility compliance',
          'Component reusability'
        ]
      },
      {
        id: 'routing',
        name: 'Routing System',
        description: 'Client-side routing and navigation',
        status: 'planned',
        technologies: ['React Router', 'Dynamic Routing'],
        dependencies: ['authentication'],
        responsibilities: [
          'Page navigation',
          'Route protection',
          'URL parameter handling',
          'Breadcrumb navigation'
        ]
      }
    ]
  },
  {
    id: 'business-logic',
    name: 'Business Logic Layer',
    description: 'Application logic and data processing',
    color: '#fff3e0',
    icon: '⚙️',
    components: [
      {
        id: 'services',
        name: 'Service Layer',
        description: 'Business logic services and utilities',
        status: 'planned',
        technologies: ['JavaScript', 'Custom Hooks', 'Context API'],
        dependencies: ['data-access'],
        responsibilities: [
          'Business rule enforcement',
          'Data transformation',
          'Validation logic',
          'State management (global)'
        ]
      },
      {
        id: 'validation',
        name: 'Validation Engine',
        description: 'Data validation and business rules',
        status: 'planned',
        technologies: ['JSON Schema', 'Custom Validators'],
        dependencies: ['templates'],
        responsibilities: [
          'Form validation',
          'Data integrity checks',
          'Business rule validation',
          'Error handling'
        ]
      },
      {
        id: 'workflow',
        name: 'Workflow Management',
        description: 'Business process orchestration',
        status: 'planned',
        technologies: ['State Machines', 'Event Handlers'],
        dependencies: ['services'],
        responsibilities: [
          'Process flow control',
          'Step validation',
          'Progress tracking',
          'Conditional logic'
        ]
      }
    ]
  },
  {
    id: 'data-access',
    name: 'Data Access Layer',
    description: 'API interactions and data management',
    color: '#f3e5f5',
    icon: '🔌',
    components: [
      {
        id: 'graphql-client',
        name: 'GraphQL Client',
        description: 'AWS AppSync GraphQL client',
        status: 'implemented',
        technologies: ['AWS Amplify', 'GraphQL', 'AppSync'],
        dependencies: ['backend-api'],
        responsibilities: [
          'API communication',
          'Query execution',
          'Real-time subscriptions',
          'Caching and optimization'
        ]
      },
      {
        id: 'api-middleware',
        name: 'API Middleware',
        description: 'Custom API routes and middleware',
        status: 'planned',
        technologies: ['Node.js', 'Express', 'AWS Lambda'],
        dependencies: ['data-storage'],
        responsibilities: [
          'Request processing',
          'Authentication middleware',
          'Data transformation',
          'Error handling'
        ]
      },
      {
        id: 'data-sync',
        name: 'Data Synchronization',
        description: 'Real-time data synchronization',
        status: 'planned',
        technologies: ['WebSocket', 'Server-Sent Events'],
        dependencies: ['graphql-client'],
        responsibilities: [
          'Real-time updates',
          'Offline synchronization',
          'Conflict resolution',
          'Event broadcasting'
        ]
      }
    ]
  },
  {
    id: 'data-storage',
    name: 'Data Storage Layer',
    description: 'Data persistence and management',
    color: '#ffebee',
    icon: '🗄️',
    components: [
      {
        id: 'dynamodb',
        name: 'DynamoDB',
        description: 'NoSQL database for application data',
        status: 'implemented',
        technologies: ['AWS DynamoDB', 'NoSQL'],
        dependencies: ['aws-infrastructure'],
        responsibilities: [
          'Data persistence',
          'Scalable storage',
          'Query performance',
          'Backup and recovery'
        ]
      },
      {
        id: 'file-storage',
        name: 'File Storage',
        description: 'Asset and file management',
        status: 'planned',
        technologies: ['AWS S3', 'CloudFront CDN'],
        dependencies: ['aws-infrastructure'],
        responsibilities: [
          'File upload/download',
          'Asset delivery',
          'Content distribution',
          'Version control'
        ]
      },
      {
        id: 'templates',
        name: 'Template System',
        description: 'Data structure templates and schemas',
        status: 'planned',
        technologies: ['JSON Schema', 'Configuration Files'],
        dependencies: ['file-storage'],
        responsibilities: [
          'Data structure definition',
          'Template management',
          'Schema validation',
          'Configuration storage'
        ]
      }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure Layer',
    description: 'Cloud infrastructure and deployment',
    color: '#e8f5e8',
    icon: '☁️',
    components: [
      {
        id: 'aws-amplify',
        name: 'AWS Amplify',
        description: 'Full-stack development platform',
        status: 'implemented',
        technologies: ['AWS Amplify', 'CDK', 'CloudFormation'],
        dependencies: [],
        responsibilities: [
          'Application hosting',
          'CI/CD pipeline',
          'Environment management',
          'Resource provisioning'
        ]
      },
      {
        id: 'authentication',
        name: 'Authentication Service',
        description: 'User authentication and authorization',
        status: 'planned',
        technologies: ['AWS Cognito', 'OAuth 2.0'],
        dependencies: ['aws-amplify'],
        responsibilities: [
          'User registration/login',
          'Session management',
          'Role-based access',
          'Multi-factor authentication'
        ]
      },
      {
        id: 'monitoring',
        name: 'Monitoring & Logging',
        description: 'Application monitoring and logging',
        status: 'planned',
        technologies: ['CloudWatch', 'X-Ray', 'Error Tracking'],
        dependencies: ['aws-amplify'],
        responsibilities: [
          'Performance monitoring',
          'Error tracking',
          'Usage analytics',
          'Alerting and notifications'
        ]
      }
    ]
  }
];

const ArchitectureOverview: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<ArchitectureLayer | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return '✅';
      case 'planned': return '🔄';
      case 'missing': return '❌';
      default: return '⚪';
    }
  };

  return (
    <div className="architecture-overview">
      <div className="arch-header">
        <h1>System Architecture Overview</h1>
        <p>Multi-layered architecture design for the Business Management Portal</p>
      </div>

      <div className="arch-stats">
        <div className="stat-card">
          <div className="stat-value">
            {architectureLayers.reduce((sum, layer) => sum + layer.components.length, 0)}
          </div>
          <div className="stat-label">Total Components</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {architectureLayers.reduce((sum, layer) => 
              sum + layer.components.filter(c => c.status === 'implemented').length, 0
            )}
          </div>
          <div className="stat-label">Implemented</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {architectureLayers.reduce((sum, layer) => 
              sum + layer.components.filter(c => c.status === 'planned').length, 0
            )}
          </div>
          <div className="stat-label">Planned</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {architectureLayers.reduce((sum, layer) => 
              sum + layer.components.filter(c => c.status === 'missing').length, 0
            )}
          </div>
          <div className="stat-label">Missing</div>
        </div>
      </div>

      <div className="arch-content">
        <div className="arch-diagram">
          <h2>Architecture Layers</h2>
          <div className="layers-container">
            {architectureLayers.map((layer, index) => (
              <div 
                key={layer.id}
                className={`layer-block ${selectedLayer?.id === layer.id ? 'selected' : ''}`}
                style={{ backgroundColor: layer.color }}
                onClick={() => setSelectedLayer(layer)}
              >
                <div className="layer-header">
                  <span className="layer-icon">{layer.icon}</span>
                  <h3>{layer.name}</h3>
                  <span className="layer-number">{index + 1}</span>
                </div>
                <p className="layer-description">{layer.description}</p>
                <div className="layer-components">
                  {layer.components.map(component => (
                    <div 
                      key={component.id}
                      className={`component-item ${selectedComponent?.id === component.id ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponent(component);
                      }}
                    >
                      <span className="component-status">
                        {getStatusIcon(component.status)}
                      </span>
                      <span className="component-name">{component.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="arch-details">
          <h2>Component Details</h2>
          {selectedComponent ? (
            <div className="component-details">
              <div className="component-header">
                <h3>{selectedComponent.name}</h3>
                <span className={`status-badge ${selectedComponent.status}`}>
                  {getStatusIcon(selectedComponent.status)} {selectedComponent.status}
                </span>
              </div>
              <p className="component-description">{selectedComponent.description}</p>
              
              <div className="detail-section">
                <h4>Technologies</h4>
                <div className="tech-tags">
                  {selectedComponent.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Dependencies</h4>
                <ul className="dependencies-list">
                  {selectedComponent.dependencies.map(dep => (
                    <li key={dep}>{dep}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h4>Responsibilities</h4>
                <ul className="responsibilities-list">
                  {selectedComponent.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : selectedLayer ? (
            <div className="layer-details">
              <div className="layer-header-detail">
                <h3>{selectedLayer.name}</h3>
                <span className="layer-icon-large">{selectedLayer.icon}</span>
              </div>
              <p className="layer-description-detail">{selectedLayer.description}</p>
              
              <div className="layer-stats">
                <div className="layer-stat">
                  <span className="stat-number">{selectedLayer.components.length}</span>
                  <span className="stat-text">Components</span>
                </div>
                <div className="layer-stat">
                  <span className="stat-number">
                    {selectedLayer.components.filter(c => c.status === 'implemented').length}
                  </span>
                  <span className="stat-text">Implemented</span>
                </div>
                <div className="layer-stat">
                  <span className="stat-number">
                    {selectedLayer.components.filter(c => c.status === 'planned').length}
                  </span>
                  <span className="stat-text">Planned</span>
                </div>
              </div>

              <div className="layer-components-list">
                <h4>Components in this layer:</h4>
                {selectedLayer.components.map(component => (
                  <div 
                    key={component.id}
                    className="component-summary"
                    onClick={() => setSelectedComponent(component)}
                  >
                    <span className="component-status">
                      {getStatusIcon(component.status)}
                    </span>
                    <div className="component-info">
                      <h5>{component.name}</h5>
                      <p>{component.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a layer or component to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="arch-principles">
        <h2>Architecture Principles</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <h3>🔄 Layered Architecture</h3>
            <p>Clear separation of concerns with distinct layers for presentation, business logic, data access, and infrastructure.</p>
          </div>
          <div className="principle-card">
            <h3>📱 Responsive Design</h3>
            <p>Mobile-first approach ensuring the application works seamlessly across all devices and screen sizes.</p>
          </div>
          <div className="principle-card">
            <h3>☁️ Cloud-Native</h3>
            <p>Built on AWS services for scalability, reliability, and cost-effectiveness with serverless architecture.</p>
          </div>
          <div className="principle-card">
            <h3>🔐 Security First</h3>
            <p>Implementing security best practices with authentication, authorization, and data protection at every layer.</p>
          </div>
          <div className="principle-card">
            <h3>🚀 Performance</h3>
            <p>Optimized for fast loading times with efficient data fetching, caching, and CDN distribution.</p>
          </div>
          <div className="principle-card">
            <h3>🔧 Maintainability</h3>
            <p>Clean code architecture with proper documentation, testing, and modular design for easy maintenance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureOverview;