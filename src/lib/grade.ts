import { Checker, hasUintProperty, isTagged, isTypeFromTagged, Tagged } from "./shared";
import { Uint } from "./uint"

export type KyouikuTag = "Kyouiku"

/**
 * A remaining Jouyou kanji to be learned in junior hi-school.
 */
export type JouyouTag = "Jouyou"

/**
 * A Jinmeiyou kanji for use in names that is approved for use in 
 * family name registers and other official documents.
 */
export type JinmeiyouTag = "Jinmeiyou"

/**
 * A Jinmeiyou kanji that is a variant of a Jouyou kanji.
 */
export type JinmeiyouJouyouVariantTag = "JinmeiyouJouyouVariant"

export type GradeOtherTag = JouyouTag |
	JinmeiyouTag |
	JinmeiyouJouyouVariantTag
	
export type GradeTag = GradeOtherTag | KyouikuTag

/**
 * A Kyouiku kanji learned in grades 1-6. 
 */
export interface Grade_Kyouiku {
	tag: KyouikuTag
	content: Uint
}

/**
 * Represents a kanji that is learned outside grades 1-6
 */
export interface Grade_Other {
	tag: GradeOtherTag
}

/**
 * The grade in which a kanji is introduced to Japanese children.
 */
export type Grade = Grade_Kyouiku | Grade_Other;

export function isGrade(value: unknown): value is Grade {
	return isTagged(value) &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<GradeTag, Checker<Tagged, Grade>> = {
	"Kyouiku": isGradeKyouiku,
	"Jouyou": isGradeOther,
	"Jinmeiyou": isGradeOther,
	"JinmeiyouJouyouVariant": isGradeOther,
}

function isGradeKyouiku(value: Tagged): value is Grade_Kyouiku {
	return hasUintProperty(value, "content")
}

function isGradeOther(value: Tagged): value is Grade_Other {
	value // Appease type checker
	return true
}