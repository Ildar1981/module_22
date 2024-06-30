const btn = document.querySelector(".btn");
const sizes = document.querySelector(".screen-size");
const geolocate = document.querySelector(".coordinates");
const message = document.querySelector(".container")
const textMessage = 'Через 10 секунд сайт закроется'


btn.addEventListener('click', () => {
    sizes.innerHTML = `Ширина экрана устройства: ${window.screen.width} <br> <br> Высота экрана устройства: ${window.screen.height}`;
    if (!navigator.geolocation) {
        error();
    }else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
      function closeApp(){
        window.close()
      }
      setTimeout(closeApp, 10000)

})

function success (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    geolocate.innerHTML = `Координаты вашего устройства: <br><br> Широта: ${latitude} ° <br> <br> Долгота: ${longitude} °`;
    message.innerHTML=textMessage
}

function error () {
    geolocate.textContent = `Ваше местоположение не определенно, попробуйте отключить впн или другие службы блокирующие ваше устройство`;
  }