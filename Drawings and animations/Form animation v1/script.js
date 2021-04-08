function expand(e) {
    let inputID = e.getAttribute("for")
    let input = document.getElementById(inputID);
    input.style.height = "40px";
    input.classList.add("show-placeholder");
    e.style.transform = "translateY(-45px)";
}

function reload() {
    window.location.reload();
}