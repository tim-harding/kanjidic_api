import { hasOptionalStringProperty, hasStringProperty, isObject } from "../shared";

export type KunyomiKind = "Normal" | "Prefix" | "Suffix"

/**
 * A kunyomi kanji reading.
 */
export interface Kunyomi {
	/**
	 * The kunyomi reading
	 */
	reading: string

	/**
	 * The okurigana if relevant
	 */
	okurigana?: string

	/**
	 * Whether the reading is as a prefix, suffix, or neither.
	 */
	kind: KunyomiKind
}

export function isKunyomi(value: unknown): value is Kunyomi {
	return isObject(value) &&
		hasStringProperty(value, "reading") &&
		hasOptionalStringProperty(value, "okurigana") &&
		hasStringProperty(value, "kind") &&
		isKunyomiKind(value.kind)
}

function isKunyomiKind(str: string): str is KunyomiKind {
	return str in KUNYOMI_KINDS	
}

const KUNYOMI_KINDS: Record<KunyomiKind, boolean> = {
	"Normal": true,
	"Prefix": true,
	"Suffix": true,
}