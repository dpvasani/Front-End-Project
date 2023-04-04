const submitBtn = document.querySelector(".submit-btn");
const slider = document.querySelector(".slider");
const copybtn = document.querySelector(".copy-pass");

let passwordLength = 0;
let strength = 0;

let upparcase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let numbers = "1234567890";
let symbols = "~!@#$%^&*()_-+={[}]|;<,>.?/";

slider.addEventListener("click", generatePasswords); //Generate Password (For Desktop)
slider.addEventListener("touchmove", generatePasswords); //For mobiles device (Any touchscrn)

function generatePasswords(event) {
  //Function Get input and show passwrd to the user
  let passLength = parseInt(event.target.value); //Getting range input value

  let passwordstring = "";
  strength = 0;
  if (document.querySelector(".uppercase-ltr").checked) {
    strength += 1;
    passwordstring += upparcase;
  }
  if (document.querySelector(".lowercase-ltr").checked) {
    strength += 1;
    passwordstring += lowercase;
  }
  if (document.querySelector(".numbers").checked) {
    strength += 1;
    passwordstring += numbers;
  }
  if (document.querySelector(".symbols").checked) {
    strength += 1;
    passwordstring += symbols;
  }

  console.log(strength);
  //Showing password input option not selected warning
  if (strength === 0) {
    document.querySelector(".password-warning").innerHTML =
      "Select password content";
  } else {
    document.querySelector(".password-warning").innerHTML = "";
  }

  document.querySelector(".passwordlength").innerHTML = passLength;
  document.querySelector(".passwordOutput").innerHTML = `${generatePassword(
    passLength,
    passwordstring
  )}`;

  const passwordStrengthText = document.querySelector(".password-strength");
  const strengthBars = document.querySelectorAll(".bars");

  strengthBars.forEach((bar) => {
    bar.style.backgroundColor = "white";
  });

  if (strength === 1) {
    passwordStrengthText.innerHTML = "Low";
    passwordStrengthText.style.color = "#E63E6D";
    for (let i = 0; i < strength; i++) {
      strengthBars[i].style.backgroundColor = "#E63E6D";
    }
  } else if (strength === 2) {
    passwordStrengthText.innerHTML = "Medium";
    passwordStrengthText.style.color = "#FEC260";
    for (let i = 0; i < strength; i++) {
      strengthBars[i].style.backgroundColor = "#FEC260";
    }
  } else if (strength === 3) {
    passwordStrengthText.innerHTML = "High";
    passwordStrengthText.style.color = "#D8E9A8";
    for (let i = 0; i < strength; i++) {
      strengthBars[i].style.backgroundColor = "#D8E9A8";
    }
  } else if (strength === 4) {
    passwordStrengthText.innerHTML = "Excellent";
    passwordStrengthText.style.color = "#aeffac";
    for (let i = 0; i < strength; i++) {
      strengthBars[i].style.backgroundColor = "#aeffac";
    }
  } else {
    passwordStrengthText.innerHTML = "";
  }
}

function generatePassword(length, passwordstring) {
  let generatedPassword = "";
  passwordstringLength = passwordstring.length;
  for (let i = 0; i < length; i++) {
    generatedPassword += passwordstring.charAt(
      Math.floor(Math.random() * passwordstringLength)
    );
  }
  return generatedPassword;
}

copybtn.addEventListener("click", function () {
  let copytext = document.querySelector(".passwordOutput");
  navigator.clipboard.writeText(copytext.textContent);
  alert("Password Copied");
});
