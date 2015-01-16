function getPage(name) {
    return document.getElementById(name);
}

function disableAllPages() {
    getPage("index").style.display = "none";
    getPage("timetable").style.display = "none";
    getPage("canteen").style.display = "none";
    getPage("news").style.display = "none";
    getPage("contacts").style.display = "none";
    getPage("feedback").style.display = "none";
}

function showMain() {
    disableAllPages();
    getPage("index").style.display = "block";
}

function showTimetable() {
    window.open("https://stundenplan.hamburg.de/WebUntis/index.do#main", "_blank");
}

function showCanteen() {
    window.open("https://iss.people-projects-it.com/", "_blank");
}

function showNews() {
    window.open("http://www.kaifu-gymnasium.de/", "_blank");
}

function showContacts() {
    window.open("http://www.kaifu-gymnasium.de/index.php/kontakt", "_blank");
}

function showFeedback() {
    disableAllPages();
    getPage("feedback").style.display = "block";
}


function onBackButtonPressed() {
    showMain();
}


$(document).ready(function () {
    showMain();
});