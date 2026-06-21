/* Detailed agent data and rendering coordinator for GSS Command Center */

const AGENT_DETAILS = {
  'callie': { name: 'Callie' },
  'ranker': { name: 'Ranker' },
  'devon': { name: 'Devon' },
  'closer': { name: 'Closer' },
  'pixel': { name: 'Pixel' },
  'nexus-prime': { name: 'Nexus Prime' }
};

async function renderAgentPage(slug) {
  if (typeof db === 'undefined') return;

  try {
    const doc = await db.collection('agents').doc(slug).get();
    if (!doc.exists) {
      console.error("Agent details not found in database:", slug);
      return;
    }
    const a = doc.data();

    // 1. Hero Rendering
    const heroEl = document.getElementById('agent-hero-root');
    if (heroEl) {
      heroEl.innerHTML = `
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
            <button class="btn btn-outline" id="toggle-agent-status-btn" onclick="toggleAgentStatus('${a.slug}', '${a.status}')" style="background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.2);">
              <i class="fa-solid ${a.status === 'active' ? 'fa-pause' : 'fa-play'}"></i> ${a.status === 'active' ? 'Pause Agent' : 'Resume Agent'}
            </button>
          </div>
        </div>
      `;
    }

    // 2. Powered By
    const poweredEl = document.getElementById('powered-by');
    if (poweredEl && a.poweredBy) {
      poweredEl.innerHTML = a.poweredBy.map(p =>
        `<span class="powered-badge"><i class="fa-solid fa-bolt"></i> ${p}</span>`
      ).join('');
    }

    // 3. Personality
    const personalityEl = document.getElementById('personality');
    if (personalityEl) {
      personalityEl.textContent = a.personality;
    }

    // 4. Responsibilities
    const respEl = document.getElementById('responsibilities');
    if (respEl && a.responsibilities) {
      respEl.innerHTML = a.responsibilities.map(r =>
        `<li style="padding:8px 0;display:flex;gap:10px;font-size:13.5px;">
           <i class="fa-solid fa-check" style="color:var(--success);margin-top:3px;flex-shrink:0;"></i>
           <span>${r}</span>
         </li>`
      ).join('');
    }

    // 5. KPIs
    const kpisEl = document.getElementById('kpis');
    if (kpisEl && a.kpis) {
      kpisEl.innerHTML = `<div class="kpi-list">` + a.kpis.map(k => `
        <div>
          <div class="kpi-row">
            <span class="label">${k.label}</span>
            <span class="value">${k.value} <span style="color:var(--text-muted);font-weight:500;font-size:11.5px;">/ ${k.target}</span></span>
          </div>
          <div class="progress"><div class="progress-bar ${k.color}" style="width:${k.pct}%"></div></div>
        </div>
      `).join('') + `</div>`;
    }

    // 6. Connected Integrations
    const integrationsEl = document.getElementById('integrations');
    if (integrationsEl && a.integrations) {
      integrationsEl.innerHTML = a.integrations.map(i => {
        const isBrand = i.icon.includes('fa-brands');
        const iconClass = isBrand ? i.icon : `fa-solid ${i.icon}`;
        return `<span class="integration-chip"><i class="${iconClass}"></i> ${i.name}</span>`;
      }).join('');
    }

    // 7. Live Activity Feed from Firestore for this specific agent
    const colorMap = { callie:'#06B6D4', ranker:'#8B5CF6', devon:'#10B981', closer:'#F59E0B', pixel:'#EC4899', 'nexus-prime':'#1A3A5C' };
    db.collection('activities')
      .where('agent', '==', slug)
      .orderBy('timestamp', 'desc')
      .limit(10)
      .onSnapshot(snapshot => {
        const activityEl = document.getElementById('activity');
        if (!activityEl) return;
        
        if (snapshot.empty) {
          activityEl.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:12.5px;">No recent activities for this agent.</div>`;
          return;
        }

        activityEl.innerHTML = `<div class="activity-feed">` + snapshot.docs.map(doc => {
          const ev = doc.data();
          const timeStr = formatRelativeTime(ev.timestamp);
          return `
            <div class="activity-item">
              <div class="activity-icon" style="background:${colorMap[slug] || '#1A3A5C'};"><i class="fa-solid ${ev.icon || 'fa-info'}"></i></div>
              <div class="activity-body">
                <div class="activity-text">${ev.text}</div>
                <div class="activity-meta"><i class="fa-regular fa-clock"></i> ${timeStr}</div>
              </div>
            </div>`;
        }).join('') + `</div>`;
      }, err => {
        console.error("Activity feed snapshot listener failed:", err);
      });

    // Update breadcrumb and modal elements
    const bcName = document.getElementById('bc-name');
    if (bcName) bcName.textContent = a.name;

    const modalAgentName = document.getElementById('modal-agent-name');
    if (modalAgentName) modalAgentName.textContent = a.name;

    const modalAgentName2 = document.getElementById('modal-agent-name-2');
    if (modalAgentName2) modalAgentName2.textContent = a.name;

  } catch (err) {
    console.error("Error loading agent details:", err);
  }
}

async function toggleAgentStatus(slug, currentStatus) {
  if (typeof db === 'undefined') return;
  const newStatus = currentStatus === 'active' ? 'idle' : 'active';
  try {
    await db.collection('agents').doc(slug).update({ status: newStatus });
    showToast(`✓ Agent status set to ${newStatus}`);
    
    // Log activity
    await db.collection('activities').add({
      agent: slug,
      icon: newStatus === 'active' ? 'fa-play' : 'fa-pause',
      text: `<strong>${slug.charAt(0).toUpperCase() + slug.slice(1)}</strong> was ${newStatus === 'active' ? 'resumed' : 'paused'} by Kyle.`,
      timestamp: new Date()
    });

    // Re-render hero to update button and status dot
    renderAgentPage(slug);
  } catch (err) {
    console.error("Error updating agent status:", err);
  }
}

function openTaskModal() {
  const modal = document.getElementById('task-modal');
  if (modal) modal.classList.add('open');
}

function closeTaskModal() {
  const modal = document.getElementById('task-modal');
  if (modal) modal.classList.remove('open');
}

async function submitTask(e) {
  e.preventDefault();
  if (typeof db === 'undefined') return;

  const textarea = e.target.querySelector('textarea') || document.getElementById('task-input');
  if (!textarea || !textarea.value.trim()) return;

  const taskText = textarea.value.trim();
  const selectEl = e.target.querySelector('select');
  const priority = selectEl ? selectEl.value : 'Normal';

  closeTaskModal();
  showToast('✓ Dispatching task...');

  try {
    // Add to tasks collection
    const taskRef = await db.collection('tasks').add({
      agent: AGENT_SLUG,
      text: taskText,
      priority: priority,
      status: 'queued',
      createdAt: new Date()
    });

    const agentName = AGENT_DETAILS[AGENT_SLUG]?.name || AGENT_SLUG;

    // Add to activities
    await db.collection('activities').add({
      agent: AGENT_SLUG,
      icon: 'fa-paper-plane',
      text: `<strong>Kyle Cass</strong> dispatched a ${priority.toLowerCase()} task to <strong>${agentName}</strong>: "${taskText}"`,
      timestamp: new Date()
    });

    // Add to notifications
    await db.collection('notifications').add({
      agent: AGENT_SLUG,
      text: `New task for ${agentName}: "${taskText.slice(0, 50)}..."`,
      timestamp: new Date(),
      unread: true
    });

    showToast('✓ Task sent to agent — queued for execution');
    textarea.value = '';
    
    const cardInput = document.getElementById('task-input');
    if (cardInput) cardInput.value = '';

    // Auto-simulate task completion / progress after 6 seconds for high-fidelity interactive feel!
    setTimeout(async () => {
      try {
        await db.collection('tasks').doc(taskRef.id).update({ status: 'completed' });
        
        await db.collection('activities').add({
          agent: AGENT_SLUG,
          icon: 'fa-circle-check',
          text: `<strong>${agentName}</strong> completed task: "${taskText.slice(0, 60)}..." successfully.`,
          timestamp: new Date()
        });

        await db.collection('notifications').add({
          agent: AGENT_SLUG,
          text: `<strong>${agentName}</strong>: Completed task successfully.`,
          timestamp: new Date(),
          unread: true
        });
      } catch (err) {
        console.error("Simulation error:", err);
      }
    }, 6000);

  } catch (err) {
    console.error("Error dispatching task:", err);
    showToast('✗ Failed to dispatch task');
  }
}
