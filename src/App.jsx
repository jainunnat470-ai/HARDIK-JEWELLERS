import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import BisPolicy from './pages/BisPolicy';

// Simple Navigation Bar using localStorage for session
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    // Listen for storage changes if multiple tabs are open
    const handleStorageChange = () => setUserId(localStorage.getItem('userId'));
    window.addEventListener('storage', handleStorageChange);
    // Poll for changes to instantly update navbar in the same tab
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    navigate('/');
  };

  if (location.pathname === '/') return null;

  return (
    <div style={{ background: 'var(--royal-gold)', padding: '10px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '15px' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      {userId ? (
        <>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>My Scheme</Link>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Login / Register</Link>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/bis-policy" element={<BisPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
