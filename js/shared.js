/* Shared layout helpers for GSS Command Center */

// Apply theme immediately on script execution to prevent flash of light theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

const AGENTS = [
  { slug: 'callie', name: 'Callie', role: 'Operations & Procurement Manager', icon: 'fa-headset', cls: 'callie', status: 'active', initial: 'C' },
  { slug: 'ranker', name: 'Ranker', role: 'Local SEO & Intelligence Strategist', icon: 'fa-chart-line', cls: 'ranker', status: 'active', initial: 'R' },
  { slug: 'devon', name: 'Devon', role: 'Lead Software Engineer', icon: 'fa-code', cls: 'devon', status: 'active', initial: 'D' },
  { slug: 'closer', name: 'Closer', role: 'Enterprise Sales & Compliance Writer', icon: 'fa-file-signature', cls: 'closer', status: 'active', initial: 'C' },
  { slug: 'pixel', name: 'Pixel', role: 'Social Media Studio', icon: 'fa-palette', cls: 'pixel', status: 'idle', initial: 'P' },
  { slug: 'nexus-prime', name: 'Nexus Prime', role: 'Chief of Staff', icon: 'fa-brain', cls: 'nexus', status: 'active', initial: 'N' }
];

const SEARCH_DATA = [
  { name: 'Dashboard', desc: 'Main control room & KPI overview', url: 'dashboard.html', category: 'Pages' },
  { name: 'Workflows', desc: 'Multi-agent automated processes', url: 'workflows.html', category: 'Pages' },
  { name: 'Projects & Leads', desc: 'Cape Town commercial & residential installations', url: 'projects.html', category: 'Pages' },
  { name: 'Compliance Center', desc: 'POPIA, RICA, PSiRA regulatory status', url: 'compliance.html', category: 'Pages' },
  { name: 'Settings', desc: 'Integrations, profile, and agent config', url: 'settings.html', category: 'Pages' },
  
  { name: 'Callie (Agent)', desc: 'Operations & Procurement Manager', url: 'agents/callie.html', category: 'Agents' },
  { name: 'Ranker (Agent)', desc: 'Local SEO & Intelligence Strategist', url: 'agents/ranker.html', category: 'Agents' },
  { name: 'Devon (Agent)', desc: 'Lead Software Engineer', url: 'agents/devon.html', category: 'Agents' },
  { name: 'Closer (Agent)', desc: 'Enterprise Sales & Compliance Writer', url: 'agents/closer.html', category: 'Agents' },
  { name: 'Pixel (Agent)', desc: 'Social Media Studio', url: 'agents/pixel.html', category: 'Agents' },
  { name: 'Nexus Prime (Agent)', desc: 'Chief of Staff & Coordinator', url: 'agents/nexus-prime.html', category: 'Agents' },
  
  { name: 'POPIA Compliance', desc: 'Protection of Personal Information Act registry', url: 'compliance.html', category: 'Compliance' },
  { name: 'RICA Security', desc: 'Regulation of Interception of Communications Act logs', url: 'compliance.html', category: 'Compliance' },
  { name: 'PSiRA Registration', desc: 'Private Security Industry Regulatory Authority active status', url: 'compliance.html', category: 'Compliance' },
  { name: 'SARS Tax Clearance', desc: 'South African Revenue Service compliance pin', url: 'compliance.html', category: 'Compliance' },
  { name: 'COIDA Letter of Good Standing', desc: 'Compensation for Occupational Injuries and Diseases Act', url: 'compliance.html', category: 'Compliance' },
  { name: 'Electric Fence COC', desc: 'SANS 10222 electric fence Certificate of Compliance', url: 'compliance.html', category: 'Compliance' }
];

function getSearchData() {
  const isSub = window.location.pathname.includes('/agents/');
  const prefix = isSub ? '../' : '';
  const agentPrefix = isSub ? './' : 'agents/';
  return SEARCH_DATA.map(item => ({
    ...item,
    url: item.url.startsWith('agents/') ? item.url.replace('agents/', agentPrefix) : (prefix + item.url)
  }));
}

function buildSidebar(activeKey = 'dashboard', activeAgent = '') {
  const isSubfolder = window.location.pathname.includes('/agents/');
  const root = isSubfolder ? '../' : '';
  const agentsDir = isSubfolder ? './' : 'agents/';

  const agentSubmenu = AGENTS.map(a => `
    <a href="${agentsDir}${a.slug}.html" class="nav-item ${activeAgent === a.slug ? 'active' : ''}" style="padding-left: 12px;" id="sidebar-agent-${a.slug}">
      <span class="agent-avatar ${a.cls}" style="width:22px;height:22px;border-radius:6px;font-size:10px;">${a.initial}</span>
      <span>${a.name}</span>
    </a>
  `).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="logo-mark">G</div>
        <div>
          <div class="brand-text">GSS Command</div>
          <div class="brand-sub">Digital Workforce</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Workspace</div>
        <a href="${root}dashboard.html" class="nav-item ${activeKey === 'dashboard' ? 'active' : ''}" id="sidebar-link-dashboard">
          <i class="fa-solid fa-house"></i><span>Dashboard</span>
        </a>

        <div class="nav-section-title">Digital Workforce</div>
        <div class="nav-item ${activeKey === 'agents' ? 'active' : ''}" onclick="toggleAgentsMenu()" id="sidebar-link-agents-parent">
          <i class="fa-solid fa-robot"></i><span>Agents</span>
          <i class="fa-solid fa-chevron-down" style="margin-left:auto;font-size:10px;transition:transform 0.2s;" id="agents-chev"></i>
        </div>
        <div class="nav-submenu" id="agents-submenu" style="display:${activeKey === 'agents' ? 'block' : 'none'};">
          ${agentSubmenu}
        </div>

        <a href="${root}workflows.html" class="nav-item ${activeKey === 'workflows' ? 'active' : ''}" id="sidebar-link-workflows">
          <i class="fa-solid fa-diagram-project"></i><span>Workflows</span>
        </a>

        <div class="nav-section-title">Operations</div>
        <a href="${root}projects.html" class="nav-item ${activeKey === 'projects' ? 'active' : ''}" id="sidebar-link-projects">
          <i class="fa-solid fa-folder-open"></i><span>Projects & Leads</span>
        </a>
        <a href="${root}compliance.html" class="nav-item ${activeKey === 'compliance' ? 'active' : ''}" id="sidebar-link-compliance">
          <i class="fa-solid fa-shield-halved"></i><span>Compliance</span>
        </a>
        <a href="${root}settings.html" class="nav-item ${activeKey === 'settings' ? 'active' : ''}" id="sidebar-link-settings">
          <i class="fa-solid fa-gear"></i><span>Settings</span>
        </a>
      </nav>
      <div class="sidebar-footer">
        Global Security Solutions<br>
        Durbanville, Cape Town<br>
        v1.0 · © 2026
      </div>
    </aside>
    <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="closeSidebar()"></div>
  `;
}

function buildTopbar() {
  const isDark = localStorage.getItem('theme') === 'dark';
  const themeIcon = isDark ? 'fa-sun' : 'fa-moon';
  const isSub = window.location.pathname.includes('/agents/');
  const root = isSub ? '../' : '';
  
  return `
    <header class="topbar">
      <button class="icon-btn menu-toggle" onclick="openSidebar()" aria-label="Open menu" id="topbar-menu-toggle">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="global-search" placeholder="Search agents, projects, workflows..." oninput="handleSearch(this.value)" autocomplete="off">
        <div id="search-results-dropdown" class="search-results-dropdown" style="display:none;"></div>
      </div>
      <div class="topbar-right">
        <button class="icon-btn" onclick="toggleTheme()" aria-label="Toggle Theme" id="theme-toggle-btn" title="Toggle Dark/Light Mode">
          <i class="fa-solid ${themeIcon}"></i>
        </button>
        <button class="icon-btn" aria-label="Notifications" onclick="toggleNotificationsDropdown(event)" id="notifications-btn" title="View Alerts" style="position:relative;">
          <i class="fa-regular fa-bell"></i>
          <span class="badge" id="notifications-badge" style="display:inline-block;width:8px;height:8px;background:var(--danger);border-radius:50%;position:absolute;top:10px;right:10px;border:2px solid var(--surface);"></span>
        </button>
        <button class="avatar-btn" onclick="toggleUserDropdown(event)" id="user-btn">
          <div class="avatar">KC</div>
          <div>
            <div class="name">Kyle Cass</div>
          </div>
          <i class="fa-solid fa-chevron-down" style="font-size:10px;color:var(--text-muted);"></i>
        </button>
        
        <!-- Notifications Dropdown -->
        <div id="notifications-dropdown" class="topbar-dropdown" style="display:none;">
          <div class="dropdown-header">
            <span>Alerts & Notifications</span>
            <button onclick="clearNotifications(event)" style="font-size:11.5px;color:var(--electric);font-weight:600;background:none;border:none;cursor:pointer;">Clear all</button>
          </div>
          <div class="dropdown-body" id="notifications-list">
            <div class="notification-item unread">
              <span class="dot"></span>
              <div>
                <p><strong>Callie</strong>: Emergency Repair dispatched for Durbanville gate motor.</p>
                <span>4 mins ago</span>
              </div>
            </div>
            <div class="notification-item unread">
              <span class="dot"></span>
              <div>
                <p><strong>Ranker</strong>: "CCTV Setup Century City" reached rank #4 on Google.</p>
                <span>34 mins ago</span>
              </div>
            </div>
            <div class="notification-item">
              <div>
                <p><strong>Devon</strong>: Staging migration completed successfully.</p>
                <span>2 hrs ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Dropdown -->
        <div id="user-dropdown" class="topbar-dropdown" style="display:none;width:180px;right:0;">
          <div class="dropdown-body" style="padding:4px 0;">
            <a href="${root}settings.html" class="dropdown-link" id="user-link-settings"><i class="fa-solid fa-gear"></i> Settings</a>
            <a href="#" onclick="handleSignOut(event)" class="dropdown-link" style="color:var(--danger);border-top:1px solid var(--border-light);" id="user-link-signout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign Out</a>
          </div>
        </div>
      </div>
    </header>
  `;
}

function buildFooter() {
  return `
    <footer class="footer">
      Global Security Solutions © 2026 &nbsp;·&nbsp; Durbanville, Cape Town &nbsp;·&nbsp;
      <a href="https://www.globalsecuritysolutions.co.za" target="_blank" style="color:var(--electric);" id="footer-gss-link">globalsecuritysolutions.co.za</a>
    </footer>
  `;
}

function renderLayout(activeKey, activeAgent = '') {
  const sidebarEl = document.getElementById('sidebar-root');
  const topbarEl = document.getElementById('topbar-root');
  const footerEl = document.getElementById('footer-root');
  if (sidebarEl) sidebarEl.innerHTML = buildSidebar(activeKey, activeAgent);
  if (topbarEl) topbarEl.innerHTML = buildTopbar();
  if (footerEl) footerEl.innerHTML = buildFooter();
}

function toggleAgentsMenu() {
  const menu = document.getElementById('agents-submenu');
  const chev = document.getElementById('agents-chev');
  if (!menu) return;
  const isOpen = menu.style.display === 'block';
  menu.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

function openSidebar() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebar-backdrop')?.classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-backdrop')?.classList.remove('open');
}

function formatDate() {
  const d = new Date();
  return d.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--navy);color:#fff;padding:12px 18px;border-radius:8px;box-shadow:var(--shadow-lg);font-size:13px;font-weight:500;z-index:200;animation:slideIn .25s ease;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}"></i>`;
  }
}

function handleSearch(query) {
  const dropdown = document.getElementById('search-results-dropdown');
  if (!dropdown) return;
  
  if (!query.trim()) {
    dropdown.style.display = 'none';
    return;
  }
  
  const data = getSearchData();
  const results = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );
  
  if (results.length === 0) {
    dropdown.innerHTML = `<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:12.5px;">No results found for "${query}"</div>`;
    dropdown.style.display = 'block';
    return;
  }
  
  const categories = {};
  results.forEach(r => {
    if (!categories[r.category]) categories[r.category] = [];
    categories[r.category].push(r);
  });
  
  dropdown.innerHTML = Object.keys(categories).map(cat => `
    <div class="search-category-title">${cat}</div>
    ${categories[cat].map(r => `
      <a href="${r.url}" class="search-item">
        <div style="font-weight:600;color:var(--navy);font-size:13px;">${r.name}</div>
        <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">${r.desc}</div>
      </a>
    `).join('')}
  `).join('');
  
  dropdown.style.display = 'block';
}

function toggleNotificationsDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('notifications-dropdown');
  const userDropdown = document.getElementById('user-dropdown');
  if (userDropdown) userDropdown.style.display = 'none';
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('user-dropdown');
  const notifDropdown = document.getElementById('notifications-dropdown');
  if (notifDropdown) notifDropdown.style.display = 'none';
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function formatRelativeTime(ts) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' });
}

function listenToNotifications() {
  if (typeof db === 'undefined') return;
  db.collection('notifications')
    .orderBy('timestamp', 'desc')
    .limit(10)
    .onSnapshot(snapshot => {
      const list = document.getElementById('notifications-list');
      const badge = document.getElementById('notifications-badge');
      if (!list) return;
      
      const docs = snapshot.docs;
      const unreadCount = docs.filter(doc => doc.data().unread).length;
      
      if (badge) {
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
      }
      
      if (docs.length === 0) {
        list.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12.5px;">All caught up! No new notifications.</div>`;
        return;
      }
      
      list.innerHTML = docs.map(doc => {
        const data = doc.data();
        const timeStr = formatRelativeTime(data.timestamp);
        return `
          <div class="notification-item ${data.unread ? 'unread' : ''}" onclick="markNotificationRead('${doc.id}', event)">
            ${data.unread ? '<span class="dot"></span>' : ''}
            <div>
              <p>${data.text}</p>
              <span>${timeStr}</span>
            </div>
          </div>
        `;
      }).join('');
    }, err => {
      console.error("Notifications listener error:", err);
    });
}

async function markNotificationRead(id, e) {
  if (e) e.stopPropagation();
  if (typeof db === 'undefined') return;
  try {
    await db.collection('notifications').doc(id).update({ unread: false });
  } catch (err) {
    console.error("Error marking read:", err);
  }
}

async function clearNotifications(e) {
  if (e) e.stopPropagation();
  if (typeof db === 'undefined') return;
  try {
    const snapshot = await db.collection('notifications').where('unread', '==', true).get();
    const batch = db.batch();
    snapshot.forEach(doc => {
      batch.update(doc.ref, { unread: false });
    });
    await batch.commit();
  } catch (err) {
    console.error("Error clearing notifications:", err);
  }
}

function handleSignOut(event) {
  if (event) event.preventDefault();
  if (typeof auth !== 'undefined') {
    auth.signOut().then(() => {
      const isSub = window.location.pathname.includes('/agents/');
      window.location.href = isSub ? '../index.html' : 'index.html';
    }).catch(err => {
      console.error("Sign out error:", err);
    });
  }
}

// Expose functions to global window scope for HTML onclick attributes
window.markNotificationRead = markNotificationRead;
window.clearNotifications = clearNotifications;
window.handleSignOut = handleSignOut;

// Global click handler to close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  const notifDropdown = document.getElementById('notifications-dropdown');
  const notifBtn = document.getElementById('notifications-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userBtn = document.getElementById('user-btn');
  const searchDropdown = document.getElementById('search-results-dropdown');
  const searchInput = document.getElementById('global-search');

  if (notifDropdown && !notifDropdown.contains(e.target) && notifBtn && !notifBtn.contains(e.target)) {
    notifDropdown.style.display = 'none';
  }
  if (userDropdown && !userDropdown.contains(e.target) && userBtn && !userBtn.contains(e.target)) {
    userDropdown.style.display = 'none';
  }
  if (searchDropdown && searchInput && !searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
    searchDropdown.style.display = 'none';
  }
});

// Route Guard and Seeding Coordinator
if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(async (user) => {
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    
    if (!user) {
      if (!isLoginPage) {
        const isSubfolder = window.location.pathname.includes('/agents/');
        window.location.href = isSubfolder ? '../index.html' : 'index.html';
      }
    } else {
      if (typeof seedDatabaseIfEmpty === 'function') {
        await seedDatabaseIfEmpty();
      }
      
      if (isLoginPage) {
        const isSubfolder = window.location.pathname.includes('/agents/');
        window.location.href = isSubfolder ? '../dashboard.html' : 'dashboard.html';
      } else {
        // Safe to listen to notifications and load page content
        listenToNotifications();
        if (typeof initPage === 'function') {
          initPage();
        }
      }
    }
  });
}

