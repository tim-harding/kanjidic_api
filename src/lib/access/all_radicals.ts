import {
  hasArrayProperty,
  hasUintProperty,
  isArrayOf,
  isObject,
  isString,
  query,
} from "../shared";
import type { Uint } from "../types/uint";

export namespace AllRadicals {
  export interface Radical {
    strokes: Uint;
    literals: string[];
  }

  export type AllRadicalsResponse = Radical[];

  export async function queryChecked(
    endpointBase: string
  ): Promise<AllRadicalsResponse | Error> {
    return await queryWithChecker(endpointBase, isAllRadicalsResponse);
  }

  export async function queryUnchecked(
    endpointBase: string
  ): Promise<AllRadicalsResponse | Error> {
    return await queryWithChecker(endpointBase, noopChecker);
  }

  function isRadical(value: unknown): value is Radical {
    return (
      isObject(value) &&
      hasUintProperty(value, "strokes") &&
      hasArrayProperty(value, "literals", isString)
    );
  }

  function noopChecker(_: unknown): _ is AllRadicalsResponse {
    return true;
  }

  function isAllRadicalsResponse(value: unknown): value is AllRadicalsResponse {
    return isArrayOf(value, isRadical);
  }

  async function queryWithChecker(
    endpointBase: string,
    checker: { (json: unknown): json is AllRadicalsResponse }
  ): Promise<AllRadicalsResponse | Error> {
    const url = new URL("/radicals/all", endpointBase);
    const json = await query(url, checker);
    return json;
  }
}
