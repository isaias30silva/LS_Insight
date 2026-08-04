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

//função para rolar a página
const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((element) => {
  observer.observe(element);
});

//função de escrita de palavras
document.addEventListener("DOMContentLoaded", () => {
  const typingElements = document.querySelectorAll(".typing-word");

  typingElements.forEach((element) => {
    const text = element.dataset.text;

    let index = 0;

    function typeWord() {
      element.textContent = "";

      index = 0;

      const interval = setInterval(() => {
        element.textContent += text[index];

        index++;

        if (index >= text.length) {
          clearInterval(interval);

          setTimeout(typeWord, 3000);
        }
      }, 120);
    }

    typeWord();
  });
});
