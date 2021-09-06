import { isCharacter } from "./character"
import type { Character } from "./character"
import { urlFromKanjiAccess } from "./kanji_access"
import type { KanjiAccess } from "./kanji_access"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query } from "./shared"

export interface DecompositionResponse {
	errors?: string[],
	validNext: string[],
	kanji: Character[],
}

function isDecompositionResponse(value: unknown): value is DecompositionResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "kanji", isCharacter) &&
		hasArrayProperty(value, "validNext", isString)
}

export async function queryDecomposition(access: KanjiAccess, radicals: Array<string>): Promise<DecompositionResponse | Error> {
	const url = urlFromKanjiAccess(access, "decomposition")
	for (const radical of radicals) {
		url.searchParams.append("radical", radical)
	}
	const json = await query(url, isDecompositionResponse)
	return json
}