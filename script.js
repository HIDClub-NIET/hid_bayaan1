const yearSpan = document.getElementById('year');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const observerOptions = { threshold: 0.1 }; 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        nav.style.padding = '0 20px';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.85)';
        nav.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.05)';
        nav.style.padding = '0 30px';
    }
});

const hamburger = document.getElementById('hamburgerMenu');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('ri-menu-4-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-4-line');
        }
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('ri-close-line');
            hamburger.querySelector('i').classList.add('ri-menu-4-line');
        });
    });
}

const track = document.querySelector('.testimonial-track');
const slides = document.querySelectorAll('.t-slide');
let slideIndex = 0;

if (track && slides.length > 0) {
    function slideTestimonials() {
        slideIndex++;
        if (slideIndex >= slides.length) slideIndex = 0;
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    setInterval(slideTestimonials, 5000);
}

const modal = document.getElementById('eventModal');
const cards = document.querySelectorAll('.event-item');
const closeBtn = document.querySelector('.close');
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if(cards.length > 0) {
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const eventKey = card.getAttribute('data-event');
            
            if(eventKey) {
                const titleText = eventKey.charAt(0).toUpperCase() + eventKey.slice(1);
                document.getElementById('modalTitle').innerText = titleText;
                
                const oldImages = carousel.querySelectorAll('img');
                oldImages.forEach(img => img.remove());
                
                if(eventData[eventKey]) {
                    eventData[eventKey].forEach((src, i) => {
                        const img = document.createElement('img');
                        img.src = src;
                        img.style.display = i === 0 ? 'block' : 'none';
                        carousel.insertBefore(img, carousel.querySelector('.carouselControls'));
                    });
                    
                    modal.style.display = 'flex';
                } else {
                    console.log("No images found for: " + eventKey);
                }
            }
        });
    });
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

if(prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => navigateCarousel(-1));
    nextBtn.addEventListener('click', () => navigateCarousel(1));
}

function navigateCarousel(direction) {
    const images = carousel.querySelectorAll('img');
    if(images.length === 0) return;
    
    let visibleIndex = -1;
    images.forEach((img, i) => {
        if(img.style.display === 'block') visibleIndex = i;
        img.style.display = 'none';
    });
    
    let newIndex = visibleIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    images[newIndex].style.display = 'block';
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });
  navLi.forEach((li) => {
    li.classList.remove("active-link");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active-link");
    }
  });
});
