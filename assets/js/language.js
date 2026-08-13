async function loadLanguage(language) {
  try {
    const response = await fetch(`./assets/i18n/${language}.json`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    document.documentElement.lang = language === "pt-br" ? "pt-BR" : "en-US";

    localStorage.setItem("language", language);
  } catch (error) {
    console.error("Erro ao carregar idioma:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    loadLanguage(savedLanguage);
    return;
  }

  const browserLanguage = navigator.language.toLowerCase();

  if (browserLanguage.startsWith("pt")) {
    loadLanguage("pt-br");
  } else {
    loadLanguage("en-us");
  }
});

const ptButton = document.getElementById("pt-btn");
const enButton = document.getElementById("en-btn");

if (ptButton) {
  ptButton.addEventListener("click", () => {
    loadLanguage("pt-br");
  });
}

if (enButton) {
  enButton.addEventListener("click", () => {
    loadLanguage("en-us");
  });
}
