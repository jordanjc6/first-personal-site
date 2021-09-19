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

var lqa = document.getElementById("leaquotesapp");
var lqaBack = document.getElementById("lqab");
lqaBack.addEventListener("click", scrollLqa);
var lqaNext = document.getElementById("lqan");
lqaNext.addEventListener("click", scrollLqa);
var lqaPics = [
    "projectsPics/leaquotesapp_pics/home.PNG",
    "projectsPics/leaquotesapp_pics/sidenav.PNG",
    "projectsPics/leaquotesapp_pics/form.PNG",
];
var lqaIndex = 0;

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

function scrollLqa(event) {
    if(event.target.id == "lqab")
        lqaIndex--;
    else
        lqaIndex++;
    if(lqaIndex < 0)
        lqaIndex = 2;
    if(lqaIndex > 2)
        lqaIndex = 0;
    lqa.src = lqaPics[lqaIndex];
}
