var colorArray
var colorLoopCount = 0
var checkedColorNumber
var colorNumber

describe("Simon Game", function() {
    describe("Number generator", function() {
        colorArray = randomColor(3)

        //Check randomColors() produces an array of the length of the variable inputted
        it("randomColor's length should be 3", function() {
            expect(colorArray.length).toBe(3);
        })

        //with random numbers between 0 and 3
        function testColorNumbers(i) {
            it("should be between 0 and 4", function() {
                //Why doesn't this work?
                expect(colorArray[colorLoopCount]).toBeLessThanOrEqual(3);
            })
            it("should be between 0 and 4", function() {
                expect(colorArray[0]).toBeGreaterThanOrEqual(0);
            })
        }
        for (var i = 0; i < 4; i++) {
            testColorNumbers(i);
        }
    })
})

function checkColorSpyFunctions() {
    spyOn(window, 'clearTimeout')
    spyOn(window, 'newRoundInit')
    spyOn(window, 'gameOver')
    spyOn(window, 'timer')
}

var colors
var e = { target: { id: "" } };

describe("Appropriate functions should run based on user's guess", function() {
    describe("User guessed last color in series correctly", function() {
        it("newRoundInit and clearTimeout (on timeOut and textTimeOut) should run", function() {



            colors = [0, 0, 0, 3]
            //User is on the last colour to be checked before a new one is added
            colorNumber = 3
            //User has selected the correct color
            e.target.id = "3"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.clearTimeout).toHaveBeenCalledWith(textTimeOut)
            expect(window.clearTimeout).toHaveBeenCalledWith(timeOut)
            expect(window.newRoundInit).toHaveBeenCalled()
        })
    })

    describe("User guessed last color in series incorrectly", function() {
        it("game over should run", function() {

            colors = [0, 0, 0, 3]
            //User is on the last colour to be checked before a new one is added
            colorNumber = 3
            //User has selected the incorrect color
            e.target.id = "1"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.gameOver).toHaveBeenCalled()

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
    describe("User guessed color (exc. last) in series correctly", function() {
        it("timer and clearTimeout (on timeOut and textTimeOut) should run", function() {

            colors = [0, 1, 0, 0]
            //User is not on the last colour to be checked before a new one is added
            colorNumber = 1
            //User has selected the correct color
            e.target.id = "1"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.timer).toHaveBeenCalled()
            expect(window.clearTimeout).toHaveBeenCalledWith(textTimeOut)
            expect(window.clearTimeout).toHaveBeenCalledWith(timeOut)

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
    describe("User guessed color (exc. last) in series incorrectly", function() {
        it("game over should run", function() {

            colors = [0, 1, 0, 0]
            //User is not on the last colour to be checked before a new one is added
            colorNumber = 1
            //User has selected the correct color
            e.target.id = "0"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.gameOver).toHaveBeenCalled()

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
})
