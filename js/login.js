// Login page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Login Functionality
    const loginSubmit = document.getElementById('loginSubmit');
    if(loginSubmit) {
        loginSubmit.addEventListener('click', () => {
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
                business: firstName + "'s Retail Store",
                plan: 'Standard'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showToast('Login successful!');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Close modal functionality
    const closeLoginModal = document.getElementById('closeLoginModal');
    if(closeLoginModal) {
        closeLoginModal.addEventListener('click', () => {
            // Redirect to home page if user closes the modal
            window.location.href = 'index.html';
        });
    }
});