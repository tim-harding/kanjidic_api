import { Character, isCharacter } from "./character"
import { KanjiAccess, urlFromKanjiAccess } from "./kanji_access"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query } from "./shared"

export interface LiteralsResponse {
	errors?: Array<string>,
	kanji: Array<Character>,
}

function isLiteralsResponse(value: unknown): value is LiteralsResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "kanji", isCharacter)
}

export async function queryLiterals(access: KanjiAccess, literals: Array<string>): Promise<LiteralsResponse | Error> {
	const url = urlFromKanjiAccess(access, "literals")
	for (const literal of literals) {
		url.searchParams.append("literal", literal)
	}
	const json = await query(url, isLiteralsResponse)
	return json
}