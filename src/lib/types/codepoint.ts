import { isKuten, serializeKuten } from "./kuten";
import type { Kuten } from "./kuten"
import { isSum, isTypeFromTagged, } from "../shared";
import type { Checker, Sum } from "../shared"
import { isUint } from "./uint";
import { serializeUnicode} from "./unicode";
import type { Unicode } from "./unicode";

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
	content: Unicode
}

/**
 * The code of a kanji in a given character set standard.
 */
export type Codepoint = Codepoint_Jis | Codepoint_Unicode

export function isCodepoint(value: unknown): value is Codepoint {
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<CodepointTag, Checker<Sum, Codepoint>> = {
	"Jis208": isCodepointJis,
	"Jis212": isCodepointJis,
	"Jis213": isCodepointJis,
	"Unicode": isCodepointUnicode,
}

function isCodepointJis(value: Sum): value is Codepoint_Jis {
	return isKuten(value.content)
}

function isCodepointUnicode(value: Sum): value is Codepoint_Unicode {
	return isUint(value.content)
}

export function serializeCodepoint(codepoint: Codepoint): string {
	const serializer = SERIALIZERS[codepoint.tag]
	return serializer(codepoint.content)
}

const SERIALIZERS: Record<CodepointTag, { (value: any): string }> = {
	"Jis208": serializeKuten,
	"Jis212": serializeKuten,
	"Jis213": serializeKuten,
	"Unicode": serializeUnicode,
}