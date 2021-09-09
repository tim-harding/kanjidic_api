import { isInt } from "./uint";

export const enum Tone {
		/**
		 * A steady high sound
		 */
    High = 1,

		/**
		 * A rising tone
		 */
    Rising,

		/**
		 * A low or dipping tone
		 */
    Low,

		/**
		 * A sharp falling tone
		 */
    Falling,
		
		/**
		 * A lack of tone
		 */
    Neutral,
}

export function isTone(value: unknown): value is Tone {
	return isInt(value) &&
		value >= Tone.High &&
		value <= Tone.Neutral
}

export function serializeTone(tone: Tone): string {
	return TONE_MAPPING[tone as number] as string
}

const TONE_MAPPING = [
	"", // Dummy
	"High",
	"Rising",
	"Low",
	"Falling",
	"Neutral",
]