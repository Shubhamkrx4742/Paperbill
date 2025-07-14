// Login page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const showPasswordBtn = document.getElementById('showLoginPassword');
    
    // Password toggle functionality
    if (showPasswordBtn && passwordInput) {
        showPasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            if (type === 'text') {
                showPasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                showPasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;
            
            // Reset errors
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            if (emailError) emailError.style.display = 'none';
            if (passwordError) passwordError.style.display = 'none';
            
            let isValid = true;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                if (emailError) {
                    emailError.textContent = 'Email is required';
                    emailError.style.display = 'block';
                }
                isValid = false;
            } else if (!emailRegex.test(email)) {
                if (emailError) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                if (passwordError) {
                    passwordError.textContent = 'Password is required';
                    passwordError.style.display = 'block';
                }
                isValid = false;
            } else if (password.length < 6) {
                if (passwordError) {
                    passwordError.textContent = 'Password must be at least 6 characters';
                    passwordError.style.display = 'block';
                }
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user by email
            const user = users.find(u => u.email === email);
            
            // Check if user exists and password matches
            if (!user) {
                showToast('User not found. Please sign up first.', true);
                return;
            }
            
            if (user.password !== password) {
                showToast('Invalid password', true);
                return;
            }
            
            // Store as current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Remember email if requested
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            showToast('Login successful! Redirecting...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Pre-fill remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
        const rememberMe = document.getElementById('rememberMe');
        if (rememberMe) rememberMe.checked = true;
    }
    
    // Close modal functionality (if exists)
    const closeLoginModal = document.getElementById('closeLoginModal');
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});