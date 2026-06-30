window.tailwind = window.tailwind || {};

window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'secondary-fixed-dim': '#e9c178',
        'on-secondary-fixed': '#271900',
        'secondary-fixed': '#ffdea5',
        'surface-container-high': '#f0e6e5',
        'surface-container-highest': '#eae0e0',
        'error-container': '#ffdad6',
        'on-secondary-fixed-variant': '#5d4202',
        champagne: '#F5ECE0',
        'surface-variant': '#eae0e0',
        'outline-variant': '#dbc0c2',
        'on-primary-container': '#ff919e',
        'tertiary-container': '#3a4733',
        'surface-dim': '#e1d8d7',
        'on-primary': '#ffffff',
        'on-primary-fixed': '#400010',
        'primary-fixed': '#ffdadc',
        'inverse-on-surface': '#f8eeee',
        'on-tertiary-container': '#a7b59b',
        'on-error-container': '#93000a',
        secondary: '#775a1a',
        'on-surface': '#1f1b1b',
        'surface-container': '#f6eceb',
        'on-tertiary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-primary-fixed-variant': '#7f2737',
        ivory: '#FFFDF8',
        'surface-container-low': '#fbf1f1',
        'secondary-container': '#fed489',
        outline: '#887273',
        'on-tertiary-fixed': '#131f0d',
        error: '#ba1a1a',
        surface: '#fff8f7',
        'primary-container': '#7b2434',
        'tertiary-fixed': '#d8e7cb',
        'surface-tint': '#9e3e4d',
        'inverse-primary': '#ffb2b9',
        'surface-bright': '#fff8f7',
        'on-tertiary-fixed-variant': '#3e4a36',
        'on-error': '#ffffff',
        'primary-fixed-dim': '#ffb2b9',
        clay: '#A65F45',
        rose: '#B76E79',
        'on-secondary-container': '#785a1b',
        'on-surface-variant': '#554243',
        'on-background': '#1f1b1b',
        'inverse-surface': '#342f2f',
        'surface-container-lowest': '#ffffff',
        tertiary: '#25311e',
        primary: '#5d0c1f',
        pearl: '#E8DED2',
        'tertiary-fixed-dim': '#bccbb0',
        background: '#fff8f7',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'reading-max': '680px',
        'section-padding-mobile': '32px',
        'section-padding-desktop': '64px',
        'unit-xs': '4px',
        'unit-lg': '48px',
        'gutter-mobile': '16px',
        'container-max': '1180px',
        'unit-md': '24px',
        'gutter-tablet': '20px',
        'gutter-desktop': '24px',
        'unit-xl': '96px',
        'unit-sm': '12px',
      },
      fontFamily: {
        lead: ['"Source Sans 3"'],
        'page-h1-mobile': ['Cormorant Garamond'],
        'label-md': ['"Source Sans 3"'],
        'label-sm': ['"Source Sans 3"'],
        'headline-sm': ['Cormorant Garamond'],
        'headline-md': ['Cormorant Garamond'],
        'page-h1': ['Cormorant Garamond'],
        'hero-h1': ['Cormorant Garamond'],
        'hero-h1-mobile': ['Cormorant Garamond'],
        body: ['"Source Sans 3"'],
      },
      fontSize: {
        lead: ['21px', { lineHeight: '30px', fontWeight: '400' }],
        'page-h1-mobile': ['34px', { lineHeight: '38px', fontWeight: '600' }],
        'label-md': ['16px', { lineHeight: '20px', fontWeight: '700' }],
        'label-sm': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'headline-sm': ['24px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-md': ['36px', { lineHeight: '40px', fontWeight: '600' }],
        'page-h1': ['52px', { lineHeight: '54px', fontWeight: '600' }],
        'hero-h1': ['64px', { lineHeight: '64px', fontWeight: '600' }],
        'hero-h1-mobile': ['38px', { lineHeight: '42px', fontWeight: '600' }],
        body: ['17px', { lineHeight: '28px', fontWeight: '400' }],
      },
    },
  },
};

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
});