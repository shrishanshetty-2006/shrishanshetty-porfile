document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  
  // Set default theme or saved preference
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
  });

  // --- Sticky Header on Scroll ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');
  
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change menu icon
    const icon = menuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      icon.className = 'fa-solid fa-bars';
    });
  });

  // --- Typewriter Effect ---
  const words = [
    "Google Cloud Platform (GCP)",
    "Amazon Web Services (AWS)",
    "Microsoft Azure",
    "Monitoring & Alerts Setup",
    "MySQL Database Admin",
    "Systems Administration"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  
  // Start the typing animation
  if (typedTextSpan) {
    type();
  }

  // --- Intersection Observer: Fade In Elements ---
  const fadeUpElements = document.querySelectorAll('.fade-up');
  
  const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeUpElements.forEach(el => fadeUpObserver.observe(el));

  // --- Skill Bars Animation Observer ---
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  if (skillSection) {
    skillsObserver.observe(skillSection);
  }

  // --- Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 250)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // --- Contact Form Submission & Validation ---
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-msg');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill out all fields.';
        return;
      }
      
      // Simulate form submission success
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you, Shrishan! Your message has been sent successfully. (Simulation)';
      contactForm.reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    });
  }

  // --- Dynamic Year in Footer ---
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
