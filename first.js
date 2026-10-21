(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = () => motionQuery.matches;

  initializeNavigation();
  initializeAboutToggle();
  initializeProjectCarousel();
  initializeFaq();
  initializeBackToTop();
  initializeScrollReveal();

  function initializeNavigation() {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuButton?.addEventListener('click', () => {
      const isOpening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(isOpening));
      menuButton.setAttribute('aria-label', isOpening ? 'Close navigation' : 'Open navigation');
      navLinks?.classList.toggle('is-open', isOpening);
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
        menuButton?.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  function initializeAboutToggle() {
    const readMoreButton = document.getElementById('read-more');
    const moreAbout = document.getElementById('more-about');

    readMoreButton?.addEventListener('click', () => {
      const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true';
      readMoreButton.setAttribute('aria-expanded', String(isExpanded));
      moreAbout.hidden = !isExpanded;
      readMoreButton.innerHTML = isExpanded
        ? 'Read less <span aria-hidden="true">－</span>'
        : 'Read more <span aria-hidden="true">＋</span>';
    });
  }

  function initializeProjectCarousel() {
    const cards = [...document.querySelectorAll('[data-project]')];
    const stage = document.querySelector('.project-stage');
    const dots = document.querySelector('.carousel-dots');
    const counter = document.querySelector('.carousel-count');

    if (!cards.length || !stage || !dots) return;

    const autoplayDelay = 4500;
    let activeIndex = 0;
    let autoplayTimer = null;
    let pointerStart = null;
    let isHovered = false;
    let isFocused = false;
    let isInteracting = false;
    let isPointerInput = false;
    let didSwipe = false;

    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show project ' + (index + 1));
      dot.addEventListener('click', () => navigateTo(index));
      dots.append(dot);
    });

    function render() {
      const previousIndex = (activeIndex - 1 + cards.length) % cards.length;
      const nextIndex = (activeIndex + 1) % cards.length;

      cards.forEach((card, index) => {
        const link = card.querySelector('.project-link');
        const isActive = index === activeIndex;

        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-prev', index === previousIndex);
        card.classList.toggle('is-next', index === nextIndex);
        card.setAttribute('aria-hidden', String(!isActive));

        if (link) {
          link.tabIndex = isActive ? 0 : -1;
          const destination = card.dataset.url.trim();
          link.href = destination || '#Contact';
        }

        dots.children[index]?.setAttribute('aria-current', String(isActive));
      });

      if (counter) {
        counter.textContent = String(activeIndex + 1).padStart(2, '0')
          + ' / ' + String(cards.length).padStart(2, '0');
      }
    }

    function show(index) {
      activeIndex = (index + cards.length) % cards.length;
      render();
    }

    function canAutoplay() {
      return !prefersReducedMotion()
        && !document.hidden
        && !isHovered
        && !isFocused
        && !isInteracting;
    }

    function stopAutoplay() {
      window.clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }

    function scheduleAutoplay() {
      stopAutoplay();
      if (!canAutoplay()) return;

      autoplayTimer = window.setTimeout(() => {
        show(activeIndex + 1);
        scheduleAutoplay();
      }, autoplayDelay);
    }

    function navigateBy(offset) {
      show(activeIndex + offset);
      scheduleAutoplay();
    }

    function navigateTo(index) {
      show(index);
      scheduleAutoplay();
    }

    document.querySelector('[data-prev]')?.addEventListener('click', () => navigateBy(-1));
    document.querySelector('[data-next]')?.addEventListener('click', () => navigateBy(1));

    stage.addEventListener('pointerenter', (event) => {
      isHovered = event.pointerType !== 'touch';
      if (isHovered) stopAutoplay();
    });

    stage.addEventListener('pointerleave', () => {
      isHovered = false;
      scheduleAutoplay();
    });

    stage.addEventListener('focusin', () => {
      if (isPointerInput) return;
      isFocused = true;
      stopAutoplay();
    });

    stage.addEventListener('focusout', (event) => {
      if (isPointerInput) return;
      isFocused = stage.contains(event.relatedTarget);
      scheduleAutoplay();
    });

    document.addEventListener('keydown', (event) => {
      if (!['Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      isPointerInput = false;
      if (stage.contains(document.activeElement)) {
        isFocused = true;
        stopAutoplay();
      }
    }, true);

    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isPointerInput = true;
      isFocused = false;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      didSwipe = false;
      isInteracting = true;
      stopAutoplay();
    });

    window.addEventListener('pointerup', (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;

      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      const isHorizontalSwipe = Math.abs(deltaX) > 45
        && Math.abs(deltaX) > Math.abs(deltaY);

      pointerStart = null;
      isInteracting = false;

      if (isHorizontalSwipe) {
        didSwipe = true;
        window.setTimeout(() => { didSwipe = false; }, 0);
        navigateBy(deltaX < 0 ? 1 : -1);
      } else {
        scheduleAutoplay();
      }
    });

    window.addEventListener('pointercancel', () => {
      pointerStart = null;
      isInteracting = false;
      scheduleAutoplay();
    });

    stage.addEventListener('click', (event) => {
      if (!didSwipe) return;
      event.preventDefault();
      event.stopPropagation();
      didSwipe = false;
    }, true);

    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateBy(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateBy(-1);
      }
    });

    document.addEventListener('visibilitychange', scheduleAutoplay);
    motionQuery.addEventListener?.('change', scheduleAutoplay);

    show(0);
    scheduleAutoplay();
  }

  function initializeFaq() {
    document.querySelectorAll('.faq-question').forEach((button) => {
      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));

        const faqItem = button.closest('.faq-item');
        const panel = faqItem?.querySelector('.faq-answer');
        const controlledPanelId = button.getAttribute('aria-controls');

        if (!panel || panel.id !== controlledPanelId) return;
        panel.hidden = isExpanded;
      });
    });
  }

  function initializeBackToTop() {
    const topButton = document.getElementById('backToTop');
    if (!topButton) return;

    function updateVisibility() {
      topButton.classList.toggle('is-visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    topButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });

    updateVisibility();
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  function initializeScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  }
})();