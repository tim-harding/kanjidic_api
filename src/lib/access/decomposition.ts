import { isCharacter } from "../types/kanji";
import type { Kanji } from "../types/kanji";
import { urlFromKanjiAccess } from "./kanji";
import type { KanjiAccess } from "./kanji";
import {
  hasArrayProperty,
  hasOptionalArrayProperty,
  isObject,
  isString,
  query,
} from "../shared";

export namespace Decomposition {
  export interface Response {
    errors?: string[];
    validNext: string[];
    kanji: Kanji[];
  }

  export async function queryChecked(
    access: KanjiAccess,
    radicals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(access, radicals, isResponse);
  }

  export async function queryUnchecked(
    access: KanjiAccess,
    radicals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(access, radicals, noopChecker);
  }

  function isResponse(
    value: unknown
  ): value is Response {
    return (
      isObject(value) &&
      hasOptionalArrayProperty(value, "errors", isString) &&
      hasArrayProperty(value, "kanji", isCharacter) &&
      hasArrayProperty(value, "validNext", isString)
    );
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  async function queryWithChecker(
    access: KanjiAccess,
    radicals: string,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    if (radicals.length === 0) {
      return new Error("No radicals in query is invalid");
    }
    const url = urlFromKanjiAccess(access, `decomposition/${radicals}`);
    for (const radical of radicals) {
      url.searchParams.append("radical", radical);
    }
    const json = await query(url, checker);
    return json;
  }
}
