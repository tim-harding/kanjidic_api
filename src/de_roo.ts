import { ExtremeTop } from "./extreme_top"
import { ExtremeBottom } from "./extreme_bottom"
import { isObject, tryGetProperty } from "./shared"

export namespace DeRoo {
	/**
	 * The classification of a kanji in the De Roo system. See
	 * http://www.edrdg.org/wwwjdic/deroo.html
	 * for more information.
	 */
	export interface DeRoo {
		/**
		 * The graphic element at the top left of a kanji.
		 */
		top: ExtremeTop.ExtremeTop

		/**
		 * The graphic element at the bottom right of a kanji.
		 */
		bottom: ExtremeBottom.ExtremeBottom
	}

	/**
	 * Converts a De Roo code to a string. 
	 * @param deroo The De Roo code
	 * @returns The string
	 */
	export function serialize(deroo: DeRoo): string {
		return `${deroo.top}${deroo.bottom}`
	}

	export function fromUnknown(value: unknown): DeRoo | Error {
		if (!isObject(value)) {
			return new Error("Value is not an object")
		}
		const top = tryGetProperty(value, "top")
		if (top instanceof Error) {
			return top
		}
		if (!ExtremeTop.isExtremeTop(top)) {
			return new Error("Property top is not a valid variant of ExtremeTop")
		}
		const bottom = tryGetProperty(value, "bottom")
		if (bottom instanceof Error) {
			return bottom
		}
		if (!ExtremeBottom.isExtremeBottom(bottom)) {
			return new Error("Property top is not a valid variant of ExtremeBottom")
		}
		return {
			top,
			bottom,
		}
	}
}