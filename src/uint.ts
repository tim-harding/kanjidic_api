/**
 * A positive integer number. 
 */
export class Uint {
	/**
	 * The numeric value
	 */
	readonly value: number

	private constructor(value: number) {
		this.value = value
	}

	/**
	 * Creates a new Uint instance.
	 * @param value The integer literal
	 * @returns The Uint instance or an error
	 */
	static new(value: number): Uint | Error {
		if (value < 0) {
			return new Error("Value is negative")
		}
		if (!Number.isInteger(value)) {
			return new Error("Value is not an integer")
		}
		return new Uint(value)
	}
}