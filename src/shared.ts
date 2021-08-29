import { isUint, Uint } from "./uint"

export function hasProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, unknown> {
	return key in value;
}

export function hasUintProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Uint> {
	return hasProperty(value, key) &&
		isUint(value[key])
}

export function hasOptionalUintProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Uint | undefined> {
	return !hasProperty(value, key) ||
		isUint(value[key])
}

export function hasNumberProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, number> {
	return hasProperty(value, key) &&
		isNumber(value[key])
}

export function hasStringProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, string> {
	return hasProperty(value, key) &&
		isString(value[key])
}

export function hasOptionalStringProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, string | undefined> {
	return !hasProperty(value, key) ||
		isString(value[key])
}

export function hasArrayProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Array<Uint>> {
	return hasProperty(value, key) &&
		Array.isArray(value[key])
}

export function hasUintArrayProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Array<Uint>> {
	if (!hasArrayProperty(value, key)) {
		return false
	}
	for (const element of value[key]) {
		if (!isUint(element)) {
			return false
		}
	}
	return true
}

export function isObject(value: unknown): value is object {
	return (typeof value === "object") &&
		value !== null
}

export function isNumber(value: unknown): value is number {
	return typeof value === "number"
}

export function isString(value: unknown): value is string {
	return typeof value === "string"
}

export interface Tagged {
	tag: string,
}

export type TaggedChecker<T extends Tagged> = { (value: Tagged): value is T }

export function isTypeFromTagged<T extends Tagged>(value: Tagged, handlers: Record<string, TaggedChecker<T>>): value is T {
	const handler = handlers[value.tag]
	if (handler === undefined) {
		return false
	}
	return handler(value)
}

export interface Sum extends Tagged {
	content: unknown,
}

export type SumChecker<T extends Sum> = { (content: unknown): content is T }

export function isTypeFromSum<T extends Sum>(value: Sum, handlers: Record<string, SumChecker<T>>): value is T {
	const handler = handlers[value.tag]
	if (handler === undefined) {
		return false
	}
	return handler(value.content)
}