import { FourCorner, isFourCorner } from "./four_corner"
import { isMisclassification, Misclassification } from "./misclassification"
import { Checker, hasProperty, hasStringProperty, isObject, isTypeFrom, Sum } from "./shared"
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
		isTypeFrom(value, TAG_HANDLERS)
}

const TAG_HANDLERS: Record<string, Checker<Sum, QueryCode>> = {
	"Skip": handleSkipTag,
	"ShDesc": handleShDescTag,
	"FourCorner": handleFourCornerTag,
	"Misclassification": handleMisclassificationTag,
}

function handleSkipTag(value: Sum): value is QueryCode_Skip {
	return isSkip(value.content)
}

function handleShDescTag(value: Sum): value is QueryCode_SpahnHadamitzky {
	return isShDesc(value.content)
}

function handleFourCornerTag(value: Sum): value is QueryCode_FourCorner {
	return isFourCorner(value.content)
}

function handleMisclassificationTag(value: Sum): value is QueryCode_Misclassification {
	return isMisclassification(value.content)
}