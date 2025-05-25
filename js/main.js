// Enhanced JavaScript for OIADB Documentation Website

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeSwitch = document.getElementById('theme-switch');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const featureCards = document.querySelectorAll('.feature-card');
  const platformCards = document.querySelectorAll('.platform-card');
  const sectionTitles = document.querySelectorAll('.section-title');
  const architectureContent = document.querySelectorAll('.architecture-content');
  const header = document.querySelector('header');

  // Mobile Menu Toggle with Animation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const hamburger = menuToggle.querySelector('.hamburger');
      hamburger.classList.toggle('active');
    });
  }

  // Theme Switcher with Smooth Transition
  if (themeSwitch) {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeSwitch.checked = true;
    }
    
    // Theme switch event listener with animation
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('theme-transition');
        setTimeout(() => {
          document.body.classList.remove('theme-transition');
        }, 1000);
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.body.classList.add('theme-transition');
        setTimeout(() => {
          document.body.classList.remove('theme-transition');
        }, 1000);
      }
    });
  }

  // Enhanced Search Functionality with Animations
  if (searchInput && searchButton) {
    // Mock search data (in a real implementation, this would be generated from all pages)
    const searchData = [
      { title: 'Trang chủ', url: 'index.html', content: 'OIADB Thư viện Python wrapper cho Android Debug Bridge' },
      { title: 'Bắt đầu - Cài đặt', url: 'getting-started.html#installation', content: 'Hướng dẫn cài đặt OIADB trên các nền tảng khác nhau' },
      { title: 'Tính năng - Nhận diện hình ảnh', url: 'features.html#image-recognition', content: 'Chức năng nhận diện hình ảnh trong OIADB' },
      { title: 'Tính năng - XML Dump', url: 'features.html#xml-dump', content: 'Tính năng XML Dump và Trợ Năng trong OIADB' },
      { title: 'API Reference - MyADB', url: 'api-reference.html#myadb', content: 'Tài liệu API cho lớp MyADB' },
      { title: 'Hướng dẫn - Nhận diện hình ảnh', url: 'guides.html#image-recognition', content: 'Hướng dẫn sử dụng chức năng nhận diện hình ảnh' },
      { title: 'Ví dụ - Cơ bản', url: 'examples.html#basic', content: 'Các ví dụ cơ bản về cách sử dụng OIADB' },
      { title: 'Tài nguyên - GitHub', url: 'resources.html#github', content: 'Liên kết đến GitHub repository của OIADB' }
    ];
    
    // Search function with animation
    function performSearch(query) {
      // Clear previous results
      searchResults.innerHTML = '';
      
      if (!query.trim()) {
        searchResults.classList.remove('active');
        return;
      }
      
      // Filter search data
      const results = searchData.filter(item => {
        return (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase())
        );
      });
      
      // Display results with animation
      if (results.length > 0) {
        results.forEach((result, index) => {
          const resultItem = document.createElement('div');
          resultItem.classList.add('search-result-item');
          resultItem.style.animationDelay = `${index * 0.05}s`;
          resultItem.innerHTML = `<h4>${result.title}</h4><p>${result.content.substring(0, 100)}...</p>`;
          resultItem.addEventListener('click', () => {
            window.location.href = result.url;
          });
          searchResults.appendChild(resultItem);
        });
        searchResults.classList.add('active');
      } else {
        const noResults = document.createElement('div');
        noResults.classList.add('search-result-item');
        noResults.textContent = 'Không tìm thấy kết quả';
        searchResults.appendChild(noResults);
        searchResults.classList.add('active');
      }
    }
    
    // Search input event
    searchInput.addEventListener('input', () => {
      performSearch(searchInput.value);
    });
    
    // Search button click
    searchButton.addEventListener('click', () => {
      performSearch(searchInput.value);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
      }
    });
  }

  // Tab Functionality with Smooth Transitions
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const targetPane = document.getElementById(tabId);
        
        // Add animation class
        targetPane.style.animation = 'none';
        targetPane.offsetHeight; // Trigger reflow
        targetPane.style.animation = '';
        targetPane.classList.add('active');
      });
    });
  }

  // Copy to Clipboard Functionality with Animation
  if (copyButtons.length > 0) {
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const codeBlock = button.closest('.install-command').querySelector('code');
        const textToCopy = codeBlock.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Change icon temporarily to indicate success
          const icon = button.querySelector('i') || button;
          const originalHTML = button.innerHTML;
          button.innerHTML = '<i class="fas fa-check"></i>';
          button.classList.add('copied');
          
          // Reset icon after a short delay
          setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
          }, 2000);
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      });
    });
  }

  // Smooth Scrolling for Anchor Links with Offset for Fixed Header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced Intersection Observer for Animations
  const animateOnScroll = () => {
    const elements = [
      ...featureCards,
      ...platformCards,
      ...sectionTitles,
      ...architectureContent
    ];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach((element, index) => {
      // Add staggered animation delay
      if (element.classList.contains('feature-card') || element.classList.contains('platform-card')) {
        const delay = index % 3 * 0.1;
        element.style.transitionDelay = `${delay}s`;
      }
      observer.observe(element);
    });
  };

  // Initialize animations
  animateOnScroll();

  // Advanced Responsive Header with Hide/Show on Scroll
  let lastScrollTop = 0;
  const scrollThreshold = 100;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add box shadow when scrolled
    if (scrollTop > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksElements = document.querySelectorAll('.nav-links a');

  navLinksElements.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === './')) {
      link.classList.add('active');
    }
  });

  // Animated counter for statistics (if present)
  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // ms
      const step = target / (duration / 16); // 60fps
      
      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
      
      counterObserver.observe(counter);
    });
  };
  
  // Initialize counters if they exist
  if (document.querySelector('.counter')) {
    animateCounters();
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const parallaxElements = heroSection.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }

  // Animated typing effect for hero title (if enabled)
  const heroTitle = document.querySelector('.hero-title-animated');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    typeWriter();
  }

  // Animated progress bars (if present)
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      const progressObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          bar.style.width = percentage + '%';
          progressObserver.unobserve(bar);
        }
      });
      
      progressObserver.observe(bar);
    });
  };
  
  // Initialize progress bars if they exist
  if (document.querySelector('.progress-bar')) {
    animateProgressBars();
  }

  // Animated accordion for FAQ sections (if present)
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      
      header.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-content').style.maxHeight = '0';
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    });
  }

  // Initialize tooltips (if present)
  const tooltips = document.querySelectorAll('[data-tooltip]');
  if (tooltips.length > 0) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);
        
        const rect = tooltip.getBoundingClientRect();
        tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
        tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
        tooltipElement.classList.add('show');
      });
      
      tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
          tooltipElement.classList.remove('show');
          setTimeout(() => {
            tooltipElement.remove();
          }, 300);
        }
      });
    });
  }

  // Add animation to code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  if (codeBlocks.length > 0) {
    codeBlocks.forEach(block => {
      // Add line numbers
      const lines = block.textContent.split('\n');
      let numberedLines = '';
      
      lines.forEach((line, index) => {
        if (index < lines.length - 1 || line.trim() !== '') {
          numberedLines += `<span class="line-number">${index + 1}</span>${line}\n`;
        }
      });
      
      block.innerHTML = numberedLines;
      
      // Add animation
      const lineNumbers = block.querySelectorAll('.line-number');
      lineNumbers.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.05}s`;
      });
    });
  }

  // Initialize mobile sidebar toggle (if present)
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const docsSidebar = document.querySelector('.docs-sidebar');
  
  if (sidebarToggle && docsSidebar) {
    sidebarToggle.addEventListener('click', () => {
      docsSidebar.classList.toggle('active');
      sidebarToggle.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!docsSidebar.contains(e.target) && !sidebarToggle.contains(e.target) && docsSidebar.classList.contains('active')) {
        docsSidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
      }
    });
  }
});

// Preloader animation
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});
