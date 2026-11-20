// LuminaStudy AI - Main Application Logic
(function () {
  "use strict";

  const PAGE_TITLES = {
    "home": "Home Dashboard",
    "search": "Search Everything",
    "ai-chat": "AI Chat Assistant",
    "courses": "Courses",
    "course-detail": "Course Workspace",
    "categories": "Course Categories",
    "my-learning": "My Learning",
    "notes": "Notes",
    "saved": "Saved Content",
    "daily-news": "Daily News",
    "tech-news": "Technology News",
    "ai-news": "AI News",
    "market": "Market Education",
    "tools": "Learning Tools",
    "settings": "Settings & Security",
    "help": "Help, Privacy & About"
  };

  let firebaseApp = null;
  let firebaseAuth = null;
  let firebaseConfigured = false;
  let currentUser = null;
  let authMode = "login";
  let currentPage = "home";
  let activeCourseId = null;
  let activeLessonId = null;
  let activeToolTab = "prompt-gen";
  let activeNewsTab = "daily";
  let selectedAiMode = "Explain simply";
  let marketChartInstance = null;
  let pomodoroInterval = null;
  let pomodoroSeconds = 25 * 60;
  let pomodoroRunning = false;
  let pomodoroMode = "focus";

  // ---------- Utility Helpers ----------
  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3200);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast("Copied to clipboard"),
        () => fallbackCopy(text)
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Copied to clipboard");
    } catch {
      showToast("Could not copy automatically. Please select and copy manually.");
    }
    ta.remove();
  }

  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function isMobileBrowser() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function openModal(html) {
    const overlay = document.getElementById("modal-overlay");
    const card = document.getElementById("modal-card");
    card.innerHTML = html;
    overlay.classList.remove("hidden");
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    overlay.classList.add("hidden");
  }

  // ---------- StorageService (Structured for future Firestore users/{uid}/...) ----------
  function defaultUserData() {
    return {
      preferences: {
        theme: localStorage.getItem("lumina_theme") || "dark",
        language: "English",
        dailyGoalMinutes: 30,
        learningGoal: "Build strong fundamentals in AI, Business, and Finance",
        studyReminders: true
      },
      progress: {
        completedLessons: {}, // { lessonId: timestamp }
        lastCourseId: "business-fundamentals",
        lastLessonId: "bf-1-1",
        todayMinutes: 0,
        todayDate: new Date().toISOString().slice(0, 10)
      },
      notes: [], // { id, title, content, tag, courseId, updatedAt }
      bookmarks: {
        lessons: [], // lessonIds
        prompts: [], // { id, title, prompt, createdAt }
        content: []  // { id, title, body, createdAt }
      },
      studyPlans: [], // { id, day, time, subject, notes }
      quizResults: {}, // { lessonId: { score, total, answeredAt } }
      history: [], // { type, title, refId, at }
      chatHistory: [], // { role, text, at }
      flashcards: [
        { id: "fc-1", deck: "Business", front: "What is Gross Profit?", back: "Revenue minus Cost of Goods Sold (COGS)." },
        { id: "fc-2", deck: "AI", front: "What is a Token in LLMs?", back: "A small chunk of text (word or sub-word) processed by a language model." },
        { id: "fc-3", deck: "Finance", front: "What is Compound Interest?", back: "Interest earned on both the original principal and previously earned interest." }
      ],
      businessWorksheet: {
        ideaName: "",
        problem: "",
        audience: "",
        solution: "",
        revenueModel: "",
        keyCosts: ""
      }
    };
  }

  function getStorageKey() {
    return currentUser ? `luminastudy_v2_${currentUser.uid}` : "luminastudy_v2_guest";
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(getStorageKey());
      if (!raw) return defaultUserData();
      const parsed = JSON.parse(raw);
      const base = defaultUserData();
      const merged = {
        ...base,
        ...parsed,
        preferences: { ...base.preferences, ...(parsed.preferences || {}) },
        progress: { ...base.progress, ...(parsed.progress || {}) },
        bookmarks: { ...base.bookmarks, ...(parsed.bookmarks || {}) },
        businessWorksheet: { ...base.businessWorksheet, ...(parsed.businessWorksheet || {}) }
      };
      const today = new Date().toISOString().slice(0, 10);
      if (merged.progress.todayDate !== today) {
        merged.progress.todayDate = today;
        merged.progress.todayMinutes = 0;
      }
      return merged;
    } catch {
      return defaultUserData();
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(data));
    } catch {
      showToast("Browser storage is full. Please export and clear old data.");
    }
  }

  function recordHistory(type, title, refId) {
    const data = loadData();
    data.history.unshift({ type, title, refId, at: new Date().toISOString() });
    data.history = data.history.slice(0, 30);
    saveData(data);
  }

  // ---------- Theme ----------
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("lumina_theme", theme);
    } catch {}
    if (currentUser) {
      const data = loadData();
      data.preferences.theme = theme;
      saveData(data);
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
    if (currentPage === "market") {
      renderMarketChart();
    }
  }

  // ---------- Firebase Auth ----------
  function isFirebaseConfigValid(cfg) {
    return Boolean(
      cfg &&
      cfg.apiKey &&
      cfg.authDomain &&
      cfg.projectId &&
      !cfg.apiKey.includes("YOUR_FIREBASE") &&
      !cfg.projectId.includes("YOUR_PROJECT")
    );
  }

  function friendlyAuthError(err) {
    const code = err && err.code ? err.code : "";
    const map = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/user-disabled": "This account has been disabled. Contact support.",
      "auth/user-not-found": "No account found with that email.",
      "auth/wrong-password": "Incorrect password. Try again or use Forgot Password.",
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/email-already-in-use": "An account with this email already exists. Try signing in.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
      "auth/popup-closed-by-user": "Google sign-in popup was closed before finishing.",
      "auth/unauthorized-domain": "This domain is not authorized in Firebase Console → Authentication → Settings → Authorized domains.",
      "auth/requires-recent-login": "For security, please sign out and sign back in before changing your password.",
      "auth/network-request-failed": "Network error. Please check your internet connection."
    };
    return map[code] || (err && err.message ? err.message : "Authentication failed. Please try again.");
  }

  function showAuthAlert(message, type) {
    const el = document.getElementById("auth-alert");
    if (!el) return;
    el.className = `alert alert-${type}`;
    el.textContent = message;
    el.classList.remove("hidden");
  }

  function hideAuthAlert() {
    const el = document.getElementById("auth-alert");
    if (el) el.classList.add("hidden");
  }

  function initFirebase() {
    const cfg = window.LUMINA_FIREBASE_CONFIG;
    const banner = document.getElementById("firebase-config-banner");

    if (!isFirebaseConfigValid(cfg) || typeof firebase === "undefined") {
      firebaseConfigured = false;
      if (banner) banner.classList.remove("hidden");
      return;
    }

    try {
      firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
      firebaseAuth = firebase.auth();
      firebaseConfigured = true;
      if (banner) banner.classList.add("hidden");

      firebaseAuth.getRedirectResult().catch((err) => {
        if (err && err.code) {
          showAuthAlert(friendlyAuthError(err), "error");
        }
      });

      firebaseAuth.onAuthStateChanged((user) => {
        currentUser = user;
        const authScreen = document.getElementById("auth-screen");
        const appShell = document.getElementById("app-shell");

        if (user) {
          authScreen.classList.add("hidden");
          appShell.classList.remove("hidden");
          const data = loadData();
          applyTheme(data.preferences.theme || "dark");
          updateUserChrome();
          navigateTo(currentPage || "home");
        } else {
          appShell.classList.add("hidden");
          authScreen.classList.remove("hidden");
        }
      });
    } catch (err) {
      firebaseConfigured = false;
      showAuthAlert("Firebase initialization failed: " + friendlyAuthError(err), "error");
    }
  }

  function updateUserChrome() {
    if (!currentUser) return;
    const name = currentUser.displayName || currentUser.email || "Learner";
    const initial = name.charAt(0).toUpperCase();
    document.getElementById("topbar-username").textContent = name;
    document.getElementById("topbar-avatar").textContent = initial;
    document.getElementById("sidebar-user-email").textContent = currentUser.email || name;
  }

  function setupAuthEvents() {
    const tabLogin = document.getElementById("tab-login");
    const tabRegister = document.getElementById("tab-register");
    const nameGroup = document.getElementById("register-name-group");
    const submitBtn = document.getElementById("auth-submit-btn");
    const authForm = document.getElementById("auth-form");
    const googleBtn = document.getElementById("google-signin-btn");
    const forgotBtn = document.getElementById("forgot-password-btn");
    const authThemeBtn = document.getElementById("auth-theme-btn");

    authThemeBtn.addEventListener("click", toggleTheme);

    tabLogin.addEventListener("click", () => {
      authMode = "login";
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      nameGroup.classList.add("hidden");
      submitBtn.textContent = "Sign In";
      hideAuthAlert();
    });

    tabRegister.addEventListener("click", () => {
      authMode = "register";
      tabRegister.classList.add("active");
      tabLogin.classList.remove("active");
      nameGroup.classList.remove("hidden");
      submitBtn.textContent = "Create Account";
      hideAuthAlert();
    });

    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideAuthAlert();
      if (!firebaseConfigured || !firebaseAuth) {
        showAuthAlert("Firebase is not configured yet. Add your firebaseConfig in firebase-config.js.", "warning");
        return;
      }

      const email = document.getElementById("auth-email").value.trim();
      const password = document.getElementById("auth-password").value;
      const displayName = document.getElementById("auth-name").value.trim();

      submitBtn.disabled = true;
      submitBtn.textContent = authMode === "login" ? "Signing in..." : "Creating account...";

      try {
        if (authMode === "login") {
          await firebaseAuth.signInWithEmailAndPassword(email, password);
        } else {
          const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
          if (displayName && cred.user) {
            await cred.user.updateProfile({ displayName });
          }
          if (cred.user && !cred.user.emailVerified) {
            await cred.user.sendEmailVerification().catch(() => {});
          }
          showToast("Account created! Verification email sent.");
        }
      } catch (err) {
        showAuthAlert(friendlyAuthError(err), "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = authMode === "login" ? "Sign In" : "Create Account";
      }
    });

    googleBtn.addEventListener("click", async () => {
      hideAuthAlert();
      if (!firebaseConfigured || !firebaseAuth) {
        showAuthAlert("Firebase is not configured yet. Add your firebaseConfig in firebase-config.js.", "warning");
        return;
      }
      googleBtn.disabled = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        if (isMobileBrowser()) {
          await firebaseAuth.signInWithRedirect(provider);
        } else {
          try {
            await firebaseAuth.signInWithPopup(provider);
          } catch (popupErr) {
            if (popupErr.code === "auth/popup-blocked") {
              await firebaseAuth.signInWithRedirect(provider);
            } else {
              throw popupErr;
            }
          }
        }
      } catch (err) {
        showAuthAlert(friendlyAuthError(err), "error");
        googleBtn.disabled = false;
      }
    });

    forgotBtn.addEventListener("click", async () => {
      hideAuthAlert();
      if (!firebaseConfigured || !firebaseAuth) {
        showAuthAlert("Firebase is not configured yet. Add your firebaseConfig in firebase-config.js.", "warning");
        return;
      }
      const email = document.getElementById("auth-email").value.trim();
      if (!email) {
        showAuthAlert("Enter your email address above first, then click Forgot password.", "info");
        return;
      }
      try {
        await firebaseAuth.sendPasswordResetEmail(email);
        showAuthAlert("Password reset email sent to " + email + ". Check your inbox.", "success");
      } catch (err) {
        showAuthAlert(friendlyAuthError(err), "error");
      }
    });
  }

  async function signOutUser() {
    if (!firebaseAuth) return;
    try {
      await firebaseAuth.signOut();
      showToast("Signed out safely");
    } catch (err) {
      showToast(friendlyAuthError(err));
    }
  }

  // ---------- Course & Progress Helpers ----------
  function getCourseById(id) {
    return window.LUMINA_COURSES.find((c) => c.id === id) || window.LUMINA_COURSES[0];
  }

  function getFlatLessons(course) {
    const list = [];
    course.chapters.forEach((ch) => {
      ch.lessons.forEach((ls) => {
        list.push({ ...ls, chapterTitle: ch.title });
      });
    });
    return list;
  }

  function getCourseProgress(course, data) {
    const lessons = getFlatLessons(course);
    if (!lessons.length) return { completed: 0, total: 0, percent: 0 };
    const completed = lessons.filter((l) => Boolean(data.progress.completedLessons[l.id])).length;
    return {
      completed,
      total: lessons.length,
      percent: Math.round((completed / lessons.length) * 100)
    };
  }

  function getOverallProgress(data) {
    let completed = 0;
    let total = 0;
    window.LUMINA_COURSES.forEach((c) => {
      const p = getCourseProgress(c, data);
      completed += p.completed;
      total += p.total;
    });
    return {
      completed,
      total,
      percent: total ? Math.round((completed / total) * 100) : 0
    };
  }

  // ---------- Navigation ----------
  function closeMobileSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-backdrop").classList.remove("open");
  }

  function navigateTo(page, opts = {}) {
    currentPage = page;
    closeMobileSidebar();

    if (marketChartInstance) {
      marketChartInstance.destroy();
      marketChartInstance = null;
    }

    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === page || (page === "course-detail" && btn.dataset.page === "courses"));
    });
    document.querySelectorAll(".mobile-bottom-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === page);
    });

    document.getElementById("topbar-page-title").textContent = PAGE_TITLES[page] || "LuminaStudy AI";

    const container = document.getElementById("page-content");
    switch (page) {
      case "home": renderHome(container); break;
      case "search": renderSearch(container, opts.query || ""); break;
      case "ai-chat": renderAiChat(container, opts.prefill || ""); break;
      case "courses": renderCourses(container, opts.categoryId || "all"); break;
      case "course-detail": renderCourseDetail(container, opts.courseId || activeCourseId, opts.lessonId || activeLessonId); break;
      case "categories": renderCategories(container); break;
      case "my-learning": renderMyLearning(container); break;
      case "notes": renderNotes(container); break;
      case "saved": renderSaved(container); break;
      case "daily-news": activeNewsTab = "daily"; renderNews(container); break;
      case "tech-news": activeNewsTab = "tech"; renderNews(container); break;
      case "ai-news": activeNewsTab = "ai"; renderNews(container); break;
      case "market": renderMarket(container); break;
      case "tools": renderTools(container, opts.tool || activeToolTab); break;
      case "settings": renderSettings(container); break;
      case "help": renderHelp(container); break;
      default: renderHome(container);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- 1. HOME DASHBOARD ----------
  function renderHome(container) {
    const data = loadData();
    const overall = getOverallProgress(data);
    const resumeCourse = getCourseById(data.progress.lastCourseId);
    const resumeProg = getCourseProgress(resumeCourse, data);
    const goalPct = Math.min(100, Math.round((data.progress.todayMinutes / (data.preferences.dailyGoalMinutes || 30)) * 100));
    const dayIndex = Math.floor(Date.now() / 86400000) % window.LUMINA_DAILY_TOPICS.length;
    const dailyTopic = window.LUMINA_DAILY_TOPICS[dayIndex];
    const displayName = (currentUser && (currentUser.displayName || currentUser.email)) || "Learner";

    container.innerHTML = `
      <div class="hero-banner">
        <div>
          <span class="badge">✦ Welcome back</span>
          <h1 style="margin:8px 0 6px; font-size:1.55rem;">Hello, ${esc(displayName)}</h1>
          <p class="card-muted">Goal: ${esc(data.preferences.learningGoal)}</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-primary" id="home-resume-btn">▶ Continue Learning</button>
          <button class="btn btn-secondary" id="home-ai-btn">✨ Open AI Assistant</button>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px;">
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <input id="home-search-input" class="form-input" style="flex:1; min-width:200px;" type="search" placeholder="Search courses, lessons, notes, or topics...">
          <button id="home-search-btn" class="btn btn-primary" type="button">Search</button>
        </div>
      </div>

      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-muted">Overall Progress</div>
          <div style="font-size:1.5rem; font-weight:800; margin:4px 0;">${overall.percent}%</div>
          <div class="progress-track"><div class="progress-fill" style="width:${overall.percent}%"></div></div>
          <div class="card-muted">${overall.completed} of ${overall.total} lessons</div>
        </div>
        <div class="card">
          <div class="card-muted">Daily Learning Goal</div>
          <div style="font-size:1.5rem; font-weight:800; margin:4px 0;">${data.progress.todayMinutes} / ${data.preferences.dailyGoalMinutes} min</div>
          <div class="progress-track"><div class="progress-fill" style="width:${goalPct}%"></div></div>
          <button class="btn btn-sm btn-outline" id="home-log-10m">+10 min studied</button>
        </div>
        <div class="card">
          <div class="card-muted">Saved Notes</div>
          <div style="font-size:1.5rem; font-weight:800; margin:4px 0;">${data.notes.length}</div>
          <p class="card-muted">Stored locally in browser</p>
          <button class="btn btn-sm btn-outline" style="margin-top:8px;" data-nav="notes">Open Notes</button>
        </div>
        <div class="card">
          <div class="card-muted">Quizzes Completed</div>
          <div style="font-size:1.5rem; font-weight:800; margin:4px 0;">${Object.keys(data.quizResults).length}</div>
          <p class="card-muted">${data.bookmarks.lessons.length} bookmarked lessons</p>
          <button class="btn btn-sm btn-outline" style="margin-top:8px;" data-nav="saved">View Saved</button>
        </div>
      </div>

      <div class="grid grid-2" style="margin-bottom:20px;">
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge badge-cyan">Continue Learning</span>
            <span class="card-muted">${resumeProg.percent}% complete</span>
          </div>
          <h3 style="margin:10px 0 4px;">${esc(resumeCourse.title)}</h3>
          <p class="card-muted">${esc(resumeCourse.description)}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${resumeProg.percent}%"></div></div>
          <button class="btn btn-primary btn-sm" id="resume-course-card-btn">Open Course</button>
        </div>

        <div class="card">
          <span class="badge badge-emerald">Daily Educational Topic</span>
          <h3 style="margin:10px 0 4px;">${esc(dailyTopic.title)}</h3>
          <p class="card-muted">${esc(dailyTopic.summary)}</p>
          <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" id="daily-topic-course-btn">Explore Related Course</button>
            <button class="btn btn-outline btn-sm" id="daily-topic-ai-btn">Ask AI Prompt</button>
          </div>
        </div>
      </div>

      <div class="section-header">
        <h2>Recent Courses</h2>
        <button class="btn btn-sm btn-outline" data-nav="courses">All Courses</button>
      </div>
      <div class="grid grid-3" style="margin-bottom:20px;">
        ${window.LUMINA_COURSES.slice(0, 3).map((c) => {
          const p = getCourseProgress(c, data);
          return `
            <div class="card card-interactive">
              <span class="badge">${esc(c.level)}</span>
              <h3 class="card-title" style="margin-top:8px;">${esc(c.title)}</h3>
              <p class="card-muted">${esc(c.description)}</p>
              <div class="progress-track"><div class="progress-fill" style="width:${p.percent}%"></div></div>
              <button class="btn btn-sm btn-primary open-course-btn" data-course="${c.id}">Start / Resume</button>
            </div>
          `;
        }).join("")}
      </div>

      <div class="grid grid-2">
        <div class="card">
          <h3 class="card-title">AI &amp; Learning Tools</h3>
          <p class="card-muted" style="margin-bottom:12px;">Built-in study tools that work offline without paid APIs.</p>
          <div class="pill-bar">
            <button class="pill-btn" data-tool="prompt-gen">✨ Prompt Generator</button>
            <button class="pill-btn" data-tool="flashcards">🃏 Flashcards</button>
            <button class="pill-btn" data-tool="pomodoro">⏱️ Pomodoro Timer</button>
            <button class="pill-btn" data-tool="timetable">📅 Timetable</button>
            <button class="pill-btn" data-tool="calculator">🧮 Calculator</button>
          </div>
        </div>
        <div class="card">
          <h3 class="card-title">News &amp; Market Education</h3>
          <div class="alert alert-info" style="margin:8px 0;">Live news is not connected yet.</div>
          <p class="card-muted" style="margin-bottom:12px;">Browse curated reputable news sources or learn market fundamentals with clearly labeled demo charts.</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn btn-sm btn-secondary" data-nav="daily-news">📰 News Hub</button>
            <button class="btn btn-sm btn-secondary" data-nav="market">📈 Market Education</button>
            <button class="btn btn-sm btn-outline" data-nav="categories">🗂️ 6 Categories</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("home-resume-btn").addEventListener("click", () => {
      navigateTo("course-detail", { courseId: resumeCourse.id, lessonId: data.progress.lastLessonId });
    });
    document.getElementById("resume-course-card-btn").addEventListener("click", () => {
      navigateTo("course-detail", { courseId: resumeCourse.id, lessonId: data.progress.lastLessonId });
    });
    document.getElementById("home-ai-btn").addEventListener("click", () => navigateTo("ai-chat"));
    document.getElementById("home-log-10m").addEventListener("click", () => {
      const d = loadData();
      d.progress.todayMinutes += 10;
      saveData(d);
      showToast("Logged +10 minutes toward your daily goal!");
      renderHome(container);
    });
    document.getElementById("home-search-btn").addEventListener("click", () => {
      const q = document.getElementById("home-search-input").value.trim();
      navigateTo("search", { query: q });
    });
    document.getElementById("home-search-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        navigateTo("search", { query: e.target.value.trim() });
      }
    });
    document.getElementById("daily-topic-course-btn").addEventListener("click", () => {
      navigateTo("course-detail", { courseId: dailyTopic.courseId });
    });
    document.getElementById("daily-topic-ai-btn").addEventListener("click", () => {
      navigateTo("ai-chat", { prefill: "Explain " + dailyTopic.title + " for a beginner" });
    });
    container.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo(btn.dataset.nav));
    });
    container.querySelectorAll("[data-tool]").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("tools", { tool: btn.dataset.tool }));
    });
    container.querySelectorAll(".open-course-btn").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("course-detail", { courseId: btn.dataset.course }));
    });
  }

  // ---------- 2. SEARCH ----------
  function renderSearch(container, initialQuery) {
    container.innerHTML = `
      <div class="card" style="margin-bottom:20px;">
        <h2 style="margin:0 0 10px;">Unified Search</h2>
        <p class="card-muted" style="margin-bottom:12px;">Search across courses, lessons, subjects, your notes, saved content, and learning topics.</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <input id="global-search-input" class="form-input" style="flex:1; min-width:200px;" type="search" value="${esc(initialQuery)}" placeholder="Type a keyword (e.g. Python, BBA, Marketing, Compound, AI)...">
          <button id="global-search-clear" class="btn btn-secondary" type="button">Clear</button>
        </div>
      </div>
      <div id="search-results-area"></div>
    `;

    const input = document.getElementById("global-search-input");
    const resultsArea = document.getElementById("search-results-area");

    function runSearch(q) {
      const term = q.trim().toLowerCase();
      if (!term) {
        resultsArea.innerHTML = `
          <div class="card" style="text-align:center; padding:36px;">
            <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
            <h3>Start typing to search</h3>
            <p class="card-muted">Try searching for <strong>Python</strong>, <strong>BBA</strong>, <strong>Marketing</strong>, <strong>Bitcoin</strong>, or your own notes.</p>
          </div>
        `;
        return;
      }

      const data = loadData();
      const matchedCourses = window.LUMINA_COURSES.filter((c) =>
        c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term)
      );

      const matchedLessons = [];
      window.LUMINA_COURSES.forEach((c) => {
        c.chapters.forEach((ch) => {
          ch.lessons.forEach((l) => {
            if (l.title.toLowerCase().includes(term) || l.explanation.toLowerCase().includes(term)) {
              matchedLessons.push({ course: c, lesson: l });
            }
          });
        });
      });

      const matchedSubjects = [];
      window.LUMINA_CATEGORIES.forEach((cat) => {
        cat.subjects.forEach((sub) => {
          if (sub.toLowerCase().includes(term)) {
            matchedSubjects.push({ cat, sub });
          }
        });
      });

      const matchedNotes = data.notes.filter((n) =>
        n.title.toLowerCase().includes(term) || n.content.toLowerCase().includes(term)
      );

      const matchedSaved = [
        ...data.bookmarks.prompts.filter((p) => p.title.toLowerCase().includes(term) || p.prompt.toLowerCase().includes(term)),
        ...data.bookmarks.content.filter((c) => c.title.toLowerCase().includes(term) || c.body.toLowerCase().includes(term))
      ];

      const matchedTopics = window.LUMINA_MARKET_TOPICS.filter((t) =>
        t.title.toLowerCase().includes(term) || t.summary.toLowerCase().includes(term)
      );

      const total = matchedCourses.length + matchedLessons.length + matchedSubjects.length + matchedNotes.length + matchedSaved.length + matchedTopics.length;
      if (total === 0) {
        resultsArea.innerHTML = `
          <div class="card" style="text-align:center; padding:36px;">
            <h3>No matches found for "${esc(q)}"</h3>
            <p class="card-muted">Try a broader keyword or clear your search.</p>
          </div>
        `;
        return;
      }

      let html = `<p class="card-muted" style="margin-bottom:14px;">Found ${total} matching result(s)</p><div class="grid grid-2">`;

      matchedCourses.forEach((c) => {
        html += `
          <div class="card">
            <span class="badge">Course</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(c.title)}</h3>
            <p class="card-muted">${esc(c.description)}</p>
            <button class="btn btn-sm btn-primary" style="margin-top:10px;" data-open-course="${c.id}">Open Course</button>
          </div>
        `;
      });

      matchedLessons.forEach(({ course, lesson }) => {
        html += `
          <div class="card">
            <span class="badge badge-cyan">Lesson · ${esc(course.title)}</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(lesson.title)}</h3>
            <p class="card-muted">${esc(lesson.explanation.slice(0, 120))}...</p>
            <button class="btn btn-sm btn-primary" style="margin-top:10px;" data-open-course="${course.id}" data-open-lesson="${lesson.id}">Open Lesson</button>
          </div>
        `;
      });

      matchedSubjects.forEach(({ cat, sub }) => {
        html += `
          <div class="card">
            <span class="badge badge-emerald">Subject · ${esc(cat.name)}</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(sub)}</h3>
            <button class="btn btn-sm btn-secondary" style="margin-top:10px;" data-open-subject="${esc(sub)}" data-cat="${esc(cat.name)}">View Study Guide</button>
          </div>
        `;
      });

      matchedNotes.forEach((n) => {
        html += `
          <div class="card">
            <span class="badge badge-amber">Note</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(n.title)}</h3>
            <p class="card-muted">${esc(n.content.slice(0, 120))}</p>
            <button class="btn btn-sm btn-secondary" style="margin-top:10px;" data-nav="notes">Open in Notes</button>
          </div>
        `;
      });

      matchedSaved.forEach((s) => {
        html += `
          <div class="card">
            <span class="badge">Saved Content</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(s.title)}</h3>
            <button class="btn btn-sm btn-secondary" style="margin-top:10px;" data-nav="saved">Open in Saved</button>
          </div>
        `;
      });

      matchedTopics.forEach((t) => {
        html += `
          <div class="card">
            <span class="badge badge-cyan">Market Topic</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(t.title)}</h3>
            <p class="card-muted">${esc(t.summary)}</p>
            <button class="btn btn-sm btn-secondary" style="margin-top:10px;" data-nav="market">Open Market Education</button>
          </div>
        `;
      });

      html += `</div>`;
      resultsArea.innerHTML = html;

      resultsArea.querySelectorAll("[data-open-course]").forEach((btn) => {
        btn.addEventListener("click", () => navigateTo("course-detail", { courseId: btn.dataset.openCourse, lessonId: btn.dataset.openLesson || null }));
      });
      resultsArea.querySelectorAll("[data-open-subject]").forEach((btn) => {
        btn.addEventListener("click", () => openSubjectModal(btn.dataset.openSubject, btn.dataset.cat));
      });
      resultsArea.querySelectorAll("[data-nav]").forEach((btn) => {
        btn.addEventListener("click", () => navigateTo(btn.dataset.nav));
      });
    }

    input.addEventListener("input", () => runSearch(input.value));
    document.getElementById("global-search-clear").addEventListener("click", () => {
      input.value = "";
      runSearch("");
      input.focus();
    });
    runSearch(initialQuery);
  }

  // ---------- 3. AI ASSISTANT ----------
  function buildLocalStudyReply(question, mode) {
    const qLower = question.toLowerCase();
    // Search matching lessons or dictionary terms
    let matchedLesson = null;
    let matchedCourse = null;
    for (const c of window.LUMINA_COURSES) {
      for (const ch of c.chapters) {
        for (const l of ch.lessons) {
          if (qLower.includes(l.title.toLowerCase()) || l.title.toLowerCase().split(" ").some((w) => w.length > 4 && qLower.includes(w))) {
            matchedLesson = l;
            matchedCourse = c;
            break;
          }
        }
        if (matchedLesson) break;
      }
      if (matchedLesson) break;
    }

    const matchedTerm = window.LUMINA_DICTIONARY.find((d) => qLower.includes(d.term.toLowerCase()));

    if (mode === "Quiz me") {
      if (matchedLesson && matchedLesson.quiz) {
        return `Practice Question from "${matchedLesson.title}" (${matchedCourse.title}):\n\nQ: ${matchedLesson.quiz.question}\n${matchedLesson.quiz.options.map((o, i) => `${i + 1}. ${o}`).join("\n")}\n\n(Built-in local study helper — open the full lesson for interactive grading!)`;
      }
      return `Quick Self-Quiz on "${question}":\n1. Define "${question}" in one plain sentence.\n2. Give one real-world example.\n3. Explain why it matters for beginners.\n\nTip: Use the "Copy Prompt" + ChatGPT/Gemini buttons below for a full interactive AI quiz.`;
    }

    if (mode === "Create study plan") {
      return `Starter 4-Step Study Plan for "${question}":\n• Day 1 (20 min): Learn the core definition and 3 key terms.\n• Day 2 (25 min): Work through 2 simple real-world examples.\n• Day 3 (20 min): Write a short summary in your own words in Notes.\n• Day 4 (15 min): Test yourself with flashcards or a quick quiz.`;
    }

    if (matchedLesson) {
      if (mode === "Give examples") {
        return `Example from ${matchedCourse.title} → ${matchedLesson.title}:\n\n${matchedLesson.example}`;
      }
      if (mode === "Summarize") {
        return `Summary of ${matchedLesson.title}:\n• ${matchedLesson.points.join("\n• ")}`;
      }
      return `${matchedLesson.title} (${matchedCourse.title}):\n\n${matchedLesson.explanation}\n\nExample: ${matchedLesson.example}`;
    }

    if (matchedTerm) {
      return `${matchedTerm.term} (${matchedTerm.category}):\n${matchedTerm.def}\n\nNote: This response comes from LuminaStudy AI's built-in offline study library (no external AI API is connected). Use the ChatGPT or Gemini prompt buttons below for deeper live AI tutoring.`;
    }

    return `Built-in Local Study Helper (${mode}):\nI searched your local LuminaStudy AI curriculum for "${question}". No external AI API is connected in this static build, so for live AI answers:\n1. Click "Prepare ChatGPT Prompt" or "Prepare Gemini Prompt" below.\n2. Copy the structured prompt and open ChatGPT or Gemini directly.`;
  }

  function renderAiChat(container, prefill) {
    const data = loadData();
    const modes = ["Explain simply", "Summarize", "Give examples", "Quiz me", "Create study plan"];

    container.innerHTML = `
      <div class="alert alert-info" style="margin-bottom:16px;">
        <strong>Honest AI Status:</strong> No paid external AI API is connected in this free static app. Use the built-in offline study helper below, or generate a ready-to-copy prompt for <strong>ChatGPT</strong> or <strong>Gemini</strong>.
      </div>

      <div class="pill-bar" id="ai-mode-pills">
        ${modes.map((m) => `<button class="pill-btn ${selectedAiMode === m ? "active" : ""}" data-mode="${m}">${m}</button>`).join("")}
      </div>

      <div class="chat-box" style="margin-bottom:16px;">
        <div id="chat-messages" class="chat-messages">
          ${data.chatHistory.length ? data.chatHistory.map((m, idx) => `
            <div class="chat-msg ${m.role}">
              <div>${esc(m.text)}</div>
              ${m.role === "assistant" ? `
                <div style="display:flex; gap:8px; margin-top:8px;">
                  <button class="btn btn-sm btn-secondary chat-copy-btn" data-idx="${idx}">Copy</button>
                  <button class="btn btn-sm btn-outline chat-save-btn" data-idx="${idx}">Save Answer</button>
                </div>
              ` : ""}
            </div>
          `).join("") : `
            <div class="card-muted" style="text-align:center; margin:auto;">
              Ask a study question below or choose a mode above to get started.
            </div>
          `}
        </div>
        <div class="chat-composer">
          <input id="ai-chat-input" class="form-input" type="text" value="${esc(prefill)}" placeholder="Ask a study question (e.g. What is compound interest? or Python loops)...">
          <button id="ai-send-btn" class="btn btn-primary" type="button">Send</button>
          <button id="ai-clear-btn" class="btn btn-secondary" type="button">Clear</button>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">External AI Learning Shortcuts (ChatGPT &amp; Gemini)</h3>
        <p class="card-muted" style="margin-bottom:12px;">Select a platform to build a structured learning prompt from your question above.</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
          <button id="prep-chatgpt-btn" class="btn btn-secondary" type="button">Prepare ChatGPT Prompt</button>
          <button id="prep-gemini-btn" class="btn btn-secondary" type="button">Prepare Gemini Prompt</button>
        </div>
        <div id="external-prompt-box" class="hidden">
          <textarea id="generated-prompt-area" class="form-textarea" rows="4" readonly></textarea>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
            <button id="copy-gen-prompt-btn" class="btn btn-primary btn-sm" type="button">Copy Prompt</button>
            <button id="save-gen-prompt-btn" class="btn btn-outline btn-sm" type="button">Save Prompt</button>
            <a id="open-external-ai-link" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Open ChatGPT ↗</a>
          </div>
        </div>
      </div>
    `;

    const msgBox = document.getElementById("chat-messages");
    msgBox.scrollTop = msgBox.scrollHeight;

    container.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedAiMode = btn.dataset.mode;
        renderAiChat(container, document.getElementById("ai-chat-input").value);
      });
    });

    function sendMessage() {
      const input = document.getElementById("ai-chat-input");
      const q = input.value.trim();
      if (!q) return;
      const d = loadData();
      d.chatHistory.push({ role: "user", text: q, at: new Date().toISOString() });
      const reply = buildLocalStudyReply(q, selectedAiMode);
      d.chatHistory.push({ role: "assistant", text: reply, at: new Date().toISOString() });
      saveData(d);
      renderAiChat(container, "");
    }

    document.getElementById("ai-send-btn").addEventListener("click", sendMessage);
    document.getElementById("ai-chat-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
    document.getElementById("ai-clear-btn").addEventListener("click", () => {
      const d = loadData();
      d.chatHistory = [];
      saveData(d);
      renderAiChat(container, "");
    });

    container.querySelectorAll(".chat-copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = loadData();
        const item = d.chatHistory[Number(btn.dataset.idx)];
        if (item) copyText(item.text);
      });
    });

    container.querySelectorAll(".chat-save-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = loadData();
        const item = d.chatHistory[Number(btn.dataset.idx)];
        if (!item) return;
        d.notes.unshift({
          id: "note-" + Date.now(),
          title: "Saved Study Answer (" + selectedAiMode + ")",
          content: item.text,
          tag: "AI Helper",
          updatedAt: new Date().toISOString()
        });
        saveData(d);
        showToast("Saved answer to Notes!");
      });
    });

    function prepareExternalPrompt(platform) {
      const q = document.getElementById("ai-chat-input").value.trim() || "Explain a beginner topic clearly";
      const prompt = `Act as a friendly, patient tutor for a beginner student.\nMode: ${selectedAiMode}\nTopic/Question: ${q}\n\nPlease:\n1. Explain in simple, clear English.\n2. Include 1 everyday example.\n3. End with 2 short practice questions.`;
      const box = document.getElementById("external-prompt-box");
      const area = document.getElementById("generated-prompt-area");
      const link = document.getElementById("open-external-ai-link");
      box.classList.remove("hidden");
      area.value = prompt;
      if (platform === "chatgpt") {
        link.href = "https://chatgpt.com/";
        link.textContent = "Open ChatGPT ↗";
      } else {
        link.href = "https://gemini.google.com/";
        link.textContent = "Open Gemini ↗";
      }
    }

    document.getElementById("prep-chatgpt-btn").addEventListener("click", () => prepareExternalPrompt("chatgpt"));
    document.getElementById("prep-gemini-btn").addEventListener("click", () => prepareExternalPrompt("gemini"));
    document.getElementById("copy-gen-prompt-btn").addEventListener("click", () => {
      copyText(document.getElementById("generated-prompt-area").value);
    });
    document.getElementById("save-gen-prompt-btn").addEventListener("click", () => {
      const prompt = document.getElementById("generated-prompt-area").value;
      if (!prompt) return;
      const d = loadData();
      d.bookmarks.prompts.unshift({
        id: "prm-" + Date.now(),
        title: selectedAiMode + " Study Prompt",
        prompt,
        createdAt: new Date().toISOString()
      });
      saveData(d);
      showToast("Prompt saved to Saved Content!");
    });
  }

  // ---------- 4. COURSES & 5. CATEGORIES ----------
  function renderCourses(container, filterCategoryId) {
    const data = loadData();
    const courses = filterCategoryId === "all"
      ? window.LUMINA_COURSES
      : window.LUMINA_COURSES.filter((c) => c.categoryId === filterCategoryId);

    container.innerHTML = `
      <div class="section-header" style="margin-top:0;">
        <div>
          <h2 class="page-title">Course Library</h2>
          <p class="card-muted">Full interactive beginner courses with chapters, examples, quizzes, and saved progress.</p>
        </div>
        <button class="btn btn-outline btn-sm" id="view-all-cats-btn">Browse All 6 Categories</button>
      </div>

      <div class="pill-bar">
        <button class="pill-btn ${filterCategoryId === "all" ? "active" : ""}" data-cat-filter="all">All</button>
        ${window.LUMINA_CATEGORIES.map((cat) => `
          <button class="pill-btn ${filterCategoryId === cat.id ? "active" : ""}" data-cat-filter="${cat.id}">${esc(cat.name)}</button>
        `).join("")}
      </div>

      <div class="grid grid-3">
        ${courses.length ? courses.map((c) => {
          const p = getCourseProgress(c, data);
          return `
            <div class="card card-interactive">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge">${esc(c.level)}</span>
                <span class="card-muted">${esc(c.duration)}</span>
              </div>
              <h3 class="card-title" style="margin-top:10px;">${esc(c.title)}</h3>
              <p class="card-muted">${esc(c.description)}</p>
              <div class="progress-track"><div class="progress-fill" style="width:${p.percent}%"></div></div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="card-muted">${p.completed}/${p.total} lessons</span>
                <button class="btn btn-sm btn-primary open-course-btn" data-course="${c.id}">Open</button>
              </div>
            </div>
          `;
        }).join("") : `
          <div class="card" style="grid-column:1/-1;">
            <h3>No full multi-chapter course in this filter yet</h3>
            <p class="card-muted">Open <strong>Course Categories</strong> to explore all subjects and starter study guides in this category.</p>
          </div>
        `}
      </div>
    `;

    document.getElementById("view-all-cats-btn").addEventListener("click", () => navigateTo("categories"));
    container.querySelectorAll("[data-cat-filter]").forEach((btn) => {
      btn.addEventListener("click", () => renderCourses(container, btn.dataset.catFilter));
    });
    container.querySelectorAll(".open-course-btn").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("course-detail", { courseId: btn.dataset.course }));
    });
  }

  function openSubjectModal(subject, categoryName) {
    openModal(`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span class="badge">${esc(categoryName)}</span>
        <button class="btn btn-sm btn-secondary" id="modal-close-x">✕</button>
      </div>
      <h2 style="margin:0 0 8px;">${esc(subject)}</h2>
      <p class="card-muted" style="margin-bottom:14px;">Beginner Learning Path Guide</p>
      <div class="card" style="margin-bottom:14px;">
        <strong>How to start learning ${esc(subject)}:</strong>
        <ul style="margin:8px 0 0; padding-left:18px; color:var(--text-secondary); font-size:0.9rem;">
          <li>Learn the 5 core definitions and everyday examples first.</li>
          <li>Write a 3-sentence summary in your Notes tab.</li>
          <li>Generate a beginner quiz or study plan using the AI Prompt shortcut below.</li>
        </ul>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-primary btn-sm" id="sub-ai-prompt-btn">✨ Open in AI Prompt Helper</button>
        <button class="btn btn-outline btn-sm" id="sub-save-note-btn">📝 Create Study Note</button>
      </div>
    `);
    document.getElementById("modal-close-x").addEventListener("click", closeModal);
    document.getElementById("sub-ai-prompt-btn").addEventListener("click", () => {
      closeModal();
      navigateTo("ai-chat", { prefill: "Teach me the basics of " + subject });
    });
    document.getElementById("sub-save-note-btn").addEventListener("click", () => {
      const d = loadData();
      d.notes.unshift({
        id: "note-" + Date.now(),
        title: subject + " — Study Notes",
        content: "Key ideas to learn in " + subject + ":\n1. Core concepts\n2. Simple examples\n3. Practice questions",
        tag: categoryName,
        updatedAt: new Date().toISOString()
      });
      saveData(d);
      closeModal();
      showToast("Created note for " + subject);
      navigateTo("notes");
    });
  }

  function renderCategories(container) {
    container.innerHTML = `
      <div class="section-header" style="margin-top:0;">
        <div>
          <h2 class="page-title">Complete Course Categories</h2>
          <p class="card-muted">Explore all 6 learning domains. Click any subject to open its study guide or related course.</p>
        </div>
      </div>

      <div class="grid grid-2">
        ${window.LUMINA_CATEGORIES.map((cat) => `
          <div class="card">
            <span class="badge">${esc(cat.badge)}</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(cat.name)}</h3>
            <p class="card-muted" style="margin-bottom:10px;">${esc(cat.description)}</p>
            ${cat.disclaimer ? `<div class="alert alert-warning" style="font-size:0.8rem;">${esc(cat.disclaimer)}</div>` : ""}
            <div class="pill-bar">
              ${cat.subjects.map((sub) => `<button class="pill-btn subject-chip" data-sub="${esc(sub)}" data-cat="${esc(cat.name)}">${esc(sub)}</button>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll(".subject-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sub = btn.dataset.sub;
        // If a flagship course matches directly, open it; otherwise open subject guide
        const directCourse = window.LUMINA_COURSES.find((c) => c.title.toLowerCase().includes(sub.toLowerCase()));
        if (directCourse) {
          navigateTo("course-detail", { courseId: directCourse.id });
        } else {
          openSubjectModal(sub, btn.dataset.cat);
        }
      });
    });
  }

  // ---------- 6. COURSE DETAIL WORKSPACE ----------
  function renderCourseDetail(container, courseId, lessonId) {
    const course = getCourseById(courseId);
    activeCourseId = course.id;
    const flat = getFlatLessons(course);
    let currentIndex = flat.findIndex((l) => l.id === lessonId);
    if (currentIndex < 0) currentIndex = 0;
    const lesson = flat[currentIndex];
    activeLessonId = lesson.id;

    const data = loadData();
    data.progress.lastCourseId = course.id;
    data.progress.lastLessonId = lesson.id;
    saveData(data);
    recordHistory("lesson", `${course.title}: ${lesson.title}`, lesson.id);

    const prog = getCourseProgress(course, data);
    const isCompleted = Boolean(data.progress.completedLessons[lesson.id]);
    const isBookmarked = data.bookmarks.lessons.includes(lesson.id);
    const savedCourseNote = data.notes.find((n) => n.courseId === course.id && n.lessonId === lesson.id);
    const quizResult = data.quizResults[lesson.id];

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
        <button class="btn btn-secondary btn-sm" id="back-to-courses-btn">← All Courses</button>
        <div style="display:flex; gap:8px; align-items:center;">
          <span class="badge">${esc(course.level)}</span>
          <span class="badge badge-cyan">${prog.completed}/${prog.total} Completed (${prog.percent}%)</span>
        </div>
      </div>

      <div class="course-layout">
        <aside class="card">
          <h2 style="margin:0 0 6px; font-size:1.15rem;">${esc(course.title)}</h2>
          <p class="card-muted" style="margin-bottom:10px;">${esc(course.description)}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${prog.percent}%"></div></div>
          <div style="margin-top:14px;">
            ${course.chapters.map((ch) => `
              <div class="chapter-box">
                <div class="chapter-title">${esc(ch.title)}</div>
                ${ch.lessons.map((l) => {
                  const done = Boolean(data.progress.completedLessons[l.id]);
                  return `
                    <button class="lesson-btn ${l.id === lesson.id ? "active" : ""}" data-lesson="${l.id}">
                      <span>${esc(l.title)}</span>
                      <span>${done ? "✅" : "○"}</span>
                    </button>
                  `;
                }).join("")}
              </div>
            `).join("")}
          </div>
        </aside>

        <section>
          <div class="card" style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
              <div>
                <div class="card-muted">${esc(lesson.chapterTitle)}</div>
                <h2 style="margin:4px 0 0;">${esc(lesson.title)}</h2>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button id="toggle-complete-btn" class="btn btn-sm ${isCompleted ? "btn-secondary" : "btn-primary"}">
                  ${isCompleted ? "✓ Completed" : "Mark Complete"}
                </button>
                <button id="toggle-bookmark-btn" class="btn btn-sm btn-outline">
                  ${isBookmarked ? "🔖 Saved" : "Save Lesson"}
                </button>
              </div>
            </div>

            <div style="margin-top:18px;">
              <h3 class="card-title">Explanation</h3>
              <p style="margin-top:4px;">${esc(lesson.explanation)}</p>
            </div>

            <div class="alert alert-info" style="margin-top:14px;">
              <strong>Simple Example:</strong><br>${esc(lesson.example)}
            </div>

            <div style="margin-top:14px;">
              <h3 class="card-title">Important Points</h3>
              <ul style="margin:6px 0 0; padding-left:20px;">
                ${lesson.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}
              </ul>
            </div>

            <div style="margin-top:14px;">
              <h3 class="card-title">Practice Questions</h3>
              <ol style="margin:6px 0 0; padding-left:20px; color:var(--text-secondary);">
                ${lesson.practice.map((pq) => `<li>${esc(pq)}</li>`).join("")}
              </ol>
            </div>
          </div>

          <div class="card" style="margin-bottom:16px;">
            <h3 class="card-title">Lesson Quiz</h3>
            <p style="margin:6px 0 12px; font-weight:600;">${esc(lesson.quiz.question)}</p>
            <div id="quiz-options">
              ${lesson.quiz.options.map((opt, idx) => `
                <button class="quiz-option" data-opt="${idx}">${esc(opt)}</button>
              `).join("")}
            </div>
            <div id="quiz-feedback" class="alert hidden" style="margin-top:10px;"></div>
            ${quizResult ? `<div class="card-muted" style="margin-top:6px;">Last saved score: ${quizResult.score}/${quizResult.total}</div>` : ""}
          </div>

          <div class="card" style="margin-bottom:16px;">
            <h3 class="card-title">Lesson Notes</h3>
            <textarea id="lesson-note-input" class="form-textarea" rows="3" placeholder="Write your personal notes for this lesson...">${esc(savedCourseNote ? savedCourseNote.content : "")}</textarea>
            <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
              <button id="save-lesson-note-btn" class="btn btn-primary btn-sm" type="button">Save Note</button>
              <button id="ask-ai-lesson-btn" class="btn btn-outline btn-sm" type="button">✨ Ask AI About This Lesson</button>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; gap:10px;">
            <button id="prev-lesson-btn" class="btn btn-secondary" ${currentIndex === 0 ? "disabled" : ""}>← Previous Lesson</button>
            <button id="next-lesson-btn" class="btn btn-primary" ${currentIndex === flat.length - 1 ? "disabled" : ""}>Next Lesson →</button>
          </div>
        </section>
      </div>
    `;

    document.getElementById("back-to-courses-btn").addEventListener("click", () => navigateTo("courses"));
    container.querySelectorAll("[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => renderCourseDetail(container, course.id, btn.dataset.lesson));
    });

    document.getElementById("toggle-complete-btn").addEventListener("click", () => {
      const d = loadData();
      if (d.progress.completedLessons[lesson.id]) {
        delete d.progress.completedLessons[lesson.id];
        showToast("Marked incomplete");
      } else {
        d.progress.completedLessons[lesson.id] = new Date().toISOString();
        d.progress.todayMinutes += 10;
        showToast("Lesson marked complete! (+10 min)");
      }
      saveData(d);
      renderCourseDetail(container, course.id, lesson.id);
    });

    document.getElementById("toggle-bookmark-btn").addEventListener("click", () => {
      const d = loadData();
      const idx = d.bookmarks.lessons.indexOf(lesson.id);
      if (idx >= 0) {
        d.bookmarks.lessons.splice(idx, 1);
        showToast("Removed from Saved Lessons");
      } else {
        d.bookmarks.lessons.push(lesson.id);
        showToast("Lesson bookmarked in Saved!");
      }
      saveData(d);
      renderCourseDetail(container, course.id, lesson.id);
    });

    container.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = Number(btn.dataset.opt);
        const correct = lesson.quiz.answerIndex;
        container.querySelectorAll(".quiz-option").forEach((b, i) => {
          b.classList.remove("correct", "wrong");
          if (i === correct) b.classList.add("correct");
          else if (i === chosen) b.classList.add("wrong");
        });
        const fb = document.getElementById("quiz-feedback");
        const isRight = chosen === correct;
        fb.className = `alert ${isRight ? "alert-success" : "alert-warning"}`;
        fb.textContent = (isRight ? "Correct! " : "Not quite. ") + lesson.quiz.explanation;
        fb.classList.remove("hidden");

        const d = loadData();
        d.quizResults[lesson.id] = { score: isRight ? 1 : 0, total: 1, answeredAt: new Date().toISOString() };
        saveData(d);
      });
    });

    document.getElementById("save-lesson-note-btn").addEventListener("click", () => {
      const text = document.getElementById("lesson-note-input").value.trim();
      if (!text) return showToast("Write something before saving.");
      const d = loadData();
      const existing = d.notes.find((n) => n.courseId === course.id && n.lessonId === lesson.id);
      if (existing) {
        existing.content = text;
        existing.updatedAt = new Date().toISOString();
      } else {
        d.notes.unshift({
          id: "note-" + Date.now(),
          title: `${course.title}: ${lesson.title}`,
          content: text,
          tag: course.title,
          courseId: course.id,
          lessonId: lesson.id,
          updatedAt: new Date().toISOString()
        });
      }
      saveData(d);
      showToast("Lesson note saved!");
    });

    document.getElementById("ask-ai-lesson-btn").addEventListener("click", () => {
      navigateTo("ai-chat", { prefill: `${lesson.title} (${course.title})` });
    });

    document.getElementById("prev-lesson-btn").addEventListener("click", () => {
      if (currentIndex > 0) renderCourseDetail(container, course.id, flat[currentIndex - 1].id);
    });
    document.getElementById("next-lesson-btn").addEventListener("click", () => {
      if (currentIndex < flat.length - 1) renderCourseDetail(container, course.id, flat[currentIndex + 1].id);
    });
  }

  // ---------- 6B. MY LEARNING ----------
  function renderMyLearning(container) {
    const data = loadData();
    const overall = getOverallProgress(data);
    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:14px;">My Learning Progress</h2>
      <div class="grid grid-3" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-muted">Curriculum Completion</div>
          <div style="font-size:1.6rem; font-weight:800;">${overall.percent}%</div>
          <div class="progress-track"><div class="progress-fill" style="width:${overall.percent}%"></div></div>
        </div>
        <div class="card">
          <div class="card-muted">Today's Study Time</div>
          <div style="font-size:1.6rem; font-weight:800;">${data.progress.todayMinutes} min</div>
          <div class="card-muted">Daily Goal: ${data.preferences.dailyGoalMinutes} min</div>
        </div>
        <div class="card">
          <div class="card-muted">Quizzes Answered</div>
          <div style="font-size:1.6rem; font-weight:800;">${Object.keys(data.quizResults).length}</div>
          <div class="card-muted">Saved locally in browser</div>
        </div>
      </div>

      <h3 style="margin-bottom:10px;">Course-by-Course Progress</h3>
      <div class="grid grid-2" style="margin-bottom:20px;">
        ${window.LUMINA_COURSES.map((c) => {
          const p = getCourseProgress(c, data);
          return `
            <div class="card">
              <div style="display:flex; justify-content:space-between;">
                <strong>${esc(c.title)}</strong>
                <span>${p.completed}/${p.total}</span>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width:${p.percent}%"></div></div>
              <button class="btn btn-sm btn-primary open-course-btn" data-course="${c.id}">Continue</button>
            </div>
          `;
        }).join("")}
      </div>

      <h3 style="margin-bottom:10px;">Recent Learning History</h3>
      <div class="card">
        ${data.history.length ? data.history.slice(0, 8).map((h) => `
          <div style="padding:8px 0; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; gap:10px;">
            <span>${esc(h.title)}</span>
            <span class="card-muted">${new Date(h.at).toLocaleDateString()}</span>
          </div>
        `).join("") : `<p class="card-muted">No learning history yet. Open a course to begin!</p>`}
      </div>
    `;
    container.querySelectorAll(".open-course-btn").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("course-detail", { courseId: btn.dataset.course }));
    });
  }

  // ---------- 7. NOTES & SAVED ----------
  function renderNotes(container) {
    const data = loadData();
    container.innerHTML = `
      <div class="section-header" style="margin-top:0;">
        <h2 class="page-title">Notes</h2>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button id="export-notes-md" class="btn btn-secondary btn-sm">Export .MD</button>
          <button id="export-notes-json" class="btn btn-secondary btn-sm">Export .JSON</button>
        </div>
      </div>

      <div class="card" style="margin-bottom:18px;">
        <h3 class="card-title" id="note-form-heading">Create New Note</h3>
        <input id="note-edit-id" type="hidden">
        <div class="grid grid-2" style="margin-bottom:10px;">
          <input id="note-title-input" class="form-input" type="text" placeholder="Note title...">
          <input id="note-tag-input" class="form-input" type="text" placeholder="Subject / Tag (e.g. Python, BBA)">
        </div>
        <textarea id="note-body-input" class="form-textarea" rows="4" placeholder="Write your study notes here..."></textarea>
        <div style="display:flex; gap:8px; margin-top:10px;">
          <button id="save-note-btn" class="btn btn-primary btn-sm">Save Note</button>
          <button id="cancel-note-btn" class="btn btn-secondary btn-sm hidden">Cancel Edit</button>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <input id="notes-search-input" class="form-input" type="search" placeholder="Search your notes...">
      </div>

      <div id="notes-list" class="grid grid-2"></div>
    `;

    function drawNotes(filterText = "") {
      const d = loadData();
      const q = filterText.trim().toLowerCase();
      const filtered = d.notes.filter((n) =>
        !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || (n.tag || "").toLowerCase().includes(q)
      );
      const listEl = document.getElementById("notes-list");
      if (!filtered.length) {
        listEl.innerHTML = `<div class="card" style="grid-column:1/-1;"><p class="card-muted">No notes found. Create your first note above!</p></div>`;
        return;
      }
      listEl.innerHTML = filtered.map((n) => `
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <span class="badge">${esc(n.tag || "General")}</span>
            <span class="card-muted">${new Date(n.updatedAt).toLocaleDateString()}</span>
          </div>
          <h3 class="card-title" style="margin-top:8px;">${esc(n.title)}</h3>
          <p class="card-muted" style="white-space:pre-wrap; margin-bottom:12px;">${esc(n.content)}</p>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-sm btn-secondary edit-note-btn" data-id="${n.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-note-btn" data-id="${n.id}">Delete</button>
          </div>
        </div>
      `).join("");

      listEl.querySelectorAll(".edit-note-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const item = loadData().notes.find((x) => x.id === btn.dataset.id);
          if (!item) return;
          document.getElementById("note-edit-id").value = item.id;
          document.getElementById("note-title-input").value = item.title;
          document.getElementById("note-tag-input").value = item.tag || "";
          document.getElementById("note-body-input").value = item.content;
          document.getElementById("note-form-heading").textContent = "Edit Note";
          document.getElementById("cancel-note-btn").classList.remove("hidden");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });

      listEl.querySelectorAll(".delete-note-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const d2 = loadData();
          d2.notes = d2.notes.filter((x) => x.id !== btn.dataset.id);
          saveData(d2);
          showToast("Note deleted");
          drawNotes(document.getElementById("notes-search-input").value);
        });
      });
    }

    document.getElementById("save-note-btn").addEventListener("click", () => {
      const id = document.getElementById("note-edit-id").value;
      const title = document.getElementById("note-title-input").value.trim() || "Untitled Note";
      const tag = document.getElementById("note-tag-input").value.trim() || "General";
      const content = document.getElementById("note-body-input").value.trim();
      if (!content) return showToast("Please write note content.");
      const d = loadData();
      if (id) {
        const target = d.notes.find((x) => x.id === id);
        if (target) {
          target.title = title;
          target.tag = tag;
          target.content = content;
          target.updatedAt = new Date().toISOString();
        }
      } else {
        d.notes.unshift({ id: "note-" + Date.now(), title, tag, content, updatedAt: new Date().toISOString() });
      }
      saveData(d);
      document.getElementById("note-edit-id").value = "";
      document.getElementById("note-title-input").value = "";
      document.getElementById("note-tag-input").value = "";
      document.getElementById("note-body-input").value = "";
      document.getElementById("note-form-heading").textContent = "Create New Note";
      document.getElementById("cancel-note-btn").classList.add("hidden");
      showToast("Note saved!");
      drawNotes();
    });

    document.getElementById("cancel-note-btn").addEventListener("click", () => {
      document.getElementById("note-edit-id").value = "";
      document.getElementById("note-title-input").value = "";
      document.getElementById("note-tag-input").value = "";
      document.getElementById("note-body-input").value = "";
      document.getElementById("note-form-heading").textContent = "Create New Note";
      document.getElementById("cancel-note-btn").classList.add("hidden");
    });

    document.getElementById("notes-search-input").addEventListener("input", (e) => drawNotes(e.target.value));
    document.getElementById("export-notes-md").addEventListener("click", () => {
      const md = loadData().notes.map((n) => `# ${n.title}\nTag: ${n.tag || "General"}\n\n${n.content}\n\n---\n`).join("\n");
      downloadFile("luminastudy-notes.md", md || "# No notes yet", "text/markdown");
    });
    document.getElementById("export-notes-json").addEventListener("click", () => {
      downloadFile("luminastudy-notes.json", JSON.stringify(loadData().notes, null, 2), "application/json");
    });

    drawNotes();
  }

  function renderSaved(container) {
    const data = loadData();
    const bookmarkedLessons = [];
    window.LUMINA_COURSES.forEach((c) => {
      getFlatLessons(c).forEach((l) => {
        if (data.bookmarks.lessons.includes(l.id)) {
          bookmarkedLessons.push({ course: c, lesson: l });
        }
      });
    });

    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:14px;">Saved Content &amp; Bookmarks</h2>
      <div class="section-header"><h3>Bookmarked Lessons (${bookmarkedLessons.length})</h3></div>
      <div class="grid grid-2" style="margin-bottom:20px;">
        ${bookmarkedLessons.length ? bookmarkedLessons.map(({ course, lesson }) => `
          <div class="card">
            <span class="badge">${esc(course.title)}</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(lesson.title)}</h3>
            <p class="card-muted">${esc(lesson.explanation.slice(0, 110))}...</p>
            <div style="display:flex; gap:8px; margin-top:10px;">
              <button class="btn btn-sm btn-primary open-saved-lesson" data-course="${course.id}" data-lesson="${lesson.id}">Open Lesson</button>
              <button class="btn btn-sm btn-danger remove-saved-lesson" data-lesson="${lesson.id}">Remove</button>
            </div>
          </div>
        `).join("") : `<div class="card"><p class="card-muted">No bookmarked lessons yet. Click "Save Lesson" inside any course.</p></div>`}
      </div>

      <div class="section-header"><h3>Saved AI Prompts (${data.bookmarks.prompts.length})</h3></div>
      <div class="grid grid-2">
        ${data.bookmarks.prompts.length ? data.bookmarks.prompts.map((p) => `
          <div class="card">
            <h3 class="card-title">${esc(p.title)}</h3>
            <p class="card-muted" style="white-space:pre-wrap; margin-bottom:10px;">${esc(p.prompt)}</p>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-sm btn-secondary copy-saved-prompt" data-id="${p.id}">Copy Prompt</button>
              <button class="btn btn-sm btn-danger del-saved-prompt" data-id="${p.id}">Delete</button>
            </div>
          </div>
        `).join("") : `<div class="card"><p class="card-muted">No saved prompts yet. Save prompts from the AI Assistant or Prompt Generator.</p></div>`}
      </div>
    `;

    container.querySelectorAll(".open-saved-lesson").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo("course-detail", { courseId: btn.dataset.course, lessonId: btn.dataset.lesson }));
    });
    container.querySelectorAll(".remove-saved-lesson").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = loadData();
        d.bookmarks.lessons = d.bookmarks.lessons.filter((x) => x !== btn.dataset.lesson);
        saveData(d);
        renderSaved(container);
      });
    });
    container.querySelectorAll(".copy-saved-prompt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = loadData().bookmarks.prompts.find((x) => x.id === btn.dataset.id);
        if (item) copyText(item.prompt);
      });
    });
    container.querySelectorAll(".del-saved-prompt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = loadData();
        d.bookmarks.prompts = d.bookmarks.prompts.filter((x) => x.id !== btn.dataset.id);
        saveData(d);
        renderSaved(container);
      });
    });
  }

  // ---------- 8. NEWS ----------
  function renderNews(container) {
    const tabs = [
      { id: "daily", label: "World & Daily News" },
      { id: "ai", label: "AI News" },
      { id: "tech", label: "Technology News" },
      { id: "science", label: "Science News" },
      { id: "business", label: "Business News" },
      { id: "education", label: "Education News" }
    ];
    const sources = window.LUMINA_NEWS_SOURCES[activeNewsTab] || window.LUMINA_NEWS_SOURCES.daily;

    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:10px;">News Hub</h2>
      <div class="alert alert-warning" style="margin-bottom:16px;">
        <strong>Live news is not connected yet.</strong> No external news API is configured in this free static build. Below are direct links to reputable news publications so you can read verified current reporting.
      </div>

      <div class="pill-bar">
        ${tabs.map((t) => `<button class="pill-btn ${activeNewsTab === t.id ? "active" : ""}" data-news-tab="${t.id}">${t.label}</button>`).join("")}
      </div>

      <div class="grid grid-3">
        ${sources.map((s) => `
          <div class="card card-interactive">
            <span class="badge badge-cyan">Reputable Source</span>
            <h3 class="card-title" style="margin-top:8px;">${esc(s.name)}</h3>
            <p class="card-muted" style="margin-bottom:14px;">${esc(s.desc)}</p>
            <a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">Visit ${esc(s.name)} ↗</a>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll("[data-news-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeNewsTab = btn.dataset.newsTab;
        renderNews(container);
      });
    });
  }

  // ---------- 9. MARKET EDUCATION ----------
  function renderMarketChart() {
    const canvas = document.getElementById("market-demo-chart");
    if (!canvas || typeof Chart === "undefined") return;
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const textColor = isLight ? "#334155" : "#cbd5e1";

    marketChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"],
        datasets: [
          {
            label: "Sample Diversified Index Concept (Demo)",
            data: [100, 108, 103, 118, 129, 142],
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            fill: true,
            tension: 0.3
          },
          {
            label: "Sample High-Volatility Asset Concept (Demo)",
            data: [100, 145, 78, 160, 110, 185],
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.08)",
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: textColor } }
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { color: "rgba(148,163,184,0.12)" } },
          y: { ticks: { color: textColor }, grid: { color: "rgba(148,163,184,0.12)" } }
        }
      }
    });
  }

  function renderMarket(container) {
    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:10px;">Market Education</h2>
      <div class="alert alert-warning" style="margin-bottom:18px;">
        <strong>Educational Only:</strong> This page explains how financial markets and blockchain technology work. It does not provide live prices, trading execution, brokerage links, or investment advice.
      </div>

      <div class="card" style="margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <h3 class="card-title" style="margin:0;">Illustrative Volatility Comparison</h3>
          <span class="badge badge-amber">Demo data. Not real-time market information.</span>
        </div>
        <div class="chart-container">
          <canvas id="market-demo-chart"></canvas>
        </div>
      </div>

      <div class="grid grid-2">
        ${window.LUMINA_MARKET_TOPICS.map((t) => `
          <div class="card">
            <h3 class="card-title">${esc(t.title)}</h3>
            <p style="font-weight:600; font-size:0.9rem; margin:6px 0;">${esc(t.summary)}</p>
            <p class="card-muted">${esc(t.details)}</p>
          </div>
        `).join("")}
      </div>
    `;
    renderMarketChart();
  }

  // ---------- 10. LEARNING TOOLS (11 Working Local Tools) ----------
  function renderTools(container, toolId) {
    activeToolTab = toolId || "prompt-gen";
    const tools = [
      { id: "prompt-gen", label: "✨ AI Prompt Generator" },
      { id: "timetable", label: "📅 Study Timetable" },
      { id: "quiz-gen", label: "❓ Quiz Generator" },
      { id: "flashcards", label: "🃏 Flashcards" },
      { id: "notes-jump", label: "📝 Notes Editor" },
      { id: "dictionary", label: "📖 Word Dictionary" },
      { id: "calculator", label: "🧮 Calculator" },
      { id: "pomodoro", label: "⏱️ Pomodoro Timer" },
      { id: "english", label: "🗣️ English Practice" },
      { id: "interview", label: "💼 Interview Practice" },
      { id: "biz-sheet", label: "💡 Business Worksheet" }
    ];

    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:12px;">Learning Tools</h2>
      <div class="pill-bar">
        ${tools.map((t) => `<button class="pill-btn ${activeToolTab === t.id ? "active" : ""}" data-tool-tab="${t.id}">${t.label}</button>`).join("")}
      </div>
      <div id="tool-stage"></div>
    `;

    container.querySelectorAll("[data-tool-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeToolTab = btn.dataset.toolTab;
        renderTools(container, activeToolTab);
      });
    });

    const stage = document.getElementById("tool-stage");
    renderToolStage(stage, activeToolTab);
  }

  function renderToolStage(stage, id) {
    const data = loadData();

    if (id === "prompt-gen") {
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">AI Prompt Generator</h3>
          <div class="grid grid-2" style="margin:12px 0;">
            <input id="pg-topic" class="form-input" placeholder="Topic (e.g. Python Loops, Accounting Equation)">
            <select id="pg-goal" class="form-select">
              <option>Explain simply for a beginner</option>
              <option>Give 5 real-world examples</option>
              <option>Create a 5-question MCQ quiz</option>
              <option>Build a 7-day study plan</option>
            </select>
          </div>
          <button id="pg-build-btn" class="btn btn-primary btn-sm">Generate Prompt</button>
          <textarea id="pg-out" class="form-textarea" rows="4" style="margin-top:12px;" readonly placeholder="Your generated prompt will appear here..."></textarea>
          <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
            <button id="pg-copy-btn" class="btn btn-secondary btn-sm">Copy Prompt</button>
            <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Open ChatGPT ↗</a>
            <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Open Gemini ↗</a>
          </div>
        </div>
      `;
      document.getElementById("pg-build-btn").addEventListener("click", () => {
        const topic = document.getElementById("pg-topic").value.trim() || "Business Fundamentals";
        const goal = document.getElementById("pg-goal").value;
        document.getElementById("pg-out").value = `Act as a supportive tutor.\nTopic: ${topic}\nGoal: ${goal}\nAudience: Beginner student.\nKeep explanations clear, structured, and easy to follow.`;
      });
      document.getElementById("pg-copy-btn").addEventListener("click", () => copyText(document.getElementById("pg-out").value));
      return;
    }

    if (id === "timetable") {
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">Study Timetable Maker</h3>
          <div class="grid grid-3" style="margin:12px 0;">
            <select id="tt-day" class="form-select">
              <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
              <option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
            </select>
            <input id="tt-time" class="form-input" placeholder="Time (e.g. 6:00 PM - 6:45 PM)">
            <input id="tt-sub" class="form-input" placeholder="Subject / Course">
          </div>
          <button id="tt-add-btn" class="btn btn-primary btn-sm">Add Study Block</button>
          <div style="margin-top:16px;">
            ${data.studyPlans.length ? data.studyPlans.map((s) => `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border-subtle);">
                <div><strong>${esc(s.day)}</strong> · ${esc(s.time)} — ${esc(s.subject)}</div>
                <button class="btn btn-sm btn-danger tt-del" data-id="${s.id}">Delete</button>
              </div>
            `).join("") : `<p class="card-muted">No study blocks added yet.</p>`}
          </div>
        </div>
      `;
      document.getElementById("tt-add-btn").addEventListener("click", () => {
        const day = document.getElementById("tt-day").value;
        const time = document.getElementById("tt-time").value.trim() || "Flexible";
        const subject = document.getElementById("tt-sub").value.trim();
        if (!subject) return showToast("Enter a subject name.");
        const d = loadData();
        d.studyPlans.push({ id: "sp-" + Date.now(), day, time, subject });
        saveData(d);
        renderToolStage(stage, "timetable");
      });
      stage.querySelectorAll(".tt-del").forEach((btn) => {
        btn.addEventListener("click", () => {
          const d = loadData();
          d.studyPlans = d.studyPlans.filter((x) => x.id !== btn.dataset.id);
          saveData(d);
          renderToolStage(stage, "timetable");
        });
      });
      return;
    }

    if (id === "quiz-gen") {
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">Quiz Generator from Course Topics</h3>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin:12px 0;">
            <select id="qg-course" class="form-select" style="flex:1; min-width:220px;">
              ${window.LUMINA_COURSES.map((c) => `<option value="${c.id}">${esc(c.title)}</option>`).join("")}
            </select>
            <button id="qg-start-btn" class="btn btn-primary btn-sm">Generate Practice Quiz</button>
          </div>
          <div id="qg-area"></div>
        </div>
      `;
      document.getElementById("qg-start-btn").addEventListener("click", () => {
        const c = getCourseById(document.getElementById("qg-course").value);
        const lessons = getFlatLessons(c);
        const area = document.getElementById("qg-area");
        area.innerHTML = lessons.map((l, qIdx) => `
          <div style="margin-top:16px; padding-top:12px; border-top:1px solid var(--border-subtle);">
            <p style="font-weight:600;">${qIdx + 1}. ${esc(l.quiz.question)}</p>
            ${l.quiz.options.map((opt, oIdx) => `
              <button class="quiz-option qg-opt" data-q="${qIdx}" data-o="${oIdx}" data-ans="${l.quiz.answerIndex}">${esc(opt)}</button>
            `).join("")}
          </div>
        `).join("");
        area.querySelectorAll(".qg-opt").forEach((btn) => {
          btn.addEventListener("click", () => {
            const q = btn.dataset.q;
            const ans = Number(btn.dataset.ans);
            const chosen = Number(btn.dataset.o);
            area.querySelectorAll(`.qg-opt[data-q="${q}"]`).forEach((b, idx) => {
              b.classList.remove("correct", "wrong");
              if (idx === ans) b.classList.add("correct");
              else if (idx === chosen) b.classList.add("wrong");
            });
          });
        });
      });
      return;
    }

    if (id === "flashcards") {
      stage.innerHTML = `
        <div class="card" style="margin-bottom:16px;">
          <h3 class="card-title">Add Flashcard</h3>
          <div class="grid grid-3" style="margin:10px 0;">
            <input id="fc-deck" class="form-input" placeholder="Deck (e.g. Python)">
            <input id="fc-front" class="form-input" placeholder="Front (Question)">
            <input id="fc-back" class="form-input" placeholder="Back (Answer)">
          </div>
          <button id="fc-add-btn" class="btn btn-primary btn-sm">Add Flashcard</button>
        </div>
        <div class="grid grid-3">
          ${data.flashcards.map((fc) => `
            <div class="card card-interactive fc-card" data-id="${fc.id}" style="cursor:pointer;">
              <span class="badge">${esc(fc.deck)}</span>
              <h4 style="margin:10px 0 6px;">${esc(fc.front)}</h4>
              <p class="card-muted fc-back hidden">${esc(fc.back)}</p>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
                <span class="card-muted" style="font-size:0.78rem;">Tap card to flip</span>
                <button class="btn btn-sm btn-danger fc-del" data-id="${fc.id}">✕</button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
      document.getElementById("fc-add-btn").addEventListener("click", () => {
        const deck = document.getElementById("fc-deck").value.trim() || "General";
        const front = document.getElementById("fc-front").value.trim();
        const back = document.getElementById("fc-back").value.trim();
        if (!front || !back) return showToast("Enter both front and back text.");
        const d = loadData();
        d.flashcards.unshift({ id: "fc-" + Date.now(), deck, front, back });
        saveData(d);
        renderToolStage(stage, "flashcards");
      });
      stage.querySelectorAll(".fc-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.classList.contains("fc-del")) return;
          card.querySelector(".fc-back").classList.toggle("hidden");
        });
      });
      stage.querySelectorAll(".fc-del").forEach((btn) => {
        btn.addEventListener("click", () => {
          const d = loadData();
          d.flashcards = d.flashcards.filter((x) => x.id !== btn.dataset.id);
          saveData(d);
          renderToolStage(stage, "flashcards");
        });
      });
      return;
    }

    if (id === "notes-jump") {
      navigateTo("notes");
      return;
    }

    if (id === "dictionary") {
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">Educational Word Dictionary</h3>
          <input id="dict-search" class="form-input" style="margin:10px 0 16px;" type="search" placeholder="Search terms (e.g. Revenue, Algorithm, Volatility)...">
          <div id="dict-list" class="grid grid-2"></div>
        </div>
      `;
      const drawDict = (q = "") => {
        const term = q.trim().toLowerCase();
        const matches = window.LUMINA_DICTIONARY.filter((x) => x.term.toLowerCase().includes(term) || x.def.toLowerCase().includes(term));
        document.getElementById("dict-list").innerHTML = matches.map((m) => `
          <div class="card">
            <span class="badge">${esc(m.category)}</span>
            <h4 style="margin:8px 0 4px;">${esc(m.term)}</h4>
            <p class="card-muted">${esc(m.def)}</p>
          </div>
        `).join("") || `<p class="card-muted">No dictionary terms matched.</p>`;
      };
      document.getElementById("dict-search").addEventListener("input", (e) => drawDict(e.target.value));
      drawDict();
      return;
    }

    if (id === "calculator") {
      stage.innerHTML = `
        <div class="grid grid-2">
          <div class="card">
            <h3 class="card-title">Quick Study Calculator</h3>
            <input id="calc-expr" class="form-input" placeholder="e.g. (125 * 4) + 50">
            <button id="calc-eval-btn" class="btn btn-primary btn-sm" style="margin-top:10px;">Calculate</button>
            <div id="calc-res" style="margin-top:12px; font-weight:700; font-size:1.15rem;"></div>
          </div>
          <div class="card">
            <h3 class="card-title">Compound Interest Educational Calculator</h3>
            <div class="grid grid-3" style="margin:10px 0;">
              <input id="ci-p" class="form-input" type="number" value="1000" placeholder="Principal">
              <input id="ci-r" class="form-input" type="number" value="8" placeholder="Annual %">
              <input id="ci-y" class="form-input" type="number" value="10" placeholder="Years">
            </div>
            <button id="ci-btn" class="btn btn-secondary btn-sm">Compute Example</button>
            <div id="ci-res" style="margin-top:12px; font-weight:700;"></div>
          </div>
        </div>
      `;
      document.getElementById("calc-eval-btn").addEventListener("click", () => {
        const expr = document.getElementById("calc-expr").value.trim();
        if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
          document.getElementById("calc-res").textContent = "Use numbers and + - * / ( ) only.";
          return;
        }
        try {
          const val = Function(`"use strict"; return (${expr})`)();
          document.getElementById("calc-res").textContent = "= " + val;
        } catch {
          document.getElementById("calc-res").textContent = "Invalid expression.";
        }
      });
      document.getElementById("ci-btn").addEventListener("click", () => {
        const p = Number(document.getElementById("ci-p").value) || 0;
        const r = (Number(document.getElementById("ci-r").value) || 0) / 100;
        const y = Number(document.getElementById("ci-y").value) || 0;
        const total = p * Math.pow(1 + r, y);
        document.getElementById("ci-res").textContent = `Illustrative future value: ${total.toFixed(2)} (Interest: ${(total - p).toFixed(2)})`;
      });
      return;
    }

    if (id === "pomodoro") {
      const mins = String(Math.floor(pomodoroSeconds / 60)).padStart(2, "0");
      const secs = String(pomodoroSeconds % 60).padStart(2, "0");
      stage.innerHTML = `
        <div class="card" style="text-align:center; max-width:460px;">
          <span class="badge">${pomodoroMode === "focus" ? "Focus Session (25m)" : "Break Time (5m)"}</span>
          <div id="pomo-display" style="font-size:3.2rem; font-weight:800; margin:16px 0;">${mins}:${secs}</div>
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
            <button id="pomo-start" class="btn btn-primary btn-sm">${pomodoroRunning ? "Pause" : "Start"}</button>
            <button id="pomo-reset" class="btn btn-secondary btn-sm">Reset</button>
            <button id="pomo-switch" class="btn btn-outline btn-sm">Switch Focus/Break</button>
          </div>
        </div>
      `;
      document.getElementById("pomo-start").addEventListener("click", () => {
        if (pomodoroRunning) {
          clearInterval(pomodoroInterval);
          pomodoroRunning = false;
        } else {
          pomodoroRunning = true;
          pomodoroInterval = setInterval(() => {
            if (pomodoroSeconds > 0) {
              pomodoroSeconds--;
              const disp = document.getElementById("pomo-display");
              if (disp) {
                disp.textContent = `${String(Math.floor(pomodoroSeconds / 60)).padStart(2, "0")}:${String(pomodoroSeconds % 60).padStart(2, "0")}`;
              }
            } else {
              clearInterval(pomodoroInterval);
              pomodoroRunning = false;
              showToast("Pomodoro timer finished!");
            }
          }, 1000);
        }
        renderToolStage(stage, "pomodoro");
      });
      document.getElementById("pomo-reset").addEventListener("click", () => {
        clearInterval(pomodoroInterval);
        pomodoroRunning = false;
        pomodoroSeconds = pomodoroMode === "focus" ? 25 * 60 : 5 * 60;
        renderToolStage(stage, "pomodoro");
      });
      document.getElementById("pomo-switch").addEventListener("click", () => {
        clearInterval(pomodoroInterval);
        pomodoroRunning = false;
        pomodoroMode = pomodoroMode === "focus" ? "break" : "focus";
        pomodoroSeconds = pomodoroMode === "focus" ? 25 * 60 : 5 * 60;
        renderToolStage(stage, "pomodoro");
      });
      return;
    }

    if (id === "english") {
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">English Practice</h3>
          ${window.LUMINA_ENGLISH_EXERCISES.map((ex, i) => `
            <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle);">
              <p style="font-weight:600;">${i + 1}. ${esc(ex.prompt)}</p>
              ${ex.options.map((o, oi) => `<button class="quiz-option eng-opt" data-q="${i}" data-o="${oi}" data-ans="${ex.answer}">${esc(o)}</button>`).join("")}
              <div id="eng-tip-${i}" class="card-muted hidden">${esc(ex.tip)}</div>
            </div>
          `).join("")}
        </div>
      `;
      stage.querySelectorAll(".eng-opt").forEach((btn) => {
        btn.addEventListener("click", () => {
          const q = btn.dataset.q;
          const ans = Number(btn.dataset.ans);
          const chosen = Number(btn.dataset.o);
          stage.querySelectorAll(`.eng-opt[data-q="${q}"]`).forEach((b, idx) => {
            b.classList.remove("correct", "wrong");
            if (idx === ans) b.classList.add("correct");
            else if (idx === chosen) b.classList.add("wrong");
          });
          document.getElementById("eng-tip-" + q).classList.remove("hidden");
        });
      });
      return;
    }

    if (id === "interview") {
      stage.innerHTML = `
        <div class="grid grid-2">
          ${window.LUMINA_INTERVIEW_QUESTIONS.map((item) => `
            <div class="card">
              <h3 class="card-title">${esc(item.q)}</h3>
              <p class="card-muted">${esc(item.guide)}</p>
            </div>
          `).join("")}
        </div>
      `;
      return;
    }

    if (id === "biz-sheet") {
      const ws = data.businessWorksheet;
      stage.innerHTML = `
        <div class="card">
          <h3 class="card-title">Business Idea Learning Worksheet</h3>
          <p class="card-muted" style="margin-bottom:12px;">Practice structuring a business concept. Saved locally in your browser.</p>
          <div class="grid grid-2">
            <div class="form-group"><label class="form-label">Idea Name</label><input id="bw-name" class="form-input" value="${esc(ws.ideaName)}"></div>
            <div class="form-group"><label class="form-label">Target Audience</label><input id="bw-aud" class="form-input" value="${esc(ws.audience)}"></div>
            <div class="form-group"><label class="form-label">Customer Problem</label><textarea id="bw-prob" class="form-textarea" rows="2">${esc(ws.problem)}</textarea></div>
            <div class="form-group"><label class="form-label">Your Solution</label><textarea id="bw-sol" class="form-textarea" rows="2">${esc(ws.solution)}</textarea></div>
            <div class="form-group"><label class="form-label">How It Earns Revenue</label><input id="bw-rev" class="form-input" value="${esc(ws.revenueModel)}"></div>
            <div class="form-group"><label class="form-label">Main Monthly Costs</label><input id="bw-cost" class="form-input" value="${esc(ws.keyCosts)}"></div>
          </div>
          <button id="bw-save-btn" class="btn btn-primary btn-sm">Save Worksheet</button>
        </div>
      `;
      document.getElementById("bw-save-btn").addEventListener("click", () => {
        const d = loadData();
        d.businessWorksheet = {
          ideaName: document.getElementById("bw-name").value,
          audience: document.getElementById("bw-aud").value,
          problem: document.getElementById("bw-prob").value,
          solution: document.getElementById("bw-sol").value,
          revenueModel: document.getElementById("bw-rev").value,
          keyCosts: document.getElementById("bw-cost").value
        };
        saveData(d);
        showToast("Business worksheet saved!");
      });
    }
  }

  // ---------- 11. SETTINGS & SECURITY ----------
  function renderSettings(container) {
    const data = loadData();
    const isPasswordProvider = currentUser && currentUser.providerData.some((p) => p.providerId === "password");
    const emailVerified = currentUser && currentUser.emailVerified;

    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:16px;">Settings &amp; Account Security</h2>

      <div class="grid grid-2" style="margin-bottom:18px;">
        <div class="card">
          <h3 class="card-title">Profile &amp; Preferences</h3>
          <div class="form-group">
            <label class="form-label">Display Name</label>
            <input id="set-display-name" class="form-input" value="${esc((currentUser && currentUser.displayName) || "")}">
          </div>
          <div class="form-group">
            <label class="form-label">Theme</label>
            <select id="set-theme" class="form-select">
              <option value="dark" ${data.preferences.theme === "dark" ? "selected" : ""}>Dark Navy/Purple</option>
              <option value="light" ${data.preferences.theme === "light" ? "selected" : ""}>Light</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Language</label>
            <select id="set-lang" class="form-select">
              <option ${data.preferences.language === "English" ? "selected" : ""}>English</option>
              <option ${data.preferences.language === "Spanish" ? "selected" : ""}>Spanish</option>
              <option ${data.preferences.language === "French" ? "selected" : ""}>French</option>
              <option ${data.preferences.language === "Hindi" ? "selected" : ""}>Hindi</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Learning Goal</label>
            <input id="set-goal" class="form-input" value="${esc(data.preferences.learningGoal)}">
          </div>
          <div class="form-group">
            <label class="form-label">Daily Study Time Target (minutes)</label>
            <input id="set-minutes" class="form-input" type="number" min="5" max="300" value="${data.preferences.dailyGoalMinutes}">
          </div>
          <label style="display:flex; align-items:center; gap:8px; margin-bottom:14px; font-size:0.9rem;">
            <input id="set-reminders" type="checkbox" ${data.preferences.studyReminders ? "checked" : ""}>
            Enable in-app study goal reminders
          </label>
          <button id="save-settings-btn" class="btn btn-primary btn-sm">Save Preferences</button>
        </div>

        <div class="card">
          <h3 class="card-title">Account Security &amp; Recovery</h3>
          <p class="card-muted" style="margin-bottom:12px;">Signed in as: <strong>${esc(currentUser ? currentUser.email : "")}</strong></p>

          <div class="alert ${emailVerified ? "alert-success" : "alert-warning"}" style="margin-bottom:12px;">
            Email Verification Status: <strong>${emailVerified ? "Verified" : "Not Verified"}</strong>
          </div>
          ${!emailVerified ? `<button id="resend-verify-btn" class="btn btn-secondary btn-sm" style="margin-bottom:14px;">Send Verification Email</button>` : ""}

          <div style="margin-bottom:14px;">
            <h4 style="margin:0 0 6px; font-size:0.95rem;">Change Password</h4>
            ${isPasswordProvider ? `
              <input id="sec-curr-pw" class="form-input" type="password" placeholder="Current password" style="margin-bottom:8px;">
              <input id="sec-new-pw" class="form-input" type="password" placeholder="New password (min 6 chars)" style="margin-bottom:8px;">
              <button id="sec-change-pw-btn" class="btn btn-secondary btn-sm">Update Password</button>
            ` : `<p class="card-muted">You signed in with Google. Password changes are managed through your Google Account.</p>`}
          </div>

          <div style="margin-bottom:14px;">
            <h4 style="margin:0 0 6px; font-size:0.95rem;">Account Recovery &amp; 2FA</h4>
            <p class="card-muted" style="margin-bottom:8px;">• Password reset uses Firebase's verified email reset link.<br>• Two-factor authentication (2FA) is <strong>not enabled</strong> in this client-side build (requires Firebase Identity Platform multi-factor setup).</p>
            <button id="sec-reset-pw-btn" class="btn btn-outline btn-sm">Send Password Reset Email</button>
          </div>

          <button id="sec-signout-btn" class="btn btn-danger btn-sm">Sign Out of Current Session</button>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Saved Data, Export &amp; Privacy</h3>
        <p class="card-muted" style="margin-bottom:12px;">
          Your notes (${data.notes.length}), completed lessons (${Object.keys(data.progress.completedLessons).length}), and preferences are stored locally in this browser's <code>localStorage</code>. They are not backed up to a cloud database yet.
        </p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button id="export-all-btn" class="btn btn-secondary btn-sm">Export All Local Data (.JSON)</button>
          <button id="open-privacy-btn" class="btn btn-outline btn-sm">Read Privacy Details</button>
          <button id="clear-data-btn" class="btn btn-danger btn-sm">Clear All Local Data</button>
        </div>
      </div>
    `;

    document.getElementById("save-settings-btn").addEventListener("click", async () => {
      const newName = document.getElementById("set-display-name").value.trim();
      const d = loadData();
      d.preferences.theme = document.getElementById("set-theme").value;
      d.preferences.language = document.getElementById("set-lang").value;
      d.preferences.learningGoal = document.getElementById("set-goal").value.trim() || d.preferences.learningGoal;
      d.preferences.dailyGoalMinutes = Math.max(5, Number(document.getElementById("set-minutes").value) || 30);
      d.preferences.studyReminders = document.getElementById("set-reminders").checked;
      saveData(d);
      applyTheme(d.preferences.theme);

      if (currentUser && newName && newName !== currentUser.displayName) {
        try {
          await currentUser.updateProfile({ displayName: newName });
          updateUserChrome();
        } catch (err) {
          showToast(friendlyAuthError(err));
        }
      }
      showToast("Settings saved!");
    });

    const resendBtn = document.getElementById("resend-verify-btn");
    if (resendBtn) {
      resendBtn.addEventListener("click", async () => {
        try {
          await currentUser.sendEmailVerification();
          showToast("Verification email sent!");
        } catch (err) {
          showToast(friendlyAuthError(err));
        }
      });
    }

    const changePwBtn = document.getElementById("sec-change-pw-btn");
    if (changePwBtn) {
      changePwBtn.addEventListener("click", async () => {
        const curr = document.getElementById("sec-curr-pw").value;
        const next = document.getElementById("sec-new-pw").value;
        if (!curr || next.length < 6) {
          return showToast("Enter your current password and a new password (6+ chars).");
        }
        try {
          const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, curr);
          await currentUser.reauthenticateWithCredential(cred);
          await currentUser.updatePassword(next);
          document.getElementById("sec-curr-pw").value = "";
          document.getElementById("sec-new-pw").value = "";
          showToast("Password updated successfully!");
        } catch (err) {
          showToast(friendlyAuthError(err));
        }
      });
    }

    document.getElementById("sec-reset-pw-btn").addEventListener("click", async () => {
      try {
        await firebaseAuth.sendPasswordResetEmail(currentUser.email);
        showToast("Password reset email sent to " + currentUser.email);
      } catch (err) {
        showToast(friendlyAuthError(err));
      }
    });

    document.getElementById("sec-signout-btn").addEventListener("click", signOutUser);
    document.getElementById("export-all-btn").addEventListener("click", () => {
      downloadFile("luminastudy-backup.json", JSON.stringify(loadData(), null, 2), "application/json");
    });
    document.getElementById("open-privacy-btn").addEventListener("click", () => navigateTo("help"));
    document.getElementById("clear-data-btn").addEventListener("click", () => {
      openModal(`
        <h3 style="margin:0 0 8px;">Clear All Local Data?</h3>
        <p class="card-muted" style="margin-bottom:16px;">This will permanently delete your saved notes, course progress, flashcards, and study plans stored in this browser. Your Firebase account will remain intact.</p>
        <div style="display:flex; gap:10px; justify-content:flex-end;">
          <button id="cancel-clear-btn" class="btn btn-secondary btn-sm">Cancel</button>
          <button id="confirm-clear-btn" class="btn btn-danger btn-sm">Yes, Clear Local Data</button>
        </div>
      `);
      document.getElementById("cancel-clear-btn").addEventListener("click", closeModal);
      document.getElementById("confirm-clear-btn").addEventListener("click", () => {
        localStorage.removeItem(getStorageKey());
        closeModal();
        showToast("Local data cleared.");
        renderSettings(container);
      });
    });
  }

  // ---------- 12. HELP, PRIVACY & ABOUT ----------
  function renderHelp(container) {
    container.innerHTML = `
      <h2 class="page-title" style="margin-bottom:16px;">Help, Privacy &amp; About LuminaStudy AI</h2>

      <div class="card" style="margin-bottom:16px;">
        <h3 class="card-title">Privacy Policy &amp; Data Transparency</h3>
        <ul style="margin:8px 0 0; padding-left:20px; color:var(--text-secondary);">
          <li><strong>What Firebase Authentication handles:</strong> Your sign-in identity (email address, display name, and authentication tokens). Passwords are never stored in <code>localStorage</code>.</li>
          <li><strong>What is stored in your browser:</strong> Course progress, completed lessons, notes, bookmarks, flashcards, study plans, quiz scores, and theme/goal preferences are saved locally in <code>localStorage</code>.</li>
          <li><strong>What is NOT connected:</strong> Cloud Firestore sync, live external AI APIs, live news feeds, and live stock/crypto price feeds are not connected in this free static version.</li>
          <li><strong>Data sharing:</strong> LuminaStudy AI does not sell or share your personal notes or progress with third parties.</li>
          <li><strong>Clearing your data:</strong> Visit <strong>Settings → Clear All Local Data</strong> at any time, or export a JSON backup first.</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">About &amp; Troubleshooting</h3>
        <p class="card-muted">LuminaStudy AI is a static, GitHub Pages-compatible learning platform built with HTML, CSS, JavaScript, Chart.js, and Firebase Authentication.</p>
        <p class="card-muted" style="margin-top:8px;">If Google Sign-In shows an unauthorized domain error after publishing, add your <code>&lt;username&gt;.github.io</code> domain inside <strong>Firebase Console → Authentication → Settings → Authorized domains</strong>.</p>
      </div>
    `;
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("lumina_theme") || "dark";
    applyTheme(savedTheme);

    setupAuthEvents();
    initFirebase();

    document.getElementById("open-sidebar-btn").addEventListener("click", () => {
      document.getElementById("sidebar").classList.add("open");
      document.getElementById("sidebar-backdrop").classList.add("open");
    });
    document.getElementById("close-sidebar-btn").addEventListener("click", closeMobileSidebar);
    document.getElementById("sidebar-backdrop").addEventListener("click", closeMobileSidebar);

    document.querySelectorAll(".nav-item, .mobile-bottom-btn").forEach((btn) => {
      btn.addEventListener("click", () => navigateTo(btn.dataset.page));
    });

    document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);
    document.getElementById("sidebar-logout-btn").addEventListener("click", signOutUser);

    document.getElementById("topbar-search-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        navigateTo("search", { query: e.target.value.trim() });
      }
    });

    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closeModal();
    });
  });
})();
