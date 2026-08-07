document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    setupFormValidation(form);
  });
});

function setupFormValidation(form) {
  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const messageInput = form.querySelector('[name="message"]');

  const selectInputs = form.querySelectorAll("select");

  // Validação do nome
  if (nameInput) {
    nameInput.addEventListener("blur", () => {
      validateName(nameInput);
    });

    nameInput.addEventListener("input", () => {
      clearFieldError(nameInput);
    });
  }

  //Validação do e-mail
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      validateEmail(emailInput);
    });

    emailInput.addEventListener("input", () => {
      clearFieldError(emailInput);
    });
  }

  //Máscara do WhatsApp
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      applyPhoneMask(phoneInput);
      clearFieldError(phoneInput);
    });

    phoneInput.addEventListener("blur", () => {
      validatePhone(phoneInput);
    });
  }

  //Validação da mensagem
  if (messageInput) {
    messageInput.addEventListener("blur", () => {
      validateMessage(messageInput);
    });

    messageInput.addEventListener("input", () => {
      clearFieldError(messageInput);
    });
  }

  //Validação dos selects
  selectInputs.forEach((select) => {
    select.addEventListener("change", () => {
      validateSelect(select);
    });
  });

  //Validação no envio
  form.addEventListener("submit", (event) => {
    let isValid = true;

    if (nameInput && !validateName(nameInput)) {
      isValid = false;
    }

    if (emailInput && !validateEmail(emailInput)) {
      isValid = false;
    }

    if (phoneInput && !validatePhone(phoneInput)) {
      isValid = false;
    }

    if (messageInput && !validateMessage(messageInput)) {
      isValid = false;
    }

    selectInputs.forEach((select) => {
      if (!validateSelect(select)) {
        isValid = false;
      }
    });

    if (!isValid) {
      event.preventDefault();
    }
  });
}

//NOME
function validateName(input) {
  const value = input.value.trim();

  if (value === "") {
    showFieldError(input, "Por favor, informe seu nome.");
    return false;
  }

  if (value.length < 3) {
    showFieldError(input, "O nome deve possuir pelo menos 3 caracteres.");
    return false;
  }

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
    showFieldError(input, "O nome deve conter apenas letras.");

    return false;
  }

  clearFieldError(input);

  return true;
}

//E-MAIL
function validateEmail(input) {
  const value = input.value.trim();

  if (value === "") {
    showFieldError(input, "Por favor, informe seu e-mail.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    showFieldError(input, "Informe um endereço de e-mail válido.");

    return false;
  }

  clearFieldError(input);

  return true;
}

//TELEFONE / WHATSAPP
function applyPhoneMask(input) {
  let value = input.value.replace(/\D/g, "");

  value = value.substring(0, 11);

  if (value.length <= 2) {
    input.value = value;
    return;
  }

  if (value.length <= 7) {
    input.value = `(${value.substring(0, 2)}) ` + value.substring(2);

    return;
  }

  input.value =
    `(${value.substring(0, 2)}) ` +
    value.substring(2, 7) +
    "-" +
    value.substring(7);
}

function validatePhone(input) {
  const value = input.value.trim();

  if (value === "") {
    clearFieldError(input);
    return true;
  }

  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length !== 11) {
    showFieldError(input, "Informe um WhatsApp válido com DDD.");

    return false;
  }

  clearFieldError(input);

  return true;
}

//MENSAGEM
function validateMessage(input) {
  const value = input.value.trim();

  if (value === "") {
    showFieldError(input, "Por favor, informe sua mensagem.");

    return false;
  }

  if (value.length < 10) {
    showFieldError(input, "A mensagem deve possuir pelo menos 10 caracteres.");

    return false;
  }

  clearFieldError(input);

  return true;
}

//SELECT
function validateSelect(select) {
  if (select.value === "") {
    showFieldError(select, "Selecione uma opção.");

    return false;
  }

  clearFieldError(select);

  return true;
}

//ERROS
function showFieldError(input, message) {
  clearFieldError(input);

  input.classList.add("input-error");

  const error = document.createElement("small");

  error.className = "field-error";

  error.textContent = message;

  input.insertAdjacentElement("afterend", error);
}

function clearFieldError(input) {
  input.classList.remove("input-error");

  const nextElement = input.nextElementSibling;

  if (nextElement && nextElement.classList.contains("field-error")) {
    nextElement.remove();
  }
}
