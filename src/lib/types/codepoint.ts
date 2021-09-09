import { Kuten } from "./kuten";
import { isSum, isTypeFromTagged } from "../shared";
import type { Checker, Sum } from "../shared";
import { isUint } from "./uint";
import { Unicode } from "./unicode";

export namespace Codepoint {
  /**
   * Encoding in JIS X 0208-1997
   */
  export type Jis208Tag = "Jis208";

  /**
   * Encoding in JIS X 0212-1990
   */
  export type Jis212Tag = "Jis212";

  /**
   * Encoding in JIS X 0213-2000
   */
  export type Jis213Tag = "Jis213";

  /**
   * A unicode codepoint
   */
  export type UnicodeTag = "Unicode";

  /**
   * The JIS encoding standard.
   */
  export type JisTag = Jis208Tag | Jis212Tag | Jis213Tag;

  export type CodepointTag = JisTag | UnicodeTag;

  /**
   * A codepoint in kuten coding.
   */
  export interface Codepoint_Jis {
    /**
     * The JIS encoding standard.
     */
    tag: JisTag;

    /**
     * The encoding.
     */
    content: Kuten.Kuten;
  }

  /**
   * Unicode character
   */
  export interface Codepoint_Unicode {
    /**
     * The codepoint kind.
     */
    tag: UnicodeTag;

    /**
     * The codepoint.
     */
    content: Unicode.Unicode;
  }

  /**
   * The code of a kanji in a given character set standard.
   */
  export type Codepoint = Codepoint_Jis | Codepoint_Unicode;

  export function check(value: unknown): value is Codepoint {
    return isSum(value) && isTypeFromTagged(value, CHECKERS);
  }

  export function serialize(codepoint: Codepoint): string {
    const serializer = SERIALIZERS[codepoint.tag];
    return serializer(codepoint.content);
  }

  const CHECKERS: Record<CodepointTag, Checker<Sum, Codepoint>> = {
    Jis208: checkCodepointJis,
    Jis212: checkCodepointJis,
    Jis213: checkCodepointJis,
    Unicode: checkCodepointUnicode,
  };

  function checkCodepointJis(value: Sum): value is Codepoint_Jis {
    return Kuten.check(value.content);
  }

  function checkCodepointUnicode(value: Sum): value is Codepoint_Unicode {
    return isUint(value.content);
  }

  const SERIALIZERS: Record<CodepointTag, { (value: any): string }> = {
    Jis208: Kuten.serialize,
    Jis212: Kuten.serialize,
    Jis213: Kuten.serialize,
    Unicode: Unicode.serialize,
  };
}
