import { Kunyomi } from "./kunyomi";
import { PinYin } from "./pinyin";

/**
 * The modern romanization of the Chinese reading.
 */
export interface Reading_PinYin {
	/**
	 * The kind of reading.
	 */
	tag: "PinYin"
	
	/**
	 * The reading.
	 */
	value: PinYin
}

/**
 * The kunyomi reading of the kanji in hiragana or katakana.
 */
export interface Reading_Kunyomi {
	/**
	 * The kind of reading.
	 */
	tag: "Kunyomi"
	
	/**
	 * The reading.
	 */
	value: Kunyomi
}

/**
 * The romanized form of the Korean reading.
 */
export type KoreanRomanized = "KoreanRomanized"

/**
 * The Korean reading of the kanji in Hangul.
 */
export type KoreanHangul = "KoreanHangul"

/**
 * The Vietnamese reading supplied by Minh Chau Pham.
 */
export type Vietnam = "Vietnam"

/**
 * The onyomi reading of the kanji in katakana.
 */
export type Onyomi = "Onyomi"

/**
 * A kanji reading that can be expressed as plain text.
 */
export interface Reading_String {
	/**
	 * The kind of reading.
	 */
	tag: KoreanRomanized |
		KoreanHangul |
		Vietnam |
		Onyomi
		
	/**
	 * The reading.
	 */
	value: string
}

/**
 * A particular reading or pronunciation of a kanji.
 */
export type Reading = Reading_PinYin | 
	Reading_Kunyomi | 
	Reading_String