import { hasUintArrayProperty, hasUintProperty, isObject } from "./shared";
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

export function isStrokeCount(value: unknown): value is StrokeCount {
	return isObject(value) &&
		hasUintProperty(value, "accepted") &&
		hasUintArrayProperty(value, "miscounts")
}