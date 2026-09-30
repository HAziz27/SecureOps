import { useState } from 'react';
import { Activity, Lock, Clock, CheckCircle2, Circle } from 'lucide-react';
import { INITIAL_TASKS, INITIAL_LOGS } from '../utils/taskData';
import TaskModal from './TaskModal';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [selectedTask, setSelectedTask] = useState(null);

  // --- METRICS CALCULATIONS ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'todo').length;
  const lockedEvidenceCount = tasks.filter(t => t.evidenceLocked).length;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const donePct = (completedTasks / totalTasks) * 100;
  const activePct = donePct + ((inProgressTasks / totalTasks) * 100);

  // --- HELPER TO ADD AUDIT LOGS WITH DATE & TIME ---
  const addLog = (text) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestamp = `${dateStr}, ${timeStr}`;

    setLogs(prev => [{ id: Date.now().toString(), text, timestamp }, ...prev]);
  };

  // --- STATE HANDLERS ---
  const updateTask = (taskId, updates) => {
    const targetTask = tasks.find(t => t.id === taskId);
    
    if (updates.status && updates.status !== targetTask.status) {
      addLog(`Step ${targetTask.step} status changed to ${updates.status.replace('-', ' ')}`);
    }
    if (updates.evidenceLocked === true) {
      addLog(`Evidence locked for Step ${targetTask.step}`);
    } else if (updates.evidenceLocked === false && targetTask.evidenceLocked) {
      addLog(`Evidence unlocked for Step ${targetTask.step}`);
    }

    setTasks(tasks.map(t => t.id === taskId ? { ...t, ...updates } : t));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({ ...prev, ...updates }));
    }
  };

  const cycleStatus = (e, taskId, currentStatus) => {
    e.stopPropagation(); 
    const nextStatus = currentStatus === 'todo' ? 'in-progress' : currentStatus === 'in-progress' ? 'completed' : 'todo';
    updateTask(taskId, { status: nextStatus });
  };

  // Helper to render badge with correct icon
  const renderBadgeContent = (status) => {
    if (status === 'completed') {
      return <><CheckCircle2 size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Completed</>;
    }
    if (status === 'in-progress') {
      return <><Clock size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> In Progress</>;
    }
    return <><Circle size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> To Do</>;
  };

  return (
    <div className="dashboard-container">
      
      {/* Left Panel: Task List */}
      <div className="task-panel">
        <h2 className="task-header">Deployment Checklist</h2>
        
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card" onClick={() => setSelectedTask(task)}>
              <div className="task-info">
                <div className="step-indicator">{task.step}</div>
                <div className="task-title">{task.title}</div>
              </div>
              <div className="task-actions">
                <button 
                  className={`badge ${task.status}`} 
                  onClick={(e) => cycleStatus(e, task.id, task.status)}
                  style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}
                >
                  {renderBadgeContent(task.status)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Dynamic Metrics & Recent Activity */}
      <div className="metrics-panel">
        
        <div className="task-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '24px', cursor: 'default' }}>
          
          <div className="metrics-header">
            <Activity size={16} />
            TASK METRICS
          </div>
          
          {/* Donut Chart */}
          <div className="donut-container">
            <div 
              className="donut-chart"
              style={{
                background: `conic-gradient(
                  var(--status-done-bg) 0% ${donePct}%, 
                  var(--status-prog-bg) ${donePct}% ${activePct}%, 
                  var(--status-todo-bg) ${activePct}% 100%
                )`
              }}
            >
              <div className="donut-hole">
                <div className="donut-percentage">{completionPercentage}%</div>
                <div className="donut-label">Complete</div>
              </div>
            </div>
            
            <div className="legend-container">
              <div className="legend-item"><span className="legend-dot" style={{ backgroundColor: 'var(--status-done-bg)' }}></span> Done</div>
              <div className="legend-item"><span className="legend-dot" style={{ backgroundColor: 'var(--status-prog-bg)' }}></span> Active</div>
              <div className="legend-item"><span className="legend-dot" style={{ backgroundColor: 'var(--status-todo-bg)' }}></span> Pending</div>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="metric-grid">
            <div className="metric-box" style={{ backgroundColor: 'var(--status-done-bg)', color: 'var(--status-done-text)' }}>
              <div className="metric-value">{completedTasks}</div>
              <div className="metric-label">Done</div>
            </div>
            <div className="metric-box" style={{ backgroundColor: 'var(--status-prog-bg)', color: 'var(--status-prog-text)' }}>
              <div className="metric-value">{inProgressTasks}</div>
              <div className="metric-label">Active</div>
            </div>
            <div className="metric-box" style={{ backgroundColor: 'var(--status-todo-bg)', color: 'var(--status-todo-text)' }}>
              <div className="metric-value">{pendingTasks}</div>
              <div className="metric-label">Pending</div>
            </div>
          </div>

          {/* Evidence Counter */}
          <div className="metric-locked">
            <Lock size={14} />
            {lockedEvidenceCount} of {totalTasks} evidence locked
          </div>

        </div>

        {/* Recent Activity Panel */}
        <div className="audit-panel">
          <div className="audit-header">
            <Clock size={14} />
            RECENT ACTIVITY
          </div>
          <div className="audit-list">
            {logs.map((log) => (
              <div key={log.id} className="audit-item">
                <span className="audit-text">{log.text}</span>
                <span className="audit-time">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}