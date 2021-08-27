import { isObject, tryGetUint, tryGetUintArray } from "./shared";
import { Uint } from "./uint";

/**
 * The number of strokes in a kanji.
 */
export interface StrokeCount {
	/**
	 * The accepted number of strokes.
	 */
	accepted: Uint
	
	/**
	 * Possible miscounts of the stroke count.
	 */
	miscounts: Array<Uint>
}

export function fromUnknown(value: unknown): StrokeCount | Error {
	if (!isObject(value)) {
		return new Error("Value is not an object")
	}
	const accepted = tryGetUint(value, "accepted")
	if (accepted instanceof Error) {
		return accepted
	}
	const miscounts = tryGetUintArray(value, "miscounts")
	if (miscounts instanceof Error) {
		return miscounts
	}
	return {
		accepted,
		miscounts,
	}
}