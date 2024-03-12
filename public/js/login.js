const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //send POST request to api endpoints
    if(email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

    //if successful, redirect browser to profile dashboard page
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Something is wrong! (login.js)');
    }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);