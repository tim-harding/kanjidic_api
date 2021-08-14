import { KanjidicError } from "./kanjidic_error";
import { Result, Result_Err, Result_Ok } from "./result";

type UintErrorReason = "float" | "sign"

export class UintError extends KanjidicError<UintErrorReason> { }

function reasonToMessage(reason: UintErrorReason): string {
	switch (reason) {
		case "float": {
			return "Value was not an integer"
		}
		case "sign": {
			return "Value was negative"
		}
	}
}

export class Uint {
	readonly value: number

	private constructor(value: number) {
		this.value = value
	}

	static new(value: number): Result<Uint, UintError> {
		const reason = errorReason(value)
		if (reason !== null) {
			const message = reasonToMessage(reason)
			const error = new UintError(reason, message)
			return new Result_Err(error)
		}
		const out = new Uint(value)
		return new Result_Ok(out)
	}
}

function errorReason(value: number): UintErrorReason | null {
	if (value < 0) {
		return "sign"
	}
	if (!Number.isInteger(value)) {
		return "float"
	}
	return null
}