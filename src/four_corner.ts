import { isObject, tryGetProperty } from "./shared"
import { Stroke } from "./stroke"

export namespace FourCorner {
	/**
	 * A kanji classification in the Four Corner Coding system. See
	 * http://www.edrdg.org/wwwjdic/FOURCORNER.html
	 * for more information.
	 */
	export interface FourCorner {
		/**
		 * The stroke at the top left corner.
		 */
		topLeft: Stroke.Stroke

		/**
		 * The stroke at the top right corner.
		 */
		topRight: Stroke.Stroke

		/**
		 * The stroke at the bottom left corner.
		 */
		bottomLeft: Stroke.Stroke

		/**
		 * The stroke at the bottom right corner.
		 */
		bottomRight: Stroke.Stroke

		/**
		 * Where necessary to differentiate between other
		 * characters with the same strokes, this extra stroke
		 * is found above the bottom right stroke.
		 */
		fifthCorner: Stroke.Stroke | undefined
	}

	/**
	 * Converts a four corner code to a string.
	 * @param fourCorner The four corner code
	 * @returns The string
	 */
	export function serialize(fourCorner: FourCorner): string {
		const { topLeft, topRight, bottomLeft, bottomRight, fifthCorner } = fourCorner
		if (fourCorner.fifthCorner === undefined) {
			return `${topLeft}${topRight}${bottomLeft}${bottomRight}`
		} else {
			return `${topLeft}${topRight}${bottomLeft}${bottomRight}.${fifthCorner}`
		}
	}

	export function fromUnknown(value: unknown): FourCorner | Error {
		if (!isObject(value)) {
			return new Error("Value is not an object")
		}
		const topLeft = tryGetStroke(value, "topLeft")
		if (topLeft instanceof Error) {
			return topLeft
		}
		const topRight = tryGetStroke(value, "topRight")
		if (topRight instanceof Error) {
			return topRight
		}
		const bottomLeft = tryGetStroke(value, "bottomLeft")
		if (bottomLeft instanceof Error) {
			return bottomLeft
		}
		const bottomRight = tryGetStroke(value, "bottomRight")
		if (bottomRight instanceof Error) {
			return bottomRight
		}
		const fifthCorner = tryGetOptionalStroke(value, "fifthCorner")
		if (fifthCorner instanceof Error) {
			return fifthCorner
		}
		return {
			topLeft,
			topRight,
			bottomLeft,
			bottomRight,
			fifthCorner,
		}
	}
	
	function tryGetOptionalStroke(value: object, propertyName: string): Stroke.Stroke | undefined | Error {
		const property = tryGetProperty(value, propertyName)
		if (property instanceof Error) {
			return undefined
		}
		if (!Stroke.isStroke(property)) {
			return new Error("Value is not a stroke variant")
		}
		return property
	}

	function tryGetStroke(value: object, propertyName: string): Stroke.Stroke | Error {
		const property = tryGetProperty(value, propertyName)
		if (property instanceof Error) {
			return property
		}
		if (!Stroke.isStroke(property)) {
			return new Error("Value is not a stroke variant")
		}
		return property
	}
}