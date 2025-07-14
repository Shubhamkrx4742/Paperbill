let isLoggedIn = false;
let currentUser = null;

// Sample user data
const sampleUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    business: "Doe's Retail Store",
    plan: "Professional",
    renewalDate: "15 Oct 2025",
    nextPayment: "$44.00"
};

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('nav ul');
const profileToggle = document.getElementById('profileToggle');
const profileDropdown = document.getElementById('profileDropdown');
const logoutBtn = document.getElementById('logoutBtn');
const openProfileBtn = document.getElementById('openProfile');
const guestActions = document.getElementById('guestActions');
const userActions = document.getElementById('userActions');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeModals = document.querySelectorAll('.close-modal');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginSubmit = document.getElementById('loginSubmit');
const signupSubmit = document.getElementById('signupSubmit');
const profileSidebar = document.getElementById('profileSidebar');
const closeSidebar = document.querySelector('.close-sidebar');
const ratingPopup = document.getElementById('ratingPopup');
const closeRating = document.getElementById('closeRating');
const ratingStars = document.querySelectorAll('.rating-stars i');
const submitRating = document.getElementById('submitRating');
const industryFilters = document.querySelectorAll('.industry-filter');
const industryContents = document.querySelectorAll('.industry-content');
const pricingToggle = document.getElementById('pricingToggle');
const monthlyPrices = document.querySelectorAll('.price-monthly');
const annualPrices = document.querySelectorAll('.price-annual');
const contactForm = document.getElementById('contactForm');
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');
const profileForm = document.getElementById('profileForm');
const updateProfileBtn = document.getElementById('updateProfile');
const profileInitials = document.getElementById('profileInitials');
const dropdownInitials = document.getElementById('dropdownInitials');
const sidebarInitials = document.getElementById('sidebarInitials');
const userName = document.getElementById('userName');
const dropdownName = document.getElementById('dropdownName');
const sidebarName = document.getElementById('sidebarName');
const userPlan = document.getElementById('userPlan');
const sidebarEmail = document.getElementById('sidebarEmail');
const sidebarPlan = document.getElementById('sidebarPlan');
const subscriptionPlan = document.getElementById('subscriptionPlan');
const renewalDate = document.getElementById('renewalDate');
const nextPayment = document.getElementById('nextPayment');
const profileFirstName = document.getElementById('profileFirstName');
const profileLastName = document.getElementById('profileLastName');
const profileEmail = document.getElementById('profileEmail');
const profilePhone = document.getElementById('profilePhone');
const profileBusiness = document.getElementById('profileBusiness');

// Initialize the application
function initApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUserUI();
    }
}

// Update UI based on user state
function updateUserUI() {
    if (isLoggedIn && currentUser) {
        guestActions.style.display = 'none';
        userActions.style.display = 'block';
        
        // Update profile elements
        const initials = currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0);
        profileInitials.textContent = initials;
        dropdownInitials.textContent = initials;
        sidebarInitials.textContent = initials;
        
        const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
        userName.textContent = fullName;
        dropdownName.textContent = fullName;
        sidebarName.textContent = fullName;
        
        userPlan.textContent = `${currentUser.plan} Account`;
        sidebarEmail.textContent = currentUser.email;
        sidebarPlan.textContent = `${currentUser.plan} Member`;
        subscriptionPlan.textContent = `${currentUser.plan} Plan`;
        renewalDate.textContent = currentUser.renewalDate;
        nextPayment.textContent = currentUser.nextPayment;
        
        // Update form values
        profileFirstName.value = currentUser.firstName;
        profileLastName.value = currentUser.lastName;
        profileEmail.value = currentUser.email;
        profilePhone.value = currentUser.phone;
        profileBusiness.value = currentUser.business;
    } else {
        guestActions.style.display = 'block';
        userActions.style.display = 'none';
    }
}

// Show toast notification
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toastNotification.className = isError ? 'toast error show' : 'toast show';
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3000);
}

// Login function
function loginUser(email, password) {
    // Simple validation
    if (!email || !password) {
        showToast('Please enter both email and password', true);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, you would verify credentials with a server
        // Try to get user from localStorage (if signed up before)
        let savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        let user = savedUsers[email];
        if (!user) {
            // If not found, create a basic user from email
            const namePart = email.split('@')[0];
            let firstName = namePart.split(/[._-]/)[0] || 'User';
            let lastName = namePart.split(/[._-]/)[1] || '';
            user = {
                firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
                lastName: lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '',
                email: email,
                phone: '',
                business: '',
                plan: 'Standard',
                renewalDate: '',
                nextPayment: ''
            };
        }
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI();
        loginModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        showToast('Login successful!');
    }, 1000);
}

// Signup function
function signupUser(firstName, lastName, email, password, confirmPassword) {
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', true);
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', true);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        // Create new user
        currentUser = {
            firstName,
            lastName,
            email,
            phone: "+1 (555) 123-4567",
            business: `${firstName}'s Retail Store`,
            plan: "Standard",
            renewalDate: "15 Nov 2025",
            nextPayment: "$28.00"
        };
        
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        updateUserUI();
        signupModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        showToast('Account created successfully!');
    }, 1500);
}

// Logout function
function logoutUser() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    updateUserUI();
    showToast('You have been logged out.');
}

// Update profile
function updateProfile() {
    // Get updated values
    const updatedUser = {
        ...currentUser,
        firstName: profileFirstName.value,
        lastName: profileLastName.value,
        email: profileEmail.value,
        phone: profilePhone.value,
        business: profileBusiness.value
    };
    
    // Simulate API call
    setTimeout(() => {
        currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI();
        showToast('Profile updated successfully!');
    }, 1000);
}

// Navigation Toggle for Mobile
navToggle.addEventListener('click', function() {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && e.target !== navToggle) {
        if (window.innerWidth <= 992) {
            navMenu.style.display = 'none';
        }
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                navMenu.style.display = 'none';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Industry Filter Functionality
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
        document.querySelector(`.industry-content[data-industry="${industry}"]`).classList.add('active');
    });
});

// Pricing Toggle Functionality
pricingToggle.addEventListener('change', function() {
    if (this.checked) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'block');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'block');
        annualPrices.forEach(price => price.style.display = 'none');
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Thank you for your message! We will contact you soon.');
    this.reset();
});

// Login Modal
// Navbar modal open buttons
const openLoginModalBtn = document.getElementById('openLoginModal');
const openSignupModalBtn = document.getElementById('openSignupModal');
if (openLoginModalBtn) {
    openLoginModalBtn.onclick = function() {
        loginModal.style.display = 'block';
        signupModal.style.display = 'none';
        document.body.style.overflow = 'hidden';
    };
}
if (openSignupModalBtn) {
    openSignupModalBtn.onclick = function() {
        signupModal.style.display = 'block';
        loginModal.style.display = 'none';
        document.body.style.overflow = 'hidden';
    };
}
// Modal close logic
closeModals.forEach(btn => {
    btn.onclick = function() {
        btn.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };
});
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};
// Switch between login/signup modals
if (showSignupBtn) {
    showSignupBtn.onclick = function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    };
}
if (showLoginBtn) {
    showLoginBtn.onclick = function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    };
}
// LocalStorage user management
function saveUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    users[user.email] = user;
    localStorage.setItem('users', JSON.stringify(users));
}
function getUserFromLocalStorage(email) {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[email];
}
// Signup logic
if (signupSubmit) {
    signupSubmit.onclick = function() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showToast('Please fill in all fields.', true);
            return;
        }
        if (password !== confirmPassword) {
            showToast('Passwords do not match.', true);
            return;
        }
        if (!agreeTerms) {
            showToast('You must agree to the Terms & Conditions and Privacy Policy.', true);
            return;
        }
        let users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[email]) {
            showToast('An account with this email already exists.', true);
            return;
        }
        const user = {
            firstName,
            lastName,
            email,
            password,
            phone: '',
            business: '',
            plan: 'Standard',
            renewalDate: '',
            nextPayment: ''
        };
        saveUserToLocalStorage(user);
        showToast('Account created successfully! You can now log in.');
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    };
}
// Login logic
if (loginSubmit) {
    loginSubmit.onclick = function() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) {
            showToast('Please enter both email and password.', true);
            return;
        }
        const user = getUserFromLocalStorage(email);
        if (!user || user.password !== password) {
            showToast('Invalid email or password.', true);
            return;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful!');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => location.reload(), 800);
    };
}
// Logout logic
const logoutBtnNav = document.getElementById('logoutBtnNav');
if (logoutBtnNav) {
    logoutBtnNav.onclick = function() {
        localStorage.removeItem('currentUser');
        showToast('You have been logged out.');
        setTimeout(() => location.reload(), 800);
    };
}

// Profile Dropdown Toggle
profileToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!profileToggle.contains(e.target)) {
        profileDropdown.classList.remove('show');
    }
});

// Logout Functionality
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    logoutUser();
});

// Open Profile Sidebar
openProfileBtn.addEventListener('click', function(e) {
    e.preventDefault();
    profileSidebar.classList.add('show');
    document.body.style.overflow = 'hidden';
});

// Close Profile Sidebar
closeSidebar.addEventListener('click', function() {
    profileSidebar.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Rating Popup
setTimeout(function() {
    ratingPopup.classList.add('show');
}, 10000);

closeRating.addEventListener('click', function() {
    ratingPopup.classList.remove('show');
});

// Star Rating Functionality
ratingStars.forEach((star, index) => {
    star.addEventListener('click', function() {
        // Reset all stars
        ratingStars.forEach(s => s.classList.remove('fas'));
        ratingStars.forEach(s => s.classList.add('far'));
        
        // Fill clicked and previous stars
        for (let i = 0; i <= index; i++) {
            ratingStars[i].classList.remove('far');
            ratingStars[i].classList.add('fas');
        }
    });
});

// Submit Rating
submitRating.addEventListener('click', function() {
    ratingPopup.classList.remove('show');
    showToast('Thank you for your rating!');
});

// Update Profile
updateProfileBtn.addEventListener('click', function() {
    updateProfile();
});

// Initialize pricing display
monthlyPrices.forEach(price => price.style.display = 'block');
annualPrices.forEach(price => price.style.display = 'none');

// Initialize first industry filter as active
if (industryFilters.length > 0) {
    industryFilters[0].click();
}

// Close modals when clicking on backdrop
window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.target === signupModal) {
        signupModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Initialize the app
initApp();