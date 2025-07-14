// Signup page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Signup Functionality
    const signupSubmit = document.getElementById('signupSubmit');
    if(signupSubmit) {
        signupSubmit.addEventListener('click', () => {
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
                business: firstName + "'s Retail Store",
                plan: 'Standard'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showToast('Account created successfully!');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Close modal functionality
    const closeSignupModal = document.getElementById('closeSignupModal');
    if(closeSignupModal) {
        closeSignupModal.addEventListener('click', () => {
            // Redirect to home page if user closes the modal
            window.location.href = 'index.html';
        });
    }
});