import { ExtremeTop } from "./extreme_top"
import { ExtremeBottom } from "./extreme_bottom"
import { isObject, tryGetUint } from "./shared"

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
		const topUint = tryGetUint(value, "top")
		if (topUint instanceof Error) {
			return topUint
		}
		const top = topUint.value
		if (!ExtremeTop.isExtremeTop(top)) {
			return new Error("Property top is not a valid variant of ExtremeTop")
		}
		const bottomUint = tryGetUint(value, "bottom")
		if (bottomUint instanceof Error) {
			return bottomUint
		}
		const bottom = bottomUint.value
		if (!ExtremeBottom.isExtremeBottom(bottom)) {
			return new Error("Property top is not a valid variant of ExtremeBottom")
		}
		return {
			top,
			bottom,
		}
	}
}