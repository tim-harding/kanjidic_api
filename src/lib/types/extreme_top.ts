import { isInt } from "./uint";

export namespace ExtremeTop {
  /**
   * The graphic element at the top left of a kanji.
   */
  export const enum ExtremeTop {
    // Dot
    Dot = 3,
    RoofDot,
    DottedCliff,
    Altar,
    KanaU,
    Lid,
    Horns,

    // Vertical line
    SmallOnBox,
    Small,
    VerticalLine,
    HandOnTheLeft,
    Cross,
    CrossOnBox,
    KanaKa,
    Woman,
    Tree,
    LetterH,

    // Diagonal line
    KanaNo,
    ManOnTheLeft,
    Thousand,
    ManOnTheTop,
    Cow,
    KanaKu,
    HillTop,
    LeftArrow,
    RoofDiagonalLine,
    X,

    // Horizontal line
    HorizontalLine,
    Fourth,
    Bald,
    Cliff,
    TopLeftCorner,
    TopRightCorner,
    UpsideDownCan,
    Mouth,
    Sun,
    EyeTop,
  }

  export function check(value: unknown): value is ExtremeTop {
    return (
      isInt(value) && value >= ExtremeTop.Dot && value <= ExtremeTop.EyeTop
    );
  }
}
