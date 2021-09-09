import { isCharacter } from "./kanji"
import type { Kanji } from "./kanji"
import { urlFromKanjiAccess } from "./kanji_access"
import type { KanjiAccess } from "./kanji_access"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query } from "./shared"

export interface DecompositionResponse {
	errors?: string[],
	validNext: string[],
	kanji: Kanji[],
}

function isDecompositionResponse(value: unknown): value is DecompositionResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "kanji", isCharacter) &&
		hasArrayProperty(value, "validNext", isString)
}

export async function queryDecompositionChecked(access: KanjiAccess, radicals: string): Promise<DecompositionResponse | Error> {
	return await queryDecomposition(access, radicals, isDecompositionResponse)
}

export async function queryDecompositionUnchecked(access: KanjiAccess, radicals: string): Promise<DecompositionResponse | Error> {
	return await queryDecomposition(access, radicals, noopChecker)
}

function noopChecker(_: unknown): _ is DecompositionResponse {
	return true
}

async function queryDecomposition(access: KanjiAccess, radicals: string, checker: { (json: unknown): json is DecompositionResponse }): Promise<DecompositionResponse | Error> {
	if (radicals.length === 0) {
		return new Error("No radicals in query is invalid")
	}
	const url = urlFromKanjiAccess(access, `decomposition/${radicals}`)
	for (const radical of radicals) {
		url.searchParams.append("radical", radical)
	}
	const json = await query(url, checker)
	return json
}