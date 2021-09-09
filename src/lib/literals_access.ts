import { isCharacter } from "./kanji"
import type { Kanji } from "./kanji"
import { urlFromKanjiAccess } from "./kanji_access"
import type { KanjiAccess } from "./kanji_access"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query } from "./shared"

export interface LiteralsResponse {
	errors?: Array<string>,
	kanji: Array<Kanji>,
}

function isLiteralsResponse(value: unknown): value is LiteralsResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "kanji", isCharacter)
}

export async function queryLiteralsChecked(access: KanjiAccess, literals: string): Promise<LiteralsResponse | Error> {
	return await queryLiterals(access, literals, isLiteralsResponse)
}

export async function queryLiteralsUnchecked(access: KanjiAccess, literals: string): Promise<LiteralsResponse | Error> {
	return await queryLiterals(access, literals, noopChecker)
}

function noopChecker(_: unknown): _ is LiteralsResponse {
	return true
}

async function queryLiterals(access: KanjiAccess, literals: string, checker: { (json: unknown): json is LiteralsResponse }): Promise<LiteralsResponse | Error> {
	const url = urlFromKanjiAccess(access, `literals/${literals}`)
	const json = await query(url, checker)
	return json
}