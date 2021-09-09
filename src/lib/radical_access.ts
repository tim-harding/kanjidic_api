import { hasArrayProperty, hasOptionalArrayProperty, isObject, isString, query, hasOptionalUintProperty, hasStringProperty, } from "./shared"
import type { Uint } from "./uint";

export interface Radical {
	literal: string,
	strokes?: Uint,
	kanji?: string[],
}

export function isRadical(value: unknown): value is Radical {
	return isObject(value) &&
		hasStringProperty(value, "literal") &&
		hasOptionalUintProperty(value, "strokes") &&
		hasOptionalArrayProperty(value, "kanji", isString)
}

export type DesiredField = "strokes" | "kanji"

export interface RadicalAccess {
	endpointBase: string
	desiredFields: DesiredField[]
}

function radicalAccessToUrl(access: RadicalAccess): URL {
	const url = new URL(`/radicals/literals`, access.endpointBase)
	for (const field of access.desiredFields) {
		url.searchParams.append("field", field)
	}
	return url
}

export interface RadicalResponse {
	errors?: string[],
	radicals: Radical[],
}

function isRadicalResponse(value: unknown): value is RadicalResponse {
	return isObject(value) &&
		hasOptionalArrayProperty(value, "errors", isString) &&
		hasArrayProperty(value, "radicals", isRadical)
}

export async function queryRadicals(access: RadicalAccess): Promise<RadicalResponse | Error> {
	const url = radicalAccessToUrl(access)
	const json = await query(url, isRadicalResponse)
	return json
}