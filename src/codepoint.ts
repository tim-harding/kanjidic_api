import { isKuten, Kuten } from "./kuten";
import { hasProperty, hasStringProperty, isObject } from "./shared";
import { isUint, Uint } from "./uint";

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
 * A unicode codepoint
 */
export type Unicode = "Unicode"

/**
 * The JIS encoding standard.
 */
export type JisTag = Jis208 | Jis212 | Jis213

const JIS_TAGS: Record<JisTag, boolean> = {
	"Jis208": true,
	"Jis212": true,
	"Jis213": true,
}

function isJisTag(str: string): str is JisTag {
	return str in JIS_TAGS
}

export type CodepointTag = JisTag | Unicode

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
	tag: Unicode

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
	if (!isObject(value)) {
		return false
	}
	if (!hasStringProperty(value, "tag") || !hasProperty(value, "content")) {
		return false
	}
	const { tag, content } = value
	if (isJisTag(tag)) {
		return isKuten(content)
	} else if (tag === "Unicode") {
		return isUint(content)
	}
	return false
}