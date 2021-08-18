let colors = [
    "teal",
    "yellow",
    "blue",
    "red",
    "green",
    "black",
    "orange",
    "pink",
    "cyan",
    "lightblue",
    "tan",
    "steelblue",
    "salmon",
    "cadetblue",
    "crimson",
    "gray",
];

let selectedColor = "";

function setColors() {
    let colorSlot = document.querySelector(".pallete");
    for (let i = 0; i < colorSlot.children.length; i++) {
        colorSlot.children[i].style.backgroundColor = `${colors[i]}`;
    }
}

function selectColor(e) {
    selectedColor = e.style.backgroundColor;
}

function setCanvasSize(e) {
    let form = document.querySelector(".form");
    let n1 = form.children[0].children[0].value;
    let n2 = form.children[0].children[2].value;

    document.querySelector(".pixel-canvas").innerHTML = "";

    document.querySelector(".pixel-canvas").style.width = `${n1 * 20}px`;
    document.querySelector(".pixel-canvas").style.height = `${n2 * 20}px`;
    document.querySelector(
        ".pixel-canvas"
    ).style.gridTemplate = `repeat(${n2}, 20px) / repeat(${n1}, 20px)`;
    for (let i = 0; i < n1 * n2; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.setAttribute("onclick", "draw(this)");
        document.querySelector(".pixel-canvas").appendChild(pixel);
    }
}

function draw(e) {
    if (e.style.backgroundColor == "") {
        e.style.backgroundColor = selectedColor;
    } else {
        e.style.backgroundColor = "";
    }
}
