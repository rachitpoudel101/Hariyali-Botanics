// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  const mobileIcon = toggle?.querySelector('i');
  
  if (toggle && menu && mobileIcon) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('active');
      
      // Change icon
      if (mobileIcon.classList.contains('fa-bars')) {
        mobileIcon.classList.remove('fa-bars');
        mobileIcon.classList.add('fa-times');
      } else {
        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');
      }
    });
  }

  // Mobile dropdown toggles
  const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle content visibility
      content.classList.toggle('hidden');
      
      // Animate icon
      if (icon.classList.contains('fa-plus')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
  });
  
  // ===== IMPROVED NAVBAR SCROLL BEHAVIOR =====
  const nav = document.querySelector('nav');
  let lastScrollTop = 0;
  let scrollTimer = null;
  
  if (nav) {
    // Add smooth transitions
    nav.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const mobileMenuOpen = menu && menu.classList.contains('active');
      
      // Always show navbar if mobile menu is open
      if (mobileMenuOpen) {
        nav.style.transform = 'translateY(0)';
        return;
      }
      
      // Clear any existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Add scrolled styling when past threshold
      if (scrollTop > 50) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
      
      // Only hide navbar if scrolling down significantly and past a good threshold
      if (scrollTop > 400 && scrollTop > lastScrollTop + 10) {
        // Scrolling DOWN significantly - hide navbar
        nav.style.transform = 'translateY(-100%)';
        
        // Set timer to show navbar after stopping scroll
        scrollTimer = setTimeout(() => {
          nav.style.transform = 'translateY(0)';
        }, 1500);
        
      } else if (scrollTop < lastScrollTop - 10 || scrollTop <= 150) {
        // Scrolling UP or near top - show navbar
        nav.style.transform = 'translateY(0)';
        
        // Clear the timer since we're showing it manually
        if (scrollTimer) {
          clearTimeout(scrollTimer);
          scrollTimer = null;
        }
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Show navbar when mouse approaches top of screen
    document.addEventListener('mousemove', function(e) {
      if (e.clientY < 80) {
        nav.style.transform = 'translateY(0)';
      }
    }, { passive: true });
    
    // Add CSS for navbar styles
    if (!document.querySelector('#navbar-scroll-styles')) {
      const style = document.createElement('style');
      style.id = 'navbar-scroll-styles';
      style.textContent = `
        .nav-scrolled {
          background-color: rgba(255, 255, 255, 0.98) !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        
        .visible-dropdown {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Keyboard navigation for accessibility
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const navLink = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (navLink && dropdown) {
      navLink.addEventListener('keydown', function(e) {
        // Open dropdown on Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dropdown.classList.add('visible-dropdown');
          
          // Focus first link in dropdown
          const firstLink = dropdown.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      });
      
      // Close dropdown when Tab out
      item.addEventListener('focusout', function(e) {
        if (!item.contains(e.relatedTarget)) {
          dropdown.classList.remove('visible-dropdown');
        }
      });
    }
  });
  
  // Close all dropdowns on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.visible-dropdown').forEach(el => {
        el.classList.remove('visible-dropdown');
      });
    }
  });
});