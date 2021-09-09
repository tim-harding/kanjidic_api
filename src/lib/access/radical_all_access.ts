import { hasArrayProperty, hasUintProperty, isArrayOf, isObject, isString, query } from "../shared";
import type { Uint } from "../uint";

export interface RadicalAll {
	strokes: Uint,
	literals: string[],
}

export function isRadicalAll(value: unknown): value is RadicalAll {
	return isObject(value) &&
		hasUintProperty(value, "strokes") &&
		hasArrayProperty(value, "literals", isString)
}

export type AllRadicalsResponse = RadicalAll[]

function isRadicalAllResponse(value: unknown): value is AllRadicalsResponse {
	return isArrayOf(value, isRadicalAll)
}

export async function queryAllRadicals(endpointBase: string): Promise<AllRadicalsResponse | Error> {
	const url = new URL("/radicals/all", endpointBase)
	const json = await query(url, isRadicalAllResponse)
	return json	
}