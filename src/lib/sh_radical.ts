/**
 * An identifying radical in the Spahn and Hadamitzky classification system.
 */
export type ShRadical = "a" |
	"b" |
	"c" |
	"d" |
	"e" |
	"f" |
	"g" |
	"h" |
	"i" |
	"j" |
	"k" |
	"l" |
	"m" |
	"n" |
	"o" |
	"p" |
	"q" |
	"r" |
	"s" |
	"t" |
	"u" |
	"v" |
	"w" |
	"x" |
	"y" |
	"z"

export function isShRadical(str: string): str is ShRadical {
	return str in SH_RADICAL_VARIANTS	
}

const SH_RADICAL_VARIANTS: Record<ShRadical, boolean> = {
  "a": true,
	"b": true,
	"c": true,
	"d": true,
	"e": true,
	"f": true,
	"g": true,
	"h": true,
	"i": true,
	"j": true,
	"k": true,
	"l": true,
	"m": true,
	"n": true,
	"o": true,
	"p": true,
	"q": true,
	"r": true,
	"s": true,
	"t": true,
	"u": true,
	"v": true,
	"w": true,
	"x": true,
	"y": true,
	"z": true,
}