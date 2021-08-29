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

type ArrayChecker<T> = { (value: unknown): value is T }

export function hasArrayProperty<K extends string, T extends object, E>(value: T, key: K, checker: ArrayChecker<E>): value is T & Record<K, Array<Uint>> {
	return hasProperty(value, key) &&
		isArrayOf(value[key], checker)
}

export function hasOptionalArrayProperty<K extends string, T extends object, E>(value: T, key: K, checker: ArrayChecker<E>): value is T & Record<K, Array<Uint>> {
	return !hasProperty(value, key) ||
		isArrayOf(value[key], checker)
}

export function hasUintArrayProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Array<Uint>> {
	return hasArrayProperty(value, key, isUint)
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

export function isArrayOf<T>(value: unknown, checker: ArrayChecker<T>): value is Array<T> {
	if (!Array.isArray(value)) {
		return false
	}
	for (const element of value) {
		if (!checker(element)) {
			return false
		}
	}
	return true
}

export interface Tagged {
	tag: string,
}

export interface Sum extends Tagged {
	content: unknown,
}

export type Checker<E extends Tagged, T extends E> = { (value: E): value is T }

export function isTypeFromTagged<E extends Tagged, T extends E>(value: E, handlers: Record<string, Checker<E, T>>): value is T {
	const handler = handlers[value.tag]
	if (handler === undefined) {
		return false
	}
	return handler(value)
}

export function isTagged(value: unknown): value is Tagged {
	return isObject(value) &&
		hasStringProperty(value, "tag")
}

export function isSum(value: unknown): value is Sum {
	return isTagged(value) &&
		hasProperty(value, "content")
}