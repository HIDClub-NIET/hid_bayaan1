document.querySelectorAll('#nav a, #heroRightText a, #ourTeamButton button a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Chat gpt

const events = {
    bayaan: {
        title: "BAYAAN",
        description: "An inspiring talk that brought the HID Club members together.",
        images: [
            "./Bayaan/bayaan1.jpg",
            "./Bayaan/bayaan2.png",
            "./Bayaan/bayaan1.jpg",
            "./Bayaan/bayaan2.png",
        ],
    },
    concord: {
        title: "CONCORD 2024",
        description: "A thrilling event that showcased unity and collaboration.",
        images: [
            "./Concord/concord1.jpg",
            "./Concord/concord2.jpg",
            "./Concord/concord3.jpg",
            "./Concord/concord4.jpg",
        ],
    },
    festaPhoenix: {
        title: "FESTA PHOENIX 2",
        description: "A celebration of growth, renewal, and unity.",
        images: [
            "./FestaPhoenix/festaPheonix1.jpg",
            "./FestaPhoenix/festaPheonix2.jpg",
            "./FestaPhoenix/festaPheonix3.jpg",
            "./FestaPhoenix/festaPheonix1.jpg",
        ],
    },
    jugnu: {
        title: "JUGNU",
        description: "A night of creativity and artistic expression among members.",
        images: [
            "./Jugnu/jugnu1.jpg",
            "./Jugnu/jugnu2.jpg",
            "./Jugnu/jugnu3.jpg",
            "./Jugnu/jugnu1.jpg",
        ],
    },
    pieceOfPeace: {
        title: "Piece of Peace",
        description: "An event focused on mindfulness and mental peace.",
        images: [
            "./PieceOfPeace/pictieceOfPeace1.jpg",
            "./PieceOfPeace/pictieceOfPeace1.jpg",
            "./PieceOfPeace/pictieceOfPeace1.jpg",
            "./PieceOfPeace/pictieceOfPeace1.jpg",
        ],
    },
    talaash: {
        title: "Talaash",
        description: "A journey of self-discovery and personal growth.",
        images: [
            "./Talaash/talaash1.jpg",
            "./Talaash/talaash2.jpg",
            "./Talaash/talaash1.jpg",
            "./Talaash/talaash2.jpg",
        ],
    },
    tranquilTouch: {
        title: "Tranquil Touch",
        description: "A relaxing event dedicated to self-care practices.",
        images: [
            "./Tranquil/tranquil1.jpg",
            "./Tranquil/tranquil1.jpg",
            "./Tranquil/tranquil1.jpg",
            "./Tranquil/tranquil1.jpg",
        ],
    },
    udaan: {
        title: "Udaan",
        description: "An event celebrating dreams and aspirations.",
        images: [
            "./Udaan/udaan1.jpg",
            "./Udaan/udaan2.jpg",
            "./Udaan/udaan1.jpg",
            "./Udaan/udaan2.jpg",
        ],
    },
};

const modals = document.querySelectorAll('.modal');
const cards = document.querySelectorAll('.eventCard');
const closeButtons = document.querySelectorAll('.close');
const prevButtons = document.querySelectorAll('.prev');
const nextButtons = document.querySelectorAll('.next');

cards.forEach((card, index) => {
    card.querySelector('.viewGallery').addEventListener('click', () => {
        // Show the corresponding modal
        modals[index].style.display = 'block';
        // Set the title and description
        const title = card.querySelector('h2').innerText;
        const description = card.querySelector('.eventDescription').innerText;

        // Update modal title and description
        document.getElementById(`modalTitle${index + 1}`).innerText = title;
        document.getElementById(`modalDescription${index + 1}`).innerText = description;

        // Reset image display logic
        resetCarousel(index);
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        modals[index].style.display = 'none';
    });
});

function resetCarousel(index) {
    const images = modals[index].querySelectorAll('.carouselImage');
    images.forEach((image, imgIndex) => {
        image.style.display = imgIndex === 0 ? 'block' : 'none'; // Show the first image
    });
}

prevButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        changeImage(index, -1);
    });
});

nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        changeImage(index, 1);
    });
});

function changeImage(index, direction) {
    const images = modals[index].querySelectorAll('.carouselImage');
    let currentIndex = Array.from(images).findIndex(img => img.style.display === 'block');
    images[currentIndex].style.display = 'none'; // Hide current image
    currentIndex = (currentIndex + direction + images.length) % images.length; // Update index
    images[currentIndex].style.display = 'block'; // Show new image
}

// Click outside modal to close it
window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Open Modal Function
function openModal(eventKey) {
    const event = events[eventKey];
    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalDescription').innerText = event.description;

    const carouselImages = document.querySelectorAll('.carouselImage');
    carouselImages.forEach((img, index) => {
        img.src = event.images[index];
        img.alt = `Image for ${event.title}`;
    });

    document.getElementById('eventModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block'; // Show overlay
    document.body.classList.add('modal-open'); // Prevent body scrolling
}

// Close Modal Function
function closeModal() {
    document.getElementById('eventModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none'; // Hide overlay
    document.body.classList.remove('modal-open'); // Allow body scrolling again
}

let currentTestimonial = 0; // Index of the current testimonial
const testimonials = document.querySelectorAll('.testimonialCard'); // Get all testimonial cards
const totalTestimonials = testimonials.length; // Total number of testimonials
const testimonialContainer = document.querySelector('.testimonialContainer');

// Initialize the first testimonial to be shown
showTestimonial(0);

// Function to show the testimonial based on index
function showTestimonial(index) {
    // Update the transform property to slide to the correct testimonial
    testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
}

// Event listener for the Next button
document.getElementById('nextButton').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials; // Increment index with wrap-around
    showTestimonial(currentTestimonial); // Show the updated testimonial
});

// Event listener for the Previous button
document.getElementById('prevButton').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials; // Decrement index with wrap-around
    showTestimonial(currentTestimonial); // Show the updated testimonial
});

// Initialize the first testimonial
showTestimonial(currentTestimonial);

window.onscroll = function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Adjust this value to control when the background changes
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

document.getElementById('hamburgerMenu').addEventListener('click', function() {
    var nav = document.getElementById('nav');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
});