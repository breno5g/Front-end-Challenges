let seconds = 30;
let minutes = 1;
let hours = 2;

let timer;

let hourBox = document.querySelector(".hour"); 
let minuteBox = document.querySelector(".minute"); 
let secondBox = document.querySelector(".second"); 


function initTimer() {
    timer = setInterval(() => {
        console.log(hours, minutes, seconds);
        if (seconds > 0 && seconds < 60) {
            seconds--; 
        } else if (minutes > 0 && minutes < 60) {
            seconds = 59;
            minutes--;
        } else if(hours > 0 && hours < 60) {
            seconds = 59;
            minutes = 59;
            hours--;
        } else {
            console.log("hora do descanso");
            clearInterval(timer);
        }

        hours < 10 ?  hourBox.innerText = `0${hours}` : hourBox.innerText = hours;
        minutes < 10 ?  minuteBox.innerText = `0${minutes}` : minuteBox.innerText = minutes;
        seconds < 10 ?  secondBox.innerText = `0${seconds}` : secondBox.innerText = seconds;
    }, 1000);
}