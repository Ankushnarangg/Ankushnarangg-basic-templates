const apiUrl = 'http://localhost:5000/auth'; // Base URL for the backend API

// Show the signup form and hide other forms
function showSignupForm() {
    document.getElementById('auth-options').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// Show the login form and hide other forms
function showLoginForm() {
    document.getElementById('auth-options').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

// Show the authentication options and hide other forms
function showAuthOptions() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('auth-options').classList.remove('hidden');
}

// Signup function to send a POST request to the backend API
async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    document.getElementById('signup-message').textContent = data.message;
}

// Login function to send a POST request to the backend API
async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    document.getElementById('login-message').textContent = data.message;

    if (response.ok) {
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('logout-form').classList.remove('hidden');
    }
}

// Logout function to send a POST request to the backend API
async function logout() {
    const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    document.getElementById('logout-message').textContent = data.message;

    if (response.ok) {
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('logout-form').classList.add('hidden');
        document.getElementById('auth-options').classList.remove('hidden');
    }
}