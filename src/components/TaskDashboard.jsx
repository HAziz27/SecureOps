import { useState } from 'react';
import { mockTasks } from '../utils/taskData';

export default function TaskDashboard() {
  const [tasks] = useState(mockTasks);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2 className="workspace-title">Task Workspace</h2>
          <p className="workspace-subtitle">Platform Engineering · Deploy Auth Changes</p>
        </div>
      </header>

      <div className="dashboard-grid">
        <div className="task-list-section">
          <h3 className="section-title">Deployment Checklist</h3>
          <p className="section-subtitle">3 of 14 tasks complete · 2 in progress</p>
          
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-info">
                  <span className={`task-number ${task.status === 'Completed' ? 'completed' : ''}`}>
                    {task.status === 'Completed' ? '✓' : task.id}
                  </span>
                  <div>
                    <h4 className="task-title">{task.title}</h4>
                    <p className="task-due">Due {task.dueDate}</p>
                  </div>
                </div>
                
                <div className="task-actions">
                  <span className={`status-badge ${task.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {task.status}
                  </span>
                  {task.isLocked && <span className="lock-icon">🔒</span>}
                  <button className="action-btn">↗</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="metrics-section">
          <div className="metrics-card">
            <h3 className="section-title">Task Metrics</h3>
            <div className="progress-ring-placeholder">
              <span className="progress-text">21%</span>
            </div>
            <div className="metrics-stats">
              <div><strong>3</strong><br/>DONE</div>
              <div><strong>2</strong><br/>ACTIVE</div>
              <div><strong>9</strong><br/>PENDING</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}