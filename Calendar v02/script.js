let date = new Date();                          // Data total
let month = date.getMonth();                    // Mês
let year = date.getUTCFullYear();               // Ano

let firstDay = new Date(year, month , 1);       // Primeiro dia do mês

let lastDay = new Date(year, month + 1, 0);     // Ultimo dia do mês

let days = [];                                  // Array com todos os dias em ordem

/* =-=-=-=-= Pegando os dias do mês =-=-=-=-= */
function getDays() {
    for (let i = 1; i < firstDay.getUTCDay(); i++) {
        if (i < firstDay.getUTCDay()) { // Pega a posição do primeiro dia da semana e se o index for menor, adiciona o valor 0
          days.push(0); 
        }
    }
    
    for (let i = 0; i <= lastDay.getUTCDate(); i++) { // Pega o ultimo dia do mês para saber quantos dias teremos
      days.push(i); // adiciona o valor do index ao dia
    }
    
    while (days.length % 7 != 0) { // Se a quantidade de dias divido por 7 não tiver um resto 0
        days.push(0); // Acrescenta mais dias para fechar a tabela
    } 
}

/* =-=-=-=-= Criando a tabela =-=-=-=-= */
let table = document.querySelector(".days");

function createTable() {
    getDays();
    setTheHeaderDate()
    let diaSemana = 0; // Define o dia da semana
    table.style.gridTemplateRows = `repeat(${days.length / 7}, 110px)`; // Define a quantidade de linhas da nossa tabela de acordo com o numero de dias
    for (let i = 0; i < days.length; i++) {
        if (days[i] != 0) { // se o valor dia for diferente de 0
            if (diaSemana == 0 || diaSemana == 6) { // Se o dia da semana for um final de semana
                let day = document.createElement("div");      // Cria uma div para colocarmos o dia
                day.innerHTML += days[i];                     // adiciona o valor do dia a div
                day.classList.add("weekend");                 // cria uma div com a classe weekend
                day.setAttribute("value", days[i]);           // adiciona um value a div igual ao dia
                table.appendChild(day);                       // Coloca a nova div no elemento pai
            } else { // se não, cria uma div normal
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.setAttribute("value", days[i]);
                table.appendChild(day);
            }
        } else { // se o valor do dia for 0
            // Cria uma div com a clase extraDays, que não irá ser mostrada no calendario
            let day = document.createElement("div");
            day.classList.add("extraDays");
            day.setAttribute("value", days[i]);
            table.appendChild(day);
        }
        if (diaSemana != 6) { // Se o dia da semana for diferente de 6
            diaSemana ++; // O dia da semana continua aumentando
        } else {
            diaSemana = 0; // Se não, ele retorna para o primeiro dia da semana (0)
        }
    }

    let actualDayDiv = document.querySelector(`[value='${date.getDate()}']`) // Pega o dia atual
    actualDayDiv.classList.add("actualDay"); // Coloca a classe actual day para marcar no calendario
}

/* =-=-=-= Crear table =-=-=-=-= */

function clearTable() { 
    table.innerHTML = ""; // Limpa o html da tabela
    days = [];            // Limpa a div com os dias
}

/* =-=-=-=-= Next and previous month functions =-=-=-=-= */

function nextMonth() {
    clearTable();           // Limpa a tabela
    if (month < 11) {       // se o mês for menor que 11 (ultimo mês)
        month++;            // aumenta em um o valor do mês
    } else {
        month = 0;          // volta o valor do mês para 0 (primeiro mês)
        year++;             // Aumenta em um o valor do ano
    }
    firstDay = new Date(year, month , 1);   // Define o primeiro dia do mês
    lastDay = new Date(year, month + 1, 0); // Define o ultimo dia do mês
    createTable();                          // Limpa a tabela
    setTheHeaderDate()                      // Altera os dados do header
}

function previousMonth() {                  // Mesma coisa da função de cima mas para diminuir os valores
    clearTable();
    if (month > 0) {
        month--;
    } else {
        month = 11;
        year--;
    }
    firstDay = new Date(year, month , 1);
    lastDay = new Date(year, month + 1, 0);
    createTable();
    setTheHeaderDate()
}

/* =-=-=-= Change to actual day =-=-=-=-= */

function actualDay() {
    month = date.getMonth();                        // Pega o mês atual
    year = date.getUTCFullYear();                   // Pega o ano atual
    firstDay = new Date(year, month , 1);           // Primeiro dia desse mês
    lastDay = new Date(year, month + 1, 0);         // ultimo dia desse mês
    clearTable();                                   // Limpa a tabela
    createTable();                                  // Gera uma nova tabela
}

/* =-=-=-=-= Header menu functions =-=-=-=-= */

function setTheHeaderDate(mes) {
    // Todos os meses do ano
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    // Day
    let headerDay = document.querySelector(".actual-day"); // Dia no header
    headerDay.innerHTML = date.getDate();                  // Altera o dia do header para o atual
    // Month
    let headerMonth = document.querySelector(".actual-month");  // Mês e ano do header
    headerMonth.innerHTML = `${months[month]} de ${year}`       // Altera os valores
}