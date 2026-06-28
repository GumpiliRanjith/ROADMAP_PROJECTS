/* ==========================================================================
   1. Scroll Animations (Intersection Observer)
   ========================================================================== */
// Select all elements with the animation classes
const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

// Create the observer
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS transition
            entry.target.classList.add('show');
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

// Attach observer to each element
animatedElements.forEach(el => scrollObserver.observe(el));

/* ==========================================================================
   2. Typing Effect
   ========================================================================== */
const typingTextElement = document.querySelector('.typing-text');
// Terms tailored to your stack
const typingWords = [
    "Intelligent Systems", 
    "Cloud Infrastructure", 
    "Machine Learning Models", 
    "CI/CD Pipelines"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = typingWords[wordIndex];
    
    if (isDeleting) {
        // Remove a character
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add a character
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine typing speed
    let typeSpeed = isDeleting ? 50 : 100;

    // Pause at the end of a word
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Wait 2 seconds before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect
document.addEventListener('DOMContentLoaded', () => {
    if(typingTextElement) setTimeout(typeEffect, 1000);
});

/* ==========================================================================
   3. Dynamic Background (Particle Network)
   ========================================================================== */
const canvas = document.createElement('canvas');
document.getElementById('bg-canvas').appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height, particles;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 202, 245, 0.5)'; // Matches --accent-color
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    // Adjust particle count based on screen size for performance
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(192, 202, 245, ${0.15 - distance / 800})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

// Setup canvas
window.addEventListener('resize', () => {
    resize();
    initParticles();
});
resize();
initParticles();
animateParticles();

/* ==========================================================================
   4. Glass Navbar Scroll Effect
   ========================================================================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 10, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(5, 5, 10, 0.7)';
        navbar.style.boxShadow = 'none';
    }
});
/* ==========================================================================
   5. Mobile Hamburger Menu
   ========================================================================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');
const hamburgerIcon = document.querySelector('.hamburger i');

// Toggle menu open/close
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Switch icon between bars and X
    if (navLinks.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
});