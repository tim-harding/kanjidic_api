import { DeRoo } from "./de_roo";
import { Kuten } from "./kuten";
import { Oneill } from "./oneill";
import { isSum, isTypeFromTagged } from "../shared";
import type { Checker, Sum } from "../shared";
import { SpahnHadamitzky } from "./sh_desc";
import { isUint } from "./uint";
import type { Uint } from "./uint";
import { Unicode } from "./unicode";

export namespace Variant {
  export type KutenTag = "Jis208" | "Jis212" | "Jis213";
  export type UintTag = "Halpern" | "Nelson";
  export type DeRooTag = "DeRoo";
  export type SpahnHadamitzkyTag = "SpahnHadamitzky";
  export type UnicodeTag = "Unicode";
  export type OneillTag = "ONeill";

  export type VariantTag =
    | KutenTag
    | UintTag
    | DeRooTag
    | SpahnHadamitzkyTag
    | OneillTag
    | UnicodeTag;

  /**
   * An encoding in JIS208, JIS212, or JIS213
   */
  export interface Variant_Kuten {
    /**
     * The kind of encoding
     */
    tag: KutenTag;

    /**
     * The encoding
     */
    content: Kuten.Kuten;
  }

  /**
   * A code for a kanji in one of the following forms:
   * - `Unicode`: A unicode codepoint
   * - `Halpern`: An index number in "The New Japanese-English Character Dictionary" (1990) by Jack Halpern
   * - `Nelson`: An index number in "The Modern Reader's Japanese-English Character Dictionary" by Andrew Nelson
   */
  export interface Variant_Uint {
    /**
     * The kind of encoding
     */
    tag: UintTag;

    /**
     * The encoding
     */
    content: Uint;
  }

  export interface Variant_Unicode {
    /**
     * The kind of encoding
     */
    tag: UnicodeTag;

    /**
     * The encoding
     */
    content: Unicode.Unicode;
  }

  /**
   * A kanji code in the De Roo system
   */
  export interface Variant_DeRoo {
    /**
     * The kind of encoding
     */
    tag: DeRooTag;

    /**
     * The encoding
     */
    content: DeRoo.DeRoo;
  }

  /**
   * A kanji descriptor from "Kanji and Kana" by Spahn and Hadamitzky
   */
  export interface Variant_ShDesc {
    /**
     * The kind of encoding
     */
    tag: SpahnHadamitzkyTag;

    /**
     * The encoding
     */
    content: SpahnHadamitzky.Descriptor;
  }

  /**
   * An index into "Japanese Names" by P.G. O'Neill
   */
  export interface Variant_Oneill {
    /**
     * The kind of encoding
     */
    tag: OneillTag;

    /**
     * The encoding
     */
    content: Oneill.Oneill;
  }

  /**
   * Represents either of the following:
   * - A cross-reference to another kanji usually regarded as a variant
   * - An alternative indexing code for the current kanji
   */
  export type Variant =
    | Variant_Kuten
    | Variant_Uint
    | Variant_DeRoo
    | Variant_ShDesc
    | Variant_Oneill
    | Variant_Unicode;

  type Serializer = { (content: any): string };

  export function check(value: unknown): value is Variant {
    return isSum(value) && isTypeFromTagged(value, CHECKERS);
  }

  /**
   * Gets the string representation of a Variant.
   * @param variant The variant
   * @returns The string
   */
  export function serialize(variant: Variant): string {
    const serializer = SERIALIZERS[variant.tag];
    return serializer(variant.content);
  }

  export function isKutenVariant(
    variant: Variant
  ): variant is Variant_Kuten {
    return isKutenTag(variant.tag);
  }

  export function isUintVariant(
    variant: Variant
  ): variant is Variant_Uint {
    return isUintTag(variant.tag);
  }

  export function isDeRooVariant(
    variant: Variant
  ): variant is Variant_DeRoo {
    return variant.tag === "DeRoo";
  }

  export function isShDescVariant(
    variant: Variant
  ): variant is Variant_ShDesc {
    return variant.tag === "SpahnHadamitzky";
  }

  export function isOneillVariant(
    variant: Variant
  ): variant is Variant_Oneill {
    return variant.tag === "ONeill";
  }

  export function isUnicodeVariant(
    variant: Variant
  ): variant is Variant_Unicode {
    return variant.tag === "Unicode";
  }

  function isKutenTag(tag: VariantTag): tag is KutenTag {
    return tag in KUTEN_TAGS;
  }

  const KUTEN_TAGS: Record<KutenTag, boolean> = {
    Jis208: true,
    Jis212: true,
    Jis213: true,
  };

  function isUintTag(tag: VariantTag): tag is UintTag {
    return tag in UINT_TAGS;
  }

  const UINT_TAGS: Record<UintTag, boolean> = {
    Halpern: true,
    Nelson: true,
  };

  const SERIALIZERS: Record<VariantTag, Serializer> = {
    Jis208: Kuten.serialize,
    Jis212: Kuten.serialize,
    Jis213: Kuten.serialize,
    Unicode: Unicode.serialize,
    Halpern: serializeUint,
    Nelson: serializeUint,
    DeRoo: DeRoo.serialize,
    SpahnHadamitzky: SpahnHadamitzky.serialize,
    ONeill: Oneill.serialize,
  };

  function serializeUint(uint: Uint): string {
    return uint.toString();
  }

  const CHECKERS: Record<VariantTag, Checker<Sum, Variant>> = {
    Jis208: isVariantKuten,
    Jis212: isVariantKuten,
    Jis213: isVariantKuten,
    Unicode: isVariantUnicode,
    Halpern: isVariantUint,
    Nelson: isVariantUint,
    DeRoo: isVariantDeRoo,
    SpahnHadamitzky: isVariantShDesc,
    ONeill: isVariantOneill,
  };

  function isVariantKuten(value: Sum): value is Variant_Kuten {
    return Kuten.check(value.content);
  }

  function isVariantDeRoo(value: Sum): value is Variant_DeRoo {
    return DeRoo.check(value.content);
  }

  function isVariantOneill(value: Sum): value is Variant_Oneill {
    return Oneill.check(value.content);
  }

  function isVariantShDesc(value: Sum): value is Variant_ShDesc {
    return SpahnHadamitzky.check(value.content);
  }

  function isVariantUint(value: Sum): value is Variant_Uint {
    return isUint(value.content);
  }

  function isVariantUnicode(value: Sum): value is Variant_Unicode {
    return Unicode.check(value.content);
  }
}
