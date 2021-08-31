import { hasStringProperty, hasUintProperty, isArrayOf, isObject, query, rethrowable } from "./shared";
import { Uint } from "./uint";

export interface RadicalAll {
	stroke: Uint,
	literal: string,
}

export function isRadicalAll(value: unknown): value is RadicalAll {
	return isObject(value) &&
		hasUintProperty(value, "stroke") &&
		hasStringProperty(value, "literal")
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