// Language management
// Store the current language preference, default to English
let currentLanguage = localStorage.getItem("preferredLanguage") || "en";
// Store the loaded content data
let contentData = {};

// Content data embedded directly to avoid CORS issues
// Contains all text and data for both English and German languages
// Structure: contentStore[language][section][content]
const contentStore = {
  en: {
    name: "mahesh",
    role: "developer",
    links: {
      github: "https://github.com/nmahesh20",
      email: "mailto:themahesh2077@gmail.com",
      discord: "https://discord.gg/wY4wZVpSvr",
      linkedin: "https://linkedin.com/in/mahesh2000",
    },
    footer: {
      cta: "Work Together?",
      email: "themahesh2077@gmail.com",
      credit: "Built by Mahesh × AI",
    },
    projects: {
      title: "projects",
      items: [
        {
          title: "Outreach",
          description:
            "The platform automates the process of reaching out to potential academic or job opportunities. By analyzing the user's interests, it scans the web for relevant contact emails and automatically sends personalized emails to the appropriate authorities.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/Outreach-Automation",
            },
            {
              label: "Link",
              url: "https://outreach-quarks.netlify.app/",
            },
          ],
        },
        {
          title: "WhatsApp Web Mobile Adapter",
          description:
            "A Firefox extension that adapts WhatsApp Web for mobile devices by spoofing the as a PC and applying mobile-friendly overrides.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/WhatsApp-Web-mobile-adapter",
            },
            {
              label: "Live",
              url: "https://addons.mozilla.org/en-US/firefox/addon/wa-web-mobile-adapter/",
            },
          ],
        },
        {
          title: "Music Bot",
          description:
            "A Discord music bot that streams audio from YouTube links shared within Discord. It can also play music from a list of YouTube links provided in a file.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/Discord-MusicBot",
            },
          ],
        },
      ],
    },
  },
  de: {
    name: "mahesh",
    role: "entwickler",
    links: {
      github: "https://github.com/nmahesh20",
      email: "mailto:themahesh2077@gmail.com",
      discord: "https://discord.gg/wY4wZVpSvr",
      linkedin: "https://linkedin.com/in/mahesh2000",
    },
    footer: {
      cta: "Zusammenarbeiten?",
      email: "themahesh2077@gmail.com",
      credit: "Erstellt von Mahesh × KI",
    },
    projects: {
      title: "projekte",
      items: [
        {
          title: "Outreach",
          description:
            "Die Plattform automatisiert den Prozess der Kontaktaufnahme mit potenziellen akademischen oder beruflichen Möglichkeiten. Durch die Analyse der Interessen des Benutzers scannt sie das Web nach relevanten Kontakt-E-Mails und versendet automatisch personalisierte E-Mails an die entsprechenden Behörden.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/Outreach-Automation",
            },
            {
              label: "Link",
              url: "https://outreach-quarks.netlify.app/",
            },
          ],
        },
        {
          title: "WhatsApp Web Mobile Adapter",
          description:
            "Eine Firefox-Erweiterung, die WhatsApp Web für Mobilgeräte anpasst, indem sie sich als PC ausgibt und benutzerfreundliche Overrides anwendet.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/WhatsApp-Web-mobile-adapter",
            },
            {
              label: "Live",
              url: "https://addons.mozilla.org/en-US/firefox/addon/wa-web-mobile-adapter/",
            },
          ],
        },
        {
          title: "Music Bot",
          description:
            "Ein Discord-Musik-Bot, der Audio von YouTube-Links streamt, die in Discord geteilt werden. Er kann auch Musik aus einer Liste von YouTube-Links in einer Datei abspielen.",
          links: [
            {
              label: "Code",
              url: "https://github.com/NMahesh20/Discord-MusicBot",
            },
          ],
        },
      ],
    },
  },
};

// Load content - now synchronous since data is embedded
// Switches language and updates all page content
function loadContent(lang) {
  // Get content data for the specified language
  contentData = contentStore[lang] || contentStore.en;
  // Update current language variable
  currentLanguage = lang;
  // Update all dynamic content on the page
  updateContent();
  // Update language button visual states (opacity, border)
  updateLanguageButtons();
  // Save language preference to localStorage for persistence
  localStorage.setItem("preferredLanguage", lang);
}

// Update all content on the page
// Called whenever language is switched
function updateContent() {
  // Update projects first (takes slightly longer)
  updateProjectsGrid();

  // Update main heading name and role
  const userName = document.getElementById("userName");
  const userRole = document.getElementById("userRole");
  if (userName) userName.textContent = contentData.name;
  if (userRole) userRole.textContent = contentData.role;

  // Update footer call-to-action and credit text
  const footerCta = document.getElementById("footerCta");
  const footerCredit = document.getElementById("footerCredit");
  if (footerCta) footerCta.textContent = contentData.footer.cta;
  if (footerCredit) footerCredit.textContent = contentData.footer.credit;
}

// Update projects grid dynamically
// Regenerates all project cards with content in current language
function updateProjectsGrid() {
  const projectsGrid = document.getElementById("projectsGrid");
  const projectsTitle = document.getElementById("projectsTitle");

  // Update projects section title
  if (projectsTitle) projectsTitle.textContent = contentData.projects.title;

  if (!projectsGrid) return;

  // Clear existing project cards
  projectsGrid.innerHTML = "";

  // Create project cards for each project in the current language
  contentData.projects.items.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className =
      "project-card p-6 rounded-lg border border-[var(--ink)] border-opacity-30 hover:border-opacity-60";

    // Build HTML for project links (Code, Live, etc.)
    const linksHTML = project.links
      .map(
        (link) =>
          `<a href="${link.url}" target="_blank" class="linkish text-xs mono">${link.label}</a>`,
      )
      .join("\n                  ");

    // Set card content with title, description, and links
    projectCard.innerHTML = `
      <h3 class="mono text-lg font-medium mb-2">${project.title}</h3>
      <p class="text-sm opacity-80 mb-4 text-justify">${project.description}</p>
      <div class="flex gap-2">
        ${linksHTML}
      </div>
    `;

    projectsGrid.appendChild(projectCard);
  });
}

// Update language button styles
// Sets opacity and border styling based on selected language
function updateLanguageButtons() {
  const btnEn = document.getElementById("langBtnEn");
  const btnDe = document.getElementById("langBtnDe");

  // Update English button state
  if (btnEn) {
    if (currentLanguage === "en") {
      // Active state: full opacity and highlighted border
      btnEn.classList.add("border-[var(--ink)]");
      btnEn.classList.remove("border-opacity-30");
      btnEn.classList.add("border-opacity-60");
      btnEn.style.opacity = "1";
    } else {
      // Inactive state: faded opacity and dimmed border
      btnEn.classList.remove("border-[var(--ink)]");
      btnEn.classList.add("border-opacity-30");
      btnEn.classList.remove("border-opacity-60");
      btnEn.style.opacity = "0.5";
    }
  }

  // Update German button state
  if (btnDe) {
    if (currentLanguage === "de") {
      // Active state: full opacity and highlighted border
      btnDe.classList.add("border-[var(--ink)]");
      btnDe.classList.remove("border-opacity-30");
      btnDe.classList.add("border-opacity-60");
      btnDe.style.opacity = "1";
    } else {
      // Inactive state: faded opacity and dimmed border
      btnDe.classList.remove("border-[var(--ink)]");
      btnDe.classList.add("border-opacity-30");
      btnDe.classList.add("border-opacity-60");
      btnDe.style.opacity = "0.5";
    }
  }
}

// Automatically updates year in footer on page load
document.getElementById("year").textContent = new Date().getFullYear();

// Wait for DOM to load before setting up event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Select language buttons for initial state and event setup
  const langBtnEn = document.getElementById("langBtnEn");
  const langBtnDe = document.getElementById("langBtnDe");

  // Initialize button opacity on page load (fixes double-click issue)
  if (langBtnEn)
    langBtnEn.style.opacity = currentLanguage === "en" ? "1" : "0.5";
  if (langBtnDe)
    langBtnDe.style.opacity = currentLanguage === "de" ? "1" : "0.5";

  // Load initial language content
  loadContent(currentLanguage);

  // Add click event listeners to language buttons
  if (langBtnEn) {
    langBtnEn.addEventListener("click", () => loadContent("en"));
  }
  if (langBtnDe) {
    langBtnDe.addEventListener("click", () => loadContent("de"));
  }

  // Projects modal functionality
  // Select modal elements
  const projectsBtn = document.getElementById("projectsBtn");
  const projectsOverlay = document.getElementById("projectsOverlay");
  const closeProjects = document.getElementById("closeProjects");

  // Open projects modal with animation
  function openProjects() {
    projectsOverlay.classList.add("active");
    projectsOverlay.classList.remove("closing");
    document.body.style.overflow = "hidden";
  }

  // Close projects modal with animation
  function closeProjectsModal() {
    projectsOverlay.classList.add("closing");
    projectsOverlay.classList.remove("active");

    // Wait for animation to complete before fully closing
    setTimeout(() => {
      projectsOverlay.classList.remove("closing");
      document.body.style.overflow = "";
    }, 600);
  }

  // Attach modal open/close event listeners
  if (projectsBtn) {
    projectsBtn.addEventListener("click", openProjects);
  }

  if (closeProjects) {
    closeProjects.addEventListener("click", closeProjectsModal);
  }

  // Close modal when clicking outside the content
  projectsOverlay.addEventListener("click", (e) => {
    if (
      e.target === projectsOverlay ||
      e.target.classList.contains("projects-book")
    ) {
      closeProjectsModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectsOverlay.classList.contains("active")) {
      closeProjectsModal();
    }
  });

  // Initialize particles.js for animated background
  // Configuration for particle effects that respond to mouse hover and clicks
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ec8600",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#9f5a00",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        bounce: true,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 250,
          size: 10,
          duration: 2,
          opacity: 0.8,
        },
        grab: {
          distance: 200,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });
});

// Helper function to create delays in async operations
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Typewriter effect for page title
// Cycles through typing and deleting the title text continuously
async function typewriteTitle(str) {
  document.title = "_";
  while (true) {
    // Type out the string character by character
    for (let i = 0; i < str.length; i++) {
      document.title = str.substring(0, i + 1) + "_";
      await sleep(120);
    }

    // Pause while full title is shown
    await sleep(1000);

    // Delete the string character by character
    for (let i = str.length; i > 1; i--) {
      document.title = str.substring(0, i - 1);
      await sleep(50);
    }
    document.title = "_";

    // Pause before restarting the cycle
    await sleep(500);
  }
}

// Initialize typewriter title effect on page load
let docTitle = "Mahesh's Portfolio";
typewriteTitle(docTitle);
