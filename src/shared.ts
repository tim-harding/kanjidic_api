export function hasProperty<K extends string>(x: object, key: K): x is { [key in K]: unknown } {
	return key in x
}