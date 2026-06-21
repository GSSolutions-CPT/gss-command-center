/* Detailed agent data for individual agent pages */

const AGENT_DETAILS = {
  'callie': {
    slug: 'callie',
    name: 'Callie',
    role: 'Operations & Procurement Manager',
    cls: 'callie',
    icon: 'fa-headset',
    status: 'active',
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
    activity: [
      { icon: 'fa-envelope', text: 'Triaged 12 emails — 3 flagged urgent, 1 emergency dispatched to Kyle', time: '8 min ago' },
      { icon: 'fa-phone', text: 'Outbound call to Regal Distributors — confirmed 12x HiLook 4K cameras for Thu delivery', time: '1 hr ago' },
      { icon: 'fa-clipboard', text: 'Generated meeting notes — 35 on Rose site visit (Mr. Adams)', time: '2 hr ago' },
      { icon: 'fa-shield-halved', text: 'Logged new POPIA consent record — Constantia smart home enquiry', time: '3 hr ago' },
      { icon: 'fa-bolt', text: 'Dispatched emergency: faulty gate motor at Durbanville commercial site', time: '4 hr ago' },
      { icon: 'fa-phone', text: 'Outbound call to Stafix — electric fence energiser quote received', time: '5 hr ago' },
      { icon: 'fa-envelope', text: 'Drafted polite supplier follow-up emails (4) for unpaid invoices', time: 'Yesterday' }
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
    activity: [
      { icon: 'fa-magnifying-glass-chart', text: 'Published "CCTV Camera Setup in Century City — 2026 Guide" — already ranking #4', time: '34 min ago' },
      { icon: 'fa-arrow-trend-up', text: 'Detected ranking jump: "electric fence installer Durbanville" #6 → #2', time: '2 hr ago' },
      { icon: 'fa-binoculars', text: 'Competitor scrape: 3 new Cape Town security firms added to tracker', time: '4 hr ago' },
      { icon: 'fa-table', text: 'Updated keyword tracker sheet — 142 keywords monitored', time: '6 hr ago' },
      { icon: 'fa-file-lines', text: 'Drafted 4 new location landing pages: Bellville, Brackenfell, Kuils River, Tygervalley', time: 'Yesterday' },
      { icon: 'fa-link', text: 'Acquired 2 local backlinks: Cape Town Property Hub, SA Security Mag', time: 'Yesterday' }
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
    activity: [
      { icon: 'fa-code-branch', text: 'Merged PR #42 — NEXUS VMS visitor pre-registration flow', time: '1 hr ago' },
      { icon: 'fa-bug', text: 'Resolved bug #128 — GSS-OS CRM lead-status sync issue', time: '3 hr ago' },
      { icon: 'fa-rocket', text: 'Deployed v2.4.1 of NEXUS VMS to production — zero downtime', time: '5 hr ago' },
      { icon: 'fa-database', text: 'Ran Supabase migration: added installations_log table with RLS policies', time: '7 hr ago' },
      { icon: 'fa-code-pull-request', text: 'Opened PR #43 — invoice PDF generation in GSS-OS', time: 'Yesterday' },
      { icon: 'fa-vial', text: 'Wrote integration tests for visitor check-in API (8 cases)', time: 'Yesterday' }
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
    activity: [
      { icon: 'fa-file-pen', text: 'Drafted commercial proposal for Century City CCTV Upgrade (R210,000)', time: '2 hr ago' },
      { icon: 'fa-file-powerpoint', text: 'Built pitch deck for 35 on Rose Phase 2 — 18 slides, branded', time: '5 hr ago' },
      { icon: 'fa-handshake', text: 'Closed Constantia residential alarm package (R42,000)', time: 'Yesterday' },
      { icon: 'fa-shield-halved', text: 'Updated proposal template — included new SANS 10222 clause', time: 'Yesterday' },
      { icon: 'fa-file-export', text: 'Generated SLA for Durbanville commercial CCTV monitoring contract', time: '2 days ago' }
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
    activity: [
      { icon: 'fa-film', text: 'Published 3 Facebook reels — smart home installation series', time: '3 hr ago' },
      { icon: 'fa-image', text: 'Designed CCTV explainer infographic — coverage zones illustrated', time: '7 hr ago' },
      { icon: 'fa-video', text: 'Edited 45s reel from Durbanville garden perimeter installation footage', time: 'Yesterday' },
      { icon: 'fa-palette', text: 'Refreshed brand kit on Canva — new electric blue gradient set', time: 'Yesterday' },
      { icon: 'fa-calendar', text: 'Scheduled next week of content — 6 posts queued', time: '2 days ago' }
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
    poweredBy: ['Super Agent'],
    personality: 'Strategic, decisive, and fully aligned with scaling Global Security Solutions. Nexus Prime translates Kyle\'s high-level goals into delegated workflows across all five other agents and never loses sight of the quarterly objective.',
    responsibilities: [
      'Orchestrates Callie, Ranker, Devon, Closer, and Pixel as one coordinated workforce',
      'Translates Kyle\'s strategic objectives into delegated multi-agent tasks',
      'Monitors agent performance, KPIs, and workflow completion rates',
      'Launches and tracks cross-functional campaigns end-to-end',
      'Reports weekly to Kyle with a single executive briefing'
    ],
    kpis: [
      { label: 'Campaign success rate', value: '83%', target: '> 80%', pct: 100, color: 'green' },
      { label: 'Workflow failure rate', value: '6.4%', target: '< 10%', pct: 100, color: 'green' },
      { label: 'Annual revenue growth (proj.)', value: '+34%', target: '> 30%', pct: 100, color: 'green' },
      { label: 'Agent alignment score', value: '96%', target: '90%+', pct: 100, color: 'green' }
    ],
    activity: [
      { icon: 'fa-bullhorn', text: 'Launched "Q3 Western Cape Expansion" campaign across Ranker, Pixel, Closer', time: '5 hr ago' },
      { icon: 'fa-diagram-project', text: 'Initiated Workflow B for new Bellville commercial lead', time: '7 hr ago' },
      { icon: 'fa-chart-pie', text: 'Compiled weekly executive briefing for Kyle — 9 KPIs, 4 wins, 1 risk', time: 'Yesterday' },
      { icon: 'fa-arrow-up-right-dots', text: 'Re-allocated Pixel capacity from reels to landing-page hero graphics', time: 'Yesterday' },
      { icon: 'fa-circle-check', text: 'Closed Workflow A (Commercial Lead) — Constantia smart home, won R85k', time: '2 days ago' }
    ],
    integrations: [
      { name: 'Callie · Ranker · Devon · Closer · Pixel', icon: 'fa-robot' },
      { name: 'Genspark Super Agent', icon: 'fa-brain' },
      { name: 'GSS-OS Analytics', icon: 'fa-chart-line' },
      { name: 'Executive Reporting Dashboard', icon: 'fa-chart-pie' }
    ]
  }
};

function renderAgentPage(slug) {
  const a = AGENT_DETAILS[slug];
  if (!a) return;

  // Hero
  document.getElementById('agent-hero-root').innerHTML = `
    <div class="agent-hero">
      <div class="agent-avatar ${a.cls} lg" style="position:relative;z-index:1;"><i class="fa-solid ${a.icon}"></i></div>
      <div style="position:relative;z-index:1;flex:1;">
        <h1>${a.name}</h1>
        <div class="role">${a.role}</div>
        <div class="status-line">
          <span class="status-dot ${a.status}"></span>
          ${a.status === 'active' ? '<span style="color:#86efac;font-weight:600;">Active</span> · ready for tasks' : '<span style="color:#fcd34d;font-weight:600;">Idle</span> · standby'}
          <span style="margin-left:14px;color:rgba(255,255,255,0.6);">·</span>
          <span style="margin-left:14px;color:rgba(255,255,255,0.85);">Reports to Kyle Cass</span>
        </div>
      </div>
      <div style="position:relative;z-index:1;display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary" onclick="openTaskModal()"><i class="fa-solid fa-paper-plane"></i> Send Task</button>
        <button class="btn btn-outline" style="background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.2);"><i class="fa-solid fa-pause"></i> Pause Agent</button>
      </div>
    </div>
  `;

  // Powered by
  document.getElementById('powered-by').innerHTML = a.poweredBy.map(p =>
    `<span class="powered-badge"><i class="fa-solid fa-bolt"></i> ${p}</span>`
  ).join('');

  // Personality
  document.getElementById('personality').textContent = a.personality;

  // Responsibilities
  document.getElementById('responsibilities').innerHTML = a.responsibilities.map(r =>
    `<li style="padding:8px 0;display:flex;gap:10px;font-size:13.5px;">
       <i class="fa-solid fa-check" style="color:var(--success);margin-top:3px;flex-shrink:0;"></i>
       <span>${r}</span>
     </li>`
  ).join('');

  // KPIs
  document.getElementById('kpis').innerHTML = `<div class="kpi-list">` + a.kpis.map(k => `
    <div>
      <div class="kpi-row">
        <span class="label">${k.label}</span>
        <span class="value">${k.value} <span style="color:var(--text-muted);font-weight:500;font-size:11.5px;">/ ${k.target}</span></span>
      </div>
      <div class="progress"><div class="progress-bar ${k.color}" style="width:${k.pct}%"></div></div>
    </div>
  `).join('') + `</div>`;

  // Activity
  const colorMap = { callie:'#06B6D4', ranker:'#8B5CF6', devon:'#10B981', closer:'#F59E0B', pixel:'#EC4899', 'nexus-prime':'#1A3A5C' };
  document.getElementById('activity').innerHTML = `<div class="activity-feed">` + a.activity.map(ev => `
    <div class="activity-item">
      <div class="activity-icon" style="background:${colorMap[a.slug]};"><i class="fa-solid ${ev.icon}"></i></div>
      <div class="activity-body">
        <div class="activity-text">${ev.text}</div>
        <div class="activity-meta"><i class="fa-regular fa-clock"></i> ${ev.time}</div>
      </div>
    </div>
  `).join('') + `</div>`;

  // Integrations
  document.getElementById('integrations').innerHTML = a.integrations.map(i => {
    const isBrand = i.icon.includes('fa-brands');
    const iconClass = isBrand ? i.icon : `fa-solid ${i.icon}`;
    return `<span class="integration-chip"><i class="${iconClass}"></i> ${i.name}</span>`;
  }).join('');

  // Page title
  document.title = `${a.name} · GSS Command Center`;

  // Modal title
  const modalTitle = document.getElementById('modal-agent-name');
  if (modalTitle) modalTitle.textContent = a.name;
}

function openTaskModal() {
  document.getElementById('task-modal').classList.add('open');
}
function closeTaskModal() {
  document.getElementById('task-modal').classList.remove('open');
}
function submitTask(e) {
  e.preventDefault();
  const textarea = e.target.querySelector('textarea');
  if (!textarea || !textarea.value.trim()) return;
  closeTaskModal();
  showToast('✓ Task sent to agent — queued for execution');
  textarea.value = '';
  // also clear card input if it was submitted via modal, or vice-versa
  const cardInput = document.getElementById('task-input');
  if (cardInput) cardInput.value = '';
}

