export const INITIAL_MY_CHECKLISTS = [
  {
    id: "chk-1",
    title: "Deploy Auth Changes",
    track: "Platform Engineering",
    status: "In Progress",
    tasks: [
      { 
        id: "t1", 
        step: 1, 
        title: "Create Confluence Testing Tracker", 
        description: "Set up a Confluence page to document test scenarios, results, and sign-off status.", 
        usefulLink: "https://confluence.lloyds.com/testing-guide", 
        status: "completed", 
        evidenceLocked: true, 
        evidenceFile: "confluence_tracker_link.pdf",
        assignee: "Maya Singh",
        dueDate: "Jun 14",
        track: "Deploy Auth Changes",
        auditTrail: [
          { text: "Evidence locked", time: "Sep 30, 08:55 AM" },
          { text: "Status → Completed", time: "Sep 30, 08:54 AM" },
          { text: "Task opened", time: "Jun 14, 09:00 AM" }
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
        assignee: "Maya Singh",
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
        usefulLink: "",
        status: "completed", 
        evidenceLocked: false,
        assignee: "Maya Singh",
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
        usefulLink: "",
        status: "in-progress", 
        evidenceLocked: false,
        assignee: "Maya Singh",
        dueDate: "Jun 19",
        track: "Deploy Auth Changes",
        auditTrail: [
          { text: "Status → In Progress", time: "Sep 30, 10:00 AM" },
          { text: "Task opened", time: "Jun 14, 09:00 AM" }
        ]
      }
    ]
  }
];

export const INITIAL_TEMPLATES = [
  {
    id: "tmpl-1",
    title: "AWS Payment Gateway Migration",
    track: "Cloud Infrastructure",
    description: "Standard checklist for migrating legacy payment endpoints to AWS Amplify.",
    tasks: [
      { step: 1, title: "Provision AWS Amplify Environment", description: "Set up staging and production Amplify hosting buckets.", usefulLink: "https://aws.amazon.com/amplify" },
      { step: 2, title: "Configure SSL Certificates", description: "Generate and validate custom domain SSL certificates via Route53.", usefulLink: "" }
    ]
  },
  {
    id: "tmpl-2",
    title: "Database Security & Compliance Audit",
    track: "Security Ops",
    description: "Required checklist for verifying SQL injection guards and access control logs.",
    tasks: [
      { step: 1, title: "Run Automated Vulnerability Scan", description: "Execute SonarQube security checks against main branch.", usefulLink: "" },
      { step: 2, title: "Capture Access Log Evidence", description: "Export IAM role permission tables and audit logs.", usefulLink: "" }
    ]
  }
];

export const INITIAL_TEAM_MEMBERS = [
  {
    id: "user-1",
    employeeId: "EMP-84920",
    name: "Alex Taylor",
    role: "Senior Platform Engineer",
    checklists: [
      {
        title: "AWS Payment Gateway Migration",
        tasks: [
          { step: 1, title: "Provision AWS Amplify Environment", status: "completed", evidenceLocked: true, evidenceFile: "amplify_config_receipt.pdf" },
          { step: 2, title: "Configure SSL Certificates", status: "in-progress", evidenceLocked: false, evidenceFile: null }
        ]
      }
    ]
  },
  {
    id: "user-2",
    employeeId: "EMP-10492",
    name: "Jordan Doe",
    role: "DevSecOps Specialist",
    checklists: [
      {
        title: "Database Security & Compliance Audit",
        tasks: [
          { step: 1, title: "Run Automated Vulnerability Scan", status: "completed", evidenceLocked: true, evidenceFile: "sonar_scan_report.pdf" },
          { step: 2, title: "Capture Access Log Evidence", status: "todo", evidenceLocked: false, evidenceFile: null }
        ]
      }
    ]
  }
];

export const INITIAL_LOGS = [
  { id: "l1", text: "Evidence locked for Step 1", timestamp: "Sep 30, 10:42 AM" },
  { id: "l2", text: "Evidence locked for Step 2", timestamp: "Sep 30, 11:15 AM" }
];