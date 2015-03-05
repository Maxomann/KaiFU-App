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
    window.open("https://stundenplan.hamburg.de/WebUntis/?school=hh5846", "_blank");
}

function showCanteen() {
    window.open("https://iss.people-projects-it.com/", "_blank");
}

function showNews() {
    disableAllPages();
    getPage("news").style.display = "block";
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
    updateRssFeed();
});

/******NEWS******/
function openNewsWindow( path/*string*/){
    window.open(path, "_blank");
}

function updateRssFeed() {

    var feedUrl = "http://kaifu-gymnasium.de/index.php?format=feed&type=rss";

    var newsfeed = document.getElementById('newsfeed');

    console.log("updateRssFeed started");

    $.ajax({
        url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(feedUrl),
        dataType: 'json',
        success: function (data) {
            if (data.responseData.feed && data.responseData.feed.entries) {
                $.each(data.responseData.feed.entries, function (i, e) {
                    console.log("------------------------");
                    console.log("title      : " + e.title);
                    console.log("author     : " + e.author);
                    console.log("description: " + e.description);
                    
                    
                    newsfeed.innerHTML += '<h3 class=\"newsheader\" onclick=\"openNewsWindow(\''+e.link+'\')\">' + e.title + '</h1>';
                    newsfeed.innerHTML += "<p>"+e.content+"</p>";
                });
            }
        }
    });

    console.log("updateRssFeed complete");
}


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
