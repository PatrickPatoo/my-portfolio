/* ============================================
   PATRICK KIBOR — PORTFOLIO SCRIPTS
   ============================================ */

/* ---------- MOBILE MENU ---------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const isOpen = navLinks.classList.contains("active");
  menuBtn.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }),
);

/* ---------- FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- DARK MODE ---------- */
const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const dark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", dark ? "enabled" : "disabled");
  darkModeBtn.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

/* ---------- SCROLL REVEAL ---------- */
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value.trim();
    formMessage.textContent = `Thank you ${name}! Your message has been received successfully.`;
    formMessage.classList.add("success");
    this.reset();

    // Reset the success message after 6 seconds
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.classList.remove("success");
    }, 6000);
  });
}
