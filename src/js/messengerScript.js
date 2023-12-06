//* мини-переключатель чатов //
let userBox = document.querySelector('.main__chats__body__container');
let emptyDialog = document.querySelector('.main__dialog__empty');
let dialog = document.querySelector('.main__dialog__container');
let backArrow = document.querySelector('.main__dialog__container__body_info-back');
emptyDialog.style.display = "flex";
dialog.style.display = "none";
userBox.addEventListener('click', () =>{
    if (dialog.style.display == "flex") {
        dialog.style.display = "none";
        emptyDialog.style.display = "flex";
    } else {
        dialog.style.display = "flex";
        emptyDialog.style.display = "none";
    }
});
backArrow.addEventListener('click', () =>{
    dialog.style.display = "none";
    emptyDialog.style.display = "flex";
});

//* ❤ //

//* отправка сообщений //

let textInput = document.querySelector('.main__dialog__container__bottom_input');
let sendButton = document.querySelector('.main__dialog__container__bottom_send');
let chatBox = document.querySelector('.main__dialog__container__body');

sendButton.addEventListener('click', () => {
    if (textInput.value) {
        data = new Date();
        let message = document.createElement("div");
        message.classList = "main__dialog__container__body_textbox animate__animated animate__fadeInBottomLeft";
        let messageText = document.createElement("div");
        messageText.classList = "main__dialog__container__body_textbox-text";
        messageText.innerHTML = textInput.value;
        let messageTime = document.createElement("div");
        messageTime.classList = "main__dialog__container__body_textbox-time";
        messageTime.innerHTML = data.getHours() + ':' + data.getMinutes();
        message.append(messageText, messageTime);
        chatBox.prepend(message);
        message.scrollIntoView({ block: "nearest", inline: "start"}, false);
        textInput.value = "";
    }
})
textInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});

//* ❤ //

//* загрузка данных //

let userAvatar = document.querySelector('.main__chats__header__head_avatar');
if (window.localStorage.getItem('avatar')) {
    userAvatar.style.backgroundImage = `url(${window.localStorage.getItem('avatar')})`;
}

//* ❤ //











