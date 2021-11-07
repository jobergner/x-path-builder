import {select} from "./index"

test('basic test', () => {
	const input = select("div")
		.withAttributes({role: "button"})
		.hasDescendant(
			select("span").withText("foobar")
		)
		.hasAncestor(
			select("div").withAttributes({id: "fooID"})
		)
		.first()

	const expected = "(//div[@role='button' and .//span[contains(., 'foobar')] and ancestor::div[@id='fooID']])[1]"
	console.log(input)
	expect(input).toBe(expected);
});
