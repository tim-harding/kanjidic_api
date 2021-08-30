import { isBusyPeople } from "./busy_people"

test("Is busy people", () => {
	const busyPeople = {
		volume: 12,
		chapter: 3,
	}
	expect(isBusyPeople(busyPeople)).toBe(true)
})