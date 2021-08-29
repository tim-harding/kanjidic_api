import { isKunyomi, Kunyomi } from "./kunyomi";
import { isPinYin, PinYin } from "./pinyin";
import { Checker, hasProperty, hasStringProperty, isObject, isString, isTypeFrom, Sum, } from "./shared";

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
	content: Kunyomi
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
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		hasProperty(value, "content") &&
		isTypeFrom(value, TAG_HANDLERS)
}

const TAG_HANDLERS: Record<ReadingTag, Checker<Sum, Reading>> = {
	"KoreanHangul": tagStringHandler,
	"KoreanRomanized": tagStringHandler,
	"Onyomi": tagStringHandler,
	"Vietnam": tagStringHandler,
	"Kunyomi": tagKunyomiHandler,
	"PinYin": tagPinYinHandler,
}

function tagStringHandler(value: Sum): value is Reading_String {
	return isString(value.content)
}

function tagKunyomiHandler(value: Sum): value is Reading_Kunyomi {
	return isKunyomi(value.content)
}

function tagPinYinHandler(value: Sum): value is Reading_PinYin {
	return isPinYin(value.content)
}