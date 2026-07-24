const cookieBanner = document.getElementById("cookie-banner");
const acceptCookies = document.getElementById("accept-cookies");
const rejectCookies = document.getElementById("reject-cookies");

if (acceptCookies && rejectCookies && cookieBanner) {
  acceptCookies.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });

  rejectCookies.addEventListener("click", () => {
    cookieBanner.style.display = "none";
  });
}