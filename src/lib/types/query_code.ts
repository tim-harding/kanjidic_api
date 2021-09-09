import { DeRoo } from "./de_roo"
import { FourCorner } from "./four_corner"
import { Misclassification } from "./misclassification"
import { isSum, isTypeFromTagged } from "../shared"
import type { Checker, Sum } from "../shared"
import { SpahnHadamitzky } from "./sh_desc"
import { Skip } from "./skip"

export type SkipTag = "Skip"
export type SpahnHadamitzkyTag = "SpahnHadamitzky"
export type FourCornerTag = "FourCorner"
export type DeRooTag = "DeRoo"
export type MisclassificationTag = "Misclassification"
export type QueryCodeTag = SkipTag |
	SpahnHadamitzkyTag |
	FourCornerTag |
	MisclassificationTag |
	DeRooTag

/**
 * The Halpern SKIP code
 */
export interface QueryCode_Skip {
	tag: SkipTag
	content: Skip.Skip
}

/**
 * Desrcriptor codes from The Kanji Dictionary
 */
export interface QueryCode_SpahnHadamitzky {
	tag: SpahnHadamitzkyTag
	content: SpahnHadamitzky.Descriptor
}

/**
 * The Four Corner code
 */
export interface QueryCode_FourCorner {
	tag: FourCornerTag
	content: FourCorner.FourCorner
}

/**
 * A possible misclassification of the kanji
 */
export interface QueryCode_Misclassification {
	tag: MisclassificationTag
	content: Misclassification.Misclassification
}

export interface QueryCode_DeRoo {
	tag: DeRooTag,
	content: DeRoo.DeRoo,
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
	return Skip.check(value.content)
}

function isQueryCodeShDesc(value: Sum): value is QueryCode_SpahnHadamitzky {
	return SpahnHadamitzky.check(value.content)
}

function isQueryCodeFourCorner(value: Sum): value is QueryCode_FourCorner {
	return FourCorner.check(value.content)
}

function isQueryCodeMisclassification(value: Sum): value is QueryCode_Misclassification {
	return Misclassification.check(value.content)
}

function isQueryCodeDeRoo(value: Sum): value is QueryCode_DeRoo {
	return DeRoo.check(value.content)
}

export function serializeQueryCode(code: QueryCode): string {
	switch (code.tag) {
		case "DeRoo": {
			return DeRoo.serialize(code.content)
		}
		case "FourCorner": {
			return FourCorner.serialize(code.content)
		}
		case "Misclassification": {
			return Misclassification.serialize(code.content)
		}
		case "Skip": {
			return Skip.serialize(code.content)
		}
		case "SpahnHadamitzky": {
			return SpahnHadamitzky.serialize(code.content)
		}
	}
}