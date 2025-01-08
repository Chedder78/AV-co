// Ensure DOM is fully loaded before applying effects
document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  const cards = document.querySelectorAll('.card');
  let lastScrollY = window.scrollY;

  // Handle parallax scrolling with different speeds
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.3; // Adjust speed multiplier for each layer
      const offset = scrollPosition * speed;
      element.style.transform = `translateY(${offset}px)`;
    });

    lastScrollY = scrollPosition;
  });

  // Lazy Loading for Portfolio Images
  const lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src'); // Load the image
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

  // Handle portfolio card flip on hover
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('flipped');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('flipped');
    });

    // Add click-to-flip functionality for touch devices
    card.addEventListener('click', () => {
      card.querySelector('.card-inner').classList.toggle('flipped');
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
});

document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});


