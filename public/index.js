const loginForm = document.querySelector('#login-form');
const loginSpan = document.querySelector('#login-form span');

const registerForm = document.querySelector('#register-form');
const registerSpan = document.querySelector('#register-form span');

const logoutButton = document.querySelector('#close-session');
const registerButton = document.querySelector('#register-button');
const back = document.querySelector('#back');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    let res = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        loginSpan.innerText = 'Sesión iniciada Entrando';
        loginSpan.style.color = 'green';
        setTimeout(() => {
            window.location.href = '/protected';
        }, 2000)
    } else {
        const errorMessage = await res.text();
        loginSpan.innerText = `Error al iniciar sesión ${errorMessage}`;
        loginSpan.style.color = 'red';
    }
})

registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#register-username').value;
    const password = document.querySelector('#register-password').value;
    const confirmPassword = document.querySelector('#register-confirmpassword').value;

    if (password != confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    let res = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (res.ok) {
        registerSpan.innerText = 'Usuario registrado. Entrando'
        registerSpan.style.color = 'green';
        setTimeout(() => {
            window.location.href = '/protected';
        }, 2000);
    } else {
        const errorMessage = await res.text();
        registerSpan.innerText = `Error al registrar usuario ${errorMessage}`;
        registerSpan.style.color = 'red';
    }
})

logoutButton?.addEventListener('click', async (e) => {
    e.preventDefault();
    let res = await fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    let data = await res.json();
    console.log(data);
    window.location.href = '/';
})

registerButton?.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = '/register';
})

back?.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = '/';
})


