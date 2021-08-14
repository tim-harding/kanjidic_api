import { Uint } from "./uint"

export type Grade = Grade_Kyouiku |
	Grade_Jouyou |
	Grade_Jinmeiyou |
	Grade_JinmeiyouJouyouVariant

export interface Grade_Kyouiku {
	kind: "Kyouiku"
	grade: Uint
}

export interface Grade_Jouyou {
	kind: "Jouyou"
}

export interface Grade_Jinmeiyou {
	kind: "Jinmeiyou"
}

export interface Grade_JinmeiyouJouyouVariant {
	kind: "JinmeiyouJouyouVariant"
}