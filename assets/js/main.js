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

//On key press - change mode
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

        $(".countdown-text").html(`<p>TIME LEFT: ${countdownTimeLeft + 1}</p>`)

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
        $(".start-game").css("visibility", "visible")
        $(".start-game").html("Play Again")
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
            $(".start-game").css("visibility", "visible")
            $(".start-game").html("Play Again")
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
            $(".countdown-text").html("")
            $(".start-game").css("visibility", "visible")
            $(".start-game").html("Play Again")
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
    $(".incorrect-message-2").css("visibility", "hidden")
    $(".incorrect-message-1").css("visibility", "hidden")
    $(".start-game").css("visibility", "hidden")
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
    $(".start-game").css("visibility", "hidden")
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
    resetVariables()
    Gameinit()
});


//Highlight colors at beginning of round
function highlightColors() {
    $(".countdown-text").html("<p>MEMORISE</p>")
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
    $(".easy").removeClass("inactive-difficulty").addClass("active-difficulty")
    $(".hard").removeClass("active-difficulty").addClass("inactive-difficulty")
    difficulty = 2
    console.log(difficulty)
    $(".table").html("")
});

$(".hard").on("click", function() {
    $(".easy").addClass("inactive-difficulty").removeClass("active-difficulty")
    $(".hard").addClass("active-difficulty").removeClass("inactive-difficulty")
    difficulty = 1
    console.log(difficulty)
    $(".table").html("")
});

//Leaderboard functionality

//Access score data
$(".show-scores").on("click", function() {
    $(".table").html("")
    showTable()
});


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

function showTable() {
    var tablerow = []

    //If hard
    if (difficulty === 1) {
        for (var i = 0; i < hardScores.length; i++) {
            if (i === 10) { break; }
            console.log(hardScores[i].name)
            tablerow.push(`<p>${hardScores[i].name}    ${hardScores[i].score}</p>`)
        }
        //If easy
    }
    else {
        for (var i = 0; i < easyScores.length; i++) {
            if (i === 10) { break; }
            console.log(easyScores[i].name)
            tablerow.push(`<p>${easyScores[i].name}    ${easyScores[i].score}</p>`)
        }
    }


    $(".table").html(tablerow)
}

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
            $(".submit-score").css("visibility", "visible")
        }
    }
    else {
        if (turn > easyScores[9].score) {
            $(".submit-score").css("visibility", "visible")
        }
    }
}

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

    $(".submit-score").css("visibility", "hidden")

    event.preventDefault();
});


//Modal Add own comments
//https://www.w3schools.com/howto/howto_css_modals.asp

// When the user clicks on the button, open the modal 
$("#myBtn").on("click", function() {
    $("#myModal").css("display", "block")
})


// When the user clicks on <span> (x), close the modal

$(".close").on("click", function() {
    $("#myModal").css("display", "none")
})

//When the user clicks anywhere outside of the modal, close it
$(window).on("click", function(e) {
    console.log(e.target)
     if($(event.target).hasClass('modal')) {
        $("#myModal").css("display", "none")
    }
})

