// Smooth scroll for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Handle anchor link clicks
  const anchorLinks = document.querySelectorAll("a[href^='#']");
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href.length <= 1) return;
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Add navbar background on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      navbar.style.boxShadow = "none";
    }
  });

  // Intersection Observer for scroll animations (feature + testimonial cards)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".feature-card, .testimonial-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // Button click handlers (demo)
  const ctaButtons = document.querySelectorAll(".btn");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.closest("a")) return;
      if (
        this.textContent.includes("Free Trial") ||
        this.textContent.includes("Demo")
      ) {
        alert(
          "This would open a signup/demo form. You can customize this action!"
        );
      }
      console.log("Button clicked:", this.textContent);
    });
  });

  console.log("Smart Assist Landing Page - Initialized");
});

// call analysis and whatsapp chat
document.addEventListener("DOMContentLoaded", function () {
  // ...your existing code (smooth scroll, navbar, etc.)

  // -------- Conversation / Call Analysis DATA --------

  // Demo data for each timeline range
  // Demo data for each timeline range (per salesperson)
  const callAnalysisData = {
    "1D": {
      // One busy day for a single salesperson
      connectedCount: 14,
      conversationTime: "19m 40s",
      notConnected: 4,
      all: { calls: 20, duration: "25m 10s", clients: 9 },
      connected: { calls: 14, duration: "19m 40s", clients: 8 },
      missed: { calls: 4, duration: "5m 10s", clients: 1 },
      rejected: { calls: 2, duration: "0m 20s", clients: 1 },
      incoming: { calls: 20, duration: "25m 10s", clients: 9 },
      chartLabel: "Today",
    },

    "1W": {
      // Weekly view (roughly 5 working days)
      connectedCount: 68,
      conversationTime: "2h 15m 30s",
      notConnected: 16,
      all: { calls: 90, duration: "2h 45m 40s", clients: 38 },
      connected: { calls: 68, duration: "2h 15m 30s", clients: 32 },
      missed: { calls: 14, duration: "17m 20s", clients: 4 },
      rejected: { calls: 8, duration: "12m 50s", clients: 2 },
      incoming: { calls: 90, duration: "2h 45m 40s", clients: 38 },
      chartLabel: "This week",
    },

    "1M": {
      // Monthly view for one salesperson
      connectedCount: 230,
      conversationTime: "6h 40m 10s",
      notConnected: 55,
      all: { calls: 320, duration: "7h 55m 25s", clients: 140 },
      connected: { calls: 230, duration: "6h 40m 10s", clients: 125 },
      missed: { calls: 55, duration: "48m 30s", clients: 12 },
      rejected: { calls: 35, duration: "26m 45s", clients: 8 },
      incoming: { calls: 320, duration: "7h 55m 25s", clients: 140 },
      chartLabel: "This month",
    },

    "1Q": {
      // Quarter (3 months) – still individual level, not call center scale
      connectedCount: 640,
      conversationTime: "18h 20m 45s",
      notConnected: 150,
      all: { calls: 880, duration: "21h 35m 15s", clients: 380 },
      connected: { calls: 640, duration: "18h 20m 45s", clients: 340 },
      missed: { calls: 150, duration: "1h 28m 30s", clients: 28 },
      rejected: { calls: 90, duration: "1h 45m 60s", clients: 12 },
      incoming: { calls: 880, duration: "21h 35m 15s", clients: 380 },
      chartLabel: "This quarter",
    },

    "1Y": {
      // Full year – aggregated but still reasonable for a single salesperson
      connectedCount: 2450,
      conversationTime: "72h 10m 00s",
      notConnected: 620,
      all: { calls: 3200, duration: "80h 30m 00s", clients: 1250 },
      connected: { calls: 2450, duration: "72h 10m 00s", clients: 1100 },
      missed: { calls: 470, duration: "4h 55m 00s", clients: 90 },
      rejected: { calls: 280, duration: "3h 25m 00s", clients: 60 },
      incoming: { calls: 3200, duration: "80h 30m 00s", clients: 1250 },
      chartLabel: "Last 12 months",
    },
  };

  // -------- Helper to update the UI for a given range --------

  function updateCallAnalysis(rangeKey) {
    const data = callAnalysisData[rangeKey];
    if (!data) return;

    // Key metrics
    const connectedCountEl = document.querySelector(
      '[data-field="connected-count"]'
    );
    const conversationTimeEl = document.querySelector(
      '[data-field="conversation-time"]'
    );
    const notConnectedEl = document.querySelector(
      '[data-field="not-connected"]'
    );

    if (connectedCountEl) connectedCountEl.textContent = data.connectedCount;
    if (conversationTimeEl)
      conversationTimeEl.textContent = data.conversationTime;
    if (notConnectedEl) notConnectedEl.textContent = data.notConnected;

    // Table rows
    const mapField = (field, value) => {
      const el = document.querySelector(`[data-field="${field}"]`);
      if (el) el.textContent = value;
    };

    mapField("all-calls", data.all.calls);
    mapField("all-duration", data.all.duration);
    mapField("all-clients", data.all.clients);

    mapField("connected-calls", data.connected.calls);
    mapField("connected-duration", data.connected.duration);
    mapField("connected-clients", data.connected.clients);

    mapField("missed-calls", data.missed.calls);
    mapField("missed-duration", data.missed.duration);
    mapField("missed-clients", data.missed.clients);

    mapField("rejected-calls", data.rejected.calls);
    mapField("rejected-duration", data.rejected.duration);
    mapField("rejected-clients", data.rejected.clients);

    // Footer pill
    mapField("incoming-calls", data.incoming.calls);
    mapField("incoming-duration", data.incoming.duration);
    mapField("incoming-clients", data.incoming.clients);

    // Chart label
    const chartLabelEl = document.querySelector(
      '[data-field="chart-label-range"]'
    );
    if (chartLabelEl) chartLabelEl.textContent = data.chartLabel;
  }

  // -------- Enquiry / Cold Calls toggle (visual only) --------

  const modes = document.querySelectorAll(".segment-btn");
  const metricsBlock = document.querySelector(".analysis-metrics-row--key");
  const callsTable = document.querySelector(".analysis-table--icons");

  if (modes.length && metricsBlock && callsTable) {
    modes.forEach((btn) => {
      btn.addEventListener("click", () => {
        modes.forEach((b) =>
          b.classList.toggle("segment-btn--active", b === btn)
        );

        [metricsBlock, callsTable].forEach((el) => {
          el.style.opacity = "0.3";
          setTimeout(() => {
            el.style.opacity = "1";
          }, 160);
        });
      });
    });
  }

  // -------- Timeline range toggle (real data changes) --------

  const timelinePills = document.querySelectorAll(".timeline-pill");

  if (timelinePills.length && metricsBlock && callsTable) {
    timelinePills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const range = pill.getAttribute("data-range");

        timelinePills.forEach((p) =>
          p.classList.toggle("timeline-pill--active", p === pill)
        );

        // smooth fade while updating data
        [metricsBlock, callsTable].forEach((el) => {
          el.style.opacity = "0.1";
        });

        setTimeout(() => {
          updateCallAnalysis(range);

          [metricsBlock, callsTable].forEach((el) => {
            el.style.opacity = "1";
          });
        }, 150);
      });
    });

    // initial load (match default active pill 1Y)
    updateCallAnalysis("1Y");
  }
});

// voice powered actions
document.addEventListener("DOMContentLoaded", function () {
  // ensure voices load (Chrome quirk)
  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged =
      window.speechSynthesis.onvoiceschanged || (() => {});
  }

  // ----- Voice helper: prefer Indian female voice -----
  function speakSentence(text, onEnd) {
    if (!("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }

    function chooseVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || !voices.length) return null;

      const indianVoices = voices.filter((v) =>
        v.lang.toLowerCase().startsWith("en-in")
      );

      const femaleIndian =
        indianVoices.find((v) => /female|woman|girl/i.test(v.name)) ||
        indianVoices[0];

      if (!femaleIndian) {
        const femaleEnglish =
          voices.find(
            (v) =>
              v.lang.toLowerCase().startsWith("en") &&
              /female|woman|girl/i.test(v.name)
          ) || voices.find((v) => v.lang.toLowerCase().startsWith("en"));
        return femaleEnglish || voices[0];
      }

      return femaleIndian;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.97;
    utterance.pitch = 1.05;
    utterance.lang = "en-IN";

    const selectedVoice = chooseVoice();
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // ----- Tap to speak demo: voice + text -----
  const tapToSpeakBtn = document.getElementById("tap-to-speak-btn");
  const remarksStatus = document.getElementById("remarks-status");
  const voiceCaption = document.getElementById("voice-caption");
  const voiceText = document.getElementById("voice-text");
  const bars = document.querySelectorAll(".followups-bar");
  const micRing = document.querySelector(".followups-voice-ring");

  const spokenSentence =
    "Reach out to the client tomorrow, thank them for their time and share the updated quotation.";
  const transcribedSentence =
    "Reach out to the client to thank them for their time, share the updated quotation, and check if they need any additional support before making a decision.";

  let isListening = false;

  if (tapToSpeakBtn && remarksStatus && voiceCaption && voiceText) {
    tapToSpeakBtn.addEventListener("click", () => {
      if (isListening) return;
      isListening = true;

      remarksStatus.textContent = "Playing sample voice note...";
      tapToSpeakBtn.classList.add("is-recording");
      bars.forEach((bar) => bar.classList.add("followups-bar--active"));
      if (micRing) micRing.classList.add("animate-voice-pulse");

      voiceCaption.textContent = "“...”";

      speakSentence(spokenSentence, () => {
        voiceCaption.textContent = `“${spokenSentence}”`;

        voiceText.classList.remove("animate-voice-typing");
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        voiceText.offsetHeight;
        voiceText.textContent = transcribedSentence;
        voiceText.classList.add("animate-voice-typing");

        remarksStatus.textContent = transcribedSentence;

        tapToSpeakBtn.classList.remove("is-recording");
        bars.forEach((bar) => bar.classList.remove("followups-bar--active"));
        isListening = false;
      });
    });
  }

  // ...keep your other JS for timeline, scrolling, etc.
});

// reload car
document.addEventListener("DOMContentLoaded", () => {
  const car = document.querySelector(".testdrive-car");
  if (car) {
    const animationDuration = 7; // Must match your CSS duration
    const negativeDelay = -Math.random() * animationDuration;
    car.style.animationDelay = `${negativeDelay}s`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // existing code ...

  const sections = document.querySelectorAll(
    "#about, #features, #mobile, #conversation-intelligence, #followups, #testdrive-flow, #team-performance, #benefits, #testimonials"
  );
  const navLinks = document.querySelectorAll(".navbar-links .nav-link");

  function setActiveNav() {
    let currentId = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom > 140) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href"); // "#about"
      link.classList.remove("active");
      if (currentId && href === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  // Update on scroll
  window.addEventListener("scroll", setActiveNav);
  // And once on load
  setActiveNav();

  // Optional: immediate active on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // keep your other existing JS below...
});

// Animation section
// === Scroll-based reveal animations (left & right alternating) ===
document.addEventListener("DOMContentLoaded", function () {
  // Select all sections with reveal classes
  const revealSections = document.querySelectorAll(
    ".reveal-left, .reveal-right"
  );

  // IntersectionObserver to trigger when section enters viewport
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // Stop observing once revealed
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12, // Trigger when 12% of section is visible
      rootMargin: "0px 0px -80px 0px", // Offset from bottom
    }
  );

  // Observe each section
  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });
});

// Scroll based animation
/* ========================================
   Scroll-based section reveal animations (left/right slide)
======================================== */
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateX(0)";
      }
    });
  }, observerOptions);

  // Sections that should slide from LEFT
  const leftSlideSections = document.querySelectorAll(
    ".about-section, .mobile-section, .followups-section, .team-performance-section, .testimonials-section"
  );

  // Sections that should slide from RIGHT
  const rightSlideSections = document.querySelectorAll(
    ".features-section, .conversation-section, .testdrive-journey-section, .benefits-section, .stats-section"
  );

  // Initialize left-sliding sections
  leftSlideSections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateX(-80px)";
    section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(section);
  });

  // Initialize right-sliding sections
  rightSlideSections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateX(80px)";
    section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    observer.observe(section);
  });
});

// Nav button
// Enhanced Hamburger Menu Toggle with Overlay
const hamburger = document.getElementById("hamburger");
const navbarLinks = document.querySelector(".navbar-links");
const menuOverlay = document.getElementById("menu-overlay");

if (hamburger && navbarLinks) {
  // Toggle menu function
  function toggleMenu() {
    hamburger.classList.toggle("active");
    navbarLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  // Close menu function
  function closeMenu() {
    hamburger.classList.remove("active");
    navbarLinks.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  // Hamburger click
  hamburger.addEventListener("click", toggleMenu);

  // Overlay click to close
  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navbarLinks.classList.contains("active")) {
      closeMenu();
    }
  });
}

// nav button new
// scroll up
/* ========================================
   Scroll to top on page reload/refresh
======================================== */

// Disable browser's scroll restoration feature
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Scroll to top before page unloads
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Force scroll to top on page load
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

// Also ensure scroll on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});
