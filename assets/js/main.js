const cookieBanner = document.getElementById("cookie-banner");
const acceptCookies = document.getElementById("accept-cookies");
const rejectCookies = document.getElementById("reject-cookies");
const menuToggle = document.getElementById("menu-toggle");
const mainMenu = document.getElementById("main-menu");
const menuLinks = document.querySelectorAll("#main-menu a");

//função de abertura do menu em telas menores
menuToggle.addEventListener("click", () => {
  mainMenu.classList.toggle("active");

  const expanded = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", !expanded);
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

//função para fechar banner de cookies
if (acceptCookies && rejectCookies && cookieBanner) {
  acceptCookies.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });

  rejectCookies.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });
}
