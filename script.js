/**
 * CraftPixel Studios — High-End Kinetic Motion & Scroll Engine
 * Styled & Engineered after ANML.com & Studio Freight Motion Systems
 */

(function () {
  'use strict';

  // 1. Initialize Lenis Smooth Inertial Scrolling
  let lenisInstance = null;

  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.9,
      });

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Listen to Lenis scroll for all scroll-driven animations
      lenisInstance.on('scroll', onScrollUpdate);
    } else {
      // Fallback to native window scroll event
      window.addEventListener('scroll', onScrollUpdate, { passive: true });
    }
  }

  // Load Lenis dynamically if not present
  if (typeof Lenis === 'undefined') {
    const lenisScript = document.createElement('script');
    lenisScript.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js';
    lenisScript.onload = () => initSmoothScroll();
    lenisScript.onerror = () => {
      window.addEventListener('scroll', onScrollUpdate, { passive: true });
    };
    document.head.appendChild(lenisScript);
  } else {
    initSmoothScroll();
  }

  // 2. Scroll Update Engine (Progress bar, Parallax, Sticky Nav)
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('site-header');
  const heroHeading = document.getElementById('hero-heading');
  const heroMockup = document.getElementById('hero-mockup-container');
  const letsTalkBg = document.getElementById('lets-talk-bg');

  function onScrollUpdate(e) {
    const scrollY = lenisInstance ? lenisInstance.scroll : (window.scrollY || document.documentElement.scrollTop);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    // Top Progress Bar
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Sticky Blur Header
    if (header) {
      if (scrollY > 50) {
        header.classList.add('bg-black/85', 'backdrop-blur-xl', 'py-3.5', 'border-b', 'border-white/10', 'shadow-2xl');
        header.classList.remove('py-5');
      } else {
        header.classList.remove('bg-black/85', 'backdrop-blur-xl', 'py-3.5', 'border-b', 'border-white/10', 'shadow-2xl');
        header.classList.add('py-5');
      }
    }

    // Hero Section Parallax
    if (scrollY < window.innerHeight * 1.3) {
      if (heroHeading) {
        heroHeading.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      }
      if (heroMockup) {
        heroMockup.style.transform = `translate3d(0, ${scrollY * -0.1}px, 0)`;
      }
    }

    // Footer 'Let's Talk' Parallax Glide
    if (letsTalkBg) {
      const rect = letsTalkBg.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.08;
        letsTalkBg.style.transform = `translate3d(${offset - 30}px, 0, 0)`;
      }
    }

    // Parallax on Case Study Media
    document.querySelectorAll('.parallax-media').forEach(media => {
      const rect = media.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const shift = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.06;
        media.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    });
  }

  // 3. Staggered Scroll Reveal System with IntersectionObserver
  function setupScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-item');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('is-revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
      });

      revealElements.forEach((el, index) => {
        if (el.parentElement && el.parentElement.classList.contains('grid')) {
          el.dataset.delay = (index % 4) * 110;
        }
        revealObserver.observe(el);
      });
    } else {
      revealElements.forEach(el => el.classList.add('is-revealed'));
    }
  }

  // 4. Live Counter Animation with easeOutExpo Curve
  function setupLiveCounters() {
    const counterElements = document.querySelectorAll('.counter, .counter-float');
    if ('IntersectionObserver' in window && counterElements.length > 0) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const isFloat = target.classList.contains('counter-float');
            const targetValue = parseFloat(target.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = easeOutExpo * targetValue;

              if (isFloat) {
                target.textContent = current.toFixed(1);
              } else {
                target.textContent = Math.floor(current);
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                target.textContent = isFloat ? targetValue.toFixed(1) : targetValue;
              }
            };

            requestAnimationFrame(updateCounter);
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.35 });

      counterElements.forEach(el => counterObserver.observe(el));
    }
  }

  // 5. Signature Velocity-Based Cursor Tilt & Thumbnail Tracking
  function setupCursorPreview() {
    const cursorPreview = document.getElementById('cursor-preview');
    if (!cursorPreview) return;

    const previewImgs = document.querySelectorAll('.cursor-preview-img');
    const projectRows = document.querySelectorAll('.project-row, .work-list-item');

    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0;
    let previewX = 0, previewY = 0;
    let currentTilt = 0;
    let targetTilt = 0;
    let isTracking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const vx = mouseX - prevMouseX;
      targetTilt = Math.max(Math.min(vx * 0.25, 12), -12);
      prevMouseX = mouseX;
    });

    function smoothCursor() {
      if (isTracking && cursorPreview) {
        previewX += (mouseX - previewX) * 0.16;
        previewY += (mouseY - previewY) * 0.16;
        currentTilt += (targetTilt - currentTilt) * 0.12;
        targetTilt *= 0.94; // Decay tilt when stopped

        cursorPreview.style.left = `${previewX}px`;
        cursorPreview.style.top = `${previewY}px`;
        cursorPreview.style.transform = `translate3d(-50%, -50%, 0) rotate(${currentTilt.toFixed(2)}deg) scale(1)`;
      }
      requestAnimationFrame(smoothCursor);
    }
    smoothCursor();

    projectRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const id = row.getAttribute('data-preview-id');
        isTracking = true;

        previewImgs.forEach(img => img.classList.remove('visible'));
        const targetImg = document.getElementById(`preview-${id}`);
        if (targetImg) {
          targetImg.classList.add('visible');
        }

        previewX = mouseX;
        previewY = mouseY;
        cursorPreview.style.left = `${previewX}px`;
        cursorPreview.style.top = `${previewY}px`;
        cursorPreview.classList.add('active');
      });

      row.addEventListener('mouseleave', () => {
        if (cursorPreview) {
          cursorPreview.classList.remove('active');
          cursorPreview.style.transform = `translate3d(-50%, -50%, 0) scale(0.85)`;
        }
        isTracking = false;
      });
    });
  }

  // 6. Magnetic Button Physics with Elastic Damping
  function setupMagneticButtons() {
    const magneticItems = [
      { el: document.getElementById('magnetic-cta'), strength: 0.38 },
      { el: document.getElementById('play-reel-btn'), strength: 0.25 }
    ];

    magneticItems.forEach(({ el, strength }) => {
      if (!el) return;

      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let isHovered = false;

      function renderMagnetic() {
        if (isHovered) {
          currentX += (targetX - currentX) * 0.2;
          currentY += (targetY - currentY) * 0.2;
          el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;
          requestAnimationFrame(renderMagnetic);
        } else {
          currentX += (0 - currentX) * 0.15;
          currentY += (0 - currentY) * 0.15;
          if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1)`;
            requestAnimationFrame(renderMagnetic);
          } else {
            el.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
          }
        }
      }

      el.addEventListener('mousemove', (e) => {
        isHovered = true;
        const rect = el.getBoundingClientRect();
        targetX = (e.clientX - rect.left - rect.width / 2) * strength;
        targetY = (e.clientY - rect.top - rect.height / 2) * strength;
        requestAnimationFrame(renderMagnetic);
      });

      el.addEventListener('mouseleave', () => {
        isHovered = false;
        requestAnimationFrame(renderMagnetic);
      });
    });
  }

  // 7. Interactive Category Filtering with Stagger Animation
  function setupCategoryFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-list-item');
    const featureItems = document.querySelectorAll('.js-feature-item');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-white', 'text-black', 'font-semibold');
          b.classList.add('bg-neutral-900', 'text-neutral-400', 'border-neutral-800');
        });
        btn.classList.add('active', 'bg-white', 'text-black', 'font-semibold');
        btn.classList.remove('bg-neutral-900', 'text-neutral-400', 'border-neutral-800');

        const category = btn.getAttribute('data-filter');

        let matchIndex = 0;
        workItems.forEach(item => {
          const categories = item.getAttribute('data-categories') || '';
          if (category === 'all' || categories.includes(category)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translate3d(0, 0, 0)';
            }, matchIndex * 60);
            matchIndex++;
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translate3d(0, 16px, 0)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });

        featureItems.forEach(item => {
          const categories = item.getAttribute('data-categories') || '';
          if (category === 'all' || categories.includes(category)) {
            item.style.display = 'block';
            item.style.opacity = '1';
          } else {
            item.style.opacity = '0.35';
          }
        });
      });
    });
  }

  // 8. Mobile Menu & Form Submission
  function setupGeneralInteractions() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = document.getElementById('mobile-icon');

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
        mobileMenu.classList.toggle('hidden');

        if (!isExpanded && mobileIcon) {
          mobileIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else if (mobileIcon) {
          mobileIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
      });
    }

    const contactForm = document.getElementById('contact-form');
    const formNote = document.getElementById('form-note');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = 'Sent Successfully ✓';
          submitBtn.classList.add('bg-emerald-600');
          if (formNote) {
            formNote.textContent = 'Enquiry received! We will connect within 24 hours.';
            formNote.classList.add('text-emerald-600', 'font-semibold');
          }
          contactForm.reset();
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('bg-emerald-600');
          }, 4000);
        }
      });
    }
  }

  // Initialize all motion modules
  document.addEventListener('DOMContentLoaded', () => {
    setupScrollReveals();
    setupLiveCounters();
    setupCursorPreview();
    setupMagneticButtons();
    setupCategoryFiltering();
    setupGeneralInteractions();
  });
})();
