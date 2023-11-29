
//загрузка аватара

let userAvatar = document.querySelector('.main__form__user-habits__avatar-field');
let inputAvatar = document.querySelector('.main__form__user-habits__avatar_input');
inputAvatar.addEventListener('change', () =>{
    userAvatar.src = URL.createObjectURL(inputAvatar.files[0]);

})


// загрузка привычек

const habitBox = document.querySelector('.main__form__user-habits__box__habits');
function addHabits(data){
    for(let key in data){
        let newHabit = document.createElement("label");
        newHabit.classList = "habit__container";
        newHabit.innerHTML = `<input type="checkbox" 
        class="habit__container__input" name="" id="${data[key].id}" value="${data[key].title}">${data[key].title}`;
        habitBox.append(newHabit);
    }
}

function getHabits() {
    fetch('http://127.0.0.1:8000/api/habits', {
        headers: {'Authorization': 'Token ' + window.localStorage.getItem('token') },
    })
    .then((response) => response.json())
    .then((data) => {
        addHabits(data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
}
window.onload = getHabits();

//фетч на данные профиля
let token = window.localStorage.getItem('token');
console.log(token);
function profileUserPost() {
    const formData = new FormData(document.getElementById('profileForm'));
    fetch(`http://127.0.0.1:8000/api/profile`), {
        method: 'PATCH',
        headers: {'Authorization': 'Token ' + token },
        body: formData,
    }
    .then(response => response.json())
    .then(() => {
        document.getElementById('profileForm').reset();
    })
    .catch(error => {
        if (response.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.log('Error: ', error);
    });
}
let userName = document.querySelector('.main__form__user-info__card__name input');
let userGender = document.querySelectorAll('.main__form__user-info__card__gender input');
let userDateOfBirth = document.querySelector('.card__input__date');
let userDescription = document.querySelector('.main__form__user-info__card__description textarea');

function genderUpdate(userGender, data){
    if (data.gender == 'M') userGender[0].checked = true;
    else userGender[1].checked = true;
}
function habitsUpdate(data){
    for (let key in data.bad_habits){
        document.getElementById(`${key}`).checked = true;
    }
}
function profileUpdate(data){
        userName.value = data.name; 
        genderUpdate(userGender, data);
        userDateOfBirth.value = data.date_of_birth;
        userDescription.value = data.about_me;
        userAvatar.src = data.photo;
        habitsUpdate(data);
}

function profileUserGet (){
    fetch(`http://127.0.0.1:8000/api/profile`), {
        headers: {'Authorization': 'Token ' + window.localStorage.getItem('token') },
    }
    .then(response => response.json())
    .then((data) => {
        profileUpdate(data);
    })
    .catch(error => {
        if (response.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.log('Error: ', error);
    });
}
window.onload = profileUserGet();