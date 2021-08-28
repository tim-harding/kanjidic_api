import { hasStringProperty, hasUintProperty, isObject } from "./shared";
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

const GRADE_OTHER_TAGS: Record<GradeOtherTag, boolean> = {
	"Jouyou": true,
	"Jinmeiyou": true,
	"JinmeiyouJouyouVariant": true,
}

function isGradeOtherTag(tag: string): tag is GradeOtherTag {
	return tag in GRADE_OTHER_TAGS
}

function isGradeKyouikuTag(tag: string): tag is KyouikuTag {
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