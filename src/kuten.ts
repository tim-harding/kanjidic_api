import { isObject, tryGetUint } from "./shared";
import { Uint } from "./uint";

export namespace Kuten {
	/**
	 * A kuten representation of a JIS character. For more information, see
	 * http://unicode-iphone.blogspot.com/2010/05/kuten-code-to-unicode.html
	 */
	export interface Kuten {
		/**
		 * The plane on which a kuten representation is found.
		 */
		plane: Uint,

		/**
		 * The Ku part of the matrix position.
		 */
		ku: Uint,

		/**
		 * The Ten part of the matrix position.
		 */
		ten: Uint,
	}

	/**
	 * Converts a kuten code to a string representation.
	 * @param kuten The kuten code
	 * @returns The string
	 */
	export function serialize(kuten: Kuten): string {
		return `${kuten.plane}-${kuten.ku}-${kuten.ten}`
	}

	export function fromUnknown(value: unknown): Kuten | Error {
		if (!isObject(value)) {
			return new Error("Value is not an object")
		}
		const plane = tryGetUint(value, "plane")
		if (plane instanceof Error) {
			return plane
		}
		const ku = tryGetUint(value, "ku")
		if (ku instanceof Error) {
			return ku
		}
		const ten = tryGetUint(value, "ten")
		if (ten instanceof Error) {
			return ten
		}
		return {
			plane,
			ku,
			ten,
		}
	}
}