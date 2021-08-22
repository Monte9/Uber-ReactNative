const LocationButtonGroup = require("./LocationButtonGroup")
// @ponicode
describe("render", () => {
    let inst

    beforeEach(() => {
        inst = new LocationButtonGroup.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.render()
        }
    
        expect(callFunction).not.toThrow()
    })
})
