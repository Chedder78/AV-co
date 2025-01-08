// Ensure DOM is fully loaded before applying effects
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('DOMContentLoaded', () => {
  const parallaxElements = document.querySelectorAll('.parallax-flip');

  let lastScrollY = window.scrollY;

  // IntersectionObserver to manage in-view state
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        if (entry.isIntersecting) {
          element.classList.add('in-view'); // Add class when in view
        } else {
          element.classList.remove('in-view'); // Remove class when out of view
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the element is visible
  );

  parallaxElements.forEach((element) => observer.observe(element));

  // Scroll event to control flipping
  document.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    parallaxElements.forEach((element) => {
      if (element.classList.contains('in-view')) {
        const speed = 0.5; // Flip speed multiplier
        const direction = currentScrollY > lastScrollY ? 1 : -1; // Determine scroll direction
        let rotation = parseFloat(element.dataset.rotation || 0) + direction * speed;

        // Apply rotation limits (e.g., max flip 360 degrees)
        rotation = Math.max(-360, Math.min(360, rotation));

        // Apply 3D transform for flipping
        element.style.transform = `rotateX(${rotation}deg) translateZ(-50px)`;
        element.dataset.rotation = rotation; // Save current rotation state
      }
    });

    lastScrollY = currentScrollY; // Update last scroll position
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

// Lazy Loading Portfolio Images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('.portfolio-item img');

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
    { threshold: 0.2 } // Load images when 20% visible
  );

  lazyImages.forEach((img) => lazyObserver.observe(img));
});

// Portfolio Card Flip on Hover
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('flipped');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('flipped');
  });
});


