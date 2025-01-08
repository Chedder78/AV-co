// Ensure DOM is fully loaded before applying effects
document.addEventListener('DOMContentLoaded', () => {
  // Parallax Flipping on Scroll
  const parallaxElements = document.querySelectorAll('.parallax-flip');
  const floatingContents = document.querySelectorAll('.floating-content');

  document.addEventListener('scroll', () => {
    const scrollOffset = window.scrollY;
    const windowHeight = window.innerHeight;

    parallaxElements.forEach((element, index) => {
      // Rotate the background with a flipping effect based on scroll
      const rotation = scrollOffset * 0.2 - index * 50;
      element.style.transform = `rotateY(${rotation}deg)`;

      // Handle floating content fade-in/out based on scroll position
      const rect = element.getBoundingClientRect();
      const floatingContent = element.querySelector('.floating-content');

      if (rect.top < windowHeight && rect.bottom > 0) {
        floatingContent.style.opacity = 1; // Fade in
        floatingContent.style.transform = 'translate(-50%, -50%) scale(1)';
      } else {
        floatingContent.style.opacity = 0; // Fade out
        floatingContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
      }
    });
  });

  // Responsive Menu for Smaller Screens
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.createElement('button');
  navToggle.classList.add('nav-toggle');
  navToggle.innerText = '☰'; // Hamburger menu icon
  document.querySelector('.glass-header').appendChild(navToggle);

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Toggle visibility of nav menu
    navToggle.classList.toggle('open'); // Change icon to close if menu is active
    navToggle.innerText = navMenu.classList.contains('active') ? '✖' : '☰';
  });

  // Smooth Scroll for Anchor Links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Responsive Scaling for Parallax Sections
  const resizeObserver = new ResizeObserver(() => {
    parallaxElements.forEach((element) => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      element.style.height = aspectRatio > 1.5 ? '300px' : '200px';
    });
  });
  resizeObserver.observe(document.body);

  // Lazy Loading for Portfolio Images
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  const lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src'); // Replace with actual image URL
          lazyObserver.unobserve(img); // Stop observing once loaded
        }
      });
    },
    { threshold: 0.2 }
  );

  portfolioImages.forEach((img) => {
    img.setAttribute('data-src', img.src); // Set lazy-loading attribute
    img.src = ''; // Clear initial src
    lazyObserver.observe(img);
  });
});

