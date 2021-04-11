let date = new Date();
let month = date.getMonth();

let firstDay = new Date(date.getFullYear(), month , 1);

let lastDay = new Date(date.getFullYear(), month + 1, 0);

let days = [];

/* =-=-=-=-= Pegando os dias do mês =-=-=-=-= */
function getDays() {
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
}


/* =-=-=-=-= Criando a tabela =-=-=-=-= */
let table = document.querySelector(".days");

function createTable() {
    getDays();
    let diaSemana = 0;
    table.style.gridTemplateRows = `repeat(${days.length / 7}, 110px)`;
    for (let i = 0; i < days.length; i++) {
        if (days[i] != 0) {
            if (diaSemana == 0 || diaSemana == 6) {
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.classList.add("weekend");
                day.setAttribute("value", days[i]);
                table.appendChild(day);
            } else {
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.setAttribute("value", days[i]);
                table.appendChild(day);
            }
        } else {
            let day = document.createElement("div");
            day.classList.add("extraDays");
            day.setAttribute("value", days[i]);
            table.appendChild(day);
        }
        if (diaSemana != 6) {
            diaSemana ++
        } else {
            diaSemana = 0
        }
    }

    let actualDayDiv = document.querySelector(`[value='${date.getDate()}']`)
    actualDayDiv.classList.add("actualDay");
    console.log(actualDayDiv.classList);
}

/* =-=-=-= Crear table =-=-=-=-= */

function clearTable() {
    table.innerHTML = "";
    days = [];
}

/* =-=-=-=-= Next and previous month functions =-=-=-=-= */

function nextMonth() {
    clearTable();
    month++;
    firstDay = new Date(date.getFullYear(), month , 1);

    lastDay = new Date(date.getFullYear(), month + 1, 0);
    createTable();
}

function previousMonth() {
    clearTable();
    month--;
    firstDay = new Date(date.getFullYear(), month , 1);

    lastDay = new Date(date.getFullYear(), month + 1, 0);
    createTable();
}