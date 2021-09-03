import { isCharacter } from "./character"
import type { Character } from "./character"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query } from "./shared"

// Todo: Expand to information about radicals as well
// Todo: Search by translations

export type CharacterField = "codepoints" |
	"radicals" |
	"grade" |
	"strokeCounts" |
	"variants" |
	"frequency" |
	"radicalNames" |
	"jlpt" |
	"references" |
	"queryCodes" |
	"readings" |
	"translations" |
	"nanori" |
	"decomposition"

export type LanguageField = "en" |
	"fr" |
	"pt" |
	"es"

export interface KanjiAccess {
	endpointBase: string
	desiredFields: {
		fields: "all" | Array<CharacterField>
		languages: "all" | Array<LanguageField>
	}
}

type KanjiRoute = "literals" | "decomposition"

function urlFromKanjiAccess(access: KanjiAccess, route: KanjiRoute): URL {
	const {
		endpointBase,
		desiredFields: {
			fields,
			languages,
		}
	} = access
	const url = new URL(`/kanji/${route}`, endpointBase)
	switch (fields) {
		case "all": {
			url.searchParams.append("field", "all")
			break
		}
		default: {
			for (const field of fields) {
				url.searchParams.append("field", field)
			}
		}
	}
	switch (languages) {
		case "all": {
			break
		}
		default: {
			for (const language of languages) {
				url.searchParams.append("language", language)
			}
		}
	}
	return url
}

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