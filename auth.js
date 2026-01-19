document.addEventListener("DOMContentLoaded", () => {

  const SUPABASE_URL = "https://mtnuxxrqtfrezrbypqzr.supabase.co";
  const SUPABASE_ANON_KEY =
    "sb_publishable_DmlEgucOtfmUfu5FBeOUHw_mReGFpR1";

  // ❗ NOTICE: const supabase ONLY ONCE
  const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  const container = document.querySelector(".container");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector(".register input[type='email']").value;
    const password = document.querySelector(".register input[type='password']").value;

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("❌ " + error.message);
    } else {
      alert("✅ Registration successful!");
      container.classList.remove("active");
    }
  });

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
      alert("✅ Login successful!");
      window.location.href = "home.html";
    }
  });

});
