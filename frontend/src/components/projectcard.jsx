import React from 'react';

function ProjectCard({ project }) {
  return (
    <div style={styles.card}>
      <h3 style={{ margin: '0 0 10px 0' }}>{project.title}</h3>
      <p style={{ margin: '0 0 15px 0' }}>{project.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <small style={{ color: '#666' }}>Created by: <strong>{project.created_by}</strong></small>
        <span style={styles.taskBadge}>{project.task_count || 0} Tasks</span>
      </div>
    </div>
  );
}

const styles = {
  card: { 
    border: '1px solid #ddd', 
    padding: '15px', 
    borderRadius: '8px', 
    marginBottom: '15px', 
    backgroundColor: '#fff', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
  },
  taskBadge: {
    padding: '4px 8px',
    backgroundColor: '#6c757d',
    color: 'white',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
};

export default ProjectCard;