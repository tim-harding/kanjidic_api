export interface Result_Ok<T> {
	kind: "Ok"
	value: T
}

export interface Result_Err {
	kind: "Err"
	error: Error
}

export type Result<T> = Result_Ok<T> | Result_Err

export function unwrap<T>(result: Result<T>): T {
	switch (result.kind) {
		case "Ok": {
			return result.value
		}
		case "Err": {
			throw new Error("Unwrapped null")
		}
	}
}