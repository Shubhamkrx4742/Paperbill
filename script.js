        document.addEventListener('DOMContentLoaded', function() {
            // Toast Notification Function
            function showToast(message, isError = false) {
                const toast = document.getElementById('toastNotification');
                const toastMessage = document.getElementById('toastMessage');
                
                toastMessage.textContent = message;
                toast.className = isError ? 'toast error' : 'toast';
                toast.style.display = 'block';
                
                // Automatically hide after 3 seconds
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 3000);
            }
            
            // Initialize the application
            function initApp() {
                // Check if user is logged in
                const savedUser = localStorage.getItem('currentUser');
                if (savedUser) {
                    const user = JSON.parse(savedUser);
                    document.getElementById('logoutBtnNav').style.display = 'inline-block';
                    document.getElementById('openLoginModal').style.display = 'none';
                    document.getElementById('openSignupModal').style.display = 'none';
                    
                    // Update profile sidebar
                    document.getElementById('sidebarInitials').textContent = 
                        user.firstName.charAt(0) + user.lastName.charAt(0);
                    document.getElementById('sidebarName').textContent = 
                        user.firstName + ' ' + user.lastName;
                    document.getElementById('sidebarEmail').textContent = user.email;
                }
                
                // Show rating popup after 10 seconds
                setTimeout(() => {
                    document.getElementById('ratingPopup').classList.add('show');
                }, 10000);
            }
            
            // Navbar Toggle for Mobile
            const navbarToggle = document.getElementById('navbarToggle');
            const navbarMenu = document.getElementById('navbarMenu');
            
            navbarToggle.addEventListener('click', function() {
                navbarMenu.classList.toggle('open');
            });
            
            // Close menu when clicking on links (mobile)
            navbarMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 700) {
                        navbarMenu.classList.remove('open');
                    }
                });
            });
            
            // Smooth Scrolling for Navigation Links
            document.querySelectorAll('nav a').forEach(anchor => {
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
            
            // Modal Handling
            const openLoginModal = document.getElementById('openLoginModal');
            const openSignupModal = document.getElementById('openSignupModal');
            const loginModal = document.getElementById('loginModal');
            const signupModal = document.getElementById('signupModal');
            const closeLoginModal = document.getElementById('closeLoginModal');
            const closeSignupModal = document.getElementById('closeSignupModal');
            const showSignup = document.getElementById('showSignup');
            const showLogin = document.getElementById('showLogin');
            
            openLoginModal.addEventListener('click', () => {
                loginModal.classList.add('show');
            });
            
            openSignupModal.addEventListener('click', () => {
                signupModal.classList.add('show');
            });
            
            closeLoginModal.addEventListener('click', () => {
                loginModal.classList.remove('show');
            });
            
            closeSignupModal.addEventListener('click', () => {
                signupModal.classList.remove('show');
            });
            
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                loginModal.classList.remove('show');
                signupModal.classList.add('show');
            });
            
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                signupModal.classList.remove('show');
                loginModal.classList.add('show');
            });
            
            // Close modals when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    loginModal.classList.remove('show');
                }
                if (e.target === signupModal) {
                    signupModal.classList.remove('show');
                }
            });
            
            // Login Functionality
            document.getElementById('loginSubmit').addEventListener('click', () => {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                if (!email || !password) {
                    showToast('Please enter both email and password', true);
                    return;
                }
                
                // Create a simple user object
                const firstName = email.split('@')[0];
                const user = {
                    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
                    lastName: 'User',
                    email: email,
                    phone: '+1 (555) 123-4567',
                    business: firstName + "'s Retail Store"
                };
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                showToast('Login successful!');
                loginModal.classList.remove('show');
                
                document.getElementById('logoutBtnNav').style.display = 'inline-block';
                document.getElementById('openLoginModal').style.display = 'none';
                document.getElementById('openSignupModal').style.display = 'none';
                
                // Update profile sidebar
                document.getElementById('sidebarInitials').textContent = 
                    user.firstName.charAt(0) + user.lastName.charAt(0);
                document.getElementById('sidebarName').textContent = 
                    user.firstName + ' ' + user.lastName;
                document.getElementById('sidebarEmail').textContent = user.email;
            });
            
            // Signup Functionality
            document.getElementById('signupSubmit').addEventListener('click', () => {
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                if (!firstName || !lastName || !email || !password || !confirmPassword) {
                    showToast('Please fill in all fields', true);
                    return;
                }
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match', true);
                    return;
                }
                
                const user = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: '+1 (555) 123-4567',
                    business: firstName + "'s Retail Store"
                };
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                showToast('Account created successfully!');
                signupModal.classList.remove('show');
                
                document.getElementById('logoutBtnNav').style.display = 'inline-block';
                document.getElementById('openLoginModal').style.display = 'none';
                document.getElementById('openSignupModal').style.display = 'none';
                
                // Update profile sidebar
                document.getElementById('sidebarInitials').textContent = 
                    user.firstName.charAt(0) + user.lastName.charAt(0);
                document.getElementById('sidebarName').textContent = 
                    user.firstName + ' ' + user.lastName;
                document.getElementById('sidebarEmail').textContent = user.email;
            });
            
            // Logout Functionality
            document.getElementById('logoutBtnNav').addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                showToast('You have been logged out');
                
                document.getElementById('logoutBtnNav').style.display = 'none';
                document.getElementById('openLoginModal').style.display = 'inline-block';
                document.getElementById('openSignupModal').style.display = 'inline-block';
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
            
            pricingToggle.addEventListener('change', function() {
                if (this.checked) {
                    monthlyPrices.forEach(price => price.style.display = 'none');
                    annualPrices.forEach(price => price.style.display = 'block');
                } else {
                    monthlyPrices.forEach(price => price.style.display = 'block');
                    annualPrices.forEach(price => price.style.display = 'none');
                }
            });
            
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
            document.getElementById('contactForm').addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Thank you for your message! We will contact you soon.');
                document.getElementById('contactForm').reset();
            });
            
            // Download Buttons
            document.getElementById('downloadBtn').addEventListener('click', () => {
                showToast('Download started! Check your downloads folder.');
            });
            
            document.getElementById('downloadIndustryBtn').addEventListener('click', () => {
                showToast('Download for your industry started!');
            });
            
            // Demo Buttons
            document.getElementById('watchDemoBtn').addEventListener('click', () => {
                document.getElementById('videoModal').classList.add('show');
            });
            
            document.getElementById('watchBarcodeDemoBtn').addEventListener('click', () => {
                document.getElementById('videoModal').classList.add('show');
            });
            
            document.getElementById('closeVideo').addEventListener('click', () => {
                document.getElementById('videoModal').classList.remove('show');
            });
            
            // Add Barcode Item Button
            document.getElementById('addBarcodeItemBtn').addEventListener('click', () => {
                showToast('Barcode item added successfully!');
            });
            
            // Profile Update
            document.getElementById('updateProfile').addEventListener('click', () => {
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
            
            // Manage Subscription Button
            document.getElementById('manageSubscriptionBtn').addEventListener('click', () => {
                showToast('Redirecting to subscription management...');
            });
            
            // Newsletter Subscription
            document.getElementById('subscribeBtn').addEventListener('click', () => {
                const email = document.getElementById('newsletterEmail').value;
                if (!email) {
                    showToast('Please enter your email address', true);
                    return;
                }
                showToast('Thank you for subscribing to our newsletter!');
                document.getElementById('newsletterEmail').value = '';
            });
            
            // Rating Functionality
            const ratingStars = document.querySelectorAll('.rating-stars i');
            let selectedRating = 0;
            
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
            
            // Initialize the application
            initApp();
        });
    