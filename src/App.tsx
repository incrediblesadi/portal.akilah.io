import { useState } from 'react';
import Layout from './components/Layout';
import RepoTreeMap from './components/RepoTreeMap';
import AdvancedProjectPlan from './components/AdvancedProjectPlan';
import DataFlowVisualization from './components/DataFlowVisualization';
import ArchitectureOverview from './components/ArchitectureOverview';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('repo-map');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'repo-map':
        return <RepoTreeMap />;
      case 'project-plan':
        return <AdvancedProjectPlan />;
      case 'data-flow':
        return <DataFlowVisualization />;
      case 'architecture':
        return <ArchitectureOverview />;
      default:
        return <RepoTreeMap />;
    }
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>
    </div>
  );
}

export default App;
