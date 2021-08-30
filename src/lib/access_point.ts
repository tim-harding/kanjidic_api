import { Character, isCharacter } from "./character"
import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString } from "./shared"

export const LOCALHOST_BASE = "http://localhost:8000"

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
	"decompositions"

export type LanguageField = "en" |
	"fr" |
	"pt" |
	"es"

export interface Access {
	endpointBase: string
	desiredFields: DesiredFields
}

function urlFromAccess(access: Access): URL {
	const {
		endpointBase,
		desiredFields: {
			fields,
			languages,
		}
	} = access
	const url = new URL("/kanji/literals", endpointBase)
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

export interface DesiredFields {
	fields: "all" | Array<CharacterField>
	languages: "all" | Array<LanguageField>
}

export interface LiteralsResponse {
	errors: Array<string>,
	kanji: Array<Character>,
}

function isLiteralsResponse(value: unknown): value is LiteralsResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "kanji", isCharacter)
}

export async function queryLiterals(access: Access, literals: Array<string>): Promise<LiteralsResponse | Error> {
	const url = urlFromAccess(access)
	for (const literal of literals) {
		url.searchParams.append("literal", literal)
	}
	const result = await fetch(url.toString())
	if (!result.ok) {
		return new Error(`Bad server response: ${result.statusText}`)
	}
	const response = (await result.json()) as unknown
	console.log(response)
	if (!isLiteralsResponse(response)) {
		return new Error("The server response was in an unrecognized form")
	}
	return response
}