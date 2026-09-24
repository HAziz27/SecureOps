export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-icon">🛡️</span>
        <div>
          <h1 className="logo-title">SecureOps</h1>
          <p className="logo-subtitle">BANKING SUITE</p>
        </div>
      </div>

      <div className="nav-section">
        <p className="nav-label">NAVIGATION</p>
        <nav className="nav-menu">
          <a href="#" className="nav-item">⊞ Dashboard</a>
          <a href="#" className="nav-item active">☑ Task Workspace</a>
          <a href="#" className="nav-item">👥 Team Directory</a>
          <a href="#" className="nav-item">⚙ Settings</a>
        </nav>
      </div>
    </aside>
  );
}