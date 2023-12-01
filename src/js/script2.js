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
//фетч на данные профиля

console.log(token);     
console.log(form);


function profileUserPost(event) {
    event.preventDefault(); // Prevent default form submission behavior
    // const formdata = new FormData(event.target);
    // // Get form data from the submitted form   
    // let bad_habits_array = [
    //     {'title': 'Алкоголизм'}
    // ];
    // JSON.stringify(bad_habits_array);
    // console.log(bad_habits_array);
    // let bad_habits = document.querySelectorAll('.habit__container__input:checked');
    // bad_habits.forEach(element=>{
    //     bad_habits_array.push({
    //         title : element.value,
    //     })
    // })
    // for(let name of formdata) {
    //     if(name[0]=='title'){
    //         formdata.delete(name[0]);
    //     }
    // }
    // bad_habits_array.forEach(element =>{
    //     console.log(element);
    // })
    // formdata.append('bad_habits', JSON.stringify(bad_habits_array));
    // console.log(formdata.get('bad_habits'));
    // let a = JSON.stringify(formdata);
    // console.log(Array.from(formdata.entries()));

    let test = {
        "name": "79035470171",
        "gender": "W",
        "bad_habits": [
            {"title": "Курение"}
        ]
    }
    console.log(test);
    let a = JSON.stringify(test);
    console.log(a);
    fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Token ' + token,
        },
        body: a,
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
form.addEventListener('submit', profileUserPost);