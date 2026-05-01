import React, { useState } from 'react';
import api from '../services/api';

function TaskCard({ task, onTaskUpdate }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const userRole = localStorage.getItem('role'); 
  const currentUsername = localStorage.getItem('username');

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/tasks/${task._id}/recommendations`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  const assignUser = async (username) => {
    try {
      await api.put(`/tasks/${task._id}`, { assign_user: username, status: "In Progress" });
      if (onTaskUpdate) onTaskUpdate(); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign user.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await api.delete(`/tasks/${task._id}`);
        if (onTaskUpdate) onTaskUpdate();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete task.");
      }
    }
  };

  const completeTask = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { status: "Completed" });
      if (onTaskUpdate) onTaskUpdate(); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to complete task.");
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'Completed';

  return (
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ margin: 0 }}>{task.title}</h3>
          {userRole === 'Admin' && (
            <button onClick={handleDelete} style={styles.deleteButton} title="Delete Task">
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
            {isOverdue && <span style={{...styles.badge(''), backgroundColor: '#dc3545'}}>OVERDUE</span>}
            <span style={styles.badge(task.status)}>{task.status || 'Open'}</span>
        </div>

      </div>
      
      <p>{task.description}</p>
      <p><strong>Required Skills:</strong> {task.required_skills ? task.required_skills.join(', ') : 'None'}</p>
      <p><strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date set'}</p>
      {task.assigned_users && task.assigned_users.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#28a745', margin: '10px 0' }}>
            <strong>Assigned Team:</strong> {task.assigned_users.join(', ')}
          </p>
          
          {userRole === 'Member' && task.assigned_users.includes(currentUsername) && task.status !== 'Completed' && (
            <button onClick={completeTask} style={styles.completeButton}>
              Mark as Completed
            </button>
          )}
        </div>
      )}

      {userRole === 'Admin' && task.status !== 'Completed' && (
        <button onClick={getRecommendations} style={styles.aiButton} disabled={loading}>
          {loading ? "Analyzing Skills..." : "Find Best Team"}
        </button>
      )}

      {userRole === 'Admin' && recommendations && task.status !== 'Completed' && (
        <div style={styles.recBox}>
          <h4>Top Recommended Users:</h4>
          {recommendations.filter(rec => !(task.assigned_users || []).includes(rec.username)).length > 0 ? (
            <ul style={{ paddingLeft: '20px', listStyle: 'none' }}>
              
              {recommendations
                .filter(rec => !(task.assigned_users || []).includes(rec.username))
                .map((rec, index) => (
                <li key={index} style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{rec.username}</strong> - <span style={{color: '#6f42c1'}}><b>{rec.match_score}% Match</b></span><br/>
                    <small style={{ color: '#555' }}>Skills: {rec.skills.join(', ')}</small>
                  </div>
                  <button onClick={() => assignUser(rec.username)} style={styles.assignButton}>Assign</button>
                </li>
              ))}

            </ul>
          ) : (
            <p style={{ color: 'red' }}>No more matching users available.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  aiButton: { padding: '10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px', fontWeight: 'bold' },
  assignButton: { padding: '6px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  completeButton: { padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  deleteButton: { padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  recBox: { marginTop: '15px', padding: '15px', border: '1px solid #e9ecef', backgroundColor: '#f8f9fa', borderRadius: '8px' },
  badge: (status) => ({
    padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: 'white',
    backgroundColor: status === 'In Progress' ? '#17a2b8' : status === 'Completed' ? '#28a745' : '#6c757d'
  })
};

export default TaskCard;