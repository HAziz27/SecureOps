import { useState } from 'react';
import { X, Upload, Lock, CheckCircle2, Circle, Clock, ExternalLink, History, FileCheck } from 'lucide-react';

export default function TaskModal({ task, onClose, onUpdate }) {
  const getFormattedTimestamp = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dateStr}, ${timeStr}`;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newEntry = { text: "Evidence locked", time: getFormattedTimestamp() };
      const updatedTrail = [newEntry, ...(task.auditTrail || [])];
      onUpdate(task.id, { 
        evidenceFile: file.name, 
        evidenceLocked: true,
        auditTrail: updatedTrail
      });
    }
  };

  const handleUnlock = () => {
    const newEntry = { text: "Evidence unlocked", time: getFormattedTimestamp() };
    const updatedTrail = [newEntry, ...(task.auditTrail || [])];
    onUpdate(task.id, { 
      evidenceFile: null, 
      evidenceLocked: false,
      auditTrail: updatedTrail
    });
  };

  const renderBadgeContent = (status) => {
    if (status === 'completed') {
      return <><CheckCircle2 size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Completed</>;
    }
    if (status === 'in-progress') {
      return <><Clock size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> In Progress</>;
    }
    return <><Circle size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> To Do</>;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7BAE98', marginBottom: '6px' }}>
              {task.track || "Deploy Auth Changes"} · Platform Engineering
            </div>
            <h2 className="modal-title">Step {task.step}: {task.title}</h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
              <span className={`badge ${task.status}`} style={{ display: 'inline-flex', alignItems: 'center', fontSize: '12px', padding: '6px 12px' }}>
                {renderBadgeContent(task.status)}
              </span>
              {task.evidenceLocked && (
                <span className="badge completed" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '12px', padding: '6px 12px' }}>
                  <Lock size={12} style={{ marginRight: '4px' }} /> Evidence Locked
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Modal Body - Split Grid */}
        <div className="modal-body">
          <div style={{ fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            Task Details & Evidence Capture
          </div>

          <div className="modal-grid" style={{ gap: '32px' }}>
            
            {/* Left Column */}
            <div className="modal-column" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <div className="modal-section-title" style={{ fontSize: '12px', marginBottom: '10px' }}>Execution Instructions</div>
                  <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: 'var(--text-main)' }}>
                    {task.description}
                  </p>
                </div>

                {task.usefulLink && (
                  <div>
                    <div className="modal-section-title" style={{ fontSize: '12px', marginBottom: '10px' }}>Quick Actions</div>
                    <a 
                      href={task.usefulLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--primary-green)',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}
                    >
                      Open Resource Link <ExternalLink size={15} />
                    </a>
                  </div>
                )}
              </div>

              {/* Metadata Card Positioned at Bottom Left */}
              <div className="metadata-box" style={{ padding: '16px 20px', gap: '10px', fontSize: '14px', marginTop: '24px' }}>
                <div className="metadata-row">
                  <span className="metadata-label">Assignee</span>
                  <span className="metadata-value">{task.assignee || "M. Singh"}</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Due date</span>
                  <span className="metadata-value">{task.dueDate || "Jun 14"}</span>
                </div>
                <div className="metadata-row">
                  <span className="metadata-label">Track</span>
                  <span className="metadata-value">{task.track || "Deploy Auth Changes"}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="modal-column" style={{ gap: '24px' }}>
              <div>
                <div className="modal-section-title" style={{ fontSize: '12px', marginBottom: '10px' }}>Execution Evidence *</div>
                
                {task.evidenceLocked ? (
                  <div 
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px dashed var(--border-color)',
                      borderRadius: '8px',
                      padding: '18px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div 
                        style={{
                          backgroundColor: '#003D2B',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <FileCheck size={22} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {task.evidenceFile}
                        </div>
                        <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Uploaded · {task.dueDate || "Jun 14"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                      <div 
                        style={{
                          backgroundColor: '#003D2B',
                          color: '#FFFFFF',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        <Lock size={11} /> LOCKED
                      </div>

                      <button 
                        onClick={handleUnlock}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer', fontFamily: 'monospace' }}
                      >
                        Unlock & Replace
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{
                      border: '2px dashed var(--border-color)',
                      borderRadius: '8px',
                      padding: '24px',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-light)',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <Upload size={24} color="var(--primary-green)" />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>
                        Upload evidence file
                      </span>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                        PDF, PNG, JPG, DOCX
                      </span>
                      <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                )}

                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.5' }}>
                  Evidence is automatically locked upon step completion. An immutable audit log entry is recorded.
                </p>
              </div>

              {/* Task-Specific Audit Trail with Scroll */}
              <div className="modal-audit-box" style={{ gap: '12px' }}>
                <div className="modal-section-title" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <History size={13} /> Audit Trail
                </div>
                <div className="modal-audit-list">
                  {task.auditTrail && task.auditTrail.map((entry, idx) => (
                    <div key={idx} className="modal-audit-row" style={{ fontSize: '13px' }}>
                      <span className="modal-audit-text">{entry.text}</span>
                      <span className="modal-audit-time">{entry.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer (Left button removed) */}
        <div className="modal-footer" style={{ justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{ 
              backgroundColor: 'var(--primary-green)', 
              color: 'white', 
              border: 'none', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontWeight: 'bold', 
              fontSize: '14px', 
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} /> Save & Close Workspace
          </button>
        </div>

      </div>
    </div>
  );
}