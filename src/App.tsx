import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { GatewayArchitecture } from './pages/GatewayArchitecture/GatewayArchitecture';
import { GatewayEngine } from './pages/GatewayEngine/GatewayEngine';
import { BackendApi } from './pages/BackendApi/BackendApi';
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';
import { SreDevops } from './pages/SreDevops/SreDevops';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<GatewayArchitecture />} />
          <Route path="/gateway-engine" element={<GatewayEngine />} />
          <Route path="/backend-api" element={<BackendApi />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/sre-devops" element={<SreDevops />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
