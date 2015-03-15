var __classId = 7;
var __addToDate = 2;/*0=heute, 1=morgen, 2=übermorgen*/
var __classIdByName = {
    '5a': 1,
    '5b': 2,
    '5c': 3,
    '5d': 4,
    '6a': 5,
    '6b': 6,
    '6c': 7,
    '6d': 8,
    '7a': 9,
    '7b': 10,
    '7c': 11,
    '7d': 12,
    '8a': 13,
    '8b': 14,
    '8c': 15,
    '8d': 16,
    '9a': 17,
    '9b': 18,
    '9c': 19,
    '9d': 20,
    '10a': 21,
    '10b': 22,
    '10c': 23,
    'S1/S2': 24,
    'S3/S4': 25,
};

$(document).ready(function () {
    showMain();
    fillClassSelectionList();
    updateRssFeed();
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setClass(classId) {
    __classId = classId;
    showSelectTodayTomorrow();
}

function setAddToDate(days) {
    __addToDate = days;
    showTimetable();
}

function fillClassSelectionList() {
    var list = document.getElementById('classSelectionList');
    for (var el in __classIdByName) {
        list.innerHTML += '<h3 onclick="setClass(' + __classIdByName[el] + ')">' + el + '</h2>';
    }
}

function getPage(name) {
    return document.getElementById(name);
}

function disableAllPages() {
    getPage("index").style.display = "none";
    getPage("timetable").style.display = "none";
    getPage("selectClass").style.display = "none";
    getPage("selectTodayTomorrow").style.display = "none";
    getPage("canteen").style.display = "none";
    getPage("news").style.display = "none";
    getPage("contacts").style.display = "none";
    getPage("feedback").style.display = "none";
}

function showMain() {
    disableAllPages();
    getPage("index").style.display = "block";
}

function showSelectClass() {
    disableAllPages();
    getPage("selectClass").style.display = "block";
}

function showSelectTodayTomorrow() {
    disableAllPages();
    getPage("selectTodayTomorrow").style.display = "block";
}

function showTimetable() {

    var date = new Date();

    var dayString = "";
    var day = date.getDate();
    if (day < 10) {
        dayString = "0" + (day + __addToDate).toString();
    }
    else {
        dayString = (day + __addToDate).toString()
    }


    var monthString = "";
    var month = date.getMonth();
    month += 1;
    if (month < 10) {
        monthString = "0" + month.toString();
    }
    else {
        monthString = month.toString();
    }

    var dateString = date.getFullYear().toString() + monthString + dayString;

    window.open("https://stundenplan.hamburg.de/WebUntis/?school=hh5846#Timetable?type=1&formatId=2&id=" + __classId.toString() + "&date=" + dateString, "_blank");
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



/******NEWS******/
function openNewsWindow(path/*string*/) {
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


                    newsfeed.innerHTML += '<h3 class=\"newsheader\" onclick=\"openNewsWindow(\'' + e.link + '\')\">' + e.title + '</h1>';
                    newsfeed.innerHTML += "<p>" + e.content + "</p>";
                });
            }
        }
    });

    console.log("updateRssFeed complete");
}


/******FEEDBACK******/
var __mood = "";

function selectSmile() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile_selected.svg";
    images[1].src = "images/neutral.svg";
    images[2].src = "images/sad.svg";

    __mood = "smile";
}
function selectNeutral() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile.svg";
    images[1].src = "images/neutral_selected.svg";
    images[2].src = "images/sad.svg";

    __mood = "neutral";
}
function selectSad() {
    var images = document.getElementById("feedback_smiles").getElementsByTagName("img");
    images[0].src = "images/smile.svg";
    images[1].src = "images/neutral.svg";
    images[2].src = "images/sad_selected.svg";

    __mood = "sad";
}

function sendFeedbackMail() {
    if (__mood == "") {
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
            subject: 'feedback: ' + __mood, // subject of the email
            body: /*'mail: ' + document.getElementById('feedback_email').value + '\n' +*/
                    'feedback: ' + document.getElementById('feedback_text').value, // email body (for HTML, set isHtml to true)
            isHtml: false // indicats if the body is HTML or plain text
        }, showMain);
    }

    return true;
}
