import { Kanji } from "../types/kanji";
import { KanjiEndpoint } from "./kanji_endpoint";
import {
  hasArrayProperty,
  hasOptionalArrayProperty,
  isObject,
  isString,
  query,
} from "../shared";

export namespace Literals {
  export interface Response {
    errors?: string[];
    kanji: Kanji.Kanji[];
  }

  export async function queryChecked(
    template: KanjiEndpoint.Template,
    literals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, literals, checkResponse);
  }

  export async function queryUnchecked(
    template: KanjiEndpoint.Template,
    literals: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, literals, noopChecker);
  }

  function checkResponse(value: unknown): value is Response {
    return (
      isObject(value) &&
      hasOptionalArrayProperty(value, "errors", isString) &&
      hasArrayProperty(value, "kanji", Kanji.check)
    );
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  async function queryWithChecker(
    template: KanjiEndpoint.Template,
    literals: string,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    const url = KanjiEndpoint.urlFromTemplate(template, `literals/${literals}`);
    const json = await query(url, checker);
    return json;
  }
}
