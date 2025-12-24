// Automatically updates year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Wait for DOM to load before setting up event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Projects modal functionality
  const projectsBtn = document.getElementById("projectsBtn");
  const projectsOverlay = document.getElementById("projectsOverlay");
  const closeProjects = document.getElementById("closeProjects");


  function openProjects() {
    projectsOverlay.classList.add("active");
    projectsOverlay.classList.remove("closing");
    document.body.style.overflow = "hidden";
  }

  function closeProjectsModal() {
    projectsOverlay.classList.add("closing");
    projectsOverlay.classList.remove("active");

    setTimeout(() => {
      projectsOverlay.classList.remove("closing");
      document.body.style.overflow = "";
    }, 600);
  }

  if (projectsBtn) {
    projectsBtn.addEventListener("click", openProjects);
  }
  
  if (closeProjects) {
    closeProjects.addEventListener("click", closeProjectsModal);
  }

  // Close modal when clicking outside the content
  projectsOverlay.addEventListener("click", (e) => {
    // Close if clicking on the overlay background (not the modal content)
    if (e.target === projectsOverlay || e.target.classList.contains("projects-book") ) {
      closeProjectsModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectsOverlay.classList.contains("active")) {
      closeProjectsModal();
    }
  });

  // particles.js configuration for animated background
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
