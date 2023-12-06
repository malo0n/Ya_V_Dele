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















let textInput = document.querySelector('.main__dialog__container__bottom_input');
let sendButton = document.querySelector('.main__dialog__container__bottom_send');
let chatBox = document.querySelector('.main__dialog__container__body');

sendButton.addEventListener('click', () => {
    if (textInput.value) {
        let message = document.createElement("div");
        message.classList = "main__dialog__container__body_textbox animate__animated animate__fadeInBottomLeft";
        let messageText = document.createElement("div");
        messageText.classList = "main__dialog__container__body_textbox-text";
        messageText.innerHTML = textInput.value;
        let messageTime = document.createElement("div");
        messageTime.classList = "main__dialog__container__body_textbox-time";
        message.append(messageText, messageTime);
        chatBox.prepend(message);
        textInput.value = "";
    }
})
textInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
});












