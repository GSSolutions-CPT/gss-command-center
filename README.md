# GSS Digital Workforce Command Center

A premium internal multi-page dashboard for **Kyle Cass**, Owner & Founder of **Global Security Solutions** (Durbanville, Cape Town). This is Kyle's command center for his six AI agents — Callie, Ranker, Devon, Closer, Pixel, and Nexus Prime.

> Inspired by the polish of Linear, Notion, and Vercel — branded in GSS navy & electric blue.

---

## 🎯 Project Goals

- Give Kyle a single, branded place to **command his digital workforce**.
- Show **live-style metrics, activity, and workflows** across all 6 AI agents.
- Centralize **South African compliance** (POPIA, RICA, PSiRA, SARS, COIDA, Electric Fence COC).
- Track **projects, leads, and revenue** across Western Cape residential/commercial/industrial work.

---

## ✅ Completed Features

### Pages & Routes
| Route | Page | Description |
|---|---|---|
| `/index.html` | **Login** | Branded sign-in page (UI mockup, redirects to dashboard) |
| `/dashboard.html` | **Dashboard / Home** | KPIs, agent grid, activity feed, quick actions |
| `/agents/callie.html` | **Callie** | Operations & Procurement Manager |
| `/agents/ranker.html` | **Ranker** | Local SEO & Intelligence Strategist |
| `/agents/devon.html` | **Devon** | Lead Software Engineer |
| `/agents/closer.html` | **Closer** | Enterprise Sales & Compliance Writer |
| `/agents/pixel.html` | **Pixel** | Social Media Studio |
| `/agents/nexus-prime.html` | **Nexus Prime** | Chief of Staff |
| `/workflows.html` | **Workflows** | 4 inter-agent workflows with flow diagrams |
| `/compliance.html` | **Compliance Center** | 6 SA regulatory cards with status |
| `/projects.html` | **Projects & Leads** | Filterable table of 12+ mock projects |
| `/settings.html` | **Settings** | Profile, Integrations, Agent Config, Onboarding tabs |

### Components
- ✅ Persistent navy sidebar with collapsible Agents submenu and active-state highlighting
- ✅ Sticky top bar with search, notifications bell (with badge), Kyle's avatar
- ✅ KPI stat cards with icons, values, % change indicators
- ✅ Agent cards with brand gradients, status dots (active/idle), hover lift
- ✅ Activity feed timeline with agent-coloured icon badges and timestamps
- ✅ Progress bars (green / amber / electric blue) for KPI tracking
- ✅ Workflow flow diagrams (horizontal step boxes connected by arrows, pure CSS)
- ✅ Compliance status badges (green Compliant / amber Action Needed)
- ✅ Filterable / searchable projects table (status, sector, value, free text)
- ✅ Tabbed settings interface (Profile / Integrations / Agent Config / Onboarding)
- ✅ "Send Task" interaction panel + modal on every agent page
- ✅ Responsive sidebar collapses to hamburger on mobile
- ✅ Toast notifications for mock interactions

### Agent Detail Coverage
Each of the 6 agent pages contains:
- Gradient hero header with avatar, role, status pill, "Send Task" & "Pause Agent" buttons
- "Powered By" badges (Call For Me, AI Inbox, AI Developer, Super Agent, etc.)
- Personality description
- Core Responsibilities (bulleted)
- 4 Live KPIs with progress bars
- Recent Activity feed (5–7 entries)
- Send Task form (priority selector + dispatch button)
- Connected Integrations chips

### Workflows Implemented
- **Workflow A** — New Commercial Lead (Callie → Closer → Nexus Prime → Pixel)
- **Workflow B** — Full Marketing Campaign (Nexus Prime → Ranker → Closer → Pixel → Callie)
- **Workflow C** — Software Feature Deployment (Kyle → Devon → GitHub PR → NEXUS deploy)
- **Workflow D** — Emergency Repair Request (Callie → Kyle dispatch → Callie follow-up)

Each workflow includes: visual horizontal flow diagram, step-by-step explanation, avg completion time, success rate progress bar, and a "Trigger Workflow" button.

### Compliance Coverage
- POPIA · RICA · PSiRA · SARS · COIDA · Electric Fence COC (SANS 10222)
- Each card shows: description, how GSS complies, renewal/audit date, status pill
- Compliance activity feed at bottom

---

## 🎨 Design System

| Token | Value |
|---|---|
| Navy (primary) | `#1A3A5C` |
| Electric Blue (accent) | `#007BFF` |
| Background | `#F4F6F9` |
| Success Green | `#10B981` |
| Warning Amber | `#F59E0B` |
| Danger Red | `#EF4444` |
| Text | `#1F2937` |
| Muted | `#6B7280` |
| Font | Inter (Google Fonts) |
| Icons | Font Awesome 6.5.1 (CDN) |
| Radius | 12px (cards), 8px (controls), 999px (pills) |

---

## 📁 File Structure

```
/
├── index.html              ← Login page (entry point)
├── login.html              ← Redirect to index.html
├── dashboard.html          ← Main dashboard
├── workflows.html          ← Inter-agent workflows
├── compliance.html         ← SA compliance framework
├── projects.html           ← Projects & leads table
├── settings.html           ← Settings + onboarding
├── agents/
│   ├── callie.html
│   ├── ranker.html
│   ├── devon.html
│   ├── closer.html
│   ├── pixel.html
│   └── nexus-prime.html
├── css/
│   └── style.css           ← Full design system (~24 KB)
├── js/
│   ├── shared.js           ← Sidebar/topbar/footer builders
│   └── agent-data.js       ← All agent profile data + renderer
└── README.md
```

---

## 🚀 How to Use

1. Open `index.html` in any browser → sign in (any credentials work — it's a frontend mockup).
2. Lands on `dashboard.html` — Kyle's command center.
3. Click any **agent card** to view that agent's detail page.
4. Use the **sidebar** to navigate between Dashboard, Agents, Workflows, Projects, Compliance, Settings.
5. On agent pages, the **Send Task** form dispatches mock tasks (toast confirmation).
6. The **projects table** supports live filtering by status, sector, value, and search.

---

## 🔌 Data & Storage

**This is a pure frontend mockup.** All data is mock data embedded in JavaScript:
- `js/shared.js` → `AGENTS[]` (sidebar agent list)
- `js/agent-data.js` → `AGENT_DETAILS{}` (full agent profiles, KPIs, activity)
- `workflows.html` → `WORKFLOWS[]` (4 workflows inline)
- `compliance.html` → `COMPLIANCE[]` (6 regulations inline)
- `projects.html` → `PROJECTS[]` (12 mock projects inline)

No real authentication, no backend, no database — purely a visual command center for demo, pitch, and design validation.

---

## 🛠️ Not Yet Implemented

- Real authentication (Supabase Auth or similar)
- Live data persistence (replace mock arrays with Supabase queries)
- Live agent task execution (currently UI-only with toast feedback)
- Real-time agent activity stream (currently static mock data)
- Notification center dropdown contents (bell icon shows badge only)
- Search functionality in the top bar
- Dark mode toggle
- Export of compliance audit pack (button is visual only)
- Document viewer for compliance "View Documents" links

---

## 🗺️ Recommended Next Steps

1. **Hook to real backend** — wire each mock array to Supabase tables (`agents`, `activity_log`, `projects`, `workflows`, `compliance_records`).
2. **Authenticate Kyle** — Supabase Auth + protected route guard.
3. **Wire Send Task** to a real agent dispatcher (Genspark Super Agent endpoint).
4. **Live activity feed** — websocket or Supabase realtime channel.
5. **Notifications dropdown** — render unread agent alerts.
6. **Mobile push** — for emergency repair dispatches to Kyle's phone (062 955 8559).
7. **Compliance document storage** — Supabase Storage bucket per regulation.
8. **Analytics chart** — replace static KPI numbers with Chart.js / ECharts visualizations.

---

## 🏢 About Global Security Solutions

- **Owner:** Kyle Cass (28)
- **Address:** 66 Robyn Rd, Langeberg Ridge, Durbanville, Cape Town 7550
- **Phone:** 062 955 8559
- **Email:** kyle@globalsecuritysolutions.co.za
- **Website:** [globalsecuritysolutions.co.za](https://www.globalsecuritysolutions.co.za)
- **COO:** Rashaad Steyn
- **Services:** Intruder detection · CCTV · Access control · Electric fencing · Gate automation · Smart home tech
- **Custom Software:** NEXUS Visitor Management System, GSS-OS CRM (React + Supabase)
- **Flagship Project:** Official security partner for *35 on Rose* — City Bowl development

---

© 2026 Global Security Solutions · Durbanville, Cape Town
