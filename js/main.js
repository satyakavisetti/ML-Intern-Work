document.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.reading-progress');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const sidebar = document.querySelector('.sidebar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const overlay = document.querySelector('.overlay');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('.search-results');
  const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-link'));
  const contentSections = Array.from(document.querySelectorAll('.section-block[id]'));
  const codeBlocks = Array.from(document.querySelectorAll('.code-block'));

  const pages = [
    { href: 'index.html', label: 'Home', keywords: ['home', 'overview', 'introduction', 'clustering'] },
    { href: 'introduction/index.html', label: 'Introduction', keywords: ['introduction', 'machine learning', 'unsupervised', 'overview'] },
    { href: 'kmeans/index.html', label: 'K-Means', keywords: ['k means', 'kmeans', 'centroid', 'partition'] },
    { href: 'gmm/index.html', label: 'GMM', keywords: ['gmm', 'gaussian mixture', 'soft clustering', 'em'] },
    { href: 'dbscan/index.html', label: 'DBSCAN', keywords: ['dbscan', 'density', 'noise', 'eps'] },
    { href: 'hierarchical/index.html', label: 'Hierarchical', keywords: ['hierarchical', 'dendrogram', 'linkage', 'agglomerative'] },
    { href: 'comparison.html', label: 'Comparison', keywords: ['comparison', 'compare', 'algorithms', 'choose'] },
    { href: 'references.html', label: 'References', keywords: ['references', 'resources', 'study'] }
  ];

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(percent, 100)}%`;
  };

  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('show', window.scrollY > 600);
  };

  const toggleSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.toggle('open');
    overlay?.classList.toggle('active', sidebar.classList.contains('open'));
  };

  const closeSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    overlay?.classList.remove('active');
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('docs-theme', theme);
    themeToggle && (themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙');
  };

  const initTheme = () => {
    // Force dark theme on load to ensure gradient dark background and surfaces
    // This overrides any previously stored light preference so the UI matches the
    // Gradient-style dark-first design. Users can still toggle and persist a choice.
    applyTheme('dark');
  };

  const highlightActiveLink = () => {
    const hash = window.location.hash.slice(1);
    sidebarLinks.forEach((link) => link.classList.remove('active'));

    if (hash) {
      const matchingLink = sidebarLinks.find((link) => link.getAttribute('href')?.includes(`#${hash}`));
      if (matchingLink) matchingLink.classList.add('active');
      return;
    }

    const path = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
    sidebarLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const target = href.split('/').filter(Boolean).pop() || 'index.html';
      if (target === path) {
        link.classList.add('active');
      }
    });
  };

  const highlightScrollSpy = () => {
    const current = contentSections.findLast((section) => section.offsetTop <= window.scrollY + 120);
    sidebarLinks.forEach((link) => link.classList.remove('active'));
    if (current) {
      const targetLink = sidebarLinks.find((link) => link.getAttribute('href')?.includes(`#${current.id}`));
      if (targetLink) targetLink.classList.add('active');
    } else {
      highlightActiveLink();
    }
  };

  const filterSidebar = (query) => {
    const value = query.toLowerCase().trim();
    sidebarLinks.forEach((link) => {
      const label = link.textContent.toLowerCase();
      const match = label.includes(value);
      link.style.display = match || !value ? 'block' : 'none';
    });
  };

  const showSearchResults = (query) => {
    if (!searchResults) return;
    const value = query.toLowerCase().trim();
    if (!value) {
      searchResults.innerHTML = '';
      searchResults.classList.remove('show');
      return;
    }
    const matches = pages.filter((page) =>
      page.label.toLowerCase().includes(value) || page.keywords.some((word) => word.includes(value) || value.includes(word))
    );
    searchResults.innerHTML = matches.length
      ? matches.map((page) => `<a class="search-result" href="${page.href}">${page.label}</a>`).join('')
      : '<div class="search-result">No results found</div>';
    searchResults.classList.toggle('show', matches.length > 0);
  };

  const addCopyButtons = () => {
    codeBlocks.forEach((block) => {
      if (block.querySelector('.copy-btn')) return;
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.type = 'button';
      button.textContent = 'Copy';
      button.addEventListener('click', async () => {
        const code = block.querySelector('code')?.innerText || block.querySelector('pre')?.innerText || '';
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 1400);
      });
      block.appendChild(button);
    });
  };

  const handleKeyboardNav = (event) => {
    if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      searchInput?.focus();
    }
  };

  window.addEventListener('scroll', () => {
    updateProgress();
    toggleScrollTop();
    highlightScrollSpy();
  });

  window.addEventListener('hashchange', highlightActiveLink);
  window.addEventListener('resize', closeSidebar);
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  mobileToggle?.addEventListener('click', toggleSidebar);
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        closeSidebar();
      }
    });
  });
  overlay?.addEventListener('click', closeSidebar);
  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(current);
  });
  searchInput?.addEventListener('input', (event) => {
    filterSidebar(event.target.value);
    showSearchResults(event.target.value);
  });
  document.addEventListener('keydown', handleKeyboardNav);

  initTheme();
  updateProgress();
  toggleScrollTop();
  highlightActiveLink();
  filterSidebar('');
  addCopyButtons();
});
