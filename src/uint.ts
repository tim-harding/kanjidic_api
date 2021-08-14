import { KanjidicError } from "./kanjidic_error";

type UintErrorReason = "float" | "sign"

export class UintError extends KanjidicError<UintErrorReason> {
	protected reasonToMessage(reason: UintErrorReason): string {
		switch (reason) {
			case "float": {
				return "Value was not an integer"
			}
			case "sign": {
				return "Value was negative"
			}
		}
	}
}

export class Uint {
	readonly value: number
	
	private constructor(value: number) {
		this.value = value
	}
	
	static new(value: number): Uint | UintError {
		if (value < 0) {
			return new UintError("sign")
		}
		if (!Number.isInteger(value)) {
			return new UintError("float")
		}
		return new Uint(value)
	} 
}