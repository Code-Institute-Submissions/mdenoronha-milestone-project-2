var colors = [];
var colorHighlightCount = 0;
var colorHighlightLength = 0;
var timeOut;
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
        //Need to fix this
        $(".countdown_text").html(`<p>${countdownTimeLeft + 1}</p>`);

        if (countdownTimeLeft > 0) {
            setTimeout('countdownAsText()', 1000);
        }
    }
}
// Timer
//Timer needs fixing, it's not ending the game (plus after colour, timer doesn't reset properly)
function timer() {
    countdownReset()
    console.log("Timer start")
    timeOut = setTimeout(function() {
        console.log("Timeout")
        $(".countdown_text").html("")
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
        }
        //If color is wrong
        else {
            showScoresForm()
            console.log("Loss")
            deactivateColors()
            clearTimeout(timeOut)
            console.log(colors)
        }
    }
    //If not last color in the array
    else {
        //If color is correct
        if (e.target.id == colors[colorNumber]) {
            console.log("Win")
            clearTimeout(timeOut)
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
            console.log(colors)
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
    resetVariables()
    Gameinit()
});


//Highlight colors at beginning of round
function highlightColors() {
    if (colorHighlightCount < colors.length - 1) {
        setTimeout(function() {
            $("#" + colors[colorHighlightCount]).addClass("highlighted")
        }, 300)
        setTimeout(function() {
            highlightColors();
            colorHighlightCount++
            $("div").removeClass("highlighted")
        }, 1750)
    }
}

//Difficulty buttons
$(".easy").on("click", function() {
    difficulty = 2
    console.log(difficulty)
    $(".show-scores").html("Easy Scores")
    $(".table").html("")
});

$(".hard").on("click", function() {
    difficulty = 1
    console.log(difficulty)
    $(".show-scores").html("Hard Scores")
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
