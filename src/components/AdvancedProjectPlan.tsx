// Advanced Project Plan Component
import React, { useState } from 'react';
import './AdvancedProjectPlan.css';

interface Phase {
  id: string;
  name: string;
  description: string;
  duration: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: Task[];
  dependencies?: string[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: string;
  status: 'not-started' | 'in-progress' | 'completed';
  assignee?: string;
  deliverables: string[];
  dependencies?: string[];
}

const projectPhases: Phase[] = [
  {
    id: 'phase-1',
    name: 'Phase 1: Foundation Setup',
    description: 'Establish the core infrastructure and project structure',
    duration: '2-3 weeks',
    status: 'in-progress',
    tasks: [
      {
        id: 'task-1-1',
        name: 'Project Structure Reorganization',
        description: 'Implement folder structure as outlined in project documentation',
        priority: 'critical',
        effort: '3-4 days',
        status: 'in-progress',
        deliverables: [
          'Folder structure matching planned architecture',
          'Component organization by feature',
          'Service layer structure',
          'Template and data structure'
        ]
      },
      {
        id: 'task-1-2',
        name: 'Routing Setup',
        description: 'Set up React Router for navigation between different management modules',
        priority: 'high',
        effort: '2-3 days',
        status: 'not-started',
        deliverables: [
          'React Router configuration',
          'Route definitions for all modules',
          'Navigation guards and permissions',
          'Breadcrumb navigation'
        ]
      },
      {
        id: 'task-1-3',
        name: 'Authentication Setup',
        description: 'Configure AWS Cognito for user authentication',
        priority: 'high',
        effort: '3-4 days',
        status: 'not-started',
        deliverables: [
          'AWS Cognito configuration',
          'Sign-up and sign-in pages',
          'User session management',
          'Role-based access control'
        ]
      },
      {
        id: 'task-1-4',
        name: 'Data Model Definition',
        description: 'Define GraphQL schemas for business data, menu items, etc.',
        priority: 'critical',
        effort: '4-5 days',
        status: 'not-started',
        deliverables: [
          'GraphQL schema definitions',
          'AWS AppSync configuration',
          'DynamoDB table design',
          'API resolvers'
        ]
      },
      {
        id: 'task-1-5',
        name: 'UI Framework Setup',
        description: 'Set up Amplify UI components and theming',
        priority: 'medium',
        effort: '2-3 days',
        status: 'not-started',
        deliverables: [
          'Amplify UI component library integration',
          'Custom theme configuration',
          'Responsive design system',
          'Component documentation'
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    name: 'Phase 2: Core Modules Implementation',
    description: 'Build the essential business management modules',
    duration: '4-6 weeks',
    status: 'not-started',
    dependencies: ['phase-1'],
    tasks: [
      {
        id: 'task-2-1',
        name: 'Business Management Module',
        description: 'Implement business information setup and management components',
        priority: 'critical',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'SetupBusiness.jsx component',
          'ViewBusinessInfo.jsx component',
          'EditBusinessInfo.jsx component',
          'Business data service layer',
          'Business template validation'
        ]
      },
      {
        id: 'task-2-2',
        name: 'Menu Management Module',
        description: 'Implement concept, category, and menu item management',
        priority: 'critical',
        effort: '2-3 weeks',
        status: 'not-started',
        deliverables: [
          'Concept setup and management',
          'Category management components',
          'Menu item CRUD operations',
          'Pricing and modifier management',
          'Menu preview functionality'
        ]
      },
      {
        id: 'task-2-3',
        name: 'Display Management Module',
        description: 'Implement display registration and configuration',
        priority: 'high',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'Display registration flow',
          'Display configuration interface',
          'Content assignment system',
          'Display preview and testing'
        ]
      },
      {
        id: 'task-2-4',
        name: 'Kiosk Management Module',
        description: 'Implement kiosk registration and configuration',
        priority: 'high',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'Kiosk registration system',
          'Kiosk configuration interface',
          'Content routing to kiosks',
          'Kiosk monitoring dashboard'
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    name: 'Phase 3: Advanced Features',
    description: 'Implement advanced functionality and integrations',
    duration: '3-4 weeks',
    status: 'not-started',
    dependencies: ['phase-2'],
    tasks: [
      {
        id: 'task-3-1',
        name: 'Order & Payment Management',
        description: 'Implement order tracking and payment provider integration',
        priority: 'high',
        effort: '2-3 weeks',
        status: 'not-started',
        deliverables: [
          'Order management system',
          'Payment provider integration (Stripe)',
          'Transaction tracking',
          'Order status management',
          'Payment terminal integration'
        ]
      },
      {
        id: 'task-3-2',
        name: 'Reporting Module',
        description: 'Create reporting components for sales, item performance, etc.',
        priority: 'medium',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'Sales reporting dashboard',
          'Item performance analytics',
          'Kitchen timing reports',
          'Modifier usage statistics',
          'Export functionality'
        ]
      },
      {
        id: 'task-3-3',
        name: 'KDC (Kitchen Display) Management',
        description: 'Implement kitchen display system management',
        priority: 'high',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'KDC registration and setup',
          'Kitchen order display interface',
          'Order routing to kitchen stations',
          'Kitchen timing and workflow management'
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    name: 'Phase 4: Integration & Testing',
    description: 'Ensure all modules work together seamlessly',
    duration: '2-3 weeks',
    status: 'not-started',
    dependencies: ['phase-3'],
    tasks: [
      {
        id: 'task-4-1',
        name: 'Integration Testing',
        description: 'Test all modules working together',
        priority: 'critical',
        effort: '1-2 weeks',
        status: 'not-started',
        deliverables: [
          'End-to-end test suite',
          'Integration test coverage',
          'Performance testing',
          'User acceptance testing'
        ]
      },
      {
        id: 'task-4-2',
        name: 'Documentation & Deployment',
        description: 'Create comprehensive documentation and deployment guides',
        priority: 'high',
        effort: '1 week',
        status: 'not-started',
        deliverables: [
          'User documentation',
          'Technical documentation',
          'Deployment guides',
          'Training materials'
        ]
      }
    ]
  }
];

const AdvancedProjectPlan: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const calculateProgress = (phase: Phase) => {
    const completedTasks = phase.tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = phase.tasks.filter(task => task.status === 'in-progress').length;
    const totalTasks = phase.tasks.length;
    
    return {
      completed: (completedTasks / totalTasks) * 100,
      inProgress: (inProgressTasks / totalTasks) * 100,
      total: totalTasks
    };
  };

  return (
    <div className="advanced-project-plan">
      <div className="plan-header">
        <h1>Advanced Project Plan</h1>
        <p>Comprehensive roadmap for building the Business Management Portal</p>
      </div>

      <div className="plan-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <h3>Total Phases</h3>
            <div className="stat-value">{projectPhases.length}</div>
          </div>
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <div className="stat-value">{projectPhases.reduce((sum, phase) => sum + phase.tasks.length, 0)}</div>
          </div>
          <div className="stat-card">
            <h3>Estimated Timeline</h3>
            <div className="stat-value">11-16 weeks</div>
          </div>
          <div className="stat-card">
            <h3>Critical Tasks</h3>
            <div className="stat-value">{projectPhases.reduce((sum, phase) => sum + phase.tasks.filter(t => t.priority === 'critical').length, 0)}</div>
          </div>
        </div>
      </div>

      <div className="plan-content">
        <div className="phases-timeline">
          <h2>Project Phases</h2>
          <div className="timeline">
            {projectPhases.map((phase, index) => {
              const progress = calculateProgress(phase);
              return (
                <div 
                  key={phase.id} 
                  className={`phase-card ${selectedPhase?.id === phase.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPhase(phase)}
                >
                  <div className="phase-header">
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-info">
                      <h3>{phase.name}</h3>
                      <p>{phase.description}</p>
                      <div className="phase-meta">
                        <span className="duration">⏱️ {phase.duration}</span>
                        <span className={`status ${phase.status}`}>{phase.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="phase-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill completed" 
                        style={{ width: `${progress.completed}%` }}
                      ></div>
                      <div 
                        className="progress-fill in-progress" 
                        style={{ width: `${progress.inProgress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{progress.total} tasks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="phase-details">
          <h2>Phase Details</h2>
          {selectedPhase ? (
            <div className="selected-phase">
              <h3>{selectedPhase.name}</h3>
              <p>{selectedPhase.description}</p>
              
              <div className="tasks-list">
                <h4>Tasks ({selectedPhase.tasks.length})</h4>
                {selectedPhase.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`task-card ${selectedTask?.id === task.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="task-header">
                      <div className="task-info">
                        <h5>{task.name}</h5>
                        <p>{task.description}</p>
                      </div>
                      <div className="task-meta">
                        <span className={`priority ${task.priority}`}>{task.priority}</span>
                        <span className={`status ${task.status}`}>{task.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="task-details">
                      <div className="task-effort">⏱️ {task.effort}</div>
                      <div className="task-deliverables">
                        📋 {task.deliverables.length} deliverables
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a phase to view details</p>
            </div>
          )}
        </div>
      </div>

      {selectedTask && (
        <div className="task-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedTask.name}</h3>
              <button className="close-btn" onClick={() => setSelectedTask(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Priority:</strong> <span className={`priority ${selectedTask.priority}`}>{selectedTask.priority}</span></p>
              <p><strong>Effort:</strong> {selectedTask.effort}</p>
              <p><strong>Status:</strong> <span className={`status ${selectedTask.status}`}>{selectedTask.status.replace('-', ' ')}</span></p>
              
              <div className="deliverables">
                <h4>Deliverables:</h4>
                <ul>
                  {selectedTask.deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedProjectPlan;