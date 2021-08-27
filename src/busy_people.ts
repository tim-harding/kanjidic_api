import { hasProperty } from "./shared";
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

export function fromUnknown(value: unknown): BusyPeople | Error {
	if (!(typeof value === "object")) {
		return new Error("Value is not an object")
	}
	if (value === null) {
		return new Error("Value is null")
	}
	const volume = extractVolume(value)
	if (volume instanceof Error) {
		return volume
	}
	const chapter = extractChapter(value)
	if (chapter instanceof Error) {
		return chapter
	}
	return {
		volume,
		chapter,
	}
}

function extractVolume(value: object): Uint | Error {
	if (!hasProperty(value, "volume")) {
		return new Error("Missing volume property")
	}
	const volume = value.volume
	if (!(typeof volume === "number")) {
		return new Error("Volume is not a number")
	}
	return Uint.new(volume)
}

function extractChapter(value: object): Uint | undefined | Error {
	if (!hasProperty(value, "chapter")) {
		return undefined
	}
	const chapter = value.chapter
	if (!(typeof chapter === "number")) {
		return new Error("Property chapter was not a number")
	}
	return Uint.new(chapter)
}