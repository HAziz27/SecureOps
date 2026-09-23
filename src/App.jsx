import Sidebar from './components/Sidebar';
import TaskDashboard from './components/TaskDashboard';
import './App.css'; 

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TaskDashboard />
      </main>
    </div>
  );
}