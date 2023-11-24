//смена карточки
let registrationCard = document.querySelector('.card__registration');
let authorizationCard = document.querySelector('.card__authorization');
let switchButton = document.querySelector('.card__footer__auth__switch-button');
<<<<<<< HEAD
registrationCard.style.display = "flex";
authorizationCard.style.display = "none";
=======

>>>>>>> 68d2e3a07abdaccbd969ed1050a5e98f11cb3a6a
switchButton.addEventListener('click', () =>{
    if(registrationCard.style.display == "flex"){
        registrationCard.style.display = "none";
        authorizationCard.style.display = "flex";
        switchButton.innerHTML = "Нет аккаунта? Зарегистрируйтесь!";
    }
<<<<<<< HEAD
    else if(registrationCard.style.display == "none"){
=======
    else{
>>>>>>> 68d2e3a07abdaccbd969ed1050a5e98f11cb3a6a
        registrationCard.style.display = "flex";
        authorizationCard.style.display = "none";
        switchButton.innerHTML = "Уже есть аккаунт? Войдите!";
    }
});