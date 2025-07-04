import { useState } from 'react';
import Tree from 'react-d3-tree';
import { Box, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { repoStructure } from './repoStructure';
import './RepositoryMap.css';

const containerStyles = {
  width: '100%',
  height: '80vh',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative' as const,
  backgroundColor: '#f5f5f5',
};

const controlsStyles = {
  position: 'absolute' as const,
  top: '10px',
  right: '10px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '10px',
};

interface NodeDatum {
  name: string;
  description?: string;
  path?: string;
  children?: NodeDatum[];
}

interface RenderCustomNodeProps {
  nodeDatum: NodeDatum;
  toggleNode: () => void;
  onNodeClick: (node: any) => void;
}

const renderCustomNodeElement = ({ nodeDatum, toggleNode, onNodeClick }: RenderCustomNodeProps) => (
  <g>
    <circle r={15} fill={nodeDatum.children ? '#5469d4' : '#4caf50'} onClick={toggleNode} />
    <Tooltip title={nodeDatum.description || 'No description available'}>
      <g>
        <text
          fill="white"
          strokeWidth="0.5"
          x="0"
          y="5"
          textAnchor="middle"
          style={{ fontSize: '12px', fontWeight: 'bold' }}
          onClick={() => onNodeClick({ data: nodeDatum })}
        >
          {nodeDatum.name.charAt(0).toUpperCase()}
        </text>
      </g>
    </Tooltip>
    <text
      fill="#212121"
      x="25"
      y="5"
      style={{ fontSize: '14px' }}
      onClick={() => onNodeClick({ data: nodeDatum })}
    >
      {nodeDatum.name}
    </text>
  </g>
);

const RepositoryMap = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(0.6);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleNodeClick = (node: any) => {
    if (node.data && node.data.path) {
      navigate(node.data.path);
    }
  };

  const handleZoomIn = () => {
    setZoom((prevZoom: number) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom: number) => Math.max(prevZoom - 0.1, 0.1));
  };

  const handleHomeClick = () => {
    setZoom(0.6);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Repository Structure
        </Typography>
        <Tooltip title="Click on nodes to navigate to the corresponding pages">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This interactive map shows the structure of the Business Management Portal. Click on nodes to navigate to the corresponding pages.
      </Typography>
      <Box sx={containerStyles}>
        <Box sx={controlsStyles}>
          <IconButton onClick={handleZoomIn} sx={{ bgcolor: 'white' }}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={handleZoomOut} sx={{ bgcolor: 'white' }}>
            <ZoomOutIcon />
          </IconButton>
          <IconButton onClick={handleHomeClick} sx={{ bgcolor: 'white' }}>
            <HomeIcon />
          </IconButton>
        </Box>
        <Tree
          data={repoStructure}
          orientation="horizontal"
          translate={{ x: 200 + translate.x, y: 300 + translate.y }}
          zoom={zoom}
          onNodeClick={handleNodeClick}
          renderCustomNodeElement={(rd3tProps: any) =>
            renderCustomNodeElement({
              ...rd3tProps,
              onNodeClick: handleNodeClick,
            })
          }
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          nodeSize={{ x: 200, y: 100 }}
          pathClassFunc={() => 'custom-link'}
        />
      </Box>
    </Paper>
  );
};

export default RepositoryMap;