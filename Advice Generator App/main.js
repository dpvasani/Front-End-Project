const btn = document.getElementById("dicebtn")
let advicetext = document.getElementById("advicetext")
let adviceid = document.getElementById("adviceid")
document.addEventListener("DOMContentLoaded", function(){


    btn.addEventListener("click",function() {
        showadvice();
    });

    function showadvice(){
        fetch("	https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then((data) => {
            let {slip:{advice,id}} =data;
            advicetext.textContent = advice;
            adviceid.textContent = id;
    })
    .catch((error) => {
        alert(`Error ${error}`);
    });
    }
})