import { urlFromKanjiAccess } from "./kanji"
import type { KanjiAccess } from "./kanji"
import { isCharacter } from "../types/kanji"
import type { Kanji } from "../types/kanji"
import { hasArrayProperty, isObject, query } from "../shared"

export interface TranslationResponse {
	kanji: Kanji[],
}

function isTranslationResponse(value: unknown): value is TranslationResponse {
	return isObject(value) &&
		hasArrayProperty(value, "kanji", isCharacter)
}

export async function queryTranslationChecked(access: KanjiAccess, translation: string): Promise<TranslationResponse | Error> {
	return await queryTranslation(access, translation, isTranslationResponse)
}

export async function queryTranslationUnchecked(access: KanjiAccess, translation: string): Promise<TranslationResponse | Error> {
	return await queryTranslation(access, translation, noopChecker)
}

function noopChecker(_: unknown): _ is TranslationResponse {
	return true
}

async function queryTranslation(access: KanjiAccess, translation: string, checker: { (json: unknown): json is TranslationResponse }): Promise<TranslationResponse | Error> {
	const url = urlFromKanjiAccess(access, `translation/${translation}`)
	const json = await query(url, checker)
	return json
}