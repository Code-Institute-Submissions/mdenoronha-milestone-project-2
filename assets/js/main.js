var colors = [];
var colorHighlightCount = 0;
var colorHighlightLength = 0;
var timeOut;
var textTimeOut;
var countdownTimeLeft;
var CheckedColorNumber = 0;
var turn = 0;
var colorNumber = 0;

var countdown
var activebuttons = []

var difficulty = 2

var hardScores
var easyScores
var sounds = ["http://s1download-universal-soundbank.com/mp3/sounds/20840.mp3",
    "http://s1download-universal-soundbank.com/mp3/sounds/20848.mp3",
    "http://s1download-universal-soundbank.com/mp3/sounds/20842.mp3",
    "http://s1download-universal-soundbank.com/mp3/sounds/20841.mp3"
];

//Load scores on load
loadHardScores()
loadEasyScores()

//Push a random color to colors a certain number of times
function randomColor(numOfTimes) {
    for (i = 0; i < numOfTimes; i++) {
        var newColor = Math.floor(Math.random() * 4)
        colors.push(newColor)
        console.log(colors)
    }
    return colors
}


//Click on active tiles, check if correct colour is clicked
$(document).on('click', '.active', function(e) {
    checkColor(e)
    console.log(e)
});


//Reset all variables
function resetVariables() {
    turn = 0
    colorNumber = 0
    colorHighlightCount = 0
    colorHighlightLength = 0
    colors = []
    $(".table").html("")
    $(".leaderboard-title").css("display", "none")
}

//Timer as text
function countdownReset() {
    countdownTimeLeft = 3 * difficulty;
    countdownAsText();
}

function countdownAsText() {
    if (countdownTimeLeft > 0) {
        countdownTimeLeft--;
        console.log(countdownTimeLeft + 1)

        $(".start-game").html(`TIME LEFT: ${countdownTimeLeft + 1}`)

        if (countdownTimeLeft > 0) {
            textTimeOut = setTimeout('countdownAsText()', 1000);
        }
    }
}
// Timer
function timer() {
    countdownReset()
    console.log("Timer start")
    timeOut = setTimeout(function() {
        console.log("Timeout")
        $(".countdown-text").html("")
        showScoresForm()
        console.log("Loss")
        deactivateColors()
        clearTimeout(timeOut)
        clearTimeout(textTimeOut)
        $(".easy").addClass("active-button")
        $(".hard").addClass("active-button")
        $(".start-game").addClass("active-start")
        $(".show-scores").addClass("active-button")
        $(".start-game").css("visibility", "visible")
        $(".start-game").html("PLAY AGAIN")
        $(".incorrect-message-2").css("visibility", "visible")
        setTimeout(function() {
            $(".incorrect-message-2").css("visibility", "hidden")
        }, 3000)
    }, 3000 * difficulty);
}

//Check if color clicked was correct
function checkColor(e) {
    //If last color in the array
    if (colorNumber == colors.length - 1) {
        //If color is correct
        if (e.target.id == colors[colorNumber]) {
            console.log("Win")
            newRoundInit()
            clearTimeout(timeOut)
            clearTimeout(textTimeOut)
        }
        //If color is wrong
        else {
            //Need to put all below in game over function
            showScoresForm()
            console.log("Loss")
            deactivateColors()
            clearTimeout(timeOut)
            clearTimeout(textTimeOut)
            console.log(colors)
            $(".countdown-text").html("")
            $(".easy").addClass("active-button")
            $(".hard").addClass("active-button")
            $(".start-game").addClass("active-start")
            $(".show-scores").addClass("active-button")
            $(".start-game").css("visibility", "visible")
            $(".start-game").html("PLAY AGAIN")
            $(".incorrect-message-1").css("visibility", "visible")
            setTimeout(function() {
                $(".incorrect-message-1").css("visibility", "hidden")
            }, 3000)
        }
    }
    //If not last color in the array
    else {
        //If color is correct
        if (e.target.id == colors[colorNumber]) {
            console.log("Win")
            clearTimeout(timeOut)
            clearTimeout(textTimeOut)
            timer()
            colorNumber++
            console.log(colors)
        }
        //If color is wrong
        else {
            showScoresForm()
            deactivateColors()
            console.log("Loss")
            clearTimeout(timeOut)
            clearTimeout(textTimeOut)
            console.log(colors)
            $(".easy").addClass("active-button")
            $(".hard").addClass("active-button")
            $(".start-game").addClass("active-start")
            $(".show-scores").addClass("active-button")
            $(".countdown-text").html("")
            $(".start-game").css("visibility", "visible")
            $(".start-game").html("PLAY AGAIN")
            $(".incorrect-message-1").css("visibility", "visible")
            setTimeout(function() {
                $(".incorrect-message-1").css("visibility", "hidden")
            }, 3000)
        }
    }
}

//Make colors active and clickable
function activateColors() {
    $(".selector").addClass("active")
}

//Make colors inactive and not clickable
function deactivateColors() {
    $(".selector").removeClass("active")
}


//Start game
function Gameinit() {
    resetVariables()
    $(".easy").removeClass("active-button")
    $(".hard").removeClass("active-button")
    $(".show-scores").removeClass("active-button")
    $(".incorrect-message-2").css("visibility", "hidden")
    $(".incorrect-message-1").css("visibility", "hidden")
    if (difficulty == 1) {
        randomColor(4)
        setTimeout(timer, 7300);
        setTimeout(activateColors, 7300);
        highlightColors()
    }
    else {
        randomColor(2)
        highlightColors()
        setTimeout(timer, 3650);
        setTimeout(activateColors, 3650);
    }
}

//Start next round
function newRoundInit() {
    deactivateColors()
    colorHighlightLength = (colors.length + 1) * 1825
    console.log(colorHighlightLength)
    colorHighlightCount = 0
    turn++
    colorNumber = 0
    clearTimeout(timeOut)
    randomColor(1)
    highlightColors()
    setTimeout(timer, colorHighlightLength);
    setTimeout(activateColors, colorHighlightLength);
    console.log(colors)
}

//Start game button
$(".start-game").on('click', function() {
    if ($(this).hasClass('active-start')) {
        resetVariables()
        Gameinit()
        $(this).removeClass("active-start")
    }
});


//Highlight colors at beginning of round
function highlightColors() {
    $(".start-game").html(`MEMORISE`)
    if (colorHighlightCount < colors.length) {
        if ($("#" + colors[colorHighlightCount]).hasClass("blue")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("blue-highlighted")
            }, 300)
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("red")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("red-highlighted")
            }, 300)
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("green")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("green-highlighted")
            }, 300)
        }
        else if ($("#" + colors[colorHighlightCount]).hasClass("yellow")) {
            setTimeout(function() {
                $("#" + colors[colorHighlightCount]).addClass("yellow-highlighted")
            }, 300)
        }

        setTimeout(function() {
            colorHighlightCount++
            highlightColors();
            $("div").removeClass("blue-highlighted")
            $("div").removeClass("red-highlighted")
            $("div").removeClass("yellow-highlighted")
            $("div").removeClass("green-highlighted")
        }, 1750)
    }
}

//Difficulty buttons
$(".easy").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $(".easy").removeClass("not-selected-difficulty").addClass("selected-difficulty")
        $(".hard").removeClass("selected-difficulty").addClass("not-selected-difficulty")
        difficulty = 2
        console.log(difficulty)
        $(".table").html("")
        $(".leaderboard-title").css("display", "none")
    }
});

$(".hard").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $(".easy").addClass("not-selected-difficulty").removeClass("selected-difficulty")
        $(".hard").addClass("selected-difficulty").removeClass("not-selected-difficulty")
        difficulty = 1
        console.log(difficulty)
        $(".table").html("")
        $(".leaderboard-title").css("display", "none")
    }
});

//Leaderboard functionality

//Access score data
$(".show-scores").on("click", function() {
    if ($(this).hasClass("active-button")) {
        $("#myModal").css("display", "block")
        $(".submit-score").css("display", "none")
        $(".leaderboard-title").css("display", "none")
        $(".table").html("")
        showTable()
    }
});

//Load hard scores
function loadHardScores() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "assets/scores/hard-scores.csv")
    xhr.send()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hardScores = JSON.parse(this.responseText);
            hardScores.sort(function(a, b) {
                return b.score - a.score;
            });
            return hardScores
        }
    }
}

//Load easy scores
function loadEasyScores() {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "assets/scores/easy-scores.csv")
    xhr.send()

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            easyScores = JSON.parse(this.responseText);
            easyScores.sort(function(a, b) {
                return b.score - a.score;
            });
            return easyScores
        }
    }
}

//Show leaderboard
function showTable() {
    var tablerow = []

    //If hard
    $(".leaderboard-title").css("display", "block")
    $(".leaderboard-title").html(`<h2>HARD<br>LEADERBOARD</h2>`)
    if (difficulty === 1) {
        tablerow.push(`<tr><th></th><th>Name</th><th>Score</th></tr>`)
        for (var i = 0; i < hardScores.length; i++) {
            if (i === 10) {
                break;
            }
            console.log(hardScores[i].name)
            tablerow.push(`<tr><td>${i + 1}</td><td>${hardScores[i].name}</td><td>${hardScores[i].score}</td></tr>`)
        }
        //If easy
    }
    else {
        $(".leaderboard-title").css("display", "block")
        $(".leaderboard-title").html(`<h2>EASY<br>LEADERBOARD</h2>`)
        tablerow.push(`<tr><th></th><th>Name</th><th>Score</th></tr>`)
        for (var i = 0; i < easyScores.length; i++) {
            if (i === 10) {
                break;
            }
            console.log(easyScores[i].name)
            tablerow.push(`<tr><td>${i + 1}</td><td>${easyScores[i].name}</td><td>${easyScores[i].score}</td></tr>`)
        }
    }

    $(".table").html(tablerow)
    console.log(tablerow)
}

//Show enter score form
function showScoresForm() {
    hardScores.sort(function(a, b) {
        return b.score - a.score;
    });
    easyScores.sort(function(a, b) {
        return b.score - a.score;
    });
    //If hard
    if (difficulty == 1) {
        if (turn > hardScores[9].score) {
            $("#myModal").css("display", "block")
        }
    }
    else {
        if (turn > easyScores[9].score) {
            $("#myModal").css("display", "block")
        }
    }
}

//Submit score
$(".submit-score").submit(function(event) {

    var tempScore = { "score": turn, "name": ($(this).serializeArray())[0].value }
    //If hard
    if (difficulty === 1) {
        console.log(hardScores)
        hardScores.push(tempScore)
        hardScores.sort(function(a, b) {
            return b.score - a.score;
        });
        showTable()
        //If easy
    }
    else {
        console.log(easyScores)
        easyScores.push(tempScore)
        easyScores.sort(function(a, b) {
            return b.score - a.score;
        });
        showTable()
    }
    $(".submit-score").css("display", "none")

    event.preventDefault();
});



//https://www.w3schools.com/howto/howto_css_modals.asp

//Leaderboard pop up
function leaderboardPopUp() {
    $("#myModal").css("display", "block")
}

//Close leaderboard pop up
$(".close").on("click", function() {
    $("#myModal").css("display", "none")
    $(".submit-score").css("display", "block")
})

//Close leaderboard pop up
$(window).on("click", function(e) {
    if ($(event.target).hasClass('modal')) {
        $("#myModal").css("display", "none")
        $(".submit-score").css("display", "block")
    }
})
