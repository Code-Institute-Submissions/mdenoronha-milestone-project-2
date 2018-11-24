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
            console.log("Loss")
            deactivateColors()
            resetVariables()
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
            deactivateColors()
            console.log("Loss")
            clearTimeout(timeOut)
            console.log(colors)
        }
    }
}

//Make colors active and clickable
function activateColors() {
    $("div").addClass("active")
}

//Make colors inactive and not clickable
function deactivateColors() {
    $("div").removeClass("active")
}


//Start game
function Gameinit() {
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
            $("#" + colors[colorHighlightCount]).css("border", "20px solid black")
        }, 300)
        setTimeout(function() {
            highlightColors();
            colorHighlightCount++
            $("div").css("border", "none")
        }, 1750)
    }
}

//Difficulty buttons
$(".easy").on("click", function() {
    difficulty = 2
    console.log(difficulty)
});

$(".hard").on("click", function() {
    difficulty = 1
    console.log(difficulty)
});
