import { isInt } from "./uint";

export namespace SolidSubpattern {
  /**
   * An identifying characteristic of the kanji.
   */
  export const enum SolidSubpattern {
    /**
     * Contains a top line.
     */
    TopLine = 1,

    /**
     * Contains a bottom line.
     */
    BottomLine,

    /**
     * Contains a through line.
     */
    ThroughLine,

    /**
     * Does not contain any of the above.
     */
    Other,
  }

  export function serialize(pattern: SolidSubpattern): string {
    return SOLID_SUBPATTERN_NAMES[pattern as number] as string;
  }

  export function check(value: unknown): value is SolidSubpattern {
    return (
      isInt(value) &&
      value >= SolidSubpattern.TopLine &&
      value <= SolidSubpattern.Other
    );
  }

  const SOLID_SUBPATTERN_NAMES = [
    "", // Dummy
    "Top Line",
    "Bottom Line",
    "Through Line",
    "Other",
  ];
}
