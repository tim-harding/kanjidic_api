import { isNumber } from "../shared";

export type Unicode = number;

export function isUnicode(value: unknown): value is Unicode {
	return isNumber(value)
}

export function serializeUnicode(unicode: number): string {
	return `U+${unicode.toString(16).toUpperCase()}`
}