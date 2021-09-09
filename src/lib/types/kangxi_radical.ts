import { Kangxi } from "./kangxi";
import { hasProperty, hasStringProperty, isObject } from "../shared";

export namespace KangxiRadical {
  export type RadicalTag = "Classical" | "Nelson";

  /**
   * A kanji classification based on its radical.
   */
  export interface KangxiRadical {
    /**
     * The kind of radical classification
     */
    kind: RadicalTag;

    /**
     * The kangxi code for the radical
     */
    radical: Kangxi.Kangxi;
  }

  export function check(value: unknown): value is KangxiRadical {
    return (
      isObject(value) &&
      hasStringProperty(value, "kind") &&
      isRadicalTag(value.kind) &&
      hasProperty(value, "radical") &&
      Kangxi.check(value.radical)
    );
  }

  function isRadicalTag(str: string): str is RadicalTag {
    return str in RADICAL_TAGS;
  }

  const RADICAL_TAGS: Record<RadicalTag, boolean> = {
    Classical: true,
    Nelson: true,
  };
}
