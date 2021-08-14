import { Stroke } from "./stroke"

export interface FourCorner {
	readonly topLeft: Stroke
	readonly topRight: Stroke
	readonly bottomLeft: Stroke
	readonly bottomRight: Stroke
	readonly fifthCorner: Stroke | null
}

export function stringify(fourCorner: FourCorner): string {
	const { topLeft, topRight, bottomLeft, bottomRight, fifthCorner } = fourCorner
	const primary = `${topLeft}${topRight}${bottomLeft}${bottomRight}`
	if (fourCorner.fifthCorner === null) {
		return primary
	} else {
		return `${primary}.${fifthCorner}`
	}
}