import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskDashboard from './components/TaskDashboard';
import ChecklistDirectory from './components/ChecklistDirectory';
import TeamDirectoryView from './components/TeamDirectoryView';
import { INITIAL_MY_CHECKLISTS, INITIAL_TEMPLATES, INITIAL_TEAM_MEMBERS } from './utils/taskData';
import { ShieldCheck } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('my-checklists');
  const [myChecklists, setMyChecklists] = useState(INITIAL_MY_CHECKLISTS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);

  const handleAssignTemplate = (tmpl) => {
    const newChecklist = {
      id: `chk-${Date.now()}`,
      title: tmpl.title,
      track: tmpl.track,
      status: 'In Progress',
      tasks: tmpl.tasks.map((s, idx) => ({
        id: `t_${Date.now()}_${idx}`,
        step: s.step || idx + 1,
        title: s.title,
        description: s.description,
        usefulLink: s.usefulLink || '',
        status: 'todo',
        evidenceLocked: false,
        assignee: 'Maya Singh',
        dueDate: 'Jul 01',
        track: tmpl.track,
        auditTrail: [{ text: "Task opened", time: "Just now" }]
      }))
    };

    setMyChecklists([newChecklist, ...myChecklists]);
    setActiveTab('my-checklists');
  };

  const handleCreateNewChecklist = (newChk) => {
    setMyChecklists([newChk, ...myChecklists]);
    setActiveTab('my-checklists');
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-light)' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* Top User Profile Header with Maya Singh */}
        <div className="app-header-bar">
          <div className="user-profile-pill">
            <div className="user-avatar-circle">MS</div>
            <span>Logged in as <strong>Maya Singh</strong></span>
            <ShieldCheck size={14} color="var(--primary-green)" style={{ marginLeft: '4px' }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'my-checklists' && (
            <TaskDashboard checklists={myChecklists} setChecklists={setMyChecklists} />
          )}
          {activeTab === 'templates' && (
            <ChecklistDirectory 
              checklists={templates} 
              onSelectChecklist={handleAssignTemplate}
              onCreateNew={handleCreateNewChecklist}
              isTemplateMode={true}
            />
          )}
          {activeTab === 'team' && (
            <TeamDirectoryView teamMembers={teamMembers} />
          )}
        </div>

      </div>
    </div>
  );
}