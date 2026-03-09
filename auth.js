document.addEventListener("DOMContentLoaded", async () => {
  const SUPABASE_URL = "https://mtnuxxrqtfrezrbypqzr.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_DmlEgucOtfmUfu5FBeOUHw_mReGFpR1";

  // Guard: Supabase CDN load check
  if (!window.supabase) {
    console.error("Supabase SDK not loaded.");
    return;
  }

  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Elements
  const container    = document.getElementById("auth-container");
  const registerBtn  = document.querySelector(".register-btn");
  const loginBtn     = document.querySelector(".login-btn");
  const loginForm    = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginStatus  = document.getElementById("loginStatus");
  const registerStatus = document.getElementById("registerStatus");
  const loginBtnEl   = document.getElementById("loginBtn");
  const registerBtnEl = document.getElementById("registerBtn");

  // ── Helpers ──────────────────────────────────────────────────────────────
  const showStatus = (el, msg, type = "ok") => {
    if (!el) return;
    el.textContent = msg;
    el.className = `status show ${type === "ok" ? "ok" : "err"}`;
  };

  const clearStatus = (el) => {
    if (!el) return;
    el.textContent = "";
    el.className = "status";
  };

  const setLoading = (btn, isLoading) => {
    if (!btn) return;
    btn.disabled = isLoading;
    btn.classList.toggle("loading", isLoading);
  };

  // ── Already logged in? ────────────────────────────────────────────────────
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "home.html";
      return;
    }
  } catch (e) {
    console.warn("Session check failed:", e);
  }

  // ── Toggle panels ─────────────────────────────────────────────────────────
  registerBtn?.addEventListener("click", () => {
    clearStatus(loginStatus);
    clearStatus(registerStatus);
    container.classList.add("active");
  });

  loginBtn?.addEventListener("click", () => {
    clearStatus(loginStatus);
    clearStatus(registerStatus);
    container.classList.remove("active");
  });

  // ── REGISTER ──────────────────────────────────────────────────────────────
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(registerStatus);

    const email    = document.getElementById("regEmail")?.value?.trim();
    const password = document.getElementById("regPassword")?.value;

    if (!email || !password) {
      showStatus(registerStatus, "Please enter email and password.", "err");
      return;
    }
    if (password.length < 6) {
      showStatus(registerStatus, "Password must be at least 6 characters.", "err");
      return;
    }

    setLoading(registerBtnEl, true);

    try {
      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) {
        showStatus(registerStatus, "❌ " + error.message, "err");
      } else {
        showStatus(
          registerStatus,
          "✅ Registered! Check your inbox and verify your email first.",
          "ok"
        );
        container.classList.remove("active");
        registerForm.reset();
      }
    } catch (err) {
      showStatus(registerStatus, "❌ Something went wrong. Try again.", "err");
    } finally {
      setLoading(registerBtnEl, false);
    }
  });

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(loginStatus);

    const email    = document.getElementById("loginEmail")?.value?.trim();
    const password = document.getElementById("loginPassword")?.value;

    if (!email || !password) {
      showStatus(loginStatus, "Please enter email and password.", "err");
      return;
    }

    setLoading(loginBtnEl, true);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        showStatus(loginStatus, "❌ " + error.message, "err");
      } else {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "home.html";
      }
    } catch (err) {
      showStatus(loginStatus, "❌ Something went wrong. Try again.", "err");
    } finally {
      setLoading(loginBtnEl, false);
    }
  });
});