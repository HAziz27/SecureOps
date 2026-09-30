import { useState } from 'react';
import { Search, CheckCircle2, Clock, Circle, Lock, ArrowLeft, History } from 'lucide-react';

export default function TeamDirectoryView({ teamMembers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [recentSearches, setRecentSearches] = useState([
    { name: "Alex Taylor", employeeId: "EMP-84920" },
    { name: "Jordan Doe", employeeId: "EMP-10492" }
  ]);

  // Only filter if user has typed something in the search bar
  const trimmedSearch = searchTerm.trim().toLowerCase();
  const searchResults = trimmedSearch === '' ? [] : teamMembers.filter(m => 
    m.name.toLowerCase().includes(trimmedSearch) ||
    m.employeeId.toLowerCase().includes(trimmedSearch)
  );

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    // Add to recent searches if not already there
    if (!recentSearches.some(r => r.employeeId === member.employeeId)) {
      setRecentSearches(prev => [member, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px' }}>
      
      {!selectedMember ? (
        <>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>Team Directory</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Search colleagues by Full Name or Employee ID to inspect their account checklists and evidence.</p>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '400px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name (e.g. Alex Taylor) or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              style={{ paddingLeft: '38px', width: '100%' }}
            />
          </div>

          {/* Initial State: Show Recent Searches when search bar is empty */}
          {trimmedSearch === '' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={13} /> Recent Searches
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {recentSearches.map((rec, idx) => {
                  const fullMember = teamMembers.find(m => m.employeeId === rec.employeeId);
                  return (
                    <div 
                      key={idx}
                      onClick={() => fullMember && handleSelectMember(fullMember)}
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        fontWeight: '500',
                        color: 'var(--text-main)'
                      }}
                    >
                      <div style={{ width: '24px', height: '24px', backgroundColor: '#003D2B', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                        {rec.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{rec.name}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>({rec.employeeId})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Search Results */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                Found {searchResults.length} matching employee(s)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {searchResults.map((member) => (
                  <div 
                    key={member.id} 
                    className="directory-card"
                    onClick={() => handleSelectMember(member)}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#003D2B', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{member.name}</h3>
                        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--primary-green)', fontWeight: 'bold' }}>{member.employeeId}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Role: <strong style={{ color: 'var(--text-main)' }}>{member.role}</strong>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--primary-green)', fontWeight: '600' }}>
                      <span>{member.checklists.length} active checklists</span>
                      <span>View Account Workspaces →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Selected Member Workspaces View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <button 
            onClick={() => setSelectedMember(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-green)',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              alignSelf: 'flex-start'
            }}
          >
            <ArrowLeft size={16} /> Back to Team Directory Search
          </button>

          <div style={{ backgroundColor: 'var(--card-bg)', padding: '24px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: '#003D2B', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
              {selectedMember.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>{selectedMember.name}'s Account Checklists</h2>
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{selectedMember.employeeId} · {selectedMember.role}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedMember.checklists.map((chk, idx) => (
              <div key={idx} className="task-card" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '24px', cursor: 'default', gap: '16px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>{chk.title}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  {chk.tasks.map((t, tidx) => (
                    <div key={tidx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: 'var(--bg-light)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {t.status === 'completed' && <CheckCircle2 size={16} color="#166534" />}
                        {t.status === 'in-progress' && <Clock size={16} color="#dab141" />}
                        {t.status === 'todo' && <Circle size={16} color="#929caa" />}
                        <span style={{ fontWeight: '500' }}>Step {t.step}: {t.title}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {t.evidenceLocked ? (
                          <span style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: 'var(--status-done-bg)', color: 'var(--status-done-text)', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                            <Lock size={11} /> {t.evidenceFile}
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
      )}

    </div>
  );
}