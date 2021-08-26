import { Uint } from "./uint";

/**
 * The data set does not specify chapters by number for volume 1 of Japanese for Busy People.
 * Instead, the chapters simply appear as "A." The meaning and reasoning of this is unclear
 * and the question needs to be posed to EDRDG what A stands for. 
 */
export interface Chapter_A {
	kind: "A"
}

/**
 * The number of a chapter from Japanese for Busy People.
 */
export interface Chapter_Numbered {
	kind: "Numbered"
	readonly number: Uint
}

/**
 * The number of a chapter from Japanese for Busy People or the unknown chapter 
 * specifier "A." See the union members for more details.
 */
export type Chapter = Chapter_A | Chapter_Numbered;

/**
 * Converts a Chapter to a string.
 * @param chapter The chapter
 * @returns The string
 */
export function serialize(chapter: Chapter): string {
	switch (chapter.kind) {
		case "A": {
			return "A"
		}
		case "Numbered": {
			return chapter.number.toString()
		}
	}
}