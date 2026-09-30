import { Shield, LayoutDashboard, CheckSquare, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <Shield size={14} className="logo-icon" />
          <div>
            <div className="logo-title">SecureOps</div>
            <div className="logo-subtitle">Banking Suite</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Navigation</div>
        <button className="nav-item"><LayoutDashboard size={15} /> Dashboard</button>
        <button className="nav-item active"><CheckSquare size={15} /> Task Workspace</button>
        <button className="nav-item"><Users size={15} /> Team Directory</button>
        <button className="nav-item"><Settings size={15} /> Settings</button>
      </nav>
    </aside>
  );
}