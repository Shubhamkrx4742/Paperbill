document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const showPasswordBtn = document.getElementById('showLoginPassword');
    
    // Password toggle
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
            
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Reset errors
            document.querySelectorAll('.error').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showFieldError('emailError', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showFieldError('emailError', 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                showFieldError('passwordError', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showFieldError('passwordError', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email.toLowerCase() === email);
            
            if (!user) {
                showToast('User not found. Please sign up', true);
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
        document.getElementById('rememberMe').checked = true;
    }
    
    // Close modal functionality
    const closeLoginModal = document.getElementById('closeLoginModal');
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Helper function for error display
    function showFieldError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});