import { isLanguage } from "./language"
import type { Language } from "./language"
import { all, isArrayOf, isObject, isString } from "../shared"

export type Translations = Partial<Record<Language, Translation>>

export type Translation = Array<string>

export function isTranslations(value: unknown): value is Translations {
	return isObject(value) &&
		all(Object.keys(value), isLanguage) &&
		all(Object.values(value), isTranslation)
}

function isTranslation(value: unknown): value is Translation {
	return isArrayOf(value, isString)
}