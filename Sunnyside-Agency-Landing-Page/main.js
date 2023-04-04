const menuBtn= document.querySelector(".menu-btn")
const closeBtn = document.querySelector(".close-btn")
const menu = document.querySelector(".menu")
const heroArrow = document.querySelector(".hero-arrow")
menuBtn.addEventListener("click",showmenu)
closeBtn.addEventListener("click",closeMenu)
heroArrow.addEventListener("click",scrolldown)
function showmenu(){
    menu.style.width="100%";
    menu.style.overflow="revert";
    menu.style.height="auto";
    menu.style.transition = "all ease-in 1s";
}

function closeMenu(){
    menu.style.width="0";
    menu.style.overflow="hidden";
    menu.style.height="0";
    menu.style.transition = "all ease-in 1s";
}
function addClickToMenuItems(){
    const menuItems = document.querySelectorAll(".menu>ul>li")
    menuItems.forEach(item=>{
        item.addEventListener("click",closeMenu)
    })
}
addClickToMenuItems()
function scrolldown(){
    document.documentElement.scrollBy(0,854)
}
