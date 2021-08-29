import { Checker, hasProperty, hasStringProperty, hasUintProperty, isObject, isTypeFromTagged, Tagged, } from "./shared";
import { isSolidSubpattern, SolidSubpattern } from "./solid_subpattern";
import { Uint } from "./uint";

type HorizontalTag = "Horizontal"

type VerticalTag = "Vertical"

type EnclosureTag = "Enclosure"

type SolidTag = "Solid"

type SkipTag = HorizontalTag |
	VerticalTag |
	EnclosureTag |
	SolidTag

/**
 * Left and right parts of the kanji.
 */
export interface Skip_Horizontal {
	tag: HorizontalTag

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
	tag: VerticalTag

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
	tag: EnclosureTag

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
	tag: SolidTag

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
export type Skip = Skip_Horizontal | 
	Skip_Vertical | 
	Skip_Enclosure | 
	Skip_Solid

export function isSkip(value: unknown): value is Skip {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<SkipTag, Checker<Tagged, Skip>> = {
	"Horizontal": isSkipHorizontal,
	"Vertical": isSkipVertical,
	"Enclosure": isSkipEnclosure,
	"Solid": isSkipSolid,
}

function isSkipHorizontal(value: Tagged): value is Skip_Horizontal {
	return hasUintProperty(value, "left") &&
		hasUintProperty(value, "right")
}

function isSkipVertical(value: Tagged): value is Skip_Vertical {
	return hasUintProperty(value, "top") &&
		hasUintProperty(value, "bottom")
}

function isSkipEnclosure(value: Tagged): value is Skip_Enclosure {
	return hasUintProperty(value, "exterior") &&
		hasUintProperty(value, "interior")
}

function isSkipSolid(value: Tagged): value is Skip_Solid {
	return hasUintProperty(value, "totalStrokeCount") &&
		hasProperty(value, "solidSubpattern") &&
		isSolidSubpattern(value.solidSubpattern)
}