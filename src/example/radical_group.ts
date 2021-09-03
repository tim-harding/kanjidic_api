export interface RadicalGroup {
	strokes: number
	radicals: RadicalInfo[]
}

export interface RadicalInfo {
	literal: string
	id: string
	checked: boolean
}