const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("active"));
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("active")),
  );
document.getElementById("year").textContent = new Date().getFullYear();
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
const reveals = document.querySelectorAll(".reveal");
function reveal() {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight - 100)
      el.classList.add("active");
  });
}
addEventListener("scroll", reveal);
reveal();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value.trim();
    formMessage.textContent = `Thank you ${name}! Your message has been received successfully.`;
    formMessage.classList.add("success");
    this.reset();
  });
}

// ===============================
// TYPEWRITER EFFECT
// ===============================

const TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.isDeleting = false;

  this.tick();
};

TxtType.prototype.tick = function () {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.querySelector(".wrap").textContent = this.txt;

  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(() => {
    this.tick();
  }, delta);
};


// Start Typewriter
window.addEventListener("load", function () {
  const elements = document.getElementsByClassName("typewrite");

  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute("data-type");
    const period = elements[i].getAttribute("data-period");

    if (toRotate) {
      new TxtType(
        elements[i],
        JSON.parse(toRotate),
        period
      );
    }
  }
});
