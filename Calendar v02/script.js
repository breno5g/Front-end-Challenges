let date = new Date();                          // Data total
let month = date.getMonth();                    // Mês
let year = date.getUTCFullYear();               // Ano

let firstDay;

let lastDay;

let days = [];                                  // Array com todos os dias em ordem

/* =-=-=-=-= Pegando os dias do mês =-=-=-=-= */
function getDays() {
    firstDay = new Date(year, month , 1);
    lastDay = new Date(year, month + 1, 0);

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
    table.style.gridTemplateRows = `repeat(${days.length / 7}, 1fr)`; // Define a quantidade de linhas da nossa tabela de acordo com o numero de dias
    for (let i = 0; i < days.length; i++) {
        if (days[i] != 0) { // se o valor dia for diferente de 0
            if (diaSemana == 0 || diaSemana == 6) { // Se o dia da semana for um final de semana
                let day = document.createElement("div");      // Cria uma div para colocarmos o dia
                day.innerHTML += days[i];                     // adiciona o valor do dia a div
                day.classList.add("weekend");                 // cria uma div com a classe weekend
                day.setAttribute("value", days[i]);           // adiciona um value a div igual ao dia
                table.appendChild(day);                       // Coloca a nova div no elemento pai
            } else if ((days[i] < date.getUTCDate() || days[i] == date.getUTCDate()) && month == date.getMonth()) { // se não, cria uma div normal
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.setAttribute("value", days[i]);
                day.classList.add("unavailableDay");
                table.appendChild(day);
            } else {
                let day = document.createElement("div");
                day.innerHTML += days[i];
                day.setAttribute("value", days[i]);
                day.setAttribute("onclick", `dayClick(this)`);
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

    let actualDayDiv = document.querySelector(`div[value='${date.getDate()}']`) // Pega o dia atual
    actualDayDiv.classList.add("actualDay"); // Coloca a classe actual day para marcar no calendario
    let presetDayWeek = document.querySelector(`div[value='${date.getDate() + 1}']`);
    presetDayWeek.classList.add("selectedDay");

    setWeeks();

    let totalWeeks = days.length / 7;

    let teste = document.querySelectorAll(`[week="${totalWeeks - 1}"]`)

    teste[0].style.borderRadius = "0 0 0 10px";
    teste[6].style.borderRadius = "0 0 10px 0";

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

    if (month < date.getMonth() || year < date.getFullYear()) {
        for (let i = 0; i < days.length; i++) {
            table.children[i].classList.add("unavailableDay");
            table.children[i].setAttribute("onclick", "");
        }
    }

    if (month != date.getMonth() || year != date.getFullYear()) {
        document.querySelector(".actualDay").classList.remove("actualDay");
    }

    if (selectedDay != undefined) {
        document.querySelector(`div[value= "${selectedDay.getAttribute("value")}"]`).classList.add("selectedDay");
    }
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

    if (month < date.getMonth() || year < date.getFullYear()) {
        for (let i = 0; i < days.length; i++) {
            table.children[i].classList.add("unavailableDay");
            table.children[i].setAttribute("onclick", "");

        }
    }

    if (month != date.getMonth() || year != date.getFullYear()) {
        document.querySelector(".actualDay").classList.remove("actualDay");
    }
    
    if (selectedDay != undefined) {
        document.querySelector(`div[value= "${selectedDay.getAttribute("value")}"]`).classList.add("selectedDay");
    }
}

/* =-=-=-= change the month with select =-=-=-=-= */

function changeTheMonth(e) {
    month = e.value; // Muda o mês
    if (e.value == 0 || e.value == 1 || e.value == 8 || e.value == 9 || e.value == 10 || e.value == 11) {
        e.style.width = "120px"
        e.style.backgroundPosition = "93px center"
    } else  if (e.value == "") {
        e.style.width = "80px";
        e.style.backgroundPosition = "55px center"
    }else {
        e.style.width = "90px"
        e.style.backgroundPosition = "70px center"
    }

    clearTable();
    createTable();
}

/* =-=-=-= Change to actual day =-=-=-=-= */

function actualDay() {
    month = date.getMonth();                        // Pega o mês atual
    year = date.getUTCFullYear();                   // Pega o ano atual
    firstDay = new Date(year, month , 1);           // Primeiro dia desse mês
    lastDay = new Date(year, month + 1, 0);         // ultimo dia desse mês
    clearTable();                                   // Limpa a tabela
    createTable();                                  // Gera uma nova tabela
    document.getElementById("select-month").value = "Mês";
    document.getElementById("select-month").style.width = "80px";
    document.getElementById("select-month").style.backgroundPosition = "55px center"
}

/* =-=-=-=-= Header menu functions =-=-=-=-= */

function setTheHeaderDate() {
    // Todos os meses do ano
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    // Day
    let headerDay = document.querySelector(".actual-day"); // Dia no header
    headerDay.innerHTML = date.getDate();                  // Altera o dia do header para o atual
    // Month
    let headerMonth = document.querySelector(".actual-month");  // Mês e ano do header
    headerMonth.innerHTML = `${months[month]} de ${year}`       // Altera os valores
}

/* =-=-=-= Create an appointment =-=-=-= */

let selectedDay; // Variavel para guardar qual dia está selecionado


let appointments = [ // array com as marcações de presença

]

function appointmentSubmit() { // Trata os dados depois do submit no modal
    let day = selectedDay.getAttribute("value");
    let name = document.querySelector("[name = 'appointmentName']"); // Pega o nome inserido no modal
    let image = document.querySelector("[name = 'appointmentImage']"); // Pega a url da imagem inserido no modal
    if (name.value == "" || image.value == "") { // Se o nome ou a url não estiverem preenchidos
        alert("Por favor preencha todos os campos"); // Manda um aviso
    }else { // caso não
        appointments.push({day: day, name: name.value, image: image.value}); // Adiciona um objeto com o dia, nome e url da imagem a um array
        createAppointment(day); // Cria a marcação;
        closeAppointmentModal(); // Fecha o modal
    }
}

function createAppointment(d) { // Cria a marcação de presença
    let day = d; // Pega o dia selecionado
    let appointment = document.createElement("div"); // Cria uma div para guardar as marcações
    let image = document.createElement("img"); // Cria uma imagem
    image.setAttribute("src", appointments[appointments.length - 1].image); // Pega a imagem do objeto na ultima posição do array
    if (!day.children[0]) { // Se o dia selecionado não tiver nenhuma div
        appointment.appendChild(image); // Adiciona a imagem a div
        day.appendChild(appointment); // Adiciona a div no dia
    } else { // Caso já tenha uma div
        day.children[0].appendChild(image); // Coloca a imagem nela
    }
}

function closeAppointmentModal() { // Fecha o modal
    let modal = document.querySelector(".makeAppointmentModal"); // Seleciona o modal
    modal.style.display = "none"; // Muda o display para none
    clearModal(); // Limpa o modal
}

function clearModal() { // Limpa o modal
    let name = document.querySelector("[name = 'appointmentName']"); // Caixa de nome
    let image = document.querySelector("[name = 'appointmentImage']"); // Caixa de imagem
    name.value = ""; // Reseta a caixa de nome
    image.value = ""; // Reseta a caixa de imagem
}

function dayClick(e) { // Captura o click no dia
    selectedDay = e; // Coloca o dia na variavel
    for(let i = 0; i < table.children.length; i++) { // Let para percorrer todos os elementos da tabela
        if(table.children[i].classList.contains("selectedDay")) { // Se alguma div tiver a classe
            table.children[i].classList.remove("selectedDay"); // Remove a classe
        }
    }
    // let modal = document.querySelector(".makeAppointmentModal");
    // modal.style.display = "flex";
    selectedDay.classList.add("selectedDay"); // adiciona a classe no dia selecionado
}

function weekMode() {
    for (let i = 0; i < days.length; i++) { // Some com todos os dias
        table.children[i].style.display = "none";
    }

    let week = parseInt(selectedDay.getAttribute("week")) // Seleciona a semana de acordo com o dia selecionado


    for (let i = 0; i <= days.length; i++) { // laço de repetição com os todos os dias da tabela;
        let visibleDay = document.querySelector(`.days`); // Pega todos os dias da tabela
        // Se o index for maior ou igual a 7 vezes o numero da semana e menor que 7 vezes o numero da semana +1
        if (i >= 7 * week && i < 7 * (week + 1)) {
            visibleDay.children[i].style.display = "flex"; // Deixa visivel de acordo com os elementos filhos
        }
    }
}

function setWeeks() { // Configura em qual semana está cada dia
    let week = 0; // inicia a semana em 0 (primeira semana do mês)

    for (let i = 0; i <= days.length; i++) { // Percorre todos os dias do array
        if (i >= 7 * week && i < 7 * (week + 1)) { // Mesma logica da função acima
            table.children[i].setAttribute("week", week); // Coloca um atributo com o numero da semana atual
        } else {
            week++; // Aumenta o numero da semana
            if (i < days.length) { // Se o index for menor que o tamanho do array
                table.children[i].setAttribute("week", week); // Coloca um atributo com o numero da semana atual
            } 
        }
    }
}