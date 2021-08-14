import { Uint } from "./uint";

export interface Chapter_A {
	kind: "A"
}

export interface Chapter_Numbered {
	kind: "Numbered"
	readonly number: Uint
}

export type Chapter = Chapter_A | Chapter_Numbered;

export function stringify(chapter: Chapter): string {
	switch (chapter.kind) {
		case "A": {
			return "A"
		}
		case "Numbered": {
			return chapter.number.toString()
		}
	}
}