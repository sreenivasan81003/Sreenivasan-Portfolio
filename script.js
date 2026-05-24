const roleTyping = document.querySelector("#role-typing");
const roles = ["Quality assurance engineer", "Automation tester"];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeRole() {
  if (!roleTyping) {
    return;
  }

  const currentRole = roles[roleIndex];
  roleTyping.textContent = currentRole.slice(0, characterIndex);

  if (!isDeleting && characterIndex < currentRole.length) {
    characterIndex += 1;
    window.setTimeout(typeRole, 82);
    return;
  }

  if (!isDeleting && characterIndex === currentRole.length) {
    isDeleting = true;
    window.setTimeout(typeRole, 1250);
    return;
  }

  if (isDeleting && characterIndex > 0) {
    characterIndex -= 1;
    window.setTimeout(typeRole, 42);
    return;
  }

  isDeleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  window.setTimeout(typeRole, 260);
}

typeRole();

const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

function updateActiveSection() {
  const headerOffset = 150;
  const currentSection = sections.reduce((current, section) => {
    const sectionTop = section.offsetTop - headerOffset;
    return window.scrollY >= sectionTop ? section : current;
  }, sections[0]);

  if (!currentSection) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
  });
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", updateActiveSection);
updateActiveSection();

const revealItems = document.querySelectorAll(
  ".section, .hero-metrics div, .skills-grid article, .experience-card, .project-card, .contact-details"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal", "reveal-stagger");
  item.style.setProperty("--delay", `${Math.min(index % 6, 5) * 70}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    rootMargin: "0px 0px -4% 0px",
    threshold: 0.03,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
