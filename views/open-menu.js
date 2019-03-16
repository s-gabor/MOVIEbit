const burgerMenu = document.querySelector(".burger-menu");
const navBar = document.querySelector(".navigation");
const burgerLine = document.querySelector(".burger-line");

burgerMenu.addEventListener("click", function() {    
    if(navBar.classList.contains("burger-menu-open")) {
        navBar.classList.remove("burger-menu-open");
        this.classList.remove("open");
    } else {
        navBar.classList.add("burger-menu-open");
        this.classList.add("open");
    }
});