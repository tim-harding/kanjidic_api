/**
 * A result variant indicating success and containing the desired value.
 */
export interface Result_Ok<T> {
	kind: "Ok"

	/**
	 * The desired value.
	 */
	value: T
}

/**
 * A result variant indicating failure and containing the error that occured. 
 */
export interface Result_Err {
	kind: "Err"

	/**
	 * The error that occured. 
	 */
	error: Error
}

/**
 * Indicates either the success or failure of an operation 
 * and contains desired result of that operation or an error that occured. 
 */
export type Result<T> = Result_Ok<T> | Result_Err

export function unwrap<T>(result: Result<T>): T {
	switch (result.kind) {
		case "Ok": {
			return result.value
		}
		case "Err": {
			throw new Error("Unwrapped Result_Err")
		}
	}
}

export function ok<T>(value: T): Result<T> {
	return {
		kind: "Ok",
		value,
	}
}

export function err<T>(message: string): Result<T> {
	return {
		kind: "Err",
		error: new Error(message),
	}
}