export type KunyomiKind = "Normal" | "Prefix" | "Suffix"

export interface Kunyomi {
	okurigana: Array<String>
	kind: KunyomiKind
}