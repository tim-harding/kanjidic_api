import { hasOptionalArrayProperty, hasUintProperty, isObject } from "./shared";
import { isUint } from "./uint";
import type { Uint } from "./uint";

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
	 * May be absent for an empty array. 
	 */
	miscounts?: Array<Uint>
}

export function isStrokeCount(value: unknown): value is StrokeCount {
	return isObject(value) &&
		hasUintProperty(value, "accepted") &&
		hasOptionalArrayProperty(value, "miscounts", isUint)
}