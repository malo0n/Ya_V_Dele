
const habitBox = document.querySelector('.main__form__user-habits__box__habits');
let HABITS = `{             
    "smoking" : "Ваня",
    "drugs": "Не кури"
}`;
let habits = JSON.parse(HABITS);
function addHabits(){
    for(let key in habits){
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
        console.log(data)
    })
    
}
