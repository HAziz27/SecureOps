import { useState } from 'react';

export default function TaskModal({ taskName, onClose }) {
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEvidenceFile(file.name);
      setIsLocked(true); 
    }
  };

  return (
    <div className="modal-content">
      <h2>{taskName}</h2>
      
      <div className="upload-section">
        <p>Execution Evidence</p>
        <input 
          type="file" 
          onChange={handleFileUpload} 
          disabled={isLocked} 
        />
      </div>

      <div className="status-section">
        {isLocked ? (
          <span>🔒 Evidence Locked - Audit Trail Secured</span>
        ) : (
          <span>Awaiting Upload</span>
        )}
      </div>
    </div>
  );
}