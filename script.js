// Get the navigation links and the hamburger menu
const navLinks = document.querySelectorAll('nav ul li a');
const hamburger = document.querySelector('.hamburger');

// Add event listener to each navigation link
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Prevent default link behavior
    event.preventDefault();

    // Get the target section from the href attribute of the link
    const target = document.querySelector(link.getAttribute('href'));

    // Scroll to the target section
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add event listener to the hamburger menu
hamburger.addEventListener('click', () => {
  // Toggle the "active" class on the hamburger menu and the navigation menu
  hamburger.classList.toggle('active');
  document.querySelector('nav ul').classList.toggle('active');
});
// Get the "Learn More" button
const learnMoreBtn = document.querySelector('.hero .btn');

// Add event listener to the "Learn More" button
learnMoreBtn.addEventListener('click', () => {
  // Redirect to the "About" page
  window.location.href = 'about.html';
});
