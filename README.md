# x-path-builder
A basic API for more readable x-path selector definitions.

### example:
```js
select("div")
		.withAttributes({role: "button"})
		.hasDescendant(
			select("span").withText("foobar")
		)
		.hasAncestor(
			select("div").withAttributes({id: "fooID"})
		)
		.gen()
```