import { hasProperty, hasUintProperty, isObject, isSum, isTypeFromTagged } from "../shared";
import type { Checker, Sum } from "../shared";
import { isSolidSubpattern } from "./solid_subpattern";
import type { SolidSubpattern } from "./solid_subpattern";
import type { Uint } from "./uint";

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

	content: {
		/**
		 * Number of strokes in the left part.
		 */
		left: Uint

		/**
		 * Number of strokes in the right part.
		 */
		right: Uint
	}
}

/**
 * Top and bottom parts of the kanji.
 */
export interface Skip_Vertical {
	tag: VerticalTag

	content: {
		/**
		 * Number of strokes in the top part.
		 */
		top: Uint

		/**
		 * Number of strokes in the bottom part.
		 */
		bottom: Uint
	}
}

/**
 * Interior and exterior parts of the kanji.
 */
export interface Skip_Enclosure {
	tag: EnclosureTag

	content: {
		/**
		 * Number of strokes in the exterior part.
		 */
		exterior: Uint

		/**
		 * Number of strokes in the interior part.
		 */
		interior: Uint
	}
}

/**
 * Classification for kanji that don't fit another pattern.
 */
export interface Skip_Solid {
	tag: SolidTag

	content: {
		/**
		 * The total number of strokes in the kanji.
		 */
		totalStrokeCount: Uint

		/**
		 * The subpattern that defines the kanji.
		 */
		solidSubpattern: SolidSubpattern
	}
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
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<SkipTag, Checker<Sum, Skip>> = {
	"Horizontal": isSkipHorizontal,
	"Vertical": isSkipVertical,
	"Enclosure": isSkipEnclosure,
	"Solid": isSkipSolid,
}

function isSkipHorizontal(value: Sum): value is Skip_Horizontal {
	const { content } = value
	return isObject(content) &&
		hasUintProperty(content, "left") &&
		hasUintProperty(content, "right")
}

function isSkipVertical(value: Sum): value is Skip_Vertical {
	const { content } = value
	return isObject(content) &&
		hasUintProperty(content, "top") &&
		hasUintProperty(content, "bottom")
}

function isSkipEnclosure(value: Sum): value is Skip_Enclosure {
	const { content } = value
	return isObject(content) &&
		hasUintProperty(content, "exterior") &&
		hasUintProperty(content, "interior")
}

function isSkipSolid(value: Sum): value is Skip_Solid {
	const { content } = value
	return isObject(content) &&
		hasUintProperty(content, "totalStrokeCount") &&
		hasProperty(content, "solidSubpattern") &&
		isSolidSubpattern(content.solidSubpattern)
}

export function serializeSkip(skip: Skip): string {
	const parts = PARTS[skip.tag](skip)
	return `${parts.pattern}-${parts.first}-${parts.second}`
}

interface Parts {
	pattern: number,
	first: number,
	second: number,
}

const PARTS: Record<SkipTag, { (skip: any): Parts }> = {
	"Horizontal": skipHorizontalParts,
	"Vertical": skipVerticalParts,
	"Enclosure": skipEnclosureParts,
	"Solid": skipSolidParts,
}

function skipHorizontalParts(skip: Skip_Horizontal): Parts {
	const { left, right } = skip.content
	return {
		pattern: 1,
		first: left,
		second: right,
	}
}

function skipVerticalParts(skip: Skip_Vertical): Parts {
	const { top, bottom } = skip.content
	return {
		pattern: 2,
		first: top,
		second: bottom,
	}
}

function skipEnclosureParts(skip: Skip_Enclosure): Parts {
	const { exterior, interior } = skip.content
	return {
		pattern: 3,
		first: exterior,
		second: interior,
	}
}

function skipSolidParts(skip: Skip_Solid): Parts {
	const { totalStrokeCount, solidSubpattern } = skip.content
	return {
		pattern: 4,
		first: totalStrokeCount,
		second: solidSubpattern,
	}
}