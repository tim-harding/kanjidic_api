import { KanjidicError } from "./kanjidic_error"

export type Result<T, E extends Error> = Result_Ok<T> | Result_Err<T, E>

type ResultErrorReason = "unwrapNull"

export class ResultError extends KanjidicError<ResultErrorReason> { }

export class Result_Ok<T> {
	kind: "Ok" = "Ok"
	value: T

	constructor(value: T) {
		this.value = value
	}

	unwrap(): T {
		return this.value
	}
	
	isOk(): boolean {
		return true
	}
}

export class Result_Err<T, E extends Error> {
	kind: "Err" = "Err"
	error: E

	constructor(value: E) {
		this.error = value
	}

	unwrap(): T {
		throw new ResultError("unwrapNull")
	}
	
	isOk(): boolean {
		return false
	}
}