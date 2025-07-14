// Signup page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('termsAgreement');
    
    // Password toggle functionality
    function setupPasswordToggle(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        
        if (input && button) {
            button.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                // Toggle eye icon
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
            
            // Check password length
            if (password.length >= 8) strength += 25;
            
            // Check for lowercase letters
            if (/[a-z]/.test(password)) strength += 25;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Check for numbers and special characters
            if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
            
            // Update the strength meter
            strengthMeter.style.width = strength + '%';
            
            // Update the strength text
            if (strength < 50) {
                strengthMeter.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Password strength: weak';
            } else if (strength < 75) {
                strengthMeter.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Password strength: medium';
            } else {
                strengthMeter.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Password strength: strong';
            }
        });
    }
    
    // Form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsAgreed = termsCheckbox ? termsCheckbox.checked : false;
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validate first name
            if (!firstName) {
                const error = document.getElementById('firstNameError');
                if (error) {
                    error.textContent = 'First name is required';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate last name
            if (!lastName) {
                const error = document.getElementById('lastNameError');
                if (error) {
                    error.textContent = 'Last name is required';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                const error = document.getElementById('signupEmailError');
                if (error) {
                    error.textContent = 'Email is required';
                    error.style.display = 'block';
                }
                isValid = false;
            } else if (!emailRegex.test(email)) {
                const error = document.getElementById('signupEmailError');
                if (error) {
                    error.textContent = 'Please enter a valid email address';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate password
            if (!password) {
                const error = document.getElementById('signupPasswordError');
                if (error) {
                    error.textContent = 'Password is required';
                    error.style.display = 'block';
                }
                isValid = false;
            } else if (password.length < 8) {
                const error = document.getElementById('signupPasswordError');
                if (error) {
                    error.textContent = 'Password must be at least 8 characters';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate password confirmation
            if (!confirmPassword) {
                const error = document.getElementById('confirmPasswordError');
                if (error) {
                    error.textContent = 'Please confirm your password';
                    error.style.display = 'block';
                }
                isValid = false;
            } else if (password !== confirmPassword) {
                const error = document.getElementById('confirmPasswordError');
                if (error) {
                    error.textContent = 'Passwords do not match';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            // Validate terms agreement
            if (termsCheckbox && !termsAgreed) {
                const error = document.getElementById('termsError');
                if (error) {
                    error.textContent = 'You must agree to the terms';
                    error.style.display = 'block';
                }
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(u => u.email === email);
            
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
            
            showToast('Account created successfully! Redirecting...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Close modal functionality (if exists)
    const closeSignupModal = document.getElementById('closeSignupModal');
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});