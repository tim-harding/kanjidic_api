import { Uint } from "./uint"

/**
 * A location in Japanese for Busy People. 
 */
export interface BusyPeople {
	/**
	 * The volume
	 */
	volume: Uint
	
	/**
	 * The chapter
	 */
	chapter: Uint | undefined
}