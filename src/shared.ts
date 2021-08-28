import { isUint, Uint } from "./uint"

export function hasProperty<K extends string>(x: object, key: K): x is { [key in K]: unknown } {
	return key in x
}

export function isObject(value: unknown): value is object {
	return (typeof value === "object") && value !== null
}

export function isNumber(value: unknown): value is number {
	return typeof value === "number"
}

export function isString(value: unknown): value is string {
	return typeof value === "string"
}

export function tryGetOptionalUint(value: object, propertyName: string): Uint | undefined | Error {
	const property = tryGetProperty(value, propertyName)
	if (property instanceof Error) {
		return undefined
	}
	if (!isNumber(property)) {
		return new Error(`Property is not a number: ${propertyName}`)
	}
	if (!isUint(property)) {
		return new Error(`Property is not a Uint: ${propertyName}`)
	}
	return property
}

export function tryGetUint(value: object, propertyName: string): Uint | Error {
	const property = tryGetProperty(value, propertyName)
	if (property instanceof Error) {
		return property
	}
	if (!isNumber(property)) {
		return new Error(`Property is not a number: ${propertyName}`)
	}
	if (!isUint(property)) {
		return new Error(`Property is not a Uint: ${propertyName}`)
	}
	return property
}

export function tryGetString(value: object, propertyName: string): string | Error {
	const property = tryGetProperty(value, propertyName)
	if (property instanceof Error) {
		return property
	}
	if (!isString(property)) {
		return new Error(`Property is not a string: ${propertyName}`)
	}
	return property
}

export function tryGetProperty(value: object, propertyName: string): unknown | Error {
	if (!hasProperty(value, propertyName)) {
		return new Error(`Missing property: ${propertyName}`)
	}
	return value[propertyName]
}

export function tryGetUintArray(value: object, propertyName: string): Array<Uint> | Error {
	const property = tryGetProperty(value, propertyName)
	if (property instanceof Error) {
		return property
	}
	if (!Array.isArray(property)) {
		return new Error(`Property is not an array: ${propertyName}`)
	}
	const out: Array<Uint> = []
	for (const element of property) {
		if (!isNumber(element)) {
			return new Error(`Property had a non-numeric array element: ${propertyName}`)
		}
		if (!isUint(element)) {
			return new Error(`Property had a non-Uint array element: ${propertyName}`)
		}
		out.push(element)
	}
	return out
}