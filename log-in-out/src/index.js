import "./scss/index.scss";

// Sing Up form variable 
const signUpHeading = document.querySelector(".sign-up-h1");
const signUpForm = document.querySelector(".sign-up-form");
const acceptTermConditions = document.getElementById("checkbox");

// Log in form Variable
const logInLink = document.querySelector(".log-in-btn");
const logInHeading = document.querySelector(".log-in-h1");
const logInForm = document.querySelector(".log-in-form");

// Object for the user details
let user = localStorage.hasOwnProperty("user") ? JSON.parse(localStorage.getItem("user")) : {
  userFullName: "",
  username: "",
  userEmail: "",
  userPassword: ""
}

function goLogInPage() {
  signUpForm.classList.add("animate__animated", "animate__flip")
  signUpHeading.classList.add("animate__animated", "animate__flip")
  setTimeout(() => {
    logInLink.style.display = "none";
    signUpHeading.style.display = "none";
    signUpForm.style.display = "none";

    logInHeading.style.display = "block";
    logInForm.style.display = "flex";
  }, 350)

  logInForm.classList.add("animate__animated", "animate__flip");
  logInHeading.classList.add("animate__animated", "animate__flip");
}

// EventListener on the lon-in btn to go to login form
logInLink.addEventListener("click", (e) => {
  goLogInPage()
})

// EventListener on the sign-up form 
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault()

  user.userFullName = document.getElementById("full-name").value;
  user.username = document.getElementById("username").value;
  user.userEmail = document.getElementById("email").value;
  user.userPassword = document.getElementById("password").value;


  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.userEmail)) {
    alert("You have entered invalid email address!")
    return false;
  }

  if (user.userPassword.length < 5 || !user.userPassword.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)) {
    alert("Password should not less than 4 character. Password should includes a lowercase letter. Password should includes an uppercase letter. Password should includes atleast a digit.")
    return false;
  }


  if (!acceptTermConditions.checked) {
    alert("Please accept terms and conditions.");
    return false;
  }

  localStorage.setItem("user", JSON.stringify(user));
  goLogInPage()
  console.log(user)
})

let logInUserName, logInPassword;

// EventListener on the log-in form 
logInForm.addEventListener("submit", (event) => {
  event.preventDefault()

  logInUserName = document.getElementById("log-in-username").value;
  logInPassword = document.getElementById("log-in-password").value;

  if ((logInUserName === user.username || logInUserName === user.userEmail) && logInPassword === user.userPassword) {
    alert("You are goog to go.")
  }
  else {
    alert("Username or Password is incorrect.")
  }
})