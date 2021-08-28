import { Kuten } from "./kuten";
import { isNumber, isObject, tryGetProperty, tryGetString } from "./shared";
import { Uint } from "./uint";

export namespace Codepoint {
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
		content: Kuten.Kuten
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

	export function fromUnknown(value: unknown): Codepoint | Error {
		if (!isObject(value)) {
			return new Error("Value is not an object")
		}
		const tag = tryGetString(value, "tag")
		if (tag instanceof Error) {
			return tag
		}
		const content = tryGetProperty(value, "content")
		if (content instanceof Error) {
			return content
		}
		if (isJisTag(tag)) {
			return tryAsJis(tag, content)
		} else if (tag === "Unicode") {
			return tryAsUnicode(tag, content)
		}
		return new Error(`Unrecognized Codepoint tag: ${tag}`)
	}

	function tryAsJis(tag: JisTag, content: unknown): Codepoint_Jis | Error {
		const kuten = Kuten.fromUnknown(content)
		if (kuten instanceof Error) {
			return kuten
		}
		return {
			tag,
			content: kuten,
		}
	}

	function tryAsUnicode(tag: Unicode, content: unknown): Codepoint_Unicode | Error {
		if (!isNumber(content)) {
			return new Error("Codepoint Unicode variant content is not a string")
		}
		const uint = Uint.new(content)
		if (uint instanceof Error) {
			return uint
		}
		return {
			tag,
			content: uint,
		}
	}
}