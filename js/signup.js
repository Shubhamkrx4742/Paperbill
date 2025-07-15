document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Password toggle functionality
    function setupPasswordToggle(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        
        if (input && button) {
            button.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                if (type === 'text') {
                    button.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    button.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        }
    }
    
    // Setup password toggles
    setupPasswordToggle('signupPassword', 'showSignupPassword');
    setupPasswordToggle('confirmPassword', 'showConfirmPassword');
    
    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthMeter = document.getElementById('passwordStrengthMeter');
            const strengthText = document.getElementById('passwordStrengthText');
            
            if (!strengthMeter || !strengthText) return;
            
            let strength = 0;
            
            if (!password) {
                strengthMeter.style.width = '0%';
                strengthText.textContent = '';
                return;
            }
            
            // Password criteria
            if (password.length >= 8) strength += 25;
            if (/[a-z]/.test(password)) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
            
            // Update UI
            strengthMeter.style.width = strength + '%';
            
            if (strength < 50) {
                strengthMeter.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength < 75) {
                strengthMeter.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthMeter.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
        });
    }
    
    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsAgreed = document.getElementById('agreeTerms').checked;
            
            // Reset errors
            document.querySelectorAll('.error').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate first name
            if (!firstName) {
                showFieldError('firstNameError', 'First name is required');
                isValid = false;
            }
            
            // Validate last name
            if (!lastName) {
                showFieldError('lastNameError', 'Last name is required');
                isValid = false;
            }
            
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
            
            // Validate password confirmation
            if (!confirmPassword) {
                showFieldError('confirmPasswordError', 'Please confirm password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showFieldError('confirmPasswordError', 'Passwords do not match');
                isValid = false;
            }
            
            // Validate terms agreement
            if (!termsAgreed) {
                showFieldError('termsError', 'You must agree to the terms');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(u => u.email.toLowerCase() === email);
            
            if (userExists) {
                showToast('This email is already registered', true);
                return;
            }
            
            // Create new user
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                createdAt: new Date().toISOString(),
                phone: '+1 (555) 123-4567',
                business: firstName + "'s Retail Store",
                plan: 'Standard'
            };
            
            // Save user
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            showToast('Account created! Redirecting...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Close modal functionality
    const closeSignupModal = document.getElementById('closeSignupModal');
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', () => {
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