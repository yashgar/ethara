import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/navbar';
import ProjectCard from '../components/projectcard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/');
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects/', {
        title: newProject.title,
        description: newProject.description
      });
      
      alert(response.data.message);
      setNewProject({ title: '', description: '' });
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating project");
      console.error("Project Error:", error.response?.data);
    }
  };
  const userRole = localStorage.getItem('role');

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {userRole === 'Admin' && (
          <div style={styles.createBox}>
            <h3>Start a New Project</h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                style={styles.input} type="text" placeholder="Project Title" required 
                value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} 
              />
              <input 
                style={styles.input} type="text" placeholder="Project Description" required 
                value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} 
              />
              <button type="submit" style={styles.button}>Create Project</button>
            </form>
          </div>
        )}

        <h2>All Projects</h2>
        {projects.length > 0 ? (
          projects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p style={{ color: '#666' }}></p>
        )}

      </div>
    </div>
  );
}

const styles = {
  createBox: { padding: '20px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', marginBottom: '30px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' },
  button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }
};

export default Projects;