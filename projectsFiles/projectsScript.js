var wp = document.getElementById("weekPlanner");
var wpBack = document.getElementById("wpb");
wpBack.addEventListener("click", scrollWp);
var wpNext = document.getElementById("wpn");
wpNext.addEventListener("click", scrollWp);
var wpPics = ["projectsPics/wph.png", "projectsPics/wpd.png", "projectsPics/wpf.png"];
var wpIndex = 0;

var mcj = document.getElementById("mcjewelry");
var mcjBack = document.getElementById("mcjb");
mcjBack.addEventListener("click", scrollMcj);
var mcjNext = document.getElementById("mcjn");
mcjNext.addEventListener("click", scrollMcj);
var mcjPics = [
    "projectsPics/mcjewelry_pictures/search_parameters.PNG",
    "projectsPics/mcjewelry_pictures/item_selection.png",
    "projectsPics/mcjewelry_pictures/price_calculation.PNG",
    "projectsPics/mcjewelry_pictures/admin_page.PNG"
];
var mcjIndex = 0;

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

function scrollMcj(event) {
    if(event.target.id == "mcjb")
        mcjIndex--;
    else
        mcjIndex++;
    if(mcjIndex < 0)
        mcjIndex = 3;
    if(mcjIndex > 3)
        mcjIndex = 0;
    mcj.src = mcjPics[mcjIndex];
}
