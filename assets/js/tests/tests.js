var colorArray
var colorLoopCount = 0

describe("Simon Game", function() {
    describe("Number generator", function() {
        colorArray = randomColor(3)
        
        it("randomColor's length should be 3", function() {
            expect(colorArray.length).toBe(3);
        })
        for (var i = 0; i < 4; i++) {
            colorLoopCount++ 
            it("should be between 0 and 4", function() {
                //Why doesn't this work?
                expect(colorArray[colorLoopCount]).toBeLessThanOrEqual(3);
            })
            it("should be between 0 and 4", function() {
                expect(colorArray[0]).toBeGreaterThanOrEqual(0);
            })
        }
    })
})
