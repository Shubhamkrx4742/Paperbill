// Toast Notification Function
function showToast(message, isError = false) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : 'success'} animate__animated animate__fadeInUp`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate__fadeOut');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize the application
function initApp() {
    // const savedUser = localStorage.getItem('currentUser');
    // const logoutBtn = document.getElementById('logoutBtnNav');
    // const loginBtn = document.querySelector('.login-btn');
    // const signupBtn = document.querySelector('.signup-btn');
    
    // if (savedUser && logoutBtn) {
    //     const user = JSON.parse(savedUser);
    //     logoutBtn.style.display = 'inline-block';
        
    //     if(loginBtn) loginBtn.style.display = 'none';
    //     if(signupBtn) signupBtn.style.display = 'none';
        
    //     // Update profile sidebar
    //     const sidebarInitials = document.getElementById('sidebarInitials');
    //     const sidebarName = document.getElementById('sidebarName');
    //     const sidebarEmail = document.getElementById('sidebarEmail');
        const sidebarPlan = document.getElementById('sidebarPlan');
        const subscriptionPlan = document.getElementById('subscriptionPlan');
        
        if(sidebarInitials) {
            sidebarInitials.textContent = 
                user.firstName.charAt(0) + user.lastName.charAt(0);
        }
        if(sidebarName) sidebarName.textContent = 
            user.firstName + ' ' + user.lastName;
        if(sidebarEmail) sidebarEmail.textContent = user.email;
        if(sidebarPlan) sidebarPlan.textContent = user.plan + ' Member';
        if(subscriptionPlan) subscriptionPlan.textContent = user.plan + ' Plan';
    }
    
    // Show rating popup after 10 seconds
    const ratingPopup = document.getElementById('ratingPopup');
    if(ratingPopup) {
        setTimeout(() => {
            ratingPopup.classList.add('show');
        }, 10000);
    }
}

// Navbar Toggle for Mobile
// Navbar Toggle for Mobile
function initNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if(navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('open');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking links (mobile)
        navbarMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navbarMenu.classList.remove('open');
                    navbarToggle.classList.remove('active');
                    const icon = navbarToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Highlight current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === 'index.html' && linkPage === '#home') || 
            (linkPage && currentPage.includes(linkPage.replace('#', '')))) {
            link.classList.add('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initApp();
});
    
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
            
            // Redirect to home if not already there
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