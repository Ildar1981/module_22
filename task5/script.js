const testUrl = "wss://ws.ifelse.io";

const textInput = document.querySelector(".message--text");
const btnSend = document.querySelector(".btn--send");
const btnLocation = document.querySelector(".btn--location");
const outputMessage = document.querySelector(".messages--display");

let socket = new WebSocket(testUrl);
function wsSocket(message, status) {
    socket.onopen = (evt) => {
        console.log("Соединение установлено!");
    };

    socket.onmessage = (evt) => {
        if(status === "hide"){
            console.log("Сообщение, полученное с сервера: " + evt.data);
            console.log("сообщение не выведено");
        }else{
            displayMessages(evt.data, "server");
            console.log("Сообщение, полученное с сервера: " + evt.data);
            console.log("сообщение введено");
        }
        
    };

    socket.onclose = function (evt) {
        console.log("соединение закрыто");
    };

    socket.onerror = function (evt) {
        outputMessage.innerHTML = "Ошибка!" + evt.reason;
    };

    console.log("Запрос,отправленный на сервер: " + message);
    socket.send(message);
        
}

function displayMessages(inputMes, source) {
    let newElem = document.createElement("p");
    if (source === "user") {
        newElem.className = "messages--right";
        console.log("Сообщение, введенное пользователем: " + inputMes);
    } else {
        newElem.className = "messages--left";
    }
    newElem.innerHTML = inputMes;
    outputMessage.appendChild(newElem);
    
}
btnSend.addEventListener("click", () => {
    let mesUser = textInput.value;
    displayMessages(mesUser, "user");
    wsSocket(mesUser, "visible");
    textInput.value = ''
});

function success (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    let linkGeo = `https://www.openstreetmap.org/#map=${latitude}/${longitude}`;
    
    let newLink = document.createElement("p");
    newLink.className = "messages--right"
    newLink.innerHTML = `<a href = ${linkGeo} class = "geoloc--link" target = "_blank">Геолокация пользователя</a>`;
    outputMessage.appendChild(newLink);
    wsSocket(linkGeo, "hide");
}

function error () {
    console.log("ошибка в геолокации");
}

btnLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        error();
    }else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})