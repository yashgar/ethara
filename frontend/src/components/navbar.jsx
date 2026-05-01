import React from 'react';
import { logoutUser } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ margin: 0 }}>Ethara</h2>
        <Link to="/dashboard" style={styles.link}>Tasks</Link>
        <Link to="/projects" style={styles.link}>Projects</Link>
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span>Welcome, <strong>{username}</strong> ({role})</span>
        <button onClick={handleLogout} style={styles.button}>Log Out</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#333', color: 'white', alignItems: 'center' },
  button: { padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  link: { color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '4px', '&:hover': { backgroundColor: '#555' } }
};

export default Navbar;