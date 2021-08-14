import { Result } from "./result";

export class Uint {
	readonly value: number

	private constructor(value: number) {
		this.value = value
	}

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