import type { KanjiEndpoint } from "../lib/access/kanji_endpoint";

export const ENDPOINT_BASE = `${window.location.origin}/api/`;

export const kanjiEndpoint: KanjiEndpoint.Template = {
  endpointBase: ENDPOINT_BASE,
  desiredFields: {
    fields: "all",
    languages: "all",
  },
};

let nextId: number = 0;

export function uniqueIndex(): number {
  return nextId++;
}
