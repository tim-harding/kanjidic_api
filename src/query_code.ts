import { FourCorner, isFourCorner } from "./four_corner"
import { isMisclassification, Misclassification } from "./misclassification"
import { hasProperty, hasStringProperty, isObject } from "./shared"
import { isShDesc, ShDesc } from "./sh_desc"
import { isSkip, Skip } from "./skip"

/**
 * The Halpern SKIP code
 */
export interface QueryCode_Skip {
	tag: "Skip"
	content: Skip
}

/**
 * Desrcriptor codes from The Kanji Dictionary
 */
export interface QueryCode_SpahnHadamitzky {
	tag: "ShDesc"
	content: ShDesc
}

/**
 * The Four Corner code
 */
export interface QueryCode_FourCorner {
	tag: "FourCorner"
	content: FourCorner
}

/**
 * A possible misclassification of the kanji
 */
export interface QueryCode_Misclassification {
	tag: "Misclassification"
	content: Misclassification
}

/**
 * Information relating to a kanji that can be
 * used for identification and lookup.
 */
export type QueryCode = QueryCode_Skip |
	QueryCode_SpahnHadamitzky |
	QueryCode_FourCorner |
	QueryCode_Misclassification

export function isQueryCode(value: unknown): value is QueryCode {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		hasProperty(value, "content") &&
		(
			(value.tag === "Skip" && isSkip(value.content)) ||
			(value.tag === "ShDesc" && isShDesc(value.content)) ||
			(value.tag === "FourCorner" && isFourCorner(value.content)) ||
			(value.tag === "Misclassification" && isMisclassification(value.content))
		)
}