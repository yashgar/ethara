import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/auth';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Member',
    skills: '' 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
      
      await registerUser({
        username: formData.username,
        password: formData.password,
        role: formData.role,
        skills: skillsArray
      });
      
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input style={styles.input} type="password" name="password" placeholder="Password" required onChange={handleChange} />
        
        <select style={styles.input} name="role" value={formData.role} onChange={handleChange}>
          <option value="Member">Team Member</option>
          <option value="Admin">Admin</option>
        </select>

        <input 
          style={styles.input} 
          type="text" 
          name="skills" 
          placeholder="Skills (e.g., Python, React, UI Design)" 
          onChange={handleChange} 
        />
        
        <button style={styles.button} type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in here</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Signup;