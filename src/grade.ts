import { hasStringProperty, hasUintProperty, isObject } from "./shared";
import { Uint } from "./uint"

export type Kyouiku = "Kyouiku"

/**
 * A remaining Jouyou kanji to be learned in junior hi-school.
 */
export type Jouyou = "Jouyou"

/**
 * A Jinmeiyou kanji for use in names that is approved for use in 
 * family name registers and other official documents.
 */
export type Jinmeiyou = "Jinmeiyou"

/**
 * A Jinmeiyou kanji that is a variant of a Jouyou kanji.
 */
export type JinmeiyouJouyouVariant = "JinmeiyouJouyouVariant"

export type GradeOtherTags = Jouyou |
	Jinmeiyou |
	JinmeiyouJouyouVariant

/**
 * A Kyouiku kanji learned in grades 1-6. 
 */
export interface Grade_Kyouiku {
	tag: Kyouiku
	content: Uint
}

/**
 * Represents a kanji that is learned outside grades 1-6
 */
export interface Grade_Other {
	tag: GradeOtherTags
}

/**
 * The grade in which a kanji is introduced to Japanese children.
 */
export type Grade = Grade_Kyouiku | Grade_Other;

const GRADE_OTHER_TAGS: Record<GradeOtherTags, boolean> = {
	"Jouyou": true,
	"Jinmeiyou": true,
	"JinmeiyouJouyouVariant": true,
}

function isGradeOtherTag(tag: string): tag is GradeOtherTags {
	return tag in GRADE_OTHER_TAGS
}

function isGradeKyouikuTag(tag: string): tag is Kyouiku {
	return tag === "Kyouiku"
}

export function isGrade(value: unknown): value is Grade {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		(
			isGradeOtherTag(value.tag) ||
			(isGradeKyouikuTag(value.tag) && hasUintProperty(value, "content"))
		)
}