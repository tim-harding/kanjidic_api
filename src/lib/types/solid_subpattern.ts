import { isInt } from "./uint"

/**
 * An identifying characteristic of the kanji.
 */
export const enum SolidSubpattern {
	/**
	 * Contains a top line.
	 */
	TopLine = 1,

	/**
	 * Contains a bottom line.
	 */
	BottomLine,

	/**
	 * Contains a through line.
	 */
	ThroughLine,

	/**
	 * Does not contain any of the above.
	 */
	Other,
}

export function serializeSolidSubpattern(pattern: SolidSubpattern): string {
	return SOLID_SUBPATTERN_NAMES[pattern as number] as string
}

const SOLID_SUBPATTERN_NAMES = [
	"", // Dummy
	"Top Line",
	"Bottom Line",
	"Through Line",
	"Other",
]

export function isSolidSubpattern(value: unknown): value is SolidSubpattern {
	return isInt(value) &&
		value >= SolidSubpattern.TopLine &&
		value <= SolidSubpattern.Other
}