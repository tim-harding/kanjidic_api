import { Display } from "./interfaces"
import { Uint } from "./uint"

export class BusyPeople {
	readonly volume: Uint
	readonly chapter: Chapter

	constructor(volume: Uint, chapter: Chapter) {
		this.volume = volume
		this.chapter = chapter
	}
}

export type Chapter = Chapter_A | Chapter_Numbered;

export class Chapter_A implements Display {
	tag: "A" = "A"

	get display(): string {
		return this.tag
	}
}

export class Chapter_Numbered implements Display {
	tag: "Numbered" = "Numbered"
	readonly number: Uint

	constructor(number: Uint) {
		this.number = number
	}

	get display(): string {
		return this.number.value.toString()
	}
}