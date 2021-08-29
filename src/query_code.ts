import { FourCorner, isFourCorner } from "./four_corner"
import { isMisclassification, Misclassification } from "./misclassification"
import { Checker, hasProperty, hasStringProperty, isObject, isTypeFromTagged, Sum } from "./shared"
import { isShDesc, ShDesc } from "./sh_desc"
import { isSkip, Skip } from "./skip"

type SkipTag = "Skip"

type ShDescTag = "ShDesc"

type FourCornerTag = "FourCorner"

type MisclassificationTag = "Misclassification"

type QueryCodeTag = SkipTag |
	ShDescTag |
	FourCornerTag |
	MisclassificationTag

/**
 * The Halpern SKIP code
 */
export interface QueryCode_Skip {
	tag: SkipTag
	content: Skip
}

/**
 * Desrcriptor codes from The Kanji Dictionary
 */
export interface QueryCode_SpahnHadamitzky {
	tag: ShDescTag
	content: ShDesc
}

/**
 * The Four Corner code
 */
export interface QueryCode_FourCorner {
	tag: FourCornerTag
	content: FourCorner
}

/**
 * A possible misclassification of the kanji
 */
export interface QueryCode_Misclassification {
	tag: MisclassificationTag
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
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<QueryCodeTag, Checker<Sum, QueryCode>> = {
	"Skip": isQueryCodeSkip,
	"ShDesc": isQueryCodeShDesc,
	"FourCorner": isQueryCodeFourCorner,
	"Misclassification": isQueryCodeMisclassification,
}

function isQueryCodeSkip(value: Sum): value is QueryCode_Skip {
	return isSkip(value.content)
}

function isQueryCodeShDesc(value: Sum): value is QueryCode_SpahnHadamitzky {
	return isShDesc(value.content)
}

function isQueryCodeFourCorner(value: Sum): value is QueryCode_FourCorner {
	return isFourCorner(value.content)
}

function isQueryCodeMisclassification(value: Sum): value is QueryCode_Misclassification {
	return isMisclassification(value.content)
}