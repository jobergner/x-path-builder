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
		.gen()

	const expected = "(//div[@role='button' and .//span[contains(text(), 'foobar')] and ancestor::div[@id='fooID']])[1]"
	expect(input).toBe(expected);
});
