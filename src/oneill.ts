import { Uint } from "./uint";

/**
 * An index into the Japanese Names reference book
 */
export interface Oneill {
	/**
	 * The reference number
	 */
	number: Uint,
	
	/**
	 * An optional suffix on the index
	 */
	suffix: "A" | undefined
}

/**
 * Converts a Japanese Names reference into a string representation.
 * @param oneill The reference
 * @returns The string
 */
export function serialize(oneill: Oneill): string {
	if (oneill.suffix === undefined) {
		return oneill.number.toString()
	}
	return `${oneill.number}${oneill.suffix}`
}