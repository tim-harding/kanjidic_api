import { Kuten } from "./kuten";
import { Uint } from "./uint";

/**
 * Encoding in JIS X 0208-1997
 */
export type Jis208 = "Jis208"

/**
 * Encoding in JIS X 0212-1990
 */
export type Jis212 = "Jis212"

/**
 * Encoding in JIS X 0213-2000
 */
export type Jis213 = "Jis213"

/**
 * A codepoint in kuten coding. 
 */
export interface Codepoint_Kuten {
	/**
	 * The JIS encoding standard.
	 */
	tag: Jis208 | Jis212 | Jis213

	/**
	 * The encoding.
	 */
	value: Kuten
}

/**
 * Unicode character
 */
export interface Codepoint_Unicode {
	/**
	 * The codepoint kind.
	 */
	tag: "Unicode"

	/**
	 * The codepoint.
	 */
	value: Uint
}

/**
 * The code of a kanji in a given character set standard.
 */
export type Codepoint = Codepoint_Kuten | Codepoint_Unicode

