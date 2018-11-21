var colorArray
var colorLoopCount = 0


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

