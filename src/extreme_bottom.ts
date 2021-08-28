import { isNumber } from "./shared"

export namespace ExtremeBottom {
	/**
	 * The graphic element at the bottom right of a kanji.
	 */
	export const enum ExtremeBottom {
		// Dot
		FourDots = 40,
		Small,
		Water,

		// Left hook
		KanaRi,
		Seal,
		SwordBottom,
		Moon,
		DotlessInch,
		Inch,
		MouthLeftHook,
		BirdBottom,
		Animal,
		BowBottom,
		LeftHook,

		// Vertical line
		VerticalLine,
		Cross,

		// Right hook
		RightHook,
		Legs,
		Heart,
		TasseledSpearBottom,

		// Diagonal line
		KanaNo,

		// Back diagonal line
		SmallPodium,
		BackKanaNo,
		Big,
		Tree,
		SmallSpoon,
		Govern,
		Again,
		WindyAgain,
		Woman,

		// Head bottom
		HeadBottom,

		// Watakushi bottom
		WatakushiBottom,

		// Horizontal line
		HorizontalLine,
		StandingBottom,
		DishBottom,
		BottomCorner,
		Mountain,
		Mouth,
		Sun,
		Eye,
	}

	export function isExtremeBottom(value: unknown): value is ExtremeBottom {
		return isNumber(value) && 
			Number.isInteger(value) &&
			value >= ExtremeBottom.FourDots &&
			value <= ExtremeBottom.Eye
	}
}