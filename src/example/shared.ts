import type { KanjiAccess } from "../lib/kanji_access";

export const ENDPOINT = "http://localhost:8000"

export const kanjiAccess: KanjiAccess = {
	endpointBase: ENDPOINT,
	desiredFields: {
		fields: "all",
		languages: "all",
	},
};

let nextId: number = 0

export function uniqueIndex(): number {
	return nextId++
}