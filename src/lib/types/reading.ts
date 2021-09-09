import { Kunyomi } from "./kunyomi";
import { isPinYin } from "./pinyin";
import type { PinYin } from "./pinyin";
import { isString, isSum, isTypeFromTagged } from "../shared";
import type { Checker, Sum, } from "../shared";

export type PinYinTag = "PinYin"

export type KunyomiTag = "Kunyomi"
/**
 * The romanized form of the Korean reading.
 */
export type KoreanRomanizedTag = "KoreanRomanized"

/**
 * The Korean reading of the kanji in Hangul.
 */
export type KoreanHangulTag = "KoreanHangul"

/**
 * The Vietnamese reading supplied by Minh Chau Pham.
 */
export type VietnamTag = "Vietnam"

/**
 * The onyomi reading of the kanji in katakana.
 */
export type OnyomiTag = "Onyomi"

export type ReadingStringTag = KoreanRomanizedTag |
	KoreanHangulTag |
	VietnamTag |
	OnyomiTag
	
const READING_STRING_TAGS: Record<ReadingStringTag, boolean> = {
	"KoreanRomanized": true,
	"KoreanHangul": true,
	"Vietnam": true,
	"Onyomi": true,
}

export type ReadingTag = PinYinTag | KunyomiTag | ReadingStringTag

/**
 * The modern romanization of the Chinese reading.
 */
export interface Reading_PinYin {
	/**
	 * The kind of reading.
	 */
	tag: PinYinTag

	/**
	 * The reading.
	 */
	content: PinYin
}

/**
 * The kunyomi reading of the kanji in hiragana or katakana.
 */
export interface Reading_Kunyomi {
	/**
	 * The kind of reading.
	 */
	tag: KunyomiTag

	/**
	 * The reading.
	 */
	content: Kunyomi.Kunyomi
}

/**
 * A kanji reading that can be expressed as plain text.
 */
export interface Reading_String {
	/**
	 * The kind of reading.
	 */
	tag: ReadingStringTag

	/**
	 * The reading.
	 */
	content: string
}

/**
 * A particular reading or pronunciation of a kanji.
 */
export type Reading = Reading_PinYin |
	Reading_Kunyomi |
	Reading_String

export function isReading(value: unknown): value is Reading {
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

export function isReadingStringFromTag(reading: Reading): reading is Reading_String {
	return reading.tag in READING_STRING_TAGS
}

const CHECKERS: Record<ReadingTag, Checker<Sum, Reading>> = {
	"KoreanHangul": isReadingString,
	"KoreanRomanized": isReadingString,
	"Onyomi": isReadingString,
	"Vietnam": isReadingString,
	"Kunyomi": isReadingKunyomi,
	"PinYin": isReadingPinYin,
}

function isReadingString(value: Sum): value is Reading_String {
	return isString(value.content)
}

function isReadingKunyomi(value: Sum): value is Reading_Kunyomi {
	return Kunyomi.check(value.content)
}

function isReadingPinYin(value: Sum): value is Reading_PinYin {
	return isPinYin(value.content)
}