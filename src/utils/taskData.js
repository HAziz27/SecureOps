export const INITIAL_TASKS = [
  { 
    id: "t1", 
    step: 1, 
    title: "Create Confluence Testing Tracker", 
    description: "Set up a Confluence page to document test scenarios, results, and sign-off status.", 
    usefulLink: "https://confluence.lloyds.com/testing-guide", 
    status: "completed", 
    evidenceLocked: true, 
    evidenceFile: "confluence_tracker_link.pdf",
    assignee: "M. Singh",
    dueDate: "Jun 14",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Evidence locked", time: "Sep 30, 08:55 AM" },
      { text: "Status → Completed", time: "Sep 30, 08:54 AM" },
      { text: "Task opened", time: "Jun 14, 09:00 AM" },
      { text: "Assignee updated", time: "Jun 14, 09:15 AM" },
      { text: "Track assigned", time: "Jun 14, 09:30 AM" },
      { text: "Initial review started", time: "Jun 14, 10:00 AM" }
    ]
  },
  { 
    id: "t2", 
    step: 2, 
    title: "Update Auth Code Repository in Local", 
    description: "Pull the latest changes from the remote auth repository into your local environment and resolve any conflicts.", 
    usefulLink: "https://github.com/lloyds/auth-repo-wiki", 
    status: "completed", 
    evidenceLocked: true, 
    evidenceFile: "local_repo_update_log.pdf",
    assignee: "M. Singh",
    dueDate: "Jun 14",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Evidence locked", time: "Sep 30, 09:15 AM" },
      { text: "Status → Completed", time: "Sep 30, 09:14 AM" },
      { text: "Task opened", time: "Jun 14, 09:00 AM" }
    ]
  },
  { 
    id: "t3", 
    step: 3, 
    title: "Create Work Branch", 
    description: "Create a correctly named feature branch from main.", 
    status: "completed", 
    evidenceLocked: false,
    assignee: "M. Singh",
    dueDate: "Jun 18",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Status → Completed", time: "Sep 29, 04:30 PM" },
      { text: "Task opened", time: "Jun 14, 09:00 AM" }
    ]
  },
  { 
    id: "t4", 
    step: 4, 
    title: "Make Changes", 
    description: "Implement the required auth changes on the work branch. Ensure code meets linting standards and follows the agreed design spec.", 
    status: "in-progress", 
    evidenceLocked: false,
    assignee: "M. Singh",
    dueDate: "Jun 19",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Status → In Progress", time: "Sep 30, 10:00 AM" },
      { text: "Task opened", time: "Jun 14, 09:00 AM" }
    ]
  },
  { 
    id: "t5", 
    step: 5, 
    title: "Test Locally", 
    description: "Run the full local auth test suite to ensure all unit and integration tests pass successfully.", 
    status: "todo", 
    evidenceLocked: false,
    assignee: "J. Doe",
    dueDate: "Jun 20",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Task opened", time: "Jun 14, 09:00 AM" }
    ]
  },
  { 
    id: "t6", 
    step: 6, 
    title: "Upload Local Test Evidence", 
    description: "Export test run screenshots and execution logs for compliance review.", 
    status: "todo", 
    evidenceLocked: false,
    assignee: "M. Singh",
    dueDate: "Jun 21",
    track: "Deploy Auth Changes",
    auditTrail: [
      { text: "Task opened", time: "Jun 14, 09:00 AM" }
    ]
  }
];

export const INITIAL_LOGS = [
  { id: "l1", text: "Evidence locked for Step 1", timestamp: "Sep 30, 10:42 AM" },
  { id: "l2", text: "Evidence locked for Step 2", timestamp: "Sep 30, 11:15 AM" }
];