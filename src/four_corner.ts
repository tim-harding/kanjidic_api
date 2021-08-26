import { Stroke } from "./stroke"

/**
 * A kanji classification in the Four Corner Coding system. See
 * http://www.edrdg.org/wwwjdic/FOURCORNER.html
 * for more information.
 */
export interface FourCorner {
	/**
	 * The stroke at the top left corner.
	 */
	readonly topLeft: Stroke

	/**
	 * The stroke at the top right corner.
	 */
	readonly topRight: Stroke

	/**
	 * The stroke at the bottom left corner.
	 */
	readonly bottomLeft: Stroke

	/**
	 * The stroke at the bottom right corner.
	 */
	readonly bottomRight: Stroke

	/**
   * Where necessary to differentiate between other
   * characters with the same strokes, this extra stroke
   * is found above the bottom right stroke.
	 */
	readonly fifthCorner: Stroke | undefined
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