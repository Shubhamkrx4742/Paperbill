// Index page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scrolling for Navigation Links
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
    
    // Industry Filter Functionality
    const industryFilters = document.querySelectorAll('.industry-filter');
    const industryContents = document.querySelectorAll('.industry-content');
    
    industryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            industryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Hide all content
            industryContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding content
            const industry = this.getAttribute('data-industry');
            const contentToShow = document.querySelector(`.industry-content[data-industry="${industry}"]`);
            if (contentToShow) {
                contentToShow.classList.add('active');
            }
        });
    });
    
    // Pricing Toggle Functionality
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const annualPrices = document.querySelectorAll('.price-annual');
    
    if(pricingToggle && monthlyPrices.length && annualPrices.length) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'block');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'block');
                annualPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // Pricing Button Functionality
    document.querySelectorAll('.pricing-btn').forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            showToast(`You selected the ${plan} plan`);
            
            // If user is logged in, set their plan
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                user.plan = plan.charAt(0).toUpperCase() + plan.slice(1);
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                document.getElementById('sidebarPlan').textContent = 
                    user.plan + ' Member';
                document.getElementById('subscriptionPlan').textContent = 
                    user.plan + ' Plan';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }
    
    // Download Buttons
    const downloadBtn = document.getElementById('downloadBtn');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            showToast('Download started! Check your downloads folder.');
        });
    }
    
    const downloadIndustryBtn = document.getElementById('downloadIndustryBtn');
    if(downloadIndustryBtn) {
        downloadIndustryBtn.addEventListener('click', () => {
            showToast('Download for your industry started!');
        });
    }
    
    // Demo Buttons
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const watchBarcodeDemoBtn = document.getElementById('watchBarcodeDemoBtn');
    const closeVideo = document.getElementById('closeVideo');
    
    if(watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => {
            document.getElementById('videoModal').classList.add('show');
        });
    }
    
    if(watchBarcodeDemoBtn) {
        watchBarcodeDemoBtn.addEventListener('click', () => {
            document.getElementById('videoModal').classList.add('show');
        });
    }
    
    if(closeVideo) {
        closeVideo.addEventListener('click', () => {
            document.getElementById('videoModal').classList.remove('show');
        });
    }
    
    // Add Barcode Item Button
    const addBarcodeItemBtn = document.getElementById('addBarcodeItemBtn');
    if(addBarcodeItemBtn) {
        addBarcodeItemBtn.addEventListener('click', () => {
            showToast('Barcode item added successfully!');
        });
    }
    
    // Profile Update
    const updateProfileBtn = document.getElementById('updateProfile');
    if(updateProfileBtn) {
        updateProfileBtn.addEventListener('click', () => {
            const firstName = document.getElementById('profileFirstName').value;
            const lastName = document.getElementById('profileLastName').value;
            const email = document.getElementById('profileEmail').value;
            const phone = document.getElementById('profilePhone').value;
            const business = document.getElementById('profileBusiness').value;
            
            if (!firstName || !lastName || !email) {
                showToast('Please fill in required fields', true);
                return;
            }
            
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.phone = phone;
                user.business = business;
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Update profile sidebar
                document.getElementById('sidebarInitials').textContent = 
                    user.firstName.charAt(0) + user.lastName.charAt(0);
                document.getElementById('sidebarName').textContent = 
                    user.firstName + ' ' + user.lastName;
                document.getElementById('sidebarEmail').textContent = user.email;
                
                showToast('Profile updated successfully!');
            } else {
                showToast('Please log in to update your profile', true);
            }
        });
    }
    
    // Manage Subscription Button
    const manageSubscriptionBtn = document.getElementById('manageSubscriptionBtn');
    if(manageSubscriptionBtn) {
        manageSubscriptionBtn.addEventListener('click', () => {
            showToast('Redirecting to subscription management...');
        });
    }
    
    // Newsletter Subscription
    const subscribeBtn = document.getElementById('subscribeBtn');
    if(subscribeBtn) {
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
    
    // Rating Functionality
    const ratingStars = document.querySelectorAll('.rating-stars i');
    let selectedRating = 0;
    
    if(ratingStars.length) {
        ratingStars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Reset all stars
                ratingStars.forEach(s => {
                    s.classList.remove('fas');
                    s.classList.add('far');
                });
                
                // Fill clicked and previous stars
                for (let i = 0; i <= index; i++) {
                    ratingStars[i].classList.remove('far');
                    ratingStars[i].classList.add('fas');
                }
                
                selectedRating = index + 1;
            });
        });
        
        const submitRating = document.getElementById('submitRating');
        if(submitRating) {
            submitRating.addEventListener('click', () => {
                if (selectedRating === 0) {
                    showToast('Please select a rating before submitting', true);
                    return;
                }
                
                showToast(`Thank you for your ${selectedRating}-star rating!`);
                document.getElementById('ratingPopup').classList.remove('show');
                selectedRating = 0;
            });
        }
        
        const closeRating = document.getElementById('closeRating');
        if(closeRating) {
            closeRating.addEventListener('click', () => {
                document.getElementById('ratingPopup').classList.remove('show');
            });
        }
    }
});