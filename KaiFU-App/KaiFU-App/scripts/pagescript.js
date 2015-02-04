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
    disableAllPages();
    getPage("contacts").style.display = "block";
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


/******FEEDBACK******/
var mood = "";

function selectSmile() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile_selected.svg";
    images[1].src = "images/neutral.svg";
    images[2].src = "images/sad.svg";

    mood = "smile";
}
function selectNeutral() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile.svg";
    images[1].src = "images/neutral_selected.svg";
    images[2].src = "images/sad.svg";

    mood = "neutral";
}
function selectSad() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile.svg";
    images[1].src = "images/neutral.svg";
    images[2].src = "images/sad_selected.svg";

    mood = "sad";
}

function sendFeedbackMail() {
    if (mood == "") {
        console.error("Feedback mood is 0");
        return false;
    }
    else {
        cordova.plugins.email.isAvailable(
    function (isAvailable) {
        // alert('Service is not available') unless isAvailable;
        if (isAvailable == false) {
            console.error("device cannot send mail");
        }
    });

        cordova.plugins.email.open({
            to: 'test@testmail.com', // email addresses for TO field
            subject: 'feedback: ' + mood, // subject of the email
            body: /*'mail: ' + document.getElementById('feedback_email').value + '\n' +*/
                    'feedback: ' + document.getElementById('feedback_text').value, // email body (for HTML, set isHtml to true)
            isHtml: false // indicats if the body is HTML or plain text
        }, showMain);
    }

    return true;
}