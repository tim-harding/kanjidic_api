import { Uint } from "./uint"

/**
 * The grade in which a kanji is introduced to Japanese children.
 */
export type Grade = Grade_Kyouiku | Grade_Other;

/**
 * A Kyouiku kanji learned in grades 1-6. 
 */
export interface Grade_Kyouiku {
	kind: "Kyouiku"
	grade: Uint
}

/**
 * Depending on the `kind`, this represents a kanji that is learned in one of the following:
 * - `Jouyou`: A remaining Jouyou kanji to be learned in junior hi-school.
 * - `Jinmeiyou` A Jinmeiyou kanji for use in names that is approved for use in family name registers and other official documents.
 * - `JinmeiyouJouyouVariant`: A Jinmeiyou kanji that is a variant of a Jouyou kanji.
 */
export interface Grade_Other {
	kind: "Jouyou" | "Jinmeiyou" | "JinmeiyouJouyouVariant"
}