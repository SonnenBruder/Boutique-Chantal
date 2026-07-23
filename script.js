document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-menu-toggle');
  const close = document.getElementById('mobile-menu-close');
  const nav = document.getElementById('mobile-nav');

  const setMenuOpen = (isOpen) => {
    if (!toggle || !nav) {
      return;
    }

    nav.classList.toggle('translate-x-full', !isOpen);
    nav.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('overflow-hidden', isOpen);
  };

  toggle?.addEventListener('click', () => setMenuOpen(true));
  close?.addEventListener('click', () => setMenuOpen(false));

  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  const carousel = document.querySelector('[data-collection-carousel]');

  if (carousel) {
    const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
    const indicators = [
      ...carousel.querySelectorAll('[data-carousel-indicator]'),
    ];
    const previousButton = carousel.querySelector('[data-carousel-previous]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const toggleButton = carousel.querySelector('[data-carousel-toggle]');
    const toggleIcon = carousel.querySelector('[data-carousel-toggle-icon]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let activeIndex = 0;
    let intervalId;
    let userPaused = false;
    let reducedMotionPaused = reducedMotion.matches;
    let pointerInside = false;
    let focusInside = false;
    let touchStartX = null;

    const isExplicitlyPaused = () => userPaused || reducedMotionPaused;

    const showSlide = (requestedIndex) => {
      activeIndex = (requestedIndex + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;

        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      indicators.forEach((indicator, indicatorIndex) => {
        indicator.setAttribute(
          'aria-current',
          String(indicatorIndex === activeIndex),
        );
      });
    };

    const stopCarousel = () => {
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const updateToggleButton = () => {
      if (!toggleButton || !toggleIcon) {
        return;
      }

      const paused = isExplicitlyPaused();
      const label = paused
        ? 'Automatischen Wechsel starten'
        : 'Automatischen Wechsel pausieren';

      toggleButton.setAttribute('aria-pressed', String(paused));
      toggleButton.setAttribute('aria-label', label);
      toggleButton.title = label;
      toggleIcon.textContent = paused ? 'play_arrow' : 'pause';
    };

    const startCarousel = () => {
      stopCarousel();

      if (
        isExplicitlyPaused() ||
        pointerInside ||
        focusInside ||
        document.hidden
      ) {
        return;
      }

      intervalId = window.setInterval(() => {
        showSlide(activeIndex + 1);
      }, 5000);
    };

    const selectSlide = (index) => {
      showSlide(index);
      startCarousel();
    };

    previousButton?.addEventListener('click', () => {
      selectSlide(activeIndex - 1);
    });

    nextButton?.addEventListener('click', () => {
      selectSlide(activeIndex + 1);
    });

    toggleButton?.addEventListener('click', () => {
      if (isExplicitlyPaused()) {
        userPaused = false;
        reducedMotionPaused = false;
      } else {
        userPaused = true;
      }

      updateToggleButton();
      startCarousel();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        selectSlide(index);
      });
    });

    carousel.addEventListener('pointerenter', () => {
      pointerInside = true;
      stopCarousel();
    });

    carousel.addEventListener('pointerleave', () => {
      pointerInside = false;
      startCarousel();
    });

    carousel.addEventListener('focusin', () => {
      focusInside = true;
      stopCarousel();
    });

    carousel.addEventListener('focusout', (event) => {
      if (carousel.contains(event.relatedTarget)) {
        return;
      }

      focusInside = false;
      startCarousel();
    });

    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        selectSlide(activeIndex - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        selectSlide(activeIndex + 1);
      }
    });

    carousel.addEventListener(
      'touchstart',
      (event) => {
        touchStartX = event.touches[0]?.clientX ?? null;
      },
      { passive: true },
    );

    carousel.addEventListener(
      'touchend',
      (event) => {
        if (touchStartX === null) {
          return;
        }

        const touchEndX = event.changedTouches[0]?.clientX;

        if (touchEndX === undefined) {
          touchStartX = null;
          return;
        }

        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) >= 50) {
          selectSlide(distance > 0 ? activeIndex - 1 : activeIndex + 1);
        }

        touchStartX = null;
      },
      { passive: true },
    );

    document.addEventListener('visibilitychange', () => {
      startCarousel();
    });

    reducedMotion.addEventListener('change', (event) => {
      reducedMotionPaused = event.matches;
      updateToggleButton();
      startCarousel();
    });

    showSlide(0);
    updateToggleButton();
    startCarousel();
  }

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (!header) {
      return;
    }

    if (window.scrollY > 50) {
      header.classList.add('py-unit-xs', 'shadow-sm');
      header.classList.remove('py-unit-sm');
    } else {
      header.classList.remove('py-unit-xs', 'shadow-sm');
      header.classList.add('py-unit-sm');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
  });

  const reviewCarousel = document.querySelector('[data-review-carousel]');

  if (reviewCarousel) {
    const viewport = reviewCarousel.querySelector('[data-review-viewport]');
    const scrollingSpeed = 70;
    const reviewTextLimit = 220;

    const truncateReviewText = (text) => {
      const normalizedText = text.replace(/\s+/g, ' ').trim();

      if (normalizedText.length <= reviewTextLimit) {
        return normalizedText;
      }

      const shortenedText = normalizedText.slice(0, reviewTextLimit);
      const lastCompleteWord = shortenedText.lastIndexOf(' ');

      return `${shortenedText.slice(0, lastCompleteWord).trimEnd()} [...]`;
    };

    const createReviewCard = (review) => {
      const rating = Math.min(
        5,
        Math.max(1, Math.round(Number(review.rating) || 5)),
      );

      const card = document.createElement('figure');
      card.className = 'review-card';

      const stars = document.createElement('div');
      stars.className = 'mb-unit-sm text-xl tracking-wider text-secondary';
      stars.setAttribute('aria-label', `${rating} von 5 Sternen`);
      stars.setAttribute('role', 'img');

      const starCharacters = document.createElement('span');
      starCharacters.setAttribute('aria-hidden', 'true');
      starCharacters.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);

      const quote = document.createElement('blockquote');
      quote.className =
        'mb-unit-md flex-1 font-body text-body leading-relaxed text-on-surface-variant';
      const fullReviewText = review.text.replace(/\s+/g, ' ').trim();
      const visibleReviewText = truncateReviewText(fullReviewText);

      quote.textContent = `„${visibleReviewText}“`;
      quote.title = fullReviewText;
      quote.setAttribute('aria-label', fullReviewText);

      const caption = document.createElement('figcaption');
      caption.className = 'mb-unit-sm';

      const reviewerName = document.createElement('p');
      reviewerName.className =
        'font-label-md text-lg font-semibold leading-tight text-primary';
      reviewerName.textContent = review.name;

      caption.append(reviewerName);

      if (review.note) {
        const note = document.createElement('span');
        note.className =
          'mt-unit-xs inline-flex w-fit rounded-full bg-primary px-unit-sm py-unit-xs text-xs font-label-sm text-on-primary';
        note.textContent = review.note;

        caption.append(note);
      }

      const reviewSource = document.createElement('p');
      reviewSource.className =
        'border-t border-pearl pt-unit-sm font-label-sm text-on-surface-variant';
      reviewSource.textContent = review.date
        ? `Google Bewertung · ${review.date}`
        : 'Google Bewertung';

      stars.append(starCharacters);
      card.append(caption, stars, quote, reviewSource);

      return card;
    };

    const startReviewMarquee = () => {
      const originalCards = [...viewport.querySelectorAll('.review-card')];

      if (!originalCards.length) {
        return;
      }

      let cycleWidth = 0;
      let previousTimestamp;
      let isHovered = false;

      const clonedCards = originalCards.map((card) => {
        const clone = card.cloneNode(true);

        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('data-review-clone', '');
        clone.inert = true;

        viewport.append(clone);

        return clone;
      });

      const measureCycle = () => {
        if (!clonedCards.length) {
          return;
        }

        cycleWidth = clonedCards[0].offsetLeft - originalCards[0].offsetLeft;
      };

      const autoScroll = (timestamp) => {
        if (previousTimestamp === undefined) {
          previousTimestamp = timestamp;
        }

        const elapsedMilliseconds = Math.min(timestamp - previousTimestamp, 64);

        previousTimestamp = timestamp;

        if (!isHovered && !document.hidden && cycleWidth > 0) {
          viewport.scrollLeft += scrollingSpeed * (elapsedMilliseconds / 1000);

          if (viewport.scrollLeft >= cycleWidth) {
            viewport.scrollLeft -= cycleWidth;
          }
        }

        window.requestAnimationFrame(autoScroll);
      };

      viewport.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      viewport.addEventListener('mouseleave', () => {
        isHovered = false;
      });

      window.addEventListener('resize', () => {
        window.requestAnimationFrame(measureCycle);
      });

      measureCycle();
      window.requestAnimationFrame(autoScroll);
    };

    const loadReviews = async () => {
      try {
        const response = await fetch('./assets/GoogleReviews.json', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error(`Could not load reviews: HTTP ${response.status}`);
        }

        const reviews = await response.json();

        if (!Array.isArray(reviews) || reviews.length === 0) {
          throw new Error('reviews.json contains no reviews.');
        }

        const validReviews = reviews.filter(
          (review) =>
            typeof review.name === 'string' &&
            typeof review.text === 'string' &&
            review.name.trim() !== '' &&
            review.text.trim() !== '',
        );

        if (validReviews.length === 0) {
          throw new Error('reviews.json contains no valid reviews.');
        }

        viewport.replaceChildren(...validReviews.map(createReviewCard));
        viewport.setAttribute('aria-busy', 'false');

        startReviewMarquee();
      } catch (error) {
        console.error(error);

        viewport.setAttribute('aria-busy', 'false');

        const status = viewport.querySelector('[data-review-status]');

        if (status) {
          status.textContent = 'Die Bewertungen konnten nicht geladen werden.';
        }
      }
    };

    loadReviews();
  }
});
