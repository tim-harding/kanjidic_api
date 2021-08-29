import { hasProperty, hasStringProperty, hasUintProperty, isObject } from "./shared";
import { isSolidSubpattern, SolidSubpattern } from "./solid_subpattern";
import { Uint } from "./uint";

/**
 * Left and right parts of the kanji.
 */
export interface Skip_Horizontal {
	tag: "Horizontal"

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
	tag: "Vertical"

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
	tag: "Enclosure"

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
	tag: "Solid"

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

export function isSkip(value: unknown): value is Skip {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		isSkipForTagged(value)
}

function isSkipForTagged(value: Tagged): value is Skip {
	const handler = TAG_HANDLER[value.tag]
	if (handler === undefined) {
		return false
	}
	return handler(value)
}

interface Tagged {
	tag: string,
}

type TagHandler = { (value: Tagged): value is Skip }

const TAG_HANDLER: Record<string, TagHandler> = {
	"Horizontal": handleHorizontalTag,
	"Vertical": handleVerticalTag,
	"Enclosure": handleEnclosureTag,
	"Solid": handleSolidTag,
}

function handleHorizontalTag(value: Tagged): value is Skip {
	return hasUintProperty(value, "left") &&
		hasUintProperty(value, "right")
}

function handleVerticalTag(value: Tagged): value is Skip {
	return hasUintProperty(value, "top") &&
		hasUintProperty(value, "bottom")
}

function handleEnclosureTag(value: Tagged): value is Skip {
	return hasUintProperty(value, "exterior") &&
		hasUintProperty(value, "interior")
}

function handleSolidTag(value: Tagged): value is Skip {
	return hasUintProperty(value, "totalStrokeCount") &&
		hasProperty(value, "solidSubpattern") &&
		isSolidSubpattern(value.solidSubpattern)
}