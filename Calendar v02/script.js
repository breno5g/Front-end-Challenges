let date = new Date();

let firstDay = new Date(date.getFullYear(), date.getMonth() , 1);

var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

let days = [];

for (let i = 1; i < firstDay.getUTCDay(); i++) {
    if (i < firstDay.getUTCDay()) {
      days.push(0);
    }
}

for (let i = 0; i <= lastDay.getUTCDate(); i++) {
  days.push(i);
}

while (days.length % 7 != 0) {
    days.push(0)
} 

console.log(days.length)

let table = document.querySelector(".days");


function createTable() {
    let diaSemana = 0;
    table.style.gridTemplateRows = `repeat(${days.length / 7}, 110px)`;
    console.log(days.length)
    for (let i = 0; i < days.length; i++) {
        if (days[i] != 0) {
            if (diaSemana == 0 || diaSemana == 6) {
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.classList.add("weekend");
                table.appendChild(day);
            } else {
                let day = document.createElement("div");
                day.innerHTML += days[i];
                table.appendChild(day);
            }
        } else {
            let day = document.createElement("div");
            day.classList.add("extraDays");
            table.appendChild(day);
        }
        if (diaSemana != 6) {
            diaSemana ++
        } else {
            diaSemana = 0
        }
    }
}