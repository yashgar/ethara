import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../utils/auth';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials.username, credentials.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Log In to Ethara</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} 
          type="text" 
          name="username" 
          placeholder="Username" 
          required 
          onChange={handleChange} 
        />
        <input 
          style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }} 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          onChange={handleChange} 
        />
        <button 
          style={{ padding: '10px', fontSize: '16px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
          type="submit"
        >
          Log In
        </button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default Login;