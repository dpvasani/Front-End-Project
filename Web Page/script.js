function greet() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var message = document.getElementById("message");
    if (name === "" || age === "") {
        message.innerHTML = "Please enter your name and age.";
    } else {
        message.innerHTML = "Hello, " + name + "! You are " + age + " years old.";
    }
}