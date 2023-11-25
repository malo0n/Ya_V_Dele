
let userAvatar = document.querySelector('.main__form__user-habits__avatar-field');
let inputAvatar = document.querySelector('.main__form__user-habits__avatar_input');
inputAvatar.addEventListener('change', () =>{
    userAvatar.src = URL.createObjectURL(inputAvatar.files[0]);

})
const habitBox = document.querySelector('.main__form__user-habits__box__habits');
let habits = JSON.parse(HABITS);
function addHabits(data){
    for(let key in data){
        let newHabit = document.createElement("label");
        newHabit.classList = "habit__container";
        newHabit.innerHTML = `<input type="checkbox" 
        class="habit__container__input" name="" id="" value="${habits[key]}">${habits[key]}`;
        habitBox.append(newHabit);
    }
}

function getHabits() {
    fetch('http://127.0.0.1:8000/api/habits', {
    })
    .then((response) => response.json())
    .then((data) => {
        let habits = JSON.parse(data);
        addHabits(habits);
    })
    .catch(error => {
        console.error('Error:', error);
    })
}
