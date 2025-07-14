// Shared functions across all pages

// Toast Notification Function
function showToast(message, isError = false) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    
    if(!toast || !toastMessage) return;
    
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
    const logoutBtn = document.getElementById('logoutBtnNav');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    
    if (savedUser && logoutBtn) {
        const user = JSON.parse(savedUser);
        logoutBtn.style.display = 'inline-block';
        
        if(loginBtn) loginBtn.style.display = 'none';
        if(signupBtn) signupBtn.style.display = 'none';
        
        // Update profile sidebar if exists
        const sidebarInitials = document.getElementById('sidebarInitials');
        const sidebarName = document.getElementById('sidebarName');
        const sidebarEmail = document.getElementById('sidebarEmail');
        
        if(sidebarInitials) {
            sidebarInitials.textContent = 
                user.firstName.charAt(0) + user.lastName.charAt(0);
        }
        if(sidebarName) sidebarName.textContent = 
            user.firstName + ' ' + user.lastName;
        if(sidebarEmail) sidebarEmail.textContent = user.email;
    }
    
    // Show rating popup after 10 seconds (if exists)
    const ratingPopup = document.getElementById('ratingPopup');
    if(ratingPopup) {
        setTimeout(() => {
            ratingPopup.classList.add('show');
        }, 10000);
    }
}

// Navbar Toggle for Mobile
function initNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if(navbarToggle && navbarMenu) {
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
    }
    
    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtnNav');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            showToast('You have been logged out');
            logoutBtn.style.display = 'none';
            
            const loginBtn = document.querySelector('.login-btn');
            const signupBtn = document.querySelector('.signup-btn');
            if(loginBtn) loginBtn.style.display = 'inline-block';
            if(signupBtn) signupBtn.style.display = 'inline-block';
            
            // Redirect to home page if not already there
            if(!window.location.href.includes('index.html')) {
                window.location.href = 'index.html';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initApp();
});