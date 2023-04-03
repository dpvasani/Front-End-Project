
const feature= document.querySelector(".features")
const company= document.querySelector(".company")
const featureMenu= document.querySelector(".menu-features")
const companyMenu= document.querySelector(".menu-company")

//Directly showing the list (Before i wrote code to show each list item.. it is simple and neat to whole list on click)
const featureList = document.querySelector(".features ul")
const companyList = document.querySelector(".company ul")
const featureMenuList = document.querySelector(".menu-features ul")
const companyMenuList = document.querySelector(".menu-company ul")

feature.addEventListener("click",showfeatures)
company.addEventListener("click",showcompany)
let openlistOne = false;
let openlistTwo = false;
featureMenu.addEventListener("click",()=>{
    console.log("feature menu clicked");
    console.log(openlistOne);
    if (openlistOne === false){
        featureMenuList.style.display = "revert";
        document.querySelector(".menu-features img").setAttribute("src","images/icon-arrow-up.svg")
        openlistOne = true;
    }else{
        featureMenuList.style.display = "none";
        openlistOne = false;
        document.querySelector(".menu-features img").setAttribute("src","images/icon-arrow-down.svg")
    }
})

companyMenu.addEventListener("click",()=>{
    if (openlistTwo === false){
        companyMenuList.style.display = "revert";
        document.querySelector(".menu-company img").setAttribute("src","images/icon-arrow-up.svg")
        openlistTwo = true;
    }else{
        companyMenuList.style.display = "none";
        openlistTwo = false;
        document.querySelector(".menu-company img").setAttribute("src","images/icon-arrow-down.svg")
    }
})


function showfeatures(){
    console.log("clicked");
    if (openlistOne === false){
        featureList.style.display = "revert";
        document.querySelector(".features img").setAttribute("src","images/icon-arrow-up.svg")
        openlistOne = true;
    }else{
        featureList.style.display = "none";
        openlistOne = false;
        document.querySelector(".features img").setAttribute("src","images/icon-arrow-down.svg")
    }
}
function showcompany(){
    if (openlistTwo === false){
        companyList.style.display = "revert";
        document.querySelector(".company img").setAttribute("src","images/icon-arrow-up.svg")
        openlistTwo = true;
    }else{
        companyList.style.display = "none";
        openlistTwo = false;
        document.querySelector(".company img").setAttribute("src","images/icon-arrow-down.svg")
    }
}

const menubtn = document.querySelector(".menu-btn")
const menu = document.querySelector(".menu")
const closebtn = document.querySelector(".close-btn")

menubtn.addEventListener("click",showmenu)
closebtn.addEventListener("click",closemenu)

function showmenu(){
    menu.style.height = "100%";
    menu.style.width = "70%";
    menu.style.backgroundColor ="white"
    menu.style.transition = "all 1s"
}
function closemenu(){
    menu.style.height = "0px";
    menu.style.width = "0px";
}