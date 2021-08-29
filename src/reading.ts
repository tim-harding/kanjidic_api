import { isKunyomi, Kunyomi } from "./kunyomi";
import { isPinYin, PinYin } from "./pinyin";
import { hasProperty, hasStringProperty, isObject, isString } from "./shared";

export type PinYinTag = "PinYin"

export type KunyomiTag = "Kunyomi"

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
		isReadingForTagged(value)
}

interface Tagged {
	tag: string,
	content: unknown,
}

type TagHandler = { (value: Tagged): value is Reading }

function isReadingForTagged(value: Tagged): value is Reading {
	const handler = TAG_HANDLERS[value.tag]
	if (handler === undefined) {
		return false
	}
	return handler(value)
}

const TAG_HANDLERS: Record<string, TagHandler> = {
	"KoreanHangul": tagStringHandler,
	"KoreanRomanized": tagStringHandler,
	"Onyomi": tagStringHandler,
	"Vietnam": tagStringHandler,
	"Kunyomi": tagKunyomiHandler,
	"PinYin": tagPinYinHandler,
}

function tagStringHandler(value: Tagged): value is Reading_String {
	return isString(value.content)
}

function tagKunyomiHandler(value: Tagged): value is Reading_Kunyomi {
	return isKunyomi(value.content)
}

function tagPinYinHandler(value: Tagged): value is Reading_PinYin {
	return isPinYin(value.content)
}