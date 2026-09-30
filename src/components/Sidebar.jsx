import { CheckSquare, Search, Users, Shield } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div style={{ width: '260px', backgroundColor: '#003D2B', display: 'flex', flexDirection: 'column', height: '100vh', borderRight: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Shield size={24} color="#7BAE98" />
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', letterSpacing: '0.02em' }}>SecureOps</span>
      </div>

      <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#7BAE98', padding: '0 8px 8px 8px', letterSpacing: '0.1em' }}>
          Navigation
        </div>

        <button 
          onClick={() => setActiveTab('my-checklists')}
          style={{ 
            width: '100%', 
            background: activeTab === 'my-checklists' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', 
            border: 'none', 
            cursor: 'pointer', 
            textAlign: 'left', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 14px', 
            borderRadius: '8px', 
            color: activeTab === 'my-checklists' ? 'white' : '#A3C1AD',
            fontWeight: activeTab === 'my-checklists' ? '600' : 'normal',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
        >
          <CheckSquare size={18} /> My Checklists
        </button>

        <button 
          onClick={() => setActiveTab('templates')}
          style={{ 
            width: '100%', 
            background: activeTab === 'templates' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', 
            border: 'none', 
            cursor: 'pointer', 
            textAlign: 'left', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 14px', 
            borderRadius: '8px', 
            color: activeTab === 'templates' ? 'white' : '#A3C1AD',
            fontWeight: activeTab === 'templates' ? '600' : 'normal',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
        >
          <Search size={18} /> Template Directory
        </button>

        <button 
          onClick={() => setActiveTab('team')}
          style={{ 
            width: '100%', 
            background: activeTab === 'team' ? 'rgba(255, 255, 255, 0.1)' : 'transparent', 
            border: 'none', 
            cursor: 'pointer', 
            textAlign: 'left', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 14px', 
            borderRadius: '8px', 
            color: activeTab === 'team' ? 'white' : '#A3C1AD',
            fontWeight: activeTab === 'team' ? '600' : 'normal',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
        >
          <Users size={18} /> Team Directory
        </button>
      </div>
    </div>
  );
}