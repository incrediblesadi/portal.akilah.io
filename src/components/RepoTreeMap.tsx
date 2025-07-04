// Repository Tree Mapping Component
import React, { useState } from 'react';
import './RepoTreeMap.css';

interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'component' | 'service' | 'data';
  path: string;
  children?: TreeNode[];
  description?: string;
  relationships?: string[];
  status: 'current' | 'planned' | 'missing';
}

const currentStructure: TreeNode = {
  id: 'root',
  name: 'portal.akilah.io',
  type: 'folder',
  path: '/',
  status: 'current',
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      path: '/src',
      status: 'current',
      children: [
        {
          id: 'app',
          name: 'App.tsx',
          type: 'component',
          path: '/src/App.tsx',
          status: 'current',
          description: 'Main application component - currently a basic Todo app'
        },
        {
          id: 'main',
          name: 'main.tsx',
          type: 'component',
          path: '/src/main.tsx',
          status: 'current',
          description: 'Application entry point with Amplify configuration'
        }
      ]
    },
    {
      id: 'amplify',
      name: 'amplify',
      type: 'folder',
      path: '/amplify',
      status: 'current',
      children: [
        {
          id: 'data',
          name: 'data',
          type: 'folder',
          path: '/amplify/data',
          status: 'current',
          children: [
            {
              id: 'resource',
              name: 'resource.ts',
              type: 'service',
              path: '/amplify/data/resource.ts',
              status: 'current',
              description: 'GraphQL schema definition'
            }
          ]
        }
      ]
    }
  ]
};

const plannedStructure: TreeNode = {
  id: 'planned-root',
  name: 'portal.akilah.io (Planned)',
  type: 'folder',
  path: '/',
  status: 'planned',
  children: [
    {
      id: 'planned-src',
      name: 'src',
      type: 'folder',
      path: '/src',
      status: 'planned',
      children: [
        {
          id: 'pages',
          name: 'pages',
          type: 'folder',
          path: '/src/pages',
          status: 'planned',
          children: [
            {
              id: 'business-mgmt',
              name: 'BusinessManagementPages',
              type: 'folder',
              path: '/src/pages/BusinessManagementPages',
              status: 'planned',
              description: 'Business information setup and management',
              children: [
                {
                  id: 'setup-business',
                  name: 'SetupBusiness.jsx',
                  type: 'component',
                  path: '/src/pages/BusinessManagementPages/SetupBusiness.jsx',
                  status: 'planned',
                  description: 'Business info setup template built into JSON',
                  relationships: ['business-template', 'business-service']
                },
                {
                  id: 'view-business',
                  name: 'ViewBusinessInfo.jsx',
                  type: 'component',
                  path: '/src/pages/BusinessManagementPages/ViewBusinessInfo.jsx',
                  status: 'planned',
                  description: 'View business information'
                },
                {
                  id: 'edit-business',
                  name: 'EditBusinessInfo.jsx',
                  type: 'component',
                  path: '/src/pages/BusinessManagementPages/EditBusinessInfo.jsx',
                  status: 'planned',
                  description: 'Edit business information'
                }
              ]
            },
            {
              id: 'menu-mgmt',
              name: 'MenuManagementPages',
              type: 'folder',
              path: '/src/pages/MenuManagementPages',
              status: 'planned',
              description: 'Menu, concept, and item management',
              children: [
                {
                  id: 'concept-setup',
                  name: 'ConceptSetup',
                  type: 'folder',
                  path: '/src/pages/MenuManagementPages/ConceptSetup',
                  status: 'planned',
                  children: [
                    {
                      id: 'setup-concept',
                      name: 'SetupConcept.jsx',
                      type: 'component',
                      path: '/src/pages/MenuManagementPages/ConceptSetup/SetupConcept.jsx',
                      status: 'planned',
                      relationships: ['concept-template']
                    }
                  ]
                }
              ]
            },
            {
              id: 'display-mgmt',
              name: 'DisplayManagementPages',
              type: 'folder',
              path: '/src/pages/DisplayManagementPages',
              status: 'planned',
              description: 'Digital display management and configuration'
            },
            {
              id: 'kiosk-mgmt',
              name: 'KioskManagementPages',
              type: 'folder',
              path: '/src/pages/KioskManagementPages',
              status: 'planned',
              description: 'Kiosk registration and management'
            }
          ]
        },
        {
          id: 'components',
          name: 'components',
          type: 'folder',
          path: '/src/components',
          status: 'planned',
          children: [
            {
              id: 'layout',
              name: 'Layout',
              type: 'component',
              path: '/src/components/Layout',
              status: 'planned',
              description: 'Main layout component with sidebar navigation'
            },
            {
              id: 'sidebar',
              name: 'SideBar',
              type: 'component',
              path: '/src/components/SideBar',
              status: 'planned',
              description: 'Navigation sidebar component'
            }
          ]
        },
        {
          id: 'services',
          name: 'services',
          type: 'folder',
          path: '/src/services',
          status: 'planned',
          children: [
            {
              id: 'business-service',
              name: 'businessService.js',
              type: 'service',
              path: '/src/services/businessService.js',
              status: 'planned',
              description: 'Business data loading and saving service'
            }
          ]
        }
      ]
    },
    {
      id: 'middleware',
      name: 'middleware',
      type: 'folder',
      path: '/middleware',
      status: 'planned',
      children: [
        {
          id: 'business-middleware',
          name: 'businessmanagement',
          type: 'folder',
          path: '/middleware/businessmanagement',
          status: 'planned',
          children: [
            {
              id: 'retrieve-business',
              name: 'retrievebusinessinfo.js',
              type: 'service',
              path: '/middleware/businessmanagement/retrievebusinessinfo.js',
              status: 'planned',
              description: 'API route for retrieving business information'
            }
          ]
        }
      ]
    },
    {
      id: 'templates',
      name: 'templates',
      type: 'folder',
      path: '/templates',
      status: 'planned',
      children: [
        {
          id: 'business-template',
          name: 'businesstemplate.json',
          type: 'data',
          path: '/templates/businesstemplate.json',
          status: 'planned',
          description: 'Business information template structure'
        },
        {
          id: 'concept-template',
          name: 'concepttemplate.json',
          type: 'data',
          path: '/templates/concepttemplate.json',
          status: 'planned',
          description: 'Concept information template structure'
        }
      ]
    }
  ]
};

interface RepoTreeMapProps {
  showPlanned?: boolean;
}

const RepoTreeMap: React.FC<RepoTreeMapProps> = ({ showPlanned = true }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'planned-root', 'src', 'planned-src']));
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderTree = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="tree-node">
        <div 
          className={`tree-node-content ${node.status} ${selectedNode?.id === node.id ? 'selected' : ''}`}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => setSelectedNode(node)}
        >
          {hasChildren && (
            <button 
              className="tree-toggle"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          <div className={`tree-icon ${node.type}`}>
            {getIcon(node.type)}
          </div>
          <span className="tree-name">{node.name}</span>
          <span className={`tree-status ${node.status}`}>{node.status}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="tree-children">
            {node.children?.map(child => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return '📁';
      case 'file': return '📄';
      case 'component': return '⚛️';
      case 'service': return '🔧';
      case 'data': return '💾';
      default: return '📄';
    }
  };

  return (
    <div className="repo-tree-map">
      <div className="repo-tree-header">
        <h1>Repository Tree Map & Relational Index</h1>
        <p>Interactive visualization of current and planned repository structure</p>
      </div>
      
      <div className="repo-tree-container">
        <div className="repo-tree-view">
          <div className="tree-section">
            <h2>Current Structure</h2>
            {renderTree(currentStructure)}
          </div>
          
          {showPlanned && (
            <div className="tree-section">
              <h2>Planned Structure</h2>
              {renderTree(plannedStructure)}
            </div>
          )}
        </div>
        
        <div className="repo-tree-details">
          <h3>Node Details</h3>
          {selectedNode ? (
            <div className="node-details">
              <h4>{selectedNode.name}</h4>
              <p><strong>Type:</strong> {selectedNode.type}</p>
              <p><strong>Path:</strong> {selectedNode.path}</p>
              <p><strong>Status:</strong> {selectedNode.status}</p>
              {selectedNode.description && (
                <p><strong>Description:</strong> {selectedNode.description}</p>
              )}
              {selectedNode.relationships && selectedNode.relationships.length > 0 && (
                <div>
                  <strong>Relationships:</strong>
                  <ul>
                    {selectedNode.relationships.map(rel => (
                      <li key={rel}>{rel}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Click on a node to view details</p>
          )}
        </div>
      </div>
      
      <div className="repo-tree-legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color current"></span>
            <span>Current - Already implemented</span>
          </div>
          <div className="legend-item">
            <span className="legend-color planned"></span>
            <span>Planned - To be implemented</span>
          </div>
          <div className="legend-item">
            <span className="legend-color missing"></span>
            <span>Missing - Critical components needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTreeMap;