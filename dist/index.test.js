"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
test('basic test', function () {
    var input = (0, index_1.select)("div")
        .withAttributes({ role: "button" })
        .hasDescendant((0, index_1.select)("span").withText("foobar"))
        .hasAncestor((0, index_1.select)("div").withAttributes({ id: "fooID" }))
        .gen();
    var expected = "(//div[@role='button' and .//span[contains(text(), 'foobar')] and ancestor::div[@id='fooID']])[1]";
    expect(input).toBe(expected);
});
//# sourceMappingURL=index.test.js.map