import Sidebar from './components/Sidebar';
import TaskDashboard from './components/TaskDashboard';
import './App.css'; 

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <TaskDashboard />
      </main>
    </div>
  );
}