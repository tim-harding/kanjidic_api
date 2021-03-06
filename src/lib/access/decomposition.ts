import { Kanji } from "../types/kanji";
import { KanjiEndpoint } from "./kanji_endpoint";
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
    kanji: Kanji.Kanji[];
  }

  export async function queryChecked(
    template: KanjiEndpoint.Template,
    radicals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, radicals, checkResponse);
  }

  export async function queryUnchecked(
    template: KanjiEndpoint.Template,
    radicals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, radicals, noopChecker);
  }

  function checkResponse(value: unknown): value is Response {
    return (
      isObject(value) &&
      hasOptionalArrayProperty(value, "errors", isString) &&
      hasArrayProperty(value, "kanji", Kanji.check) &&
      hasArrayProperty(value, "validNext", isString)
    );
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  async function queryWithChecker(
    template: KanjiEndpoint.Template,
    radicals: string,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    if (radicals.length === 0) {
      return new Error("No radicals in query is invalid");
    }
    const url = KanjiEndpoint.urlFromTemplate(
      template,
      `decomposition/${radicals}`
    );
    for (const radical of radicals) {
      url.searchParams.append("radical", radical);
    }
    const json = await query(url, checker);
    return json;
  }
}
