import { Uint } from "./uint";

/**
 * An identifying characteristic of the kanji.
 */
const enum SolidSubpattern {
	/**
	 * Contains a top line.
	 */
	TopLine = 1,

	/**
	 * Contains a bottom line.
	 */
	BottomLine,

	/**
	 * Contains a through line.
	 */
	ThroughLine,

	/**
	 * Does not contain any of the above.
	 */
	Other,
}

/**
 * Left and right parts of the kanji.
 */
export interface Skip_Horizontal {
	kind: "Horizontal"
	
	/**
	 * Number of strokes in the left part.
	 */
	left: Uint
	
	/**
	 * Number of strokes in the right part.
	 */
	right: Uint
}

/**
 * Top and bottom parts of the kanji.
 */
export interface Skip_Vertical {
	kind: "Vertical"

	/**
	 * Number of strokes in the top part.
	 */
	top: Uint

	/**
	 * Number of strokes in the bottom part.
	 */
	bottom: Uint
}

/**
 * Interior and exterior parts of the kanji.
 */
export interface Skip_Enclosure {
	kind: "Enclosure"
	
	/**
	 * Number of strokes in the exterior part.
	 */
	exterior: Uint
	
	/**
	 * Number of strokes in the interior part.
	 */
	interior: Uint
}

/**
 * Classification for kanji that don't fit another pattern.
 */
export interface Skip_Solid {
	kind: "Solid"
	
	/**
	 * The total number of strokes in the kanji.
	 */
	totalStrokeCount: Uint
	
	/**
	 * The subpattern that defines the kanji.
	 */
	solidSubpattern: SolidSubpattern
}

/**
 * Kanji code from the SKIP system of indexing. See
 * http://www.edrdg.org/wwwjdic/SKIP.html
 * for reference. 
 */
export type Skip = Skip_Horizontal | Skip_Vertical | Skip_Enclosure | Skip_Solid