document.addEventListener("DOMContentLoaded", async () => {

  const SUPABASE_URL = "https://mtnuxxrqtfrezrbypqzr.supabase.co";
  const SUPABASE_ANON_KEY =
    "sb_publishable_DmlEgucOtfmUfu5FBeOUHw_mReGFpR1";

  const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  /* 🔒 ALREADY LOGGED IN CHECK */
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    window.location.href = "home.html";
    return;
  }

  const container = document.querySelector(".container");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  /* 📝 REGISTER */
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector(".register input[type='email']").value;
    const password = document.querySelector(".register input[type='password']").value;

    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("✅ Registration successful! Please login.");
      container.classList.remove("active");
    }
  });

  /* 🔑 LOGIN */
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector(".login input[type='email']").value;
    const password = document.querySelector(".login input[type='password']").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      window.location.href = "home.html";
    }
  });

});