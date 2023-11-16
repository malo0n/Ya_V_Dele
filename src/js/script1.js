//смена карточки
let registrationCard = document.querySelector('.card__registration');
let authorizationCard = document.querySelector('.card__authorization');
let switchButton = document.querySelector('.card__footer__auth__switch-button');

switchButton.addEventListener('click', () =>{
    if(registrationCard.style.display == "flex"){
        registrationCard.style.display = "none";
        authorizationCard.style.display = "flex";
        switchButton.innerHTML = "Нет аккаунта? Зарегистрируйтесь!";
    }
    else{
        registrationCard.style.display = "flex";
        authorizationCard.style.display = "none";
        switchButton.innerHTML = "Уже есть аккаунт? Войдите!";
    }
});