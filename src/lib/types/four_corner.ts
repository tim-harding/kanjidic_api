import { hasProperty, isObject } from "../shared";
import { Stroke } from "./stroke";

export namespace FourCorner {
  /**
   * A kanji classification in the Four Corner Coding system. See
   * http://www.edrdg.org/wwwjdic/FOURCORNER.html
   * for more information.
   */
  export interface FourCorner {
    /**
     * The stroke at the top left corner.
     */
    topLeft: Stroke.Stroke;

    /**
     * The stroke at the top right corner.
     */
    topRight: Stroke.Stroke;

    /**
     * The stroke at the bottom left corner.
     */
    bottomLeft: Stroke.Stroke;

    /**
     * The stroke at the bottom right corner.
     */
    bottomRight: Stroke.Stroke;

    /**
     * Where necessary to differentiate between other
     * characters with the same strokes, this extra stroke
     * is found above the bottom right stroke.
     */
    fifthCorner?: Stroke.Stroke;
  }

  /**
   * Converts a four corner code to a string.
   * @param fourCorner The four corner code
   * @returns The string
   */
  export function serialize(fourCorner: FourCorner): string {
    const { topLeft, topRight, bottomLeft, bottomRight, fifthCorner } =
      fourCorner;
    if (fifthCorner === undefined) {
      return `${topLeft}${topRight}${bottomLeft}${bottomRight}`;
    } else {
      return `${topLeft}${topRight}${bottomLeft}${bottomRight}.${fifthCorner}`;
    }
  }

  export function check(value: unknown): value is FourCorner {
    return (
      isObject(value) &&
      hasStrokeProperty(value, "topLeft") &&
      hasStrokeProperty(value, "topRight") &&
      hasStrokeProperty(value, "bottomLeft") &&
      hasStrokeProperty(value, "bottomRight") &&
      (!hasProperty(value, "fifthCorner") || Stroke.check(value.fifthCorner))
    );
  }

  function hasStrokeProperty<K extends string, T extends object>(
    value: T,
    key: K
  ): value is T & Record<K, Stroke.Stroke> {
    return hasProperty(value, key) && Stroke.check(value[key]);
  }
}
