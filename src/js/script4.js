const loginForm = document.getElementById('loginForm');
let switchButton = document.querySelector('.card__footer__auth__switch-button');
switchButton.addEventListener('click', () =>{
    window.location.href = 'registration.html';
});

function loginUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(Array.from(formData.entries()));
    fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
            // 'Content-Type' : 'application/json; charset=UTF-8',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        window.localStorage.setItem('token', token);
        console.log(token);
        document.getElementById('loginForm').reset();
        document.location.href = 'profile.html';
    })
    .catch(error => {
        if (error.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
    });
}

loginForm.addEventListener('submit', loginUser);