import { all, isArrayOf, isObject, isString } from "./shared"

export type Translations = Record<string, Translation>

type Translation = Array<string>

export function isTranslations(value: unknown): value is Translations {
	return isObject(value) &&
		all(Object.values(value), isTranslation)
}

function isTranslation(value: unknown): value is Translation {
	return isArrayOf(value, isString)
}