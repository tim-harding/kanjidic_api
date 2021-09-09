import { isCharacter } from "../types/kanji";
import type { Kanji } from "../types/kanji";
import { KanjiEndpoint } from "./kanji_endpoint";
import {
  hasArrayProperty,
  hasOptionalArrayProperty,
  isObject,
  isString,
  query,
} from "../shared";

export interface LiteralsResponse {
  errors?: Array<string>;
  kanji: Array<Kanji>;
}

function isLiteralsResponse(value: unknown): value is LiteralsResponse {
  return (
    isObject(value) &&
    hasOptionalArrayProperty(value, "errors", isString) &&
    hasArrayProperty(value, "kanji", isCharacter)
  );
}

export async function queryLiteralsChecked(
  template: KanjiEndpoint.Template,
  literals: string
): Promise<LiteralsResponse | Error> {
  return await queryLiterals(template, literals, isLiteralsResponse);
}

export async function queryLiteralsUnchecked(
  template: KanjiEndpoint.Template,
  literals: string
): Promise<LiteralsResponse | Error> {
  return await queryLiterals(template, literals, noopChecker);
}

function noopChecker(_: unknown): _ is LiteralsResponse {
  return true;
}

async function queryLiterals(
  template: KanjiEndpoint.Template,
  literals: string,
  checker: { (json: unknown): json is LiteralsResponse }
): Promise<LiteralsResponse | Error> {
  const url = KanjiEndpoint.urlFromTemplate(template, `literals/${literals}`);
  const json = await query(url, checker);
  return json;
}
