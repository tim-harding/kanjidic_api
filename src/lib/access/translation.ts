import { KanjiEndpoint } from "./kanji_endpoint";
import { isCharacter } from "../types/kanji";
import type { Kanji } from "../types/kanji";
import { hasArrayProperty, isObject, query } from "../shared";

export interface TranslationResponse {
  kanji: Kanji[];
}

function isTranslationResponse(value: unknown): value is TranslationResponse {
  return isObject(value) && hasArrayProperty(value, "kanji", isCharacter);
}

export async function queryTranslationChecked(
  template: KanjiEndpoint.Template,
  translation: string
): Promise<TranslationResponse | Error> {
  return await queryTranslation(template, translation, isTranslationResponse);
}

export async function queryTranslationUnchecked(
  template: KanjiEndpoint.Template,
  translation: string
): Promise<TranslationResponse | Error> {
  return await queryTranslation(template, translation, noopChecker);
}

function noopChecker(_: unknown): _ is TranslationResponse {
  return true;
}

async function queryTranslation(
  template: KanjiEndpoint.Template,
  translation: string,
  checker: { (json: unknown): json is TranslationResponse }
): Promise<TranslationResponse | Error> {
  const url = KanjiEndpoint.urlFromTemplate(
    template,
    `translation/${translation}`
  );
  const json = await query(url, checker);
  return json;
}
