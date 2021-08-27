import { isObject, tryGetOptionalUint, tryGetUint } from "./shared";
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
	if (!isObject(value)) {
		return new Error("Value is not an object")
	}
	const volume = tryGetUint(value, "volume")
	if (volume instanceof Error) {
		return volume
	}
	const chapter = tryGetOptionalUint(value, "chapter")
	if (chapter instanceof Error) {
		return chapter
	}
	return {
		volume,
		chapter,
	}
}