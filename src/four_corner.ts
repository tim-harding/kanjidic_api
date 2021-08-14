export class FourCorner {
	readonly topLeft: Stroke
	readonly topRight: Stroke
	readonly bottomLeft: Stroke
	readonly bottomRight: Stroke
	readonly fifthCorner: Stroke | null

	constructor(
		topLeft: Stroke,
		topRight: Stroke,
		bottomLeft: Stroke,
		bottomRight: Stroke,
		fifthCorner: Stroke | null) {
		this.topLeft = topLeft
		this.topRight = topRight
		this.bottomLeft = bottomLeft
		this.bottomRight = bottomRight
		this.fifthCorner = fifthCorner
	}
}

const enum Stroke {
	/// 亠
	Lid,
	/// 一
	LineHorizontal,
	/// ｜
	LineVertical,
	/// 丶
	Dot,
	/// 十
	Cross,
	/// キ
	Skewer,
	/// 口
	Box,
	/// 厂
	Angle,
	/// 八
	Hachi,
	/// 小
	Chiisai,
}