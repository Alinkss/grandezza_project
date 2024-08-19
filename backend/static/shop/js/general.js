function toggleNavbar() {
    const navbarCollapse = document.querySelector("#navbarCollapse");
    navbarCollapse.classList.toggle("show");
}

function hideNavbar() {
    const navbarCollapse = document.querySelector("#navbarCollapse");
    navbarCollapse.classList.remove("show");
}

document.querySelector(".navbar-toggler").addEventListener("click", function(event) {
    event.stopPropagation();
    toggleNavbar();
});

document.addEventListener("click", function(event) {
    const navbarCollapse = document.querySelector("#navbarCollapse");
    if (!navbarCollapse.contains(event.target) && navbarCollapse.classList.contains("show")) {
        hideNavbar();
    }
});