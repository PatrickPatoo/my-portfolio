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

/* ============================================
   CONTACT FORM - EMAIL SUBMISSION
   Uses FormSubmit AJAX to send messages
============================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const submitBtn = document.getElementById("submitBtn");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", async function (e) {
    // Prevent normal page reload
    e.preventDefault();

    // Check that required elements exist
    if (!submitBtn || !formMessage) {
      console.error("Contact form elements are missing.");
      return;
    }

    // Prevent multiple submissions
    if (submitBtn.disabled) return;

    // Save original button content
    const originalButtonContent = submitBtn.innerHTML;

    // Get visitor name
    const nameInput = contactForm.querySelector('[name="name"]');
    const name = nameInput ? nameInput.value.trim() : "there";

    // Clear previous messages
    formMessage.textContent = "";
    formMessage.className = "form-message";

    // Show sending animation
    submitBtn.disabled = true;

    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Sending...
    `;

    try {
      // Collect all form fields
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Send form data using FormSubmit AJAX endpoint
      const response = await fetch(
        "https://formsubmit.co/ajax/patrickkiptoo199@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      // Read server response
      const result = await response.json();

      // Check whether submission was successful
      if (!response.ok || String(result.success).toLowerCase() !== "true") {
        throw new Error(result.message || "Message submission failed.");
      }

      // SUCCESS MESSAGE
      formMessage.textContent = `Thank you ${name}! Your message has been sent successfully. I will get back to you soon.`;

      formMessage.className = "form-message success";

      // Clear form after successful submission
      contactForm.reset();

      // Change button temporarily
      submitBtn.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Message Sent!
      `;

      // Clear success message after 6 seconds
      setTimeout(() => {
        formMessage.textContent = "";
        formMessage.className = "form-message";
      }, 6000);
    } catch (error) {
      // ERROR MESSAGE
      formMessage.textContent =
        "Sorry! Your message could not be sent. Please check your internet connection and try again or send me an email directly via the email provided.";

      formMessage.className = "form-message error";

      console.error("Contact form error:", error);
    } finally {
      // Re-enable button
      submitBtn.disabled = false;

      // Restore original button after 2 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalButtonContent;
      }, 2000);
    }
  });
}

/* ============================================
   REAL-TIME AVAILABILITY SYSTEM
   Timezone: Africa/Nairobi (EAT)
   Online: 08:00 AM - 10:00 PM
============================================ */

function updateAvailabilityStatus() {
  const dot = document.getElementById("availabilityDot");
  const status = document.getElementById("availabilityText");
  const timeDisplay = document.getElementById("availabilityTime");

  if (!dot || !status || !timeDisplay) return;

  const now = new Date();

  // Get current Kenyan time
  const kenyaTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(now);

  // Get Kenyan hour and minute
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const hour = Number(parts.find((part) => part.type === "hour").value);

  const minute = Number(parts.find((part) => part.type === "minute").value);

  const currentTime = hour * 60 + minute;

  // Working hours: 8:00 AM to 10:00 PM
  const onlineStart = 8 * 60;
  const onlineEnd = 22 * 60;

  const isOnline = currentTime >= onlineStart && currentTime < onlineEnd;

  // Update live clock every second
  timeDisplay.textContent = `· ${kenyaTime} EAT`;

  if (isOnline) {
    // ONLINE STATUS
    dot.classList.remove("offline");
    dot.classList.add("online");

    status.textContent = "ONLINE";
  } else {
    // OFFLINE STATUS
    dot.classList.remove("online");
    dot.classList.add("offline");

    status.textContent = "OFFLINE NOW";
  }
}

// Run immediately
updateAvailabilityStatus();

// Update every second
setInterval(updateAvailabilityStatus, 1000);
