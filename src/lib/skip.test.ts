import { isSkip, Skip } from "./skip"

test("Is skip", () => {
	const value: Skip = {
		tag: "Solid",
		content: {
			solidSubpattern: 1,
			totalStrokeCount: 7,
		}
	}
	expect(isSkip(value)).toBe(true)
})