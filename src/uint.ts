/**
 * Represents an unsigned integer.
 */
export type Uint = number

export function isUint(value: unknown): value is Uint {
	return (typeof value === "number") && 
		Number.isInteger(value) && 
		value >= 0	
}
