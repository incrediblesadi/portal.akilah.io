// Data Flow Visualization Component
import React, { useState } from 'react';
import './DataFlowVisualization.css';

interface DataFlowNode {
  id: string;
  name: string;
  type: 'page' | 'service' | 'api' | 'database' | 'template' | 'user';
  description: string;
  position: { x: number; y: number };
  connections: string[];
  dataTypes: string[];
}

interface DataFlowConnection {
  from: string;
  to: string;
  label: string;
  type: 'read' | 'write' | 'bidirectional';
  dataFlow: string;
}

const dataFlowNodes: DataFlowNode[] = [
  {
    id: 'user',
    name: 'Business User',
    type: 'user',
    description: 'Restaurant owner/manager using the portal',
    position: { x: 50, y: 50 },
    connections: ['setup-business', 'view-business'],
    dataTypes: ['user-input', 'business-data']
  },
  {
    id: 'setup-business',
    name: 'SetupBusiness.jsx',
    type: 'page',
    description: 'Business setup page component',
    position: { x: 250, y: 50 },
    connections: ['business-service', 'business-template'],
    dataTypes: ['form-data', 'business-info']
  },
  {
    id: 'view-business',
    name: 'ViewBusinessInfo.jsx',
    type: 'page',
    description: 'Business info view component',
    position: { x: 250, y: 150 },
    connections: ['business-service'],
    dataTypes: ['business-data']
  },
  {
    id: 'business-service',
    name: 'businessService.js',
    type: 'service',
    description: 'Business data service layer',
    position: { x: 450, y: 100 },
    connections: ['business-api', 'user-config'],
    dataTypes: ['business-data', 'service-calls']
  },
  {
    id: 'business-api',
    name: 'retrievebusinessinfo.js',
    type: 'api',
    description: 'API middleware for business operations',
    position: { x: 650, y: 100 },
    connections: ['business-database', 'user-config'],
    dataTypes: ['api-requests', 'business-data']
  },
  {
    id: 'user-config',
    name: 'userconfig.json',
    type: 'template',
    description: 'User configuration determining data folder',
    position: { x: 450, y: 250 },
    connections: ['business-database'],
    dataTypes: ['config-data', 'user-settings']
  },
  {
    id: 'business-database',
    name: 'restaurant-information.json',
    type: 'database',
    description: 'Business data storage',
    position: { x: 650, y: 250 },
    connections: ['business-template'],
    dataTypes: ['business-data', 'stored-data']
  },
  {
    id: 'business-template',
    name: 'businesstemplate.json',
    type: 'template',
    description: 'Business data structure template',
    position: { x: 450, y: 350 },
    connections: [],
    dataTypes: ['template-structure', 'validation-rules']
  },
  {
    id: 'concept-setup',
    name: 'SetupConcept.jsx',
    type: 'page',
    description: 'Concept setup page',
    position: { x: 50, y: 300 },
    connections: ['menu-service', 'concept-template'],
    dataTypes: ['concept-data', 'menu-structure']
  },
  {
    id: 'menu-service',
    name: 'menuService.js',
    type: 'service',
    description: 'Menu management service',
    position: { x: 250, y: 300 },
    connections: ['menu-api'],
    dataTypes: ['menu-data', 'concept-data']
  },
  {
    id: 'menu-api',
    name: 'menuapi.js',
    type: 'api',
    description: 'Menu API middleware',
    position: { x: 450, y: 400 },
    connections: ['concept-database'],
    dataTypes: ['menu-operations', 'concept-data']
  },
  {
    id: 'concept-database',
    name: 'concept-data.json',
    type: 'database',
    description: 'Concept and menu data storage',
    position: { x: 650, y: 400 },
    connections: ['concept-template'],
    dataTypes: ['concept-data', 'menu-items']
  },
  {
    id: 'concept-template',
    name: 'concepttemplate.json',
    type: 'template',
    description: 'Concept data structure template',
    position: { x: 650, y: 350 },
    connections: [],
    dataTypes: ['concept-structure', 'menu-schema']
  }
];

const dataFlowConnections: DataFlowConnection[] = [
  {
    from: 'user',
    to: 'setup-business',
    label: 'User Input',
    type: 'write',
    dataFlow: 'Business information, hours, contact details'
  },
  {
    from: 'user',
    to: 'view-business',
    label: 'View Request',
    type: 'read',
    dataFlow: 'Request to view business information'
  },
  {
    from: 'setup-business',
    to: 'business-service',
    label: 'Save Business Data',
    type: 'write',
    dataFlow: 'Form data with business information'
  },
  {
    from: 'view-business',
    to: 'business-service',
    label: 'Load Business Data',
    type: 'read',
    dataFlow: 'Request for business information'
  },
  {
    from: 'business-service',
    to: 'business-api',
    label: 'API Call',
    type: 'bidirectional',
    dataFlow: 'Business data operations'
  },
  {
    from: 'business-api',
    to: 'user-config',
    label: 'Read Config',
    type: 'read',
    dataFlow: 'User-specific configuration'
  },
  {
    from: 'business-api',
    to: 'business-database',
    label: 'Data Operations',
    type: 'bidirectional',
    dataFlow: 'Read/write business information'
  },
  {
    from: 'business-database',
    to: 'business-template',
    label: 'Validation',
    type: 'read',
    dataFlow: 'Data structure validation'
  },
  {
    from: 'setup-business',
    to: 'business-template',
    label: 'Template Usage',
    type: 'read',
    dataFlow: 'Form structure and validation'
  },
  {
    from: 'concept-setup',
    to: 'menu-service',
    label: 'Concept Data',
    type: 'write',
    dataFlow: 'Concept information and menu structure'
  },
  {
    from: 'menu-service',
    to: 'menu-api',
    label: 'Menu Operations',
    type: 'bidirectional',
    dataFlow: 'Menu CRUD operations'
  },
  {
    from: 'menu-api',
    to: 'concept-database',
    label: 'Store Data',
    type: 'bidirectional',
    dataFlow: 'Concept and menu data storage'
  },
  {
    from: 'concept-database',
    to: 'concept-template',
    label: 'Schema Validation',
    type: 'read',
    dataFlow: 'Data structure validation'
  },
  {
    from: 'concept-setup',
    to: 'concept-template',
    label: 'Template Reference',
    type: 'read',
    dataFlow: 'Form structure and validation rules'
  }
];

const DataFlowVisualization: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<DataFlowNode | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<DataFlowConnection | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: DataFlowNode) => {
    setSelectedNode(node);
    setSelectedConnection(null);
    
    // Highlight connected nodes
    const connected = new Set([node.id, ...node.connections]);
    // Also highlight nodes that connect to this node
    dataFlowConnections.forEach(conn => {
      if (conn.from === node.id || conn.to === node.id) {
        connected.add(conn.from);
        connected.add(conn.to);
      }
    });
    setHighlightedNodes(connected);
  };

  const handleConnectionClick = (connection: DataFlowConnection) => {
    setSelectedConnection(connection);
    setSelectedNode(null);
    setHighlightedNodes(new Set([connection.from, connection.to]));
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'page': return '📄';
      case 'service': return '⚙️';
      case 'api': return '🔌';
      case 'database': return '🗄️';
      case 'template': return '📋';
      default: return '📦';
    }
  };

  const getConnectionPath = (from: DataFlowNode, to: DataFlowNode) => {
    const fromX = from.position.x + 75; // Half of node width
    const fromY = from.position.y + 40; // Half of node height
    const toX = to.position.x + 75;
    const toY = to.position.y + 40;
    
    return `M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${(fromY + toY) / 2 - 50} ${toX} ${toY}`;
  };

  const getArrowPath = (from: DataFlowNode, to: DataFlowNode) => {
    const toX = to.position.x + 75;
    const toY = to.position.y + 40;
    const angle = Math.atan2(to.position.y - from.position.y, to.position.x - from.position.x);
    
    const arrowLength = 10;
    
    const x1 = toX - arrowLength * Math.cos(angle - Math.PI / 6);
    const y1 = toY - arrowLength * Math.sin(angle - Math.PI / 6);
    const x2 = toX - arrowLength * Math.cos(angle + Math.PI / 6);
    const y2 = toY - arrowLength * Math.sin(angle + Math.PI / 6);
    
    return `M ${toX} ${toY} L ${x1} ${y1} M ${toX} ${toY} L ${x2} ${y2}`;
  };

  return (
    <div className="data-flow-visualization">
      <div className="flow-header">
        <h1>Data Flow & Relational Index</h1>
        <p>Interactive visualization of data flow between components</p>
      </div>

      <div className="flow-container">
        <div className="flow-diagram">
          <svg width="800" height="500" viewBox="0 0 800 500">
            {/* Connections */}
            {dataFlowConnections.map(conn => {
              const fromNode = dataFlowNodes.find(n => n.id === conn.from);
              const toNode = dataFlowNodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = highlightedNodes.has(conn.from) && highlightedNodes.has(conn.to);
              const isSelected = selectedConnection?.from === conn.from && selectedConnection?.to === conn.to;

              return (
                <g key={`${conn.from}-${conn.to}`}>
                  <path
                    d={getConnectionPath(fromNode, toNode)}
                    className={`connection-path ${conn.type} ${isHighlighted ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleConnectionClick(conn)}
                  />
                  <path
                    d={getArrowPath(fromNode, toNode)}
                    className={`connection-arrow ${conn.type} ${isHighlighted ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}`}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {dataFlowNodes.map(node => {
              const isHighlighted = highlightedNodes.has(node.id);
              const isSelected = selectedNode?.id === node.id;

              return (
                <g key={node.id}>
                  <rect
                    x={node.position.x}
                    y={node.position.y}
                    width="150"
                    height="80"
                    className={`node-rect ${node.type} ${isHighlighted ? 'highlighted' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleNodeClick(node)}
                  />
                  <text
                    x={node.position.x + 20}
                    y={node.position.y + 20}
                    className="node-icon"
                  >
                    {getNodeIcon(node.type)}
                  </text>
                  <text
                    x={node.position.x + 45}
                    y={node.position.y + 25}
                    className="node-name"
                  >
                    {node.name}
                  </text>
                  <text
                    x={node.position.x + 10}
                    y={node.position.y + 45}
                    className="node-type"
                  >
                    {node.type}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flow-details">
          <h3>Details</h3>
          {selectedNode && (
            <div className="node-details">
              <h4>{selectedNode.name}</h4>
              <p><strong>Type:</strong> {selectedNode.type}</p>
              <p><strong>Description:</strong> {selectedNode.description}</p>
              <div className="data-types">
                <strong>Data Types:</strong>
                <ul>
                  {selectedNode.dataTypes.map(type => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
              </div>
              <div className="connections">
                <strong>Connections:</strong>
                <ul>
                  {selectedNode.connections.map(connId => {
                    const connectedNode = dataFlowNodes.find(n => n.id === connId);
                    return connectedNode ? (
                      <li key={connId}>{connectedNode.name}</li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          )}

          {selectedConnection && (
            <div className="connection-details">
              <h4>Data Flow Connection</h4>
              <p><strong>From:</strong> {dataFlowNodes.find(n => n.id === selectedConnection.from)?.name}</p>
              <p><strong>To:</strong> {dataFlowNodes.find(n => n.id === selectedConnection.to)?.name}</p>
              <p><strong>Type:</strong> {selectedConnection.type}</p>
              <p><strong>Label:</strong> {selectedConnection.label}</p>
              <p><strong>Data Flow:</strong> {selectedConnection.dataFlow}</p>
            </div>
          )}

          {!selectedNode && !selectedConnection && (
            <p>Click on a node or connection to view details</p>
          )}
        </div>
      </div>

      <div className="flow-legend">
        <h3>Legend</h3>
        <div className="legend-section">
          <h4>Node Types</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon">👤</span>
              <span>User - End user interacting with the system</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">📄</span>
              <span>Page - React component/page</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">⚙️</span>
              <span>Service - Business logic service</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🔌</span>
              <span>API - API middleware/endpoint</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🗄️</span>
              <span>Database - Data storage</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">📋</span>
              <span>Template - Data structure template</span>
            </div>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>Connection Types</h4>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-color read"></span>
              <span>Read - Data flows from source to destination</span>
            </div>
            <div className="legend-item">
              <span className="legend-color write"></span>
              <span>Write - Data flows from destination to source</span>
            </div>
            <div className="legend-item">
              <span className="legend-color bidirectional"></span>
              <span>Bidirectional - Data flows in both directions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowVisualization;