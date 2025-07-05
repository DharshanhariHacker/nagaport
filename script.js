document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for project cards (existing functionality)
  const cards = document.querySelectorAll('.project-card');
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        projectObserver.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, {
    threshold: 0.3
  });
  cards.forEach(card => projectObserver.observe(card));

  // Intersection Observer for general content sections (fade-in on scroll)
  const contentSections = document.querySelectorAll('.content-section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the section is visible
  });
  contentSections.forEach(section => sectionObserver.observe(section));

  // Scroll-triggered animation for hero section and header
  const heroFlex = document.querySelector('.hero-flex');
  const heroSection = document.getElementById('hero');
  const mainHeader = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // Determine when to trigger the hero section animation
    // This threshold means the animation starts when the top of the hero section
    // is about 70% of the way up the viewport (adjust as needed)
    const heroScrollThreshold = heroHeight * 0.3; // Adjust this value

    if (scrollPosition > heroScrollThreshold) {
      heroFlex.classList.add('scrolled-out');
      mainHeader.classList.add('scrolled'); // Add class to header on scroll
    } else {
      heroFlex.classList.remove('scrolled-out');
      mainHeader.classList.remove('scrolled');
    }

    // Highlight active navigation link based on scroll position
    let currentActive = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - mainHeader.offsetHeight - 20; // Adjust for header height and a little buffer
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentActive)) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for navigation links
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1); // Get the ID without '#'
      const targetSection = document.getElementById(targetId);
      const headerOffset = mainHeader.offsetHeight; // Get header height
      const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Manually set active class for clicked link
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Initial check for active link on page load
  window.dispatchEvent(new Event('scroll'));
});
