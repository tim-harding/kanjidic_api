import { Kangxi } from "./kangxi";

/**
 * A kanji classification based on its radical.
 */
export interface Radical {
	/**
	 * The kind of radical classification
	 */
	tag: "Classical" | "Nelson"
	
	/**
	 * The kangxi code for the radical
	 */
	radical: Kangxi
}