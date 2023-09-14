import "../tailwindcss/tailwind.css";

/*------------------------------------------------------
 Hamburger Menu
------------------------------------------------------*/
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const logo = document.getElementById("logo");
const hamburgerTop = document.querySelector(".hamburger-top");
const hamburgerMiddle = document.querySelector(".hamburger-middle");
const hamburgerBottom = document.querySelector(".hamburger-bottom");
const mobMenus = document.querySelectorAll(".mobile-menu");
console.log(mobMenus);

btn.addEventListener("click", navToggle);

function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
  logo.classList.toggle("js-text-color");
  hamburgerTop.classList.toggle("js-bg-color");
  hamburgerMiddle.classList.toggle("js-bg-color");
  hamburgerBottom.classList.toggle("js-bg-color");
}

mobMenus.forEach((mobMenu) => {
  mobMenu.addEventListener('click', closeMenu)
});

function closeMenu() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
  logo.classList.toggle("js-text-color");
  hamburgerTop.classList.toggle("js-bg-color");
  hamburgerMiddle.classList.toggle("js-bg-color");
  hamburgerBottom.classList.toggle("js-bg-color");
}
