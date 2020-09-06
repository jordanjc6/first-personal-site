var wp = document.getElementById("weekPlanner");
var wpBack = document.getElementById("wpb");
wpBack.addEventListener("click", scrollWp);
var wpNext = document.getElementById("wpn");
wpNext.addEventListener("click", scrollWp);
var wpPics = ["projectsPics/wph.png", "projectsPics/wpd.png", "projectsPics/wpf.png"];
var wpIndex = 0;

function scrollWp(event) {
    if(event.target.id == "wpb")
        wpIndex--;
    else
        wpIndex++;
    if(wpIndex < 0)
        wpIndex = 2;
    if(wpIndex > 2)
        wpIndex = 0;
    wp.src = wpPics[wpIndex];
}