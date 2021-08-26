import { Uint } from "./uint"

/**
 * A reference into the book Japanese for Busy People. 
 */
export interface BusyPeople {
	readonly volume: Uint
	readonly chapter: Uint | undefined
}