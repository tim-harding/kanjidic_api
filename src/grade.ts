import { Uint } from "./uint"

export type Grade = Grade_Kyouiku |
	Grade_Jouyou |
	Grade_Jinmeiyou |
	Grade_JinmeiyouJouyouVariant

export class Grade_Kyouiku {
	kind: "Kyouiku" = "Kyouiku"
	// Todo: Enforce 1-6 range
	grade: Uint

	constructor(grade: Uint) {
		this.grade = grade
	}
}

export class Grade_Jouyou {
	kind: "Jouyou" = "Jouyou"
}

export class Grade_Jinmeiyou {
	kind: "Jinmeiyou" = "Jinmeiyou"
}

export class Grade_JinmeiyouJouyouVariant {
	kind: "JinmeiyouJouyouVariant" = "JinmeiyouJouyouVariant"
}