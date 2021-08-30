import { hasOptionalStringProperty, hasOptionalUintProperty, hasUintProperty, isObject } from "./shared";
import { Uint } from "./uint";

export type MoroSuffixKind = "P" | "X" | "PX"

/**
 * An entry in the dictionary Daikanwajiten.
 */
export interface Moro {
	/**
	 * The volume, if available
	 */
	volume?: Uint

	/**
	 * The page number, if available
	 */
	page?: Uint

	/**
	 * The item number
	 */
	index: Uint,

	/**
	 * A letter that appears after the index, if applicable
	 */
	suffix?: MoroSuffixKind
}

/**
 * Combines the Moro reference index and suffix into a string for display.
 * @param moro The moro reference
 * @returns The string
 */
export function serializeMoroIndex(moro: Moro): string {
	if (moro.suffix === undefined) {
		return moro.index.toString()
	}
	return `${moro.index}${moro.suffix}`
}

export function isMoro(value: unknown): value is Moro {
	return isObject(value) &&
		hasOptionalUintProperty(value, "volume") &&
		hasOptionalUintProperty(value, "page") &&
		hasUintProperty(value, "index") &&
		hasOptionalStringProperty(value, "suffix") &&
		(value.suffix === undefined || isMoroSuffixKind(value.suffix))
}

function isMoroSuffixKind(str: string): str is MoroSuffixKind {
	return str in MORO_SUFFIX_KINDS
}

const MORO_SUFFIX_KINDS: Record<MoroSuffixKind, boolean> = {
	"P": true,
	"X": true,
	"PX": true,
}