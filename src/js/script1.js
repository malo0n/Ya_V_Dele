//смена карточки
let registrationCard = document.querySelector('.card__registration');
let authorizationCard = document.querySelector('.card__authorization');
let switchButton = document.querySelector('.card__footer__auth__switch-button');
registrationCard.style.display = "flex";
authorizationCard.style.display = "none";

switchButton.addEventListener('click', () =>{
    if(registrationCard.style.display == "flex"){
        registrationCard.style.display = "none";
        authorizationCard.style.display = "flex";
        switchButton.innerHTML = "Нет аккаунта? Зарегистрируйтесь!";
    }
    else if(registrationCard.style.display == "none"){
        registrationCard.style.display = "flex";
        authorizationCard.style.display = "none";
        switchButton.innerHTML = "Уже есть аккаунт? Войдите!";
    }
});

function registerUser() {
    const formData = new FormData(document.getElementById('registrationForm'));
    if (formData.get('repeat_password') === formData.get('password')) {
        formData.delete('repeat_password');
        fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('registrationForm').reset();
            document.location.href = 'profile.html';
        })
        .catch(error => {
            if (response.status === 400) {
                for (const field in data.errors) {
                    const errorField = document.getElementById(`${field}Error`);
                    errorField.textContent = data.errors[field];
                }
            }
        });
    } else {
        console.log("Пароли не совпадают");
    };
}

function loginUser() {
    const formData = new FormData(document.getElementById('loginForm'));
    fetch('http://127.0.0.1:8000/api/login/'), {
        method: 'POST',
        body: formData
    }
    .then(response => response.json())
    .then(() => {
        document.getElementById('registrationForm').reset();
        document.location.href = 'profile.html';
    })
    .catch(error => {
        if (response.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
    });
}
let id = fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        body: formData,
    });
window.localStorage.setItem('id', id);
