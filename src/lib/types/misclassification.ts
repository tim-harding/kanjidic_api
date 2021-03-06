import { hasProperty, hasStringProperty, isObject } from "../shared";
import { Skip } from "./skip";

export namespace Misclassification {
  /**
   * A possible misclassification of the kanji
   */
  export interface Misclassification {
    /**
     * The skip code of the misclassification
     */
    skip: Skip.Skip;

    /**
     * The kind of misclassification
     */
    kind: MisclassificationKind;
  }

  /**
   * A mistake in the division of the kanji
   */
  export type MisclassificationKind_Position = "Position";

  /**
   * A mistake in the number of strokes
   */
  export type MisclassificationKind_StrokeCount = "StrokeCount";

  /**
   * Mistakes in both the division and the number of strokes
   */
  export type MisclassificationKind_StrokeAndPosition = "StrokeAndPosition";

  /**
   * Ambiguous stroke counts
   */
  export type MisclassificationKind_Ambiguous = "Ambiguous";

  /**
   * A kind of kanji misclassification
   */
  export type MisclassificationKind =
    | MisclassificationKind_Position
    | MisclassificationKind_StrokeCount
    | MisclassificationKind_StrokeAndPosition
    | MisclassificationKind_Ambiguous;

  export function serialize(misclassification: Misclassification): string {
    return Skip.serialize(misclassification.skip);
  }

  export function check(value: unknown): value is Misclassification {
    return (
      isObject(value) &&
      hasProperty(value, "skip") &&
      Skip.check(value.skip) &&
      hasStringProperty(value, "kind") &&
      isMisclassificationKind(value.kind)
    );
  }

  function isMisclassificationKind(str: string): str is MisclassificationKind {
    return str in MISCLASSIFICATION_KINDS;
  }

  const MISCLASSIFICATION_KINDS: Record<MisclassificationKind, boolean> = {
    Position: true,
    StrokeCount: true,
    StrokeAndPosition: true,
    Ambiguous: true,
  };
}
