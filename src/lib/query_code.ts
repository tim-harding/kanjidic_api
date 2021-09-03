import { isDeRoo } from "./de_roo"
import type { DeRoo } from "./de_roo"
import { isFourCorner } from "./four_corner"
import type { FourCorner } from "./four_corner"
import { isMisclassification } from "./misclassification"
import type { Misclassification } from "./misclassification"
import { isSum, isTypeFromTagged } from "./shared"
import type { Checker, Sum } from "./shared"
import { isShDesc } from "./sh_desc"
import type { ShDesc } from "./sh_desc"
import { isSkip } from "./skip"
import type { Skip } from "./skip"

type SkipTag = "Skip"

type SpahnHadamitzkyTag = "SpahnHadamitzky"

type FourCornerTag = "FourCorner"

type DeRooTag = "DeRoo"

type MisclassificationTag = "Misclassification"

type QueryCodeTag = SkipTag |
	SpahnHadamitzkyTag |
	FourCornerTag |
	MisclassificationTag |
	DeRooTag

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
	tag: SpahnHadamitzkyTag
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

export interface QueryCode_DeRoo {
	tag: DeRooTag,
	content: DeRoo,
}

/**
 * Information relating to a kanji that can be
 * used for identification and lookup.
 */
export type QueryCode = QueryCode_Skip |
	QueryCode_SpahnHadamitzky |
	QueryCode_FourCorner |
	QueryCode_Misclassification |
	QueryCode_DeRoo

export function isQueryCode(value: unknown): value is QueryCode {
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<QueryCodeTag, Checker<Sum, QueryCode>> = {
	"Skip": isQueryCodeSkip,
	"SpahnHadamitzky": isQueryCodeShDesc,
	"FourCorner": isQueryCodeFourCorner,
	"Misclassification": isQueryCodeMisclassification,
	"DeRoo": isQueryCodeDeRoo,
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

function isQueryCodeDeRoo(value: Sum): value is QueryCode_DeRoo {
	return isDeRoo(value.content)
}