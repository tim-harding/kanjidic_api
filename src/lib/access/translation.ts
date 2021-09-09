import { KanjiEndpoint } from "./kanji_endpoint";
import { Kanji } from "../types/kanji";
import { hasArrayProperty, isObject, query } from "../shared";

export namespace Translation {
  export interface Response {
    kanji: Kanji.Kanji[];
  }

  export async function queryChecked(
    template: KanjiEndpoint.Template,
    translation: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, translation, checkResponse);
  }

  export async function queryUnchecked(
    template: KanjiEndpoint.Template,
    translation: string
  ): Promise<Response | Error> {
    return await queryWithChecker(template, translation, noopChecker);
  }

  function checkResponse(value: unknown): value is Response {
    return isObject(value) && hasArrayProperty(value, "kanji", Kanji.check);
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  async function queryWithChecker(
    template: KanjiEndpoint.Template,
    translation: string,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    const url = KanjiEndpoint.urlFromTemplate(
      template,
      `translation/${translation}`
    );
    const json = await query(url, checker);
    return json;
  }
}
