const slider = document.querySelector(".slider")
const toggle = document.querySelector(".togglebtn")
let toggleFlag = false;
toggle.addEventListener("click",function(event){
    if(event.target.checked === true){
        toggleFlag =true;}
    else{
        toggleFlag = false;
    }
})

const valuemap = [
    {value:"1", viewpermonth:"10k",valueperviews:"8"},
    {value:"2", viewpermonth:"50k",valueperviews:"12"},
    {value:"3", viewpermonth:"100k",valueperviews:"16"},
    {value:"4", viewpermonth:"500k",valueperviews:"24"},
    {value:"5", viewpermonth:"1M",valueperviews:"36"}
]
slider.addEventListener("click",displayinfo)
slider.addEventListener("touchmove",displayinfo)
function displayinfo(){
    let costpermonth = 0;
    let viewspermonth = 0;
    valuemap.forEach(value=>{
        if (value.value == event.target.value){
            costpermonth = parseFloat(value.valueperviews);
            viewspermonth = value.viewpermonth
        }
    })
    if(toggleFlag === true){
        const discount = (costpermonth/100)*25;
        const newvalue = parseFloat(parseInt(costpermonth) - discount).toFixed(2)
        document.querySelector(".pageviews").innerHTML = viewspermonth;
        document.querySelector(".slidervalue").innerHTML = `$${newvalue}`;
    }else{
        document.querySelector(".pageviews").innerHTML = viewspermonth;
        document.querySelector(".slidervalue").innerHTML = `$${(costpermonth).toFixed(2)}`;
    }
}

