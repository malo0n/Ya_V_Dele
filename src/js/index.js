let json = {
    "bad_habits": [
        {
            "id": 3,
            "name": "Интернет-зависимость"
        },
        {
            "id": 4,
            "name": "Переедание"
        },
        {
            "id": 5,
            "name": "Социальная изоляция"
        }
    ],
    "username": "dimaa",
    "name": "Дмитрий Лобанев",
    "gender": "M",
    "date_of_birth": "2005-01-27",
    "about_me": "Я Дима",
    "photo": null,
    "groups": [],
    "user_permissions": []
}
for (let key in json.bad_habits){
    console.log(json.bad_habits[key].id);
        
}

// fetch('http://127.0.0.1:8000/api/habits/', {
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log(data)
// })



