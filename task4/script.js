const btn = document.querySelector(".btn");
const currentTime = document.querySelector(".current-time");

function success (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch ('https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat='+latitude+'&long='+longitude)
    .then((response) => {
        const result = response.json();
        return result;
    })
    .then((result) => {
        currentTime.innerHTML = `the time zone in which the user is located: ${result.timezone} 
        <br>
        <br>
        local date and time: ${result.date_time_txt}`;
    })
    .catch(() => {
        alert("error")
    })
}

function error () {
    currentTime.textContent = `Time is unavailable`;
}

btn.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        error();
    }else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

})