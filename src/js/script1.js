//смена карточки
let registrationCard = document.querySelector('.card__registration');
let authorizationCard = document.querySelector('.card__authorization');
let switchButton = document.querySelector('.card__footer__auth__switch-button');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
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
// function serializeForm(form) {
//     return new FormData(form);
// }
function serializeForm(form) {
    return new FormData(form);
}
async function handleFormSubmit(event) {
    event.preventDefault()
    const data = serializeForm(event.target);
    console.log(Array.from(data.entries()));
}
function registerUser(event) {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(document.getElementById('registrationForm'));
    console.log(Array.from(formData.entries()));
    if (formData.get('repeat_password') === formData.get('password')) {
        formData.delete('repeat_password');
        fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('registrationForm').reset();
        })
        .then(()=>{
            registrationCard.style.display = "none";
            authorizationCard.style.display = "flex";
            switchButton.innerHTML = "Нет аккаунта? Зарегистрируйтесь!";
        })
        .catch(error => {
            if (error.status === 400) {
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

function loginUser(event) {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(document.getElementById('loginForm'));
    console.log(Array.from(formData.entries()));
    fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {

        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        window.localStorage.setItem('token', token);
        console.log(token);
        document.getElementById('loginForm').reset();
        // window.location.href = 'profile.html';
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
registrationForm.addEventListener('submit', registerUser);