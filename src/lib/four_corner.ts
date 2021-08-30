import { hasProperty, isObject } from "./shared"
import { isStroke, Stroke } from "./stroke"

/**
 * A kanji classification in the Four Corner Coding system. See
 * http://www.edrdg.org/wwwjdic/FOURCORNER.html
 * for more information.
 */
export interface FourCorner {
	/**
	 * The stroke at the top left corner.
	 */
	topLeft: Stroke

	/**
	 * The stroke at the top right corner.
	 */
	topRight: Stroke

	/**
	 * The stroke at the bottom left corner.
	 */
	bottomLeft: Stroke

	/**
	 * The stroke at the bottom right corner.
	 */
	bottomRight: Stroke

	/**
	 * Where necessary to differentiate between other
	 * characters with the same strokes, this extra stroke
	 * is found above the bottom right stroke.
	 */
	fifthCorner?: Stroke
}

/**
 * Converts a four corner code to a string.
 * @param fourCorner The four corner code
 * @returns The string
 */
export function serializeFourCorner(fourCorner: FourCorner): string {
	const { topLeft, topRight, bottomLeft, bottomRight, fifthCorner } = fourCorner
	if (fifthCorner === undefined) {
		return `${topLeft}${topRight}${bottomLeft}${bottomRight}`
	} else {
		return `${topLeft}${topRight}${bottomLeft}${bottomRight}.${fifthCorner}`
	}
}

export function isFourCorner(value: unknown): value is FourCorner {
	return isObject(value) &&
		hasStrokeProperty(value, "topLeft") &&
		hasStrokeProperty(value, "topRight") &&
		hasStrokeProperty(value, "bottomLeft") &&
		hasStrokeProperty(value, "bottomRight") &&
		(!hasProperty(value, "fifthCorner") || isStroke(value.fifthCorner))
}

export function hasStrokeProperty<K extends string, T extends object>(value: T, key: K): value is T & Record<K, Stroke> {
	return hasProperty(value, key) && 
		isStroke(value[key])
}