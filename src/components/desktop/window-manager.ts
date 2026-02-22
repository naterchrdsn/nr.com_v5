/**
 * Window Manager — handles dragging, focus, open/close/minimize for Win95 windows.
 * Pure vanilla JS, no dependencies.
 */

let zCounter = 100;
let activeWindowId: string | null = null;

/** Re-index all open windows to prevent unbounded z-index growth */
function normalizeZIndices() {
  const windows = document.querySelectorAll<HTMLElement>('.win95-window.open');
  const sorted = Array.from(windows).sort(
    (a, b) => (parseInt(a.style.zIndex) || 0) - (parseInt(b.style.zIndex) || 0)
  );
  zCounter = 100;
  sorted.forEach((win) => {
    win.style.zIndex = String(++zCounter);
  });
}

// --- Window State ---
const windowState: Record<
  string,
  { open: boolean; minimized: boolean; maximized: boolean; prevStyle?: string }
> = {};

// --- Init ---
export function initWindowManager() {
  initDragging();
  initTitleBarButtons();
  initDesktopIcons();
  initStartMenu();
  initShutdown();
}

// --- Matomo virtual page view tracking ---
function trackPageView(id: string, title: string) {
  const _paq = ((window as any)._paq = (window as any)._paq || []);
  _paq.push(['setCustomUrl', '/' + id]);
  _paq.push(['setDocumentTitle', title]);
  _paq.push(['trackPageView']);
}

// --- Open a window ---
export function openWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  if (!windowState[id]) {
    windowState[id] = { open: false, minimized: false, maximized: false };
  }

  win.classList.add('open');
  win.classList.remove('hidden');
  windowState[id].open = true;
  windowState[id].minimized = false;

  // Track virtual page view in Matomo
  const title = win.querySelector('.win95-titlebar-text')?.textContent || id;
  trackPageView(id, title);

  focusWindow(id);
  updateTaskbar();
}

// --- Close a window ---
export function closeWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  win.classList.remove('open');
  win.classList.add('hidden');
  if (windowState[id]) {
    windowState[id].open = false;
    windowState[id].minimized = false;
    windowState[id].maximized = false;
    win.classList.remove('maximized');
  }

  if (activeWindowId === id) activeWindowId = null;
  updateTaskbar();
  updateTitleBarStates();

  // If no windows remain open, track return to homepage
  const anyOpen = Object.values(windowState).some((s) => s.open || s.minimized);
  if (!anyOpen) trackPageView('', 'Nate Richardson | Frontend Architect & Developer');
}

// --- Minimize a window ---
export function minimizeWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  win.classList.remove('open');
  win.classList.add('hidden');
  if (windowState[id]) windowState[id].minimized = true;

  if (activeWindowId === id) activeWindowId = null;
  updateTaskbar();
  updateTitleBarStates();
}

// --- Maximize / Restore a window ---
export function toggleMaximize(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (!win || !windowState[id]) return;

  if (windowState[id].maximized) {
    // Restore
    win.classList.remove('maximized');
    if (windowState[id].prevStyle) {
      win.setAttribute('style', windowState[id].prevStyle!);
    }
    windowState[id].maximized = false;
  } else {
    // Maximize
    windowState[id].prevStyle = win.getAttribute('style') || '';
    win.classList.add('maximized');
    windowState[id].maximized = true;
  }
}

// --- Focus a window (bring to front) ---
export function focusWindow(id: string) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  zCounter++;
  if (zCounter > 10000) normalizeZIndices();
  win.style.zIndex = String(zCounter);
  activeWindowId = id;
  updateTitleBarStates();
  updateTaskbar();
}

// --- Update title bar active/inactive states ---
function updateTitleBarStates() {
  document.querySelectorAll<HTMLElement>('[data-window-id]').forEach((win) => {
    const id = win.dataset.windowId;
    const titlebar = win.querySelector('.win95-titlebar');
    if (titlebar) {
      titlebar.classList.toggle('inactive', id !== activeWindowId);
    }
  });
}

// --- Update taskbar buttons ---
function updateTaskbar() {
  const container = document.getElementById('taskbar-buttons');
  if (!container) return;

  container.innerHTML = '';

  for (const [id, state] of Object.entries(windowState)) {
    if (!state.open && !state.minimized) continue;

    const win = document.getElementById(`window-${id}`);
    if (!win) continue;

    const title =
      win.querySelector('.win95-titlebar-text')?.textContent || id;
    const iconSrc = win
      .querySelector<HTMLImageElement>('.win95-titlebar-icon')
      ?.getAttribute('src');

    const btn = document.createElement('button');
    btn.className = `win95-taskbar-btn${activeWindowId === id && !state.minimized ? ' active' : ''}`;
    btn.dataset.windowId = id;

    if (iconSrc) {
      const img = document.createElement('img');
      img.src = iconSrc;
      img.alt = '';
      img.className = 'pixelated';
      btn.appendChild(img);
    }

    const span = document.createElement('span');
    span.textContent = title;
    btn.appendChild(span);

    btn.addEventListener('click', () => {
      if (state.minimized) {
        // Restore from minimized
        openWindow(id);
      } else if (activeWindowId === id) {
        // Already focused — minimize
        minimizeWindow(id);
      } else {
        // Bring to focus
        focusWindow(id);
      }
    });

    container.appendChild(btn);
  }
}

// --- Dragging ---
function initDragging() {
  let dragTarget: HTMLElement | null = null;
  let offsetX = 0;
  let offsetY = 0;

  document.addEventListener('mousedown', (e) => {
    const handle = (e.target as HTMLElement).closest<HTMLElement>(
      '[data-drag-handle]'
    );
    if (!handle) return;

    // Don't drag if clicking a button
    if ((e.target as HTMLElement).closest('button')) return;

    const win = handle.closest<HTMLElement>('.win95-window');
    if (!win) return;

    // Don't drag if maximized
    const id = win.dataset.windowId;
    if (id && windowState[id]?.maximized) return;

    dragTarget = win;
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    if (id) focusWindow(id);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragTarget) return;
    const x = Math.max(0, e.clientX - offsetX);
    const y = Math.max(0, e.clientY - offsetY);
    dragTarget.style.left = `${x}px`;
    dragTarget.style.top = `${y}px`;
  });

  document.addEventListener('mouseup', () => {
    dragTarget = null;
  });
}

// --- Title Bar Buttons (close/minimize/maximize) ---
function initTitleBarButtons() {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>(
      '.win95-titlebar-btn'
    );
    if (!btn) return;

    const win = btn.closest<HTMLElement>('.win95-window');
    if (!win) return;

    const id = win.dataset.windowId;
    if (!id) return;

    const action = btn.dataset.action;
    if (action === 'close') closeWindow(id);
    else if (action === 'minimize') minimizeWindow(id);
    else if (action === 'maximize') toggleMaximize(id);
  });

  // Click anywhere on window to focus
  document.addEventListener('mousedown', (e) => {
    const win = (e.target as HTMLElement).closest<HTMLElement>(
      '.win95-window'
    );
    if (!win) return;
    const id = win.dataset.windowId;
    if (id && windowState[id]?.open) focusWindow(id);
  });
}

// --- Desktop Icons ---
function initDesktopIcons() {
  let selectedIcon: HTMLElement | null = null;

  // Single click — select the icon
  document.addEventListener('click', (e) => {
    const icon = (e.target as HTMLElement).closest<HTMLElement>(
      '.win95-desktop-icon'
    );

    // Deselect if clicking elsewhere
    if (!icon) {
      if (selectedIcon) {
        selectedIcon.classList.remove('selected');
        selectedIcon = null;
      }
      return;
    }

    // Select this icon
    if (selectedIcon && selectedIcon !== icon) {
      selectedIcon.classList.remove('selected');
    }
    icon.classList.add('selected');
    selectedIcon = icon;
  });

  // Native double-click — open the window
  document.addEventListener('dblclick', (e) => {
    const icon = (e.target as HTMLElement).closest<HTMLElement>(
      '.win95-desktop-icon'
    );
    if (!icon) return;

    const targetId = icon.dataset.windowTarget;
    if (!targetId) return;

    openWindow(targetId);
    icon.classList.remove('selected');
    selectedIcon = null;
  });

  // Keyboard support — Enter opens selected icon
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && selectedIcon) {
      const targetId = selectedIcon.dataset.windowTarget;
      if (targetId) openWindow(targetId);
      selectedIcon.classList.remove('selected');
      selectedIcon = null;
    }
  });
}

// --- Start Menu ---
function initStartMenu() {
  const startBtn = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');
  if (!startBtn || !startMenu) return;

  // Set initial ARIA state
  startBtn.setAttribute('aria-haspopup', 'true');
  startBtn.setAttribute('aria-expanded', 'false');

  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !startMenu.classList.contains('hidden');
    startMenu.classList.toggle('hidden', isOpen);
    startBtn.classList.toggle('active', !isOpen);
    startBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      !startMenu.classList.contains('hidden') &&
      !(e.target as HTMLElement).closest('#start-menu') &&
      !(e.target as HTMLElement).closest('#start-button')
    ) {
      startMenu.classList.add('hidden');
      startBtn.classList.remove('active');
      startBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Start menu items open windows
  startMenu.querySelectorAll<HTMLElement>('[data-window-target]').forEach((item) => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.windowTarget;
      if (targetId) openWindow(targetId);
      startMenu.classList.add('hidden');
      startBtn.classList.remove('active');
      startBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Shut Down Easter Egg ---
function initShutdown() {
  const shutdownBtn = document.getElementById('shutdown-btn');
  if (!shutdownBtn) return;

  shutdownBtn.addEventListener('click', () => {
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.getElementById('start-button');
    if (startMenu) startMenu.classList.add('hidden');
    if (startBtn) startBtn.classList.remove('active');

    // Show shutdown screen
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    overlay.innerHTML =
      '<div style="color:#ff8c00;font-size:24px;font-family:inherit;text-align:center;"><div style="font-size:18px;margin-bottom:16px;">It\'s now safe to turn off</div><div style="font-size:14px;">your computer.</div><div style="font-size:11px;color:#808080;margin-top:32px;">Click anywhere to restart</div></div>';
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
}
