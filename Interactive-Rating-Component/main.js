const btns = document.querySelectorAll(".rate-btn");
const submit = document.querySelector(".submit")
const root = document.querySelector(":root")
let thankyoutext = document.getElementById("thank-you-text")
let rateResult = null;

btns.forEach((buttons)=>{
    buttons.addEventListener("click",(event) =>{

        btns.forEach((btn)=>{
            btn.classList.remove("selected-btn")
            btn.classList.add("not-selected-btn")
        })

        if(event.target.classList.contains('rate-btn')){
            event.target.classList.remove("not-selected-btn")
            event.target.classList.add("selected-btn")
            console.log(event)
        }
        rateResult = event.target.innerHTML

    })
})

submit.addEventListener("click",nextpage)

function nextpage(){
    if(rateResult === null){
        alert("Please rate us")
    }
    else{
        
        console.log(thankyoutext)
        root.style.setProperty("--rate-state","none")
        root.style.setProperty("--thank-you","revert")
        thankyoutext.innerHTML=`You selected ${rateResult} out of 5`;
    }
}

