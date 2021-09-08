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

export function urlFromKanjiAccess(access: KanjiAccess, route: string): URL {
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