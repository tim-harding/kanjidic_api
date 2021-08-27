import { FourCorner } from "./four_corner"
import { ShDesc } from "./sh_desc"
import { Skip } from "./skip"

/**
 * The Halpern SKIP code
 */
export interface QueryCode_Skip {
	tag: "Skip"
	value: Skip
}

/**
 * Desrcriptor codes from The Kanji Dictionary
 */
export interface QueryCode_SpahnHadamitzky {
	tag: "ShDesc"
	value: ShDesc
}

/**
 * The Four Corner code
 */
export interface QueryCode_FourCorner {
	tag: "FourCorner"
	value: FourCorner
}

/**
 * A possible misclassification of the kanji
 */
export interface QueryCode_Misclassification {
	tag: "Misclassification"
	value: Misclassification
}

/**
 * Information relating to a kanji that can be
 * used for identification and lookup.
 */
export type QueryCode = QueryCode_Skip |
	QueryCode_SpahnHadamitzky |
	QueryCode_FourCorner | 
	QueryCode_Misclassification

/**
 * A possible misclassification of the kanji
 */
export interface Misclassification {
	/**
	 * The skip code of the misclassification
	 */
	skip: Skip
	
	/**
	 * The kind of misclassification
	 */
	kind: MisclassificationKind
}

/**
 * A mistake in the division of the kanji
 */
export type Position = "Position"

/**
 * A mistake in the number of strokes
 */
export type StrokeCount = "StrokeCount"

/**
 * Mistakes in both the division and the number of strokes
 */
export type StrokeAndPosition = "StrokeAndPosition"

/**
 * Ambiguous stroke counts
 */
export type Ambiguous = "Ambiguous"

/**
 * A kind of kanji misclassification
 */
export type MisclassificationKind = Position |
	StrokeCount |
	StrokeAndPosition |
	Ambiguous