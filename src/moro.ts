import { Uint } from "./uint";

/**
 * An entry in the dictionary Daikanwajiten.
 */
export interface Moro {
	/**
	 * The volume, if available
	 */
	volume: Uint | undefined

	/**
	 * The page number, if available
	 */
	page: Uint | undefined
	
	/**
	 * The item number
	 */
	index: Uint,

	/**
	 * A letter that appears after the index, if applicable
	 */
	suffix: "P" | "X" | "PX" | undefined
}

/**
 * Combines the Moro reference index and suffix into a string for display.
 * @param moro The moro reference
 * @returns The string
 */
export function serializeIndex(moro: Moro): string {
	if (moro.suffix === undefined) {
		return moro.index.toString()
	}
	return `${moro.index}${moro.suffix}`
}