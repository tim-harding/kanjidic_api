import { isKangxi, Kangxi } from "./kangxi";
import { hasProperty, hasStringProperty, isObject } from "./shared";

export type RadicalTag = "Classical" | "Nelson"

/**
 * A kanji classification based on its radical.
 */
export interface Radical {
	/**
	 * The kind of radical classification
	 */
	tag: RadicalTag
	
	/**
	 * The kangxi code for the radical
	 */
	radical: Kangxi
}

export function isRadical(value: unknown): value is Radical {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		isRadicalTag(value.tag) &&
		hasProperty(value, "radical") &&
		isKangxi(value.radical)
}

function isRadicalTag(str: string): str is RadicalTag {
	return str in RADICAL_TAGS
}

const RADICAL_TAGS: Record<RadicalTag, boolean> = {
	"Classical": true,
	"Nelson": true,
}