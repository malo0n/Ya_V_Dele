//* всё, что нам надо, сразу подгружаем //

let token = window.localStorage.getItem('token');
window.onload = getHabits(), profileUserGet();

//* ❤ //


//*загрузка аватара

let userAvatar = document.querySelector('.main__form__user-habits__avatar-field');
let inputAvatar = document.querySelector('.main__form__user-habits__avatar_input');
inputAvatar.addEventListener('change', () =>{
    userAvatar.src = URL.createObjectURL(inputAvatar.files[0]);
})
//* ❤ //

//* загрузка привычек

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

//* ❤ //

//* отправка данных профиля //

const form = document.getElementById('profileForm');

function profileUserPost(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    
    //* отдельно обрабатываем привычки //
    
    let bad_habits_array = new Array();
    let bad_habits = document.querySelectorAll('.habit__container__input:checked');
    bad_habits.forEach(element=>{
        bad_habits_array.push({
            title : element.value,
        })
    })
    for(let name of formdata) {
        if(name[0]=='title'){
            formdata.delete(name[0]);
        }
    }
    formdata.append('bad_habits', JSON.stringify(
        bad_habits_array
        ));
        
    //* <3 //
    
    fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Token ' + token,
        },
        body: formdata,
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        // for (const field in data.errors) {
            //     const errorField = document.getElementById(`${field}Error`);
            //     errorField.textContent = data.errors[field];
            // }
            // }?
            console.log(error);
        });
        return false;
    }
    form.addEventListener('submit', profileUserPost);
    
    //* ❤ //
    
    //* Загрузка данных профиля
    
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
            let habit_id = data.bad_habits[key].id;
            document.getElementById(habit_id).checked = true;
        }
        console.log(data.bad_habits[0].id);
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
            console.log(data);
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
    
    //* ❤ //