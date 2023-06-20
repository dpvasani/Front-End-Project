function checkPassword() {
    var password = document.getElementById("password").value;
    var strength = document.getElementById("password-strength");
    
    // Define the regex patterns
    var regex = [
      /[a-z]/, // Lowercase letters
      /[A-Z]/, // Uppercase letters
      /[0-9]/, // Numbers
      /[$@#&!]/, // Special characters
      /.{8,}/ // Length
    ];
    
    // Define the messages for each pattern
    var messages = [
      "At least one lowercase letter",
      "At least one uppercase letter",
      "At least one number",
      "At least one special character ($@#&!)",
      "At least 8 characters"
    ];
    
    // Iterate through each pattern
    var score = 0;
    for (var i = 0; i < regex.length; i++) {
      if (regex[i].test(password)) {
        score++;
        strength.innerHTML += "<div class='valid'>" + messages[i] + "</div>";
      } else {
        strength.innerHTML += "<div class='invalid'>" + messages[i] + "</div>";
      }
    }
    
    // Display the overall score
    if (score === regex.length) {
      strength.innerHTML += "<div class='valid'>Your password is strong!</div>";
    } else {
      strength.innerHTML += "<div class='invalid'>Your password is weak.</div>";
    }
  }
  