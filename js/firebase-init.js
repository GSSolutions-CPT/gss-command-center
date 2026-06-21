/* Firebase Configuration & Database Initialization for GSS Command Center */

const firebaseConfig = {
  apiKey: "AIzaSyCj8ZTN92c3Nlwn23jW8RgUj6KnpNE41Vs",
  authDomain: "gssolutions-co-za.firebaseapp.com",
  projectId: "gssolutions-co-za",
  storageBucket: "gssolutions-co-za.firebasestorage.app",
  messagingSenderId: "611011162346",
  appId: "1:611011162346:web:eaa18e61121dd3bf2de793",
  measurementId: "G-ZPMK3KDCMQ"
};

// Initialize Firebase if it's available (i.e. scripts loaded via CDN)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  window.auth = firebase.auth();
  window.db = firebase.firestore();
} else {
  console.error("Firebase SDK not loaded. Make sure the CDN scripts are included in the HTML head.");
}

// Self-Seeding Database Utility
async function seedDatabaseIfEmpty() {
  if (!window.db) return;
  
  try {
    const seedCheckDoc = await window.db.collection('settings').doc('seed_status').get();
    if (seedCheckDoc.exists && seedCheckDoc.data().seeded === true) {
      console.log("Database already seeded.");
      return;
    }
    
    console.log("Seeding database with default GSS data...");
    
    // 1. Seed Profile & Settings
    await window.db.collection('settings').doc('profile').set({
      fullName: "Kyle Cass",
      email: "kyle@globalsecuritysolutions.co.za",
      phone: "062 955 8559",
      role: "GSS Owner & Founder",
      company: "Global Security Solutions",
      address: "66 Robyn Rd, Langeberg Ridge, Durbanville",
      city: "Cape Town, 7550",
      website: "globalsecuritysolutions.co.za",
      coo: "Rashaad Steyn"
    });

    // 2. Seed Agents
    const agentsData = {
      'callie': {
        slug: 'callie',
        name: 'Callie',
        role: 'Operations & Procurement Manager',
        cls: 'callie',
        icon: 'fa-headset',
        status: 'active',
        initial: 'C',
        poweredBy: ['Call For Me', 'AI Inbox', 'AI Meeting Notes'],
        personality: 'Hyper-organized, polite but firm, and strictly compliant with POPIA & RICA. Callie keeps the GSS inbox at zero, separates noise from emergencies, and never lets a supplier callback fall through the cracks.',
        responsibilities: [
          'Triages every email in kyle@globalsecuritysolutions.co.za and tags urgency',
          'Filters and dispatches emergency repair requests directly to Kyle',
          'Places outbound supplier calls — Regal Distributors, Stafix, ADT — and confirms stock',
          'Generates structured AI meeting notes and action items after every client call',
          'Maintains compliance documentation: POPIA consent logs, RICA records'
        ],
        kpis: [
          { label: 'Email response time (urgent)', value: '38 min avg', target: '< 1 hr', pct: 92, color: 'green' },
          { label: 'Supplier call success rate', value: '94%', target: '> 90%', pct: 94, color: 'green' },
          { label: 'Triage speed', value: '11 min avg', target: '< 15 min', pct: 88, color: 'green' },
          { label: 'POPIA consent log coverage', value: '100%', target: '100%', pct: 100, color: 'green' }
        ],
        integrations: [
          { name: 'kyle@globalsecuritysolutions.co.za', icon: 'fa-envelope' },
          { name: '062 955 8559 (Call For Me)', icon: 'fa-phone' },
          { name: 'Google Calendar', icon: 'fa-calendar' },
          { name: 'AI Meeting Notes', icon: 'fa-microphone' },
          { name: 'POPIA Compliance Log', icon: 'fa-shield-halved' }
        ]
      },
      'ranker': {
        slug: 'ranker',
        name: 'Ranker',
        role: 'Local SEO & Intelligence Strategist',
        cls: 'ranker',
        icon: 'fa-chart-line',
        status: 'active',
        initial: 'R',
        poweredBy: ['Deep Research', 'AI Sheets', 'AI Chat'],
        personality: 'Data-driven, highly competitive, and obsessed with owning the Cape Town local security market. Ranker treats every competitor like a problem to outrank and every keyword like territory to conquer.',
        responsibilities: [
          'Drives Western Cape SEO dominance — Durbanville, Century City, Constantia, City Bowl',
          'Scrapes competitor pricing, reviews, and Google Business Profile activity',
          'Conducts local keyword research (e.g., "CCTV camera setup Century City", "alarm system installation Constantia")',
          'Maintains the GSS content calendar — blog posts, location pages, FAQs',
          'Tracks every organic lead from search to CRM and reports weekly to Kyle'
        ],
        kpis: [
          { label: 'Keywords in top 3', value: '23', target: '20+', pct: 100, color: 'green' },
          { label: 'Organic traffic QoQ growth', value: '+31%', target: '+25%', pct: 100, color: 'green' },
          { label: 'Organic leads / month', value: '17', target: '15+', pct: 100, color: 'green' },
          { label: 'Local pack appearances', value: '68%', target: '75%', pct: 90, color: 'amber' }
        ],
        integrations: [
          { name: 'Google Analytics 4', icon: 'fa-chart-bar' },
          { name: 'Google Search Console', icon: 'fa-magnifying-glass' },
          { name: 'AI Sheets (Keyword Tracker)', icon: 'fa-table' },
          { name: 'Ahrefs API', icon: 'fa-link' },
          { name: 'GSS-OS CRM (Lead Source)', icon: 'fa-database' }
        ]
      },
      'devon': {
        slug: 'devon',
        name: 'Devon',
        role: 'Lead Software Engineer',
        cls: 'devon',
        icon: 'fa-code',
        status: 'active',
        initial: 'D',
        poweredBy: ['AI Developer', 'Fact Check'],
        personality: 'Logical, precise, and speaks in system architecture. Devon thinks in components, services, and database schemas. Never ships untested code, never bypasses a code review.',
        responsibilities: [
          'Builds and maintains React frontend + Supabase backend for NEXUS VMS',
          'Develops GSS-OS CRM features — lead pipeline, project tracking, invoicing',
          'Opens GitHub Pull Requests with detailed change summaries and test coverage',
          'Debugs production issues, monitors logs, and writes integration tests',
          'Manages staging → production deployments and database migrations'
        ],
        kpis: [
          { label: 'Weekly feature deployments', value: '4', target: '3+', pct: 100, color: 'green' },
          { label: 'Bug resolution time', value: '14 hr avg', target: '< 24 hr', pct: 90, color: 'green' },
          { label: 'Production uptime (30d)', value: '99.7%', target: '99.5%', pct: 99, color: 'green' },
          { label: 'PR review turnaround', value: '4.2 hr', target: '< 8 hr', pct: 95, color: 'green' }
        ],
        integrations: [
          { name: 'GitHub: gss-os, nexus-vms', icon: 'fa-github fa-brands' },
          { name: 'Supabase Dashboard', icon: 'fa-database' },
          { name: 'VS Code (remote)', icon: 'fa-code' },
          { name: 'Vercel Deployments', icon: 'fa-cloud' },
          { name: 'Sentry Error Tracking', icon: 'fa-bug' }
        ]
      },
      'closer': {
        slug: 'closer',
        name: 'Closer',
        role: 'Enterprise Sales & Compliance Writer',
        cls: 'closer',
        icon: 'fa-file-signature',
        status: 'active',
        initial: 'C',
        poweredBy: ['AI Docs', 'AI Slides', 'Download For Me'],
        personality: 'Persuasive, professional, and meticulous on South African security law. Closer writes proposals that win — every page references the right compliance clause, every price is justified.',
        responsibilities: [
          'Drafts commercial proposals with PSiRA, SARS, COIDA, and POPIA clauses built in',
          'Builds executive pitch decks for boardroom presentations',
          'Produces SLA documents, scopes of work, and compliance certificates',
          'Tailors proposals to each sector — residential, commercial, industrial',
          'Submits quotes within 48 hours of lead intake from Callie'
        ],
        kpis: [
          { label: 'Proposal win rate', value: '46%', target: '> 40%', pct: 92, color: 'green' },
          { label: 'Turnaround time', value: '32 hr avg', target: '< 48 hr', pct: 92, color: 'green' },
          { label: 'PSiRA / POPIA compliance', value: '100%', target: '100%', pct: 100, color: 'green' },
          { label: 'Proposals issued (30d)', value: '24', target: '20+', pct: 100, color: 'green' }
        ],
        integrations: [
          { name: 'Proposal Templates Library', icon: 'fa-folder' },
          { name: 'GSS-OS CRM (Deal Pipeline)', icon: 'fa-database' },
          { name: 'AI Slides', icon: 'fa-file-powerpoint' },
          { name: 'PandaDoc (e-signature)', icon: 'fa-signature' },
          { name: 'PSiRA Compliance DB', icon: 'fa-shield-halved' }
        ]
      },
      'pixel': {
        slug: 'pixel',
        name: 'Pixel',
        role: 'Social Media Studio',
        cls: 'pixel',
        icon: 'fa-palette',
        status: 'idle',
        initial: 'P',
        poweredBy: ['AI Designer', 'AI Image', 'AI Video', 'Clip Genius'],
        personality: 'Creative, visually focused, and obsessively on-trend. Pixel never posts a low-resolution image and never breaks the GSS brand book — navy, electric blue, sharp typography.',
        responsibilities: [
          'Designs Facebook + Instagram graphics consistent with the GSS brand',
          'Produces smart home explainer visuals and benefit infographics',
          'Edits installation site videos into 30–60s reels for social',
          'Maintains brand consistency across all platforms and assets',
          'Schedules content 5–7 times per week using the GSS content calendar'
        ],
        kpis: [
          { label: 'Facebook engagement rate', value: '6.2%', target: '> 5%', pct: 100, color: 'green' },
          { label: 'Impressions / post', value: '2,840', target: '2,000+', pct: 100, color: 'green' },
          { label: 'Posts / week', value: '6', target: '5–7', pct: 100, color: 'green' },
          { label: 'Reels published (30d)', value: '11', target: '12', pct: 92, color: 'amber' }
        ],
        integrations: [
          { name: 'Facebook Page', icon: 'fa-facebook fa-brands' },
          { name: 'Instagram Business', icon: 'fa-instagram fa-brands' },
          { name: 'Website CMS (WordPress)', icon: 'fa-globe' },
          { name: 'Canva Brand Kit', icon: 'fa-palette' },
          { name: 'Meta Business Suite', icon: 'fa-chart-bar' }
        ]
      },
      'nexus-prime': {
        slug: 'nexus-prime',
        name: 'Nexus Prime',
        role: 'Chief of Staff',
        cls: 'nexus',
        icon: 'fa-brain',
        status: 'active',
        initial: 'N',
        poweredBy: ['Multi-Agent Coordination', 'Operational Rules', 'Autonomy Management'],
        personality: 'Objective, strategic, and coordinates GSS workflows with absolute precision. Nexus Prime translates Kyle\'s high-level goals into tactical commands for the rest of the workforce.',
        responsibilities: [
          'Orchestrates cross-agent workflows (A, B, C, D) and reports progress',
          'Monitors individual agent health, status, and SLA compliance',
          'Validates proposal pricing drafts from Closer before dispatch',
          'Summarizes weekly operations metrics for Kyle\'s dashboard review',
          'Flags South African regulatory updates affecting POPIA, RICA, and PSiRA'
        ],
        kpis: [
          { label: 'Workflow completion rate', value: '91%', target: '> 85%', pct: 91, color: 'green' },
          { label: 'Avg workflow run duration', value: '4.2 hr', target: '< 6 hr', pct: 90, color: 'green' },
          { label: 'Agent uptime monitoring', value: '100%', target: '100%', pct: 100, color: 'green' },
          { label: 'SLA alert response speed', value: '4.8 min', target: '< 10 min', pct: 95, color: 'green' }
        ],
        integrations: [
          { name: 'Global Command Console', icon: 'fa-terminal' },
          { name: 'NEXUS VMS Integrator', icon: 'fa-network-wired' },
          { name: 'GSS-OS Core Database', icon: 'fa-database' },
          { name: 'Alerts Paging Engine', icon: 'fa-bell' }
        ]
      }
    };

    for (const [slug, data] of Object.entries(agentsData)) {
      await window.db.collection('agents').doc(slug).set(data);
    }

    // 3. Seed Projects
    const projectsData = [
      { name: '35 on Rose — City Bowl Development', sector: 'Commercial', status: 'Active', value: 450000, owner: 'devon', updated: '2 hr ago', createdAt: new Date(Date.now() - 7200000) },
      { name: 'Durbanville Custom Garden Perimeter', sector: 'Residential', status: 'Completed', value: 85000, owner: 'closer', updated: '3 days ago', createdAt: new Date(Date.now() - 3 * 86400000) },
      { name: 'Century City CCTV Upgrade', sector: 'Commercial', status: 'Proposal Sent', value: 210000, owner: 'closer', updated: '2 hr ago', createdAt: new Date(Date.now() - 7200000) },
      { name: 'Constantia Smart Home Integration', sector: 'Residential', status: 'Lead', value: 0, owner: 'callie', updated: '4 hr ago', createdAt: new Date(Date.now() - 14400000) },
      { name: 'Bellville Industrial Park — Access Control', sector: 'Industrial', status: 'Active', value: 380000, owner: 'devon', updated: 'Yesterday', createdAt: new Date(Date.now() - 86400000) },
      { name: 'Tygervalley Mall — Electric Fence Renewal', sector: 'Commercial', status: 'Proposal Sent', value: 165000, owner: 'closer', updated: 'Yesterday', createdAt: new Date(Date.now() - 86400000) },
      { name: 'Brackenfell Residential Estate (24 homes)', sector: 'Residential', status: 'Active', value: 540000, owner: 'nexus-prime', updated: '2 days ago', createdAt: new Date(Date.now() - 2 * 86400000) },
      { name: 'Kuils River Warehouse — Intruder Detection', sector: 'Industrial', status: 'Lead', value: 0, owner: 'callie', updated: '3 days ago', createdAt: new Date(Date.now() - 3 * 86400000) },
      { name: 'Stellenberg Private Home — Full Security', sector: 'Residential', status: 'Active', value: 124000, owner: 'closer', updated: '4 days ago', createdAt: new Date(Date.now() - 4 * 86400000) },
      { name: 'Cape Town CBD Office Tower — VMS Rollout', sector: 'Commercial', status: 'Proposal Sent', value: 720000, owner: 'devon', updated: '5 days ago', createdAt: new Date(Date.now() - 5 * 86400000) },
      { name: 'Plattekloof Smart Gate Automation', sector: 'Residential', status: 'Completed', value: 38000, owner: 'closer', updated: '1 week ago', createdAt: new Date(Date.now() - 7 * 86400000) },
      { name: 'Parow Industrial — Perimeter Refresh', sector: 'Industrial', status: 'Active', value: 295000, owner: 'devon', updated: '1 week ago', createdAt: new Date(Date.now() - 7 * 86400000) }
    ];

    for (const proj of projectsData) {
      await window.db.collection('projects').add(proj);
    }

    // 4. Seed Workflows
    const workflowsData = [
      {
        id: 'A',
        title: 'Workflow A · New Commercial Lead',
        desc: 'From inbound enquiry to signed contract — every commercial lead flows through these 4 agents.',
        badge: 'High Volume',
        steps: [
          { agent:'callie', name:'Callie', action:'Receives & qualifies enquiry' },
          { agent:'closer', name:'Closer', action:'Drafts compliant proposal' },
          { agent:'nexus', name:'Nexus Prime', action:'Reviews & approves' },
          { agent:'pixel', name:'Pixel', action:'Creates pitch visuals' }
        ],
        details: [
          'Callie receives the inbound email, captures POPIA consent, and creates a lead record in GSS-OS CRM.',
          'Closer is auto-assigned the lead, drafts a sector-specific proposal with PSiRA/COIDA clauses, and tags it for review.',
          'Nexus Prime validates pricing against historical wins, checks scope, and approves for delivery.',
          'Pixel generates branded cover graphics, executive summary slides, and a follow-up reel for outreach.'
        ],
        avgTime: '2.3 days',
        successRate: 89
      },
      {
        id: 'B',
        title: 'Workflow B · Full Marketing Campaign',
        desc: 'Strategic, cross-functional campaign launch — typically 2–4 weeks from brief to performance review.',
        badge: 'Strategic',
        steps: [
          { agent:'nexus', name:'Nexus Prime', action:'Defines goals & KPIs' },
          { agent:'ranker', name:'Ranker', action:'Keyword + content plan' },
          { agent:'closer', name:'Closer', action:'Sales collateral' },
          { agent:'pixel', name:'Pixel', action:'Creative assets' },
          { agent:'callie', name:'Callie', action:'Inbound enquiry capture' }
        ],
        details: [
          'Nexus Prime sets the campaign objective, target sector, budget, and success KPIs.',
          'Ranker builds the keyword universe, drafts the content calendar, and prepares location landing pages.',
          'Closer produces matching sales decks, one-pagers, and pricing tables for downstream conversion.',
          'Pixel designs the full creative system: hero images, social posts, video reels, branded graphics.',
          'Callie staffs the inbox and call line to ensure no inbound enquiry is dropped during the campaign.'
        ],
        avgTime: '18 days',
        successRate: 76
      },
      {
        id: 'C',
        title: 'Workflow C · Software Feature Deployment',
        desc: "Kyle's product idea → shipped to NEXUS VMS or GSS-OS production in a controlled, tested pipeline.",
        badge: 'Engineering',
        steps: [
          { agent:'nexus', name:'Kyle', action:'Briefs feature request' },
          { agent:'devon', name:'Devon', action:'Designs & implements' },
          { agent:'devon', name:'GitHub PR', action:'Reviewed & merged' },
          { agent:'nexus', name:'NEXUS deploy', action:'Production release' }
        ],
        details: [
          'Kyle describes the feature in plain language with success criteria.',
          'Devon breaks it into tickets, designs the schema, writes the React + Supabase code, and adds tests.',
          'GitHub PR is opened with full change summary, screenshots, and test coverage report.',
          'NEXUS deploy runs CI checks, migrates the DB, deploys to staging, then promotes to production.'
        ],
        avgTime: '3.5 days',
        successRate: 94
      },
      {
        id: 'D',
        title: 'Workflow D · Emergency Repair Request',
        desc: 'A faulty alarm, broken gate, or down CCTV system — dispatched to Kyle within minutes.',
        badge: 'Urgent',
        steps: [
          { agent:'callie', name:'Callie', action:'Detects emergency keyword' },
          { agent:'nexus', name:'Kyle', action:'Dispatched directly' },
          { agent:'callie', name:'Callie', action:'Schedules technician' },
          { agent:'callie', name:'Callie', action:'Follow-up + invoice' }
        ],
        details: [
          'Callie scans every incoming email & WhatsApp for emergency keywords ("alarm down", "gate stuck", "no power").',
          'Kyle is paged directly on 062 955 8559 with the full context summary.',
          'Callie coordinates the technician schedule, books materials from suppliers, and confirms ETA with the client.',
          'Callie follows up 24 hours post-repair with a satisfaction check, then triggers invoicing in GSS-OS.'
        ],
        avgTime: '4.2 hours',
        successRate: 97
      }
    ];

    for (const flow of workflowsData) {
      await window.db.collection('workflows').doc(flow.id).set(flow);
    }

    // 5. Seed Compliance Records
    const complianceData = [
      {
        id: 'popia',
        name: 'POPIA',
        sub: 'Protection of Personal Information Act',
        status: 'compliant',
        icon: 'fa-user-shield',
        desc: 'Governs how GSS collects, stores, and processes client personal data — including security footage, addresses, and biometric access logs.',
        gss: 'Every lead intake captures POPIA consent. All client data is encrypted at rest in Supabase with row-level security. Data retention policy: 5 years.',
        next: 'Annual review · Aug 2026'
      },
      {
        id: 'rica',
        name: 'RICA',
        sub: 'Regulation of Interception of Communications Act',
        status: 'compliant',
        icon: 'fa-satellite-dish',
        desc: 'Regulates lawful interception of communications — relevant for CCTV audio recording, two-way intercoms, and monitored alarm comms.',
        gss: 'All audio-capable systems include client-signed RICA waivers. Callie maintains the RICA log. Public-facing signage installed at every commercial site.',
        next: 'Quarterly site audit · Jul 2026'
      },
      {
        id: 'psira',
        name: 'PSiRA',
        sub: 'Private Security Industry Regulatory Authority',
        status: 'compliant',
        icon: 'fa-shield-halved',
        desc: 'Mandatory accreditation for all private security service providers in South Africa. Required for legal CCTV installation, alarm response, and access control.',
        gss: 'GSS holds an active PSiRA Grade A registration. All field technicians are PSiRA-graded individuals. Closer references PSiRA number in every proposal.',
        next: 'Annual renewal · Mar 2027'
      },
      {
        id: 'sars',
        name: 'SARS',
        sub: 'Tax & VAT Compliance',
        status: 'compliant',
        icon: 'fa-file-invoice-dollar',
        desc: 'South African Revenue Service obligations: VAT registration, PAYE for staff, provisional tax, and annual returns.',
        gss: 'GSS is a registered VAT vendor. Closer auto-generates VAT-compliant invoices. Quarterly returns filed via eFiling. Current Tax Clearance Certificate on file.',
        next: 'Q2 VAT return · Jul 2026'
      },
      {
        id: 'coida',
        name: 'COIDA',
        sub: 'Compensation for Occupational Injuries & Diseases',
        status: 'compliant',
        icon: 'fa-helmet-safety',
        desc: 'Mandatory workplace insurance covering all GSS technicians installing fences, gates, and electrical security systems.',
        gss: 'GSS holds a current Letter of Good Standing from the Compensation Fund. Annual ROE submission completed. Coverage extends to all field staff including subcontractors.',
        next: 'Annual ROE · Apr 2027'
      },
      {
        id: 'efence',
        name: 'Electric Fence COC',
        sub: 'SANS 10222-3 Certificate of Compliance',
        status: 'action',
        icon: 'fa-bolt',
        desc: 'Safety certificate required for all electric fences installed or modified in South Africa. Must be issued by a registered Electric Fence System Installer.',
        gss: 'Overdue for audit on 1 site (Constantia development). Re-certification site visit scheduled for June 22. GSS employs 2 certified installers.',
        next: 'Audit & renew · Jun 2026'
      }
    ];

    for (const comp of complianceData) {
      await window.db.collection('compliance').doc(comp.id).set(comp);
    }

    // 6. Seed Activities
    const activitiesData = [
      { agent: 'callie', icon: 'fa-envelope', text: '<strong>Callie</strong> triaged 12 emails — 3 flagged urgent, 1 emergency repair dispatched.', timestamp: new Date(Date.now() - 8 * 60000) },
      { agent: 'ranker', icon: 'fa-magnifying-glass-chart', text: '<strong>Ranker</strong> published blog post: "CCTV Camera Setup in Century City — 2026 Guide".', timestamp: new Date(Date.now() - 34 * 60000) },
      { agent: 'devon', icon: 'fa-code-branch', text: '<strong>Devon</strong> merged PR #42 — NEXUS VMS visitor pre-registration flow.', timestamp: new Date(Date.now() - 60 * 60000) },
      { agent: 'closer', icon: 'fa-file-pen', text: '<strong>Closer</strong> drafted commercial proposal for Century City CCTV Upgrade (R210,000).', timestamp: new Date(Date.now() - 120 * 60000) },
      { agent: 'pixel', icon: 'fa-image', text: '<strong>Pixel</strong> published 3 Facebook reels — smart home installation series.', timestamp: new Date(Date.now() - 180 * 60000) },
      { agent: 'nexus', icon: 'fa-brain', text: '<strong>Nexus Prime</strong> launched "Q3 Western Cape Expansion" campaign across 4 agents.', timestamp: new Date(Date.now() - 300 * 60000) },
      { agent: 'callie', icon: 'fa-phone', text: '<strong>Callie</strong> placed supplier call to Regal Distributors — confirmed 12x HiLook 4K cameras for delivery Thu.', timestamp: new Date(Date.now() - 360 * 60000) },
      { agent: 'devon', icon: 'fa-bug', text: '<strong>Devon</strong> resolved bug #128 — GSS-OS CRM lead-status sync issue.', timestamp: new Date(Date.now() - 420 * 60000) }
    ];

    for (const act of activitiesData) {
      await window.db.collection('activities').add(act);
    }

    // 7. Seed Notifications
    const notificationsData = [
      { text: "<strong>Callie</strong>: Emergency Repair dispatched for Durbanville gate motor.", timestamp: new Date(Date.now() - 4 * 60000), unread: true, agent: 'callie' },
      { text: "<strong>Ranker</strong>: 'CCTV Setup Century City' reached rank #4 on Google.", timestamp: new Date(Date.now() - 34 * 60000), unread: true, agent: 'ranker' },
      { text: "<strong>Devon</strong>: Staging migration completed successfully.", timestamp: new Date(Date.now() - 120 * 60000), unread: false, agent: 'devon' }
    ];

    for (const notif of notificationsData) {
      await window.db.collection('notifications').add(notif);
    }

    // 8. Mark as seeded
    await window.db.collection('settings').doc('seed_status').set({ seeded: true });
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
}
