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