

export function select(targetKind?: string): Element {
	return new Element(targetKind || "*")
}

export interface Attributes {
	[x: string]: string;
}


class Element {
	kind: string = ""
	containedText: string = ""
	attributes: Attributes = {}

	ancestor?: Element;
	descendant?: Element;

	constructor(kind: string) {
		this.kind = kind
	}

	withText(text: string) {
		this.containedText = text
		return this
	}

	withAttributes(attrs: Attributes) {
		this.attributes = {
			...this.attributes,
			...attrs,
		}
		return this
	}

	hasDescendant(el: Element) {
		this.descendant = el
		return this
	}

	hasAncestor(el: Element) {
		this.ancestor = el
		return this
	}

	gen() {
		return `(//${convertToXPath(this)})[1]`
	}
}

function convertToXPath(el: Element) {
	const attrsArray = Object.keys(el.attributes).map(key => ({key, value: el.attributes[key]}))
	const attrsStrings = attrsArray.map(({key, value}) => `@${key}='${value}'`)
	const and = attrsStrings.length === 0 ? "" : " and "
	const textQuery = !el.containedText ? "" : `${and}contains(text(), '${el.containedText}')`
	const ancestorXPath: string = !el.ancestor ? "" : `${and}ancestor::${convertToXPath(el.ancestor)}`
	const descendantXPath: string = !el.descendant ? "" : `${and}.//${convertToXPath(el.descendant)}`
	return `${el.kind}[${attrsStrings.join(" and ")}${textQuery}${descendantXPath}${ancestorXPath}]`
}
