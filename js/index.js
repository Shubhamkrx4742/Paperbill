document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    document.querySelector('.floating-btn').addEventListener('click', function() {
  // Add your download functionality here
  window.location.href = '#download'; // or your download link
});

    const industryFilters = document.querySelectorAll('.industry-filter');
    const industryContents = document.querySelectorAll('.industry-content');
    
    industryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            industryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            industryContents.forEach(content => content.classList.remove('active'));
            const industry = this.getAttribute('data-industry');
            document.querySelector(`.industry-content[data-industry="${industry}"]`).classList.add('active');
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }
    
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => showToast('Download started! Check your downloads folder.'));
    }
    
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => showToast('Opening demo video...'));
    }
    
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = document.getElementById('newsletterEmail').value;
            if (!email) {
                showToast('Please enter your email address', true);
                return;
            }
            showToast('Thank you for subscribing to our newsletter!');
            document.getElementById('newsletterEmail').value = '';
        });
    }
    
    const ratingStars = document.querySelectorAll('.rating-stars i');
    let selectedRating = 0;
    
    if (ratingStars.length) {
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => {
                ratingStars.forEach(s => {
                    s.classList.remove('fas');
                    s.classList.add('far');
                });
                for (let i = 0; i <= index; i++) {
                    ratingStars[i].classList.remove('far');
                    ratingStars[i].classList.add('fas');
                }
                selectedRating = index + 1;
            });
        });
        
        
        document.getElementById('submitRating').addEventListener('click', () => {
            if (selectedRating === 0) {
                showToast('Please select a rating before submitting', true);
                return;
            }
            showToast(`Thank you for your ${selectedRating}-star rating!`);
            document.getElementById('ratingPopup').classList.remove('show');
            selectedRating = 0;
        });
        
        document.getElementById('closeRating').addEventListener('click', () => {
            document.getElementById('ratingPopup').classList.remove('show');
        });
        
        setTimeout(() => document.getElementById('ratingPopup').classList.add('show'), 10000);
    }
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .industry-row, .testimonial-card, .gallery-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(element => observer.observe(element));
    };
    
    animateOnScroll();
});