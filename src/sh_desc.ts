import { ShRadical, serialize as serializeShRadical } from "./sh_radical";
import { Uint } from "./uint"

/**
 * Descriptor code for The Kanji Dictionary.
 * The code reference can be found here: 
 * http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
 */
export interface ShDesc {
	/**
	 * Number of strokes in the identifying radical.
	 */
	radicalStrokes: Uint

	/**
	 * The letter for the radical in the identification system.
	 */
	radical: ShRadical

	/**
	 * The number of strokes not included in the radical.
	 */
	otherStrokes: Uint

	/**
	 * The position of the kanji in the sequence described
	 * by the other descriptor parts.
	 */
	sequence: Uint
}

export function serialize(desc: ShDesc): string {
	const radical = serializeShRadical(desc.radical)
	return `${desc.radicalStrokes}${radical}${desc.otherStrokes}.${desc.sequence}`
}