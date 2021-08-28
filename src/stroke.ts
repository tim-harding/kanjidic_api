import { isNumber } from "./shared"

export namespace Stroke {
	/**
	 * A stroke in the Four Corner kanji classification system.
	 */
	export const enum Stroke {
		Lid,
		LineHorizontal,
		LineVertical,
		Dot,
		Cross,
		Skewer,
		Box,
		Angle,
		Hachi,
		Chiisai,
	}

	export function isStroke(value: unknown): value is Stroke {
		return isNumber(value) &&
			Number.isInteger &&
			value >= Stroke.Lid && 
			value <= Stroke.Chiisai
	}

	/**
	 * Gets a character representing a stroke's shape. 
	 * @param stroke The stroke
	 * @returns The string for the shape
	 */
	export function shape(stroke: Stroke): string {
		return MAPPING[stroke as number] as string
	}

	const MAPPING = [
		"亠",
		"一",
		"｜",
		"丶",
		"十",
		"キ",
		"口",
		"厂",
		"八",
		"小",
	]
}