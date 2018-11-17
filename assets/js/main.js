var colors = [];

//Push a random color to colors a certain number of times
function randomColor(numOfTimes) {
    for (i = 0; i < numOfTimes; i++) {
        var newColor = Math.floor(Math.random() * 4);
        colors.push(newColor);
    }
    return colors
}

console.log(colors);
