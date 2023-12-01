//смена карточки
let switchButton = document.querySelector('.card__footer__auth__switch-button');
const registrationForm = document.getElementById('registrationForm');

switchButton.addEventListener('click', () =>{
    window.location.href = 'authorization.html';
});
function registerUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
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
            document.location.href = 'authorization.html';

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

registrationForm.addEventListener('submit', registerUser);
