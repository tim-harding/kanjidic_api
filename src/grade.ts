import { isNumber, isObject, tryGetProperty, tryGetString } from "./shared";
import { Uint } from "./uint"

export namespace Grade {
	/**
	 * The grade in which a kanji is introduced to Japanese children.
	 */
	export type Grade = Grade_Kyouiku | Grade_Other;

	/**
	 * A Kyouiku kanji learned in grades 1-6. 
	 */
	export interface Grade_Kyouiku {
		tag: "Kyouiku"
		grade: Uint
	}

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

	const GRADE_OTHER_TAGS: Record<GradeOtherTags, boolean> = {
		"Jouyou": true,
		"Jinmeiyou": true,
		"JinmeiyouJouyouVariant": true,
	}
	
	function isGradeOtherTag(tag: string): tag is GradeOtherTags {
		return tag in GRADE_OTHER_TAGS
	}
	
	/**
	 * Represents a kanji that is learned outside grades 1-6
	 */
	export interface Grade_Other {
		tag: GradeOtherTags
	}
	
	export function fromUnknown(value: unknown): Grade | Error {
		if (!isObject(value)) {
			return new Error("Value is not an object")
		}
		const tag = tryGetString(value, "tag")
		if (tag instanceof Error) {
			return tag
		}
		if (isGradeOtherTag(tag)) {
			return {
				tag,
			}
		} else if (tag === "Kyouiku") {
			const gradeRaw = tryGetProperty(value, "grade")
			if (gradeRaw instanceof Error) {
				return gradeRaw
			}
			if (!isNumber(gradeRaw)) {
				return new Error("Grade property is not a number")
			}
			const grade = Test.new(gradeRaw)
			if (grade instanceof Error) {
				return grade
			}
			return {
				tag,
				grade,
			}
		}
		return new Error("Tag was not a valid Grade variant")
	}
}