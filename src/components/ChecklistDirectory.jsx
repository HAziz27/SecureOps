import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

export default function ChecklistDirectory({ checklists, onSelectChecklist, onCreateNew, isTemplateMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newTrack, setNewTrack] = useState('');
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');
  const [newStepLink, setNewStepLink] = useState('');
  const [stepsList, setStepsList] = useState([]);

  const filtered = checklists.filter(chk => 
    chk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chk.track && chk.track.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (chk.description && chk.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddStep = () => {
    if (!newStepTitle) return;
    setStepsList([...stepsList, { title: newStepTitle, description: newStepDesc, link: newStepLink }]);
    setNewStepTitle('');
    setNewStepDesc('');
    setNewStepLink('');
  };

  const handleSaveChecklist = (e) => {
    e.preventDefault();
    if (!newTitle || stepsList.length === 0) return;

    const formattedTasks = stepsList.map((s, idx) => ({
      id: `t_${Date.now()}_${idx}`,
      step: idx + 1,
      title: s.title,
      description: s.description,
      usefulLink: s.link || '',
      status: 'todo',
      evidenceLocked: false,
      assignee: 'M. Singh',
      dueDate: 'Jul 01',
      track: newTrack || 'General Compliance',
      auditTrail: [{ text: "Task opened", time: "Just now" }]
    }));

    onCreateNew({
      id: `chk-${Date.now()}`,
      title: newTitle,
      track: newTrack || 'General Compliance',
      status: 'In Progress',
      tasks: formattedTasks
    });

    setIsCreating(false);
    setNewTitle('');
    setNewTrack('');
    setStepsList([]);
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px' }}>
      <div className="directory-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>
            {isTemplateMode ? 'Template Directory' : 'My Checklists'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {isTemplateMode ? 'Search pre-created checklists to assign to yourself or create new custom templates.' : 'Monitor and manage the active compliance checklists you are working on.'}
          </p>
        </div>

        {isTemplateMode && (
          <button 
            onClick={() => setIsCreating(true)}
            style={{
              backgroundColor: 'var(--primary-green)',
              color: 'white',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={16} /> Create New Checklist
          </button>
        )}
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search by title, track, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ paddingLeft: '38px', width: '320px' }}
        />
      </div>

      <div className="directory-grid">
        {filtered.map((item) => (
          <div key={item.id} className="directory-card" style={{ cursor: isTemplateMode ? 'default' : 'pointer' }} onClick={() => !isTemplateMode && onSelectChecklist(item.id)}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-green)', fontWeight: 'bold' }}>
                {item.track}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 6px 0', color: 'var(--text-main)' }}>
                {item.title}
              </h3>
              {item.description && (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                  {item.description}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                {item.tasks.length} steps configured
              </span>

              {isTemplateMode ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectChecklist(item); }}
                  style={{
                    backgroundColor: 'var(--primary-green)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Assign to My Checklists
                </button>
              ) : (
                <span style={{ color: 'var(--primary-green)', fontWeight: '600', fontSize: '12px' }}>Open Workspace →</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {isCreating && (
        <div className="modal-overlay" onClick={() => setIsCreating(false)}>
          <div className="modal-content" style={{ maxWidth: '650px', padding: '0' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '18px' }}>Create New Compliance Checklist</h3>
              <button onClick={() => setIsCreating(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleSaveChecklist} className="modal-body" style={{ gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Checklist Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Database Security Audit" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Track / Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Infrastructure Security" 
                    value={newTrack} 
                    onChange={(e) => setNewTrack(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Add Checklist Steps ({stepsList.length} added)</label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Step Title (e.g. Run Vulnerability Scan)" 
                    value={newStepTitle} 
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                  <textarea 
                    placeholder="Execution Instructions..." 
                    value={newStepDesc} 
                    onChange={(e) => setNewStepDesc(e.target.value)}
                    rows={2}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', resize: 'vertical' }}
                  />
                  <input 
                    type="url" 
                    placeholder="Useful Resource Link URL (optional)" 
                    value={newStepLink} 
                    onChange={(e) => setNewStepLink(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddStep}
                    style={{ alignSelf: 'flex-start', padding: '6px 14px', backgroundColor: 'var(--bg-light)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
                  >
                    + Add Step to Checklist
                  </button>
                </div>

                {stepsList.length > 0 && (
                  <ul style={{ paddingLeft: '20px', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                    {stepsList.map((s, i) => (
                      <li key={i}><strong>Step {i + 1}:</strong> {s.title}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-footer" style={{ padding: '16px 0 0 0', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsCreating(false)} style={{ padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'var(--primary-green)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save & Publish Checklist</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}