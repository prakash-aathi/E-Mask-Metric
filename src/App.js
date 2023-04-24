import './index.css';
import Dashboard from './pages/Dashboard'
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import { HashRouter,Route,Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Setting from './pages/Setting';

function App() {

  return (
    <>
      <HashRouter >
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/" element={<RegisterPage />} />
              </Routes>
        </HashRouter>

    </>
  );
}

export default App;
