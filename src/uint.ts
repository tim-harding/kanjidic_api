/**
 * Represents an integer.
 */
export type Int = number

export function isInt(value: number): value is Int {
	return Number.isInteger(value)
}

/**
 * Represents an unsigned integer.
 */
export type Uint = number

export function isUint(value: number): value is Uint {
	return Number.isInteger(value) && value >= 0	
}
