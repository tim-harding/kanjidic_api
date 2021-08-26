import { Result } from "./result";

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
	static new(value: number): Result<Uint> {
		if (value < 0) {
			return {
				kind: "Err",
				error: new Error("Value is negative")
			}
		}
		if (!Number.isInteger(value)) {
			return {
				kind: "Err",
				error: new Error("Value is not an integer")
			}
		}
		return {
			kind: "Ok",
			value: new Uint(value),
		}
	}
}