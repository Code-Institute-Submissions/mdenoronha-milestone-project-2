var colors = [];
var colorHighlightCount = 0;
var colorHighlightLength = 0;
var timeOut;
var countdownTimeLeft;
var CheckedColorNumber = 0

//Push a random color to colors a certain number of times
function randomColor(numOfTimes) {
    for (i = 0; i < numOfTimes; i++) {
        var newColor = Math.floor(Math.random() * 4);
        colors.push(newColor);
    }
    return colors
}

// Timer
function timer() {
    countdownReset()
    console.log("Timer start")
    timeOut = setTimeout(function() {
        console.log("Timeout")
        $(".countdown_text").html("")
    }, 3000);
}

//Reset text timer
function countdownReset() {
    countdownTimeLeft = 3;
    countdownAsText();
}

//Timer as text
function countdownAsText() {
    if (countdownTimeLeft > 0) {
        countdownTimeLeft--;
        console.log(countdownTimeLeft + 1)
        $(".countdown_text").html(`<p>${countdownTimeLeft + 1}</p>`);

        if (countdownTimeLeft > 0) {
            setTimeout('countdownAsText()', 1000);
        }
    }
}

//Highlight colors at beginning of round
function highlightColors() {
    if (colorHighlightCount < colors.length - 1) {
        setTimeout(function() {
            $("#" + colors[colorHighlightCount]).css("border", "20px solid black")
        }, 1000)
        setTimeout(function() {
            highlightColors();
            colorHighlightCount++
            $("div").css("border", "none")
        }, 3000)
    }
}

//Check if color clicked was correct
function checkColor(e) {
    //If last color in the array
    if (CheckedColorNumber == colors.length - 1) {
        //If color is correct
        if (e.target.id == colors[CheckedColorNumber]) {
            console.log("Win")
            newRoundInit()
        }
        //If color is wrong
        else {
            console.log("Loss")
            deactivateColors()
            clearTimeout(timeOut)
            console.log(colors)
            resetVariables()
        }
    }
    //If not last color in the array
    else {
        //If color is correct
        if (e.target.id == colors[CheckedColorNumber]) {
            console.log("Win")
            clearTimeout(timeOut)
            timer()
            CheckedColorNumber++
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

