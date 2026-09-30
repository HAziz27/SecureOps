import { useState } from 'react';
import { Search, CheckCircle2, Clock, Circle, Lock } from 'lucide-react';

export default function TeamDirectoryView({ teamMembers }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = teamMembers.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px' }}>
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>Team Directory</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Search colleagues to monitor their active checklists, completed steps, and compliance evidence.</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '360px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search team members by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ paddingLeft: '38px', width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredMembers.map((member) => (
          <div key={member.id} className="task-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '24px', cursor: 'default', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="user-avatar-circle" style={{ width: '36px', height: '36px', fontSize: '14px', backgroundColor: '#003D2B', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{member.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{member.role}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Active Checklists & Progress</div>
              
              {member.checklists.map((chk, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--bg-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--text-main)' }}>{chk.title}</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {chk.tasks.map((t, tidx) => (
                      <div key={tidx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--card-bg)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {t.status === 'completed' && <CheckCircle2 size={15} color="#166534" />}
                          {t.status === 'in-progress' && <Clock size={15} color="#dab141" />}
                          {t.status === 'todo' && <Circle size={15} color="#929caa" />}
                          <span style={{ fontWeight: '500' }}>{t.step}. {t.title}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {t.evidenceLocked ? (
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: 'var(--status-done-bg)', color: 'var(--status-done-text)', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Lock size={10} /> {t.evidenceFile}
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>No evidence attached</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}