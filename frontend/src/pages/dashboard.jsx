import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/navbar';
import TaskCard from '../components/taskcard';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', required_skills: '', due_date: '', project_id: '' });
  
  const userRole = localStorage.getItem('role');

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };
  const fetchProjects = async () => {
  try {
    const response = await api.get('/projects/');
    setProjects(response.data);
  } catch (error) {
    console.error("Error fetching projects", error);
  }
};
  useEffect(() => {
  fetchTasks();
  const userRole = localStorage.getItem('role');
  if (userRole === 'Admin') {
    fetchProjects();
  }
}, []);

  const handleCreateTask = async (e) => {
  e.preventDefault();
  try {
    const skillsArray = newTask.required_skills.split(',').map(s => s.trim()).filter(s => s !== '');
    
    await api.post('/tasks/', {
      title: newTask.title,
      description: newTask.description,
      required_skills: skillsArray,
      due_date: newTask.due_date,
      project_id: newTask.project_id
    });
    
    setNewTask({ title: '', description: '', required_skills: '', due_date: '', project_id: '' }); 
    fetchTasks(); 
  } catch (error) {
    console.error("Error creating task", error);
  }
};

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        
        {userRole === 'Admin' && (
          <div style={styles.createBox}>
            <h3>Create a New Task</h3>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                style={styles.input} type="text" placeholder="Task Title" required 
                value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} 
              />
              <input 
                style={styles.input} type="text" placeholder="Description" required 
                value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} 
              />
              <input 
                style={styles.input} type="text" placeholder="Required Skills (comma separated, e.g. React, Python)" required 
                value={newTask.required_skills} onChange={e => setNewTask({...newTask, required_skills: e.target.value})} 
              />
              <input 
                style={styles.input} 
                type="date" 
                required 
                value={newTask.due_date} 
                onChange={e => setNewTask({...newTask, due_date: e.target.value})} 
              />
              <select 
                style={styles.input} 
                required 
                value={newTask.project_id} 
                onChange={e => setNewTask({...newTask, project_id: e.target.value})}
              >
                <option value="" disabled>Select a Project</option>
                {projects && projects.length > 0 ? (
                  projects.map(proj => (
                    <option key={proj._id} value={proj._id}>{proj.title}</option>
                  ))
                ) : (
                  <option disabled>Loading projects...</option>
                )}
              </select>
              <button type="submit" style={styles.button}>Create Task</button>
            </form>
          </div>
        )}

        <h2>All Tasks</h2>
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onTaskUpdate={fetchTasks} />
        ))}

      </div>
    </div>
  );
}

const styles = {
  createBox: { padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '30px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Dashboard;