import {
  hasArrayProperty,
  hasOptionalArrayProperty,
  isObject,
  isString,
  query,
  hasOptionalUintProperty,
  hasStringProperty,
} from "../shared";
import type { Uint } from "../types/uint";

export namespace RadicalDetails {
  export interface Radical {
    literal: string;
    strokes?: Uint;
    kanji?: string[];
  }

  export type DesiredField = "strokes" | "kanji";

  export interface Template {
    endpointBase: string;
    desiredFields: DesiredField[];
  }

  export interface Response {
    errors?: string[];
    radicals: Radical[];
  }

  export async function queryChecked(
    template: Template
  ): Promise<Response | Error> {
    return await queryWithChecker(template, noopChecker);
  }

  export async function queryUnchecked(
    template: Template
  ): Promise<Response | Error> {
    return await queryWithChecker(template, checkResponse);
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  async function queryWithChecker(
    template: Template,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    const url = urlFromTemplate(template);
    const json = await query(url, checker);
    return json;
  }

  function urlFromTemplate(template: Template): URL {
    const url = new URL(`radicals/literals`, template.endpointBase);
    for (const field of template.desiredFields) {
      url.searchParams.append("field", field);
    }
    return url;
  }

  function checkResponse(value: unknown): value is Response {
    return (
      isObject(value) &&
      hasOptionalArrayProperty(value, "errors", isString) &&
      hasArrayProperty(value, "radicals", checkRadical)
    );
  }

  function checkRadical(value: unknown): value is Radical {
    return (
      isObject(value) &&
      hasStringProperty(value, "literal") &&
      hasOptionalUintProperty(value, "strokes") &&
      hasOptionalArrayProperty(value, "kanji", isString)
    );
  }
}
