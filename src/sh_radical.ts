import { err, ok, Result } from "./result"

/**
 * An identifying radical in the Spahn and Hadamitzky classification system.
 */
export enum ShRadical {
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	J,
	K,
	L,
	M,
	N,
	O,
	P,
	Q,
	R,
	S,
	T,
	U,
	V,
	W,
	X,
	Y,
	Z,
}

export function serialize(radical: ShRadical): string {
	return SERIALIZE_MAPPING[radical as number] as string
}

export function deserialize(char: string): Result<ShRadical> {
	const mapped = DESERIALIZE_MAPPING[char];
	if (mapped === undefined) {
		return err("Unrecognized radical character")
	}
	return ok(mapped);
}

export function isShRadical(value: unknown): value is ShRadical {

}

const DESERIALIZE_MAPPING: Record<string, ShRadical> = {
		"a": ShRadical.A,
		"b": ShRadical.B,
		"c": ShRadical.C,
		"d": ShRadical.D,
		"e": ShRadical.E,
		"f": ShRadical.F,
		"g": ShRadical.G,
		"h": ShRadical.H,
		"i": ShRadical.I,
		"j": ShRadical.J,
		"k": ShRadical.K,
		"l": ShRadical.L,
		"m": ShRadical.M,
		"n": ShRadical.N,
		"o": ShRadical.O,
		"p": ShRadical.P,
		"q": ShRadical.Q,
		"r": ShRadical.R,
		"s": ShRadical.S,
		"t": ShRadical.T,
		"u": ShRadical.U,
		"v": ShRadical.V,
		"w": ShRadical.W,
		"x": ShRadical.X,
		"y": ShRadical.Y,
		"z": ShRadical.Z,
}

const SERIALIZE_MAPPING = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
]