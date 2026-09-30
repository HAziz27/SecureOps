import { useState } from 'react';
import { Search, Plus, FileText, ArrowRight } from 'lucide-react';

export default function TemplateDirectory({ templates, onAssignTemplate }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = templates.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.track.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px' }}>
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, color: 'var(--text-main)' }}>Template Directory</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Search pre-created compliance checklists and assign them directly to your working space.</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '360px' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search templates by title or track..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ paddingLeft: '38px', width: '100%' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map((tmpl) => (
          <div key={tmpl.id} className="directory-card" style={{ cursor: 'default' }}>
            <div>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-green)', fontWeight: 'bold' }}>
                {tmpl.track}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 6px 0', color: 'var(--text-main)' }}>
                {tmpl.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                {tmpl.description}
              </p>
            </div>

            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-muted)', background: 'var(--bg-light)', padding: '8px 12px', borderRadius: '6px' }}>
              {tmpl.tasks.length} pre-configured steps included
            </div>

            <button 
              onClick={() => onAssignTemplate(tmpl)}
              style={{
                backgroundColor: 'var(--primary-green)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px'
              }}
            >
              <Plus size={15} /> Assign to My Checklists
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}