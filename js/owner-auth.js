// CHANGE THIS PASSWORD
const OWNER_PASSWORD = "valentina123";

function login() {
  const input = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (input === OWNER_PASSWORD) {
    localStorage.setItem("owner_logged_in", "true");
    window.location.href = "owner.html";
  } else {
    error.style.display = "block";
  }
}
