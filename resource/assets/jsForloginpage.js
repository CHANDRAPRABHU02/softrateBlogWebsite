function gotosignup() {
  document.getElementById("signupdiv").style.display = "block";
  document.getElementById("logindiv").style.display = "none";
  document.getElementById("logindiv").style.display = "none";
  document.getElementById("loginbtntoggle").style.opacity = "60%";
  document.getElementById("signupbtntoggle").style.opacity = "100%";
  //document.getElementById("login-main-container").style.height = "50vh";
}

function gotologin() {
  document.getElementById("signupdiv").style.display = "none";
  document.getElementById("logindiv").style.display = "block";
  document.getElementById("loginbtntoggle").style.opacity = "100%";
  document.getElementById("signupbtntoggle").style.opacity = "60%";
  //document.getElementById("login-main-container").style.height = "unset";
}
gotosignup();

function viewloginpage() {
  document.getElementById("login-container").style.display = "block";
}

function unviewloginpage() {
  document.getElementById("login-container").style.display = "none";
}

$("#login-container").on("click", function (e) {
  if (e.target !== this) return;

  unviewloginpage();
});
