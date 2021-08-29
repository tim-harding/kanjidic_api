import { isKuten, Kuten } from "./kuten";
import { Checker, hasProperty, hasStringProperty, isObject, isTypeFrom, Sum } from "./shared";
import { isUint, Uint } from "./uint";

/**
 * Encoding in JIS X 0208-1997
 */
export type Jis208Tag = "Jis208"

/**
 * Encoding in JIS X 0212-1990
 */
export type Jis212Tag = "Jis212"

/**
 * Encoding in JIS X 0213-2000
 */
export type Jis213Tag = "Jis213"

/**
 * A unicode codepoint
 */
export type UnicodeTag = "Unicode"

/**
 * The JIS encoding standard.
 */
export type JisTag = Jis208Tag | Jis212Tag | Jis213Tag

export type CodepointTag = JisTag | UnicodeTag

/**
 * A codepoint in kuten coding. 
 */
export interface Codepoint_Jis {
	/**
	 * The JIS encoding standard.
	 */
	tag: JisTag

	/**
	 * The encoding.
	 */
	content: Kuten
}

/**
 * Unicode character
 */
export interface Codepoint_Unicode {
	/**
	 * The codepoint kind.
	 */
	tag: UnicodeTag

	/**
	 * The codepoint.
	 */
	content: Uint
}

/**
 * The code of a kanji in a given character set standard.
 */
export type Codepoint = Codepoint_Jis | Codepoint_Unicode

export function isCodepoint(value: unknown): value is Codepoint {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		hasProperty(value, "content") &&
		isTypeFrom(value, TAG_HANDLERS)
}

const TAG_HANDLERS: Record<CodepointTag, Checker<Sum, Codepoint>> = {
	"Jis208": handleJisTag,
	"Jis212": handleJisTag,
	"Jis213": handleJisTag,
	"Unicode": handleUnicodeTag,
}

function handleJisTag(value: Sum): value is Codepoint_Jis {
	return isKuten(value.content)
}

function handleUnicodeTag(value: Sum): value is Codepoint_Unicode {
	return isUint(value.content)
} 