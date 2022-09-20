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

  export type Response = Radical[];

  export async function queryChecked(
    endpointBase: string
  ): Promise<Response | Error> {
    return await queryWithChecker(endpointBase, checkResponse);
  }

  export async function queryUnchecked(
    endpointBase: string
  ): Promise<Response | Error> {
    return await queryWithChecker(endpointBase, noopChecker);
  }

  function checkRadical(value: unknown): value is Radical {
    return (
      isObject(value) &&
      hasUintProperty(value, "strokes") &&
      hasArrayProperty(value, "literals", isString)
    );
  }

  function noopChecker(_: unknown): _ is Response {
    return true;
  }

  function checkResponse(value: unknown): value is Response {
    return isArrayOf(value, checkRadical);
  }

  async function queryWithChecker(
    endpointBase: string,
    checker: { (json: unknown): json is Response }
  ): Promise<Response | Error> {
    const url = new URL("radicals/all", endpointBase);
    console.log(url);

    const json = await query(url, checker);
    return json;
  }
}
