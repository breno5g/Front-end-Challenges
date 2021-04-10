let date = new Date();

let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

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

for (let i = 0; i < days.length; i++) {
    if (days.length % 2 != 0) {
        days.push(0);
    }
} 

while (days.length % 7 != 0) {
    days.push(0)
} 

let semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
let diaSemana = 0;

for(let i = 0; i <= days.length; i++) {
    if (i != 0 && i % 7 == 0 && i != days.length) {
        console.log("nova semana")
        console.log(`${semana[diaSemana]} : ${days[i]}`);
        diaSemana++;
    } else {
        console.log(`${semana[diaSemana]} : ${days[i]}`);
        diaSemana++;
    }
    if (diaSemana > 6) {
        diaSemana = 0;
    }
}