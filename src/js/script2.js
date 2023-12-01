let token = window.localStorage.getItem('token');

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
        class="habit__container__input" name="title" id="${data[key].id}" value="${data[key].title}">${data[key].title}`;
        habitBox.append(newHabit);
    }
}

function getHabits() {
    fetch('http://127.0.0.1:8000/api/habits/', {
        headers: {
        'Authorization': 'Token ' + token,
        }
    })
    .then((response) => response.json())
    .then((data) => {
        addHabits(data);
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

const form = document.getElementById('profileForm');
// const data = new FormData(form);
//фетч на данные профиля
console.log(token);     
function serializeForm(form) {
    return new FormData(form);
}
async function handleFormSubmit(event) {
    event.preventDefault()
    const data = serializeForm(event.target);
    console.log(Array.from(data.entries()));
}
console.log(form);
function profileUserPost(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const data = serializeForm(event.target);
    console.log(Array.from(data.entries()));
     // Get form data from the submitted form
    fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token ' + token,
        },
        body: data,
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch(error => {
        if (error.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.error('Error: ', error);
    });
    return false;
}



let userName = document.querySelector('.main__form__user-info__card__name input');
let userGender = document.querySelectorAll('.main__form__user-info__card__gender input');
let userDateOfBirth = document.querySelector('.card__input__date');
let userDescription = document.querySelector('.main__form__user-info__card__description textarea');

function genderUpdate(userGender, data){
    if (data.gender == 'M') userGender[0].checked = true;
    else if (data.gender == 'W') userGender[1].checked = true;
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
    if (data.photo != null) {
        userAvatar.src = data.photo;
    }
    habitsUpdate(data);
}

function profileUserGet() {
    fetch('http://127.0.0.1:8000/api/profile/', {
        headers: { 
            'Authorization': 'Token ' + token,
        }
    })
    .then(response => response.json())
    .then((data) => {
        profileUpdate(data);
    })
    .catch(error => {
        if (error.status == 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.log('Error: ', error);
    });
}
window.onload = getHabits();

//window.preventDefault();
// window.onload = profileUserGet();
form.addEventListener('submit', handleFormSubmit);