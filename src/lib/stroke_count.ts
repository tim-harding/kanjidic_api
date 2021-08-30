import { hasArrayProperty, hasUintProperty, isObject } from "./shared";
import { isUint, Uint } from "./uint";

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

export function isStrokeCount(value: unknown): value is StrokeCount {
	return isObject(value) &&
		hasUintProperty(value, "accepted") &&
		hasArrayProperty(value, "miscounts", isUint)
}