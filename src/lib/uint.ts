/**
 * Represents an integer.
 */
export type Int = number

export function isInt(value: unknown): value is Int {
	return (typeof value === "number") &&
		Number.isInteger(value)
}

/**
 * Represents an unsigned integer.
 */
export type Uint = Int

export function isUint(value: unknown): value is Uint {
	return isInt(value) &&
		value >= 0
}
