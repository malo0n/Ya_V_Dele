let HABITS = `{              
    "smoking" : "Курение",
    "drugs": "Наркотики"
}`;
let habits = JSON.parse(HABITS);
for (let key in habits){
    console.log(habits[key]);
}




