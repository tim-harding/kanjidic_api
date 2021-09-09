import type { Language } from "../types/language";

export namespace KanjiEndpoint {
  export type CharacterField =
    | "codepoints"
    | "radicals"
    | "grade"
    | "strokeCounts"
    | "variants"
    | "frequency"
    | "radicalNames"
    | "jlpt"
    | "references"
    | "queryCodes"
    | "readings"
    | "translations"
    | "nanori"
    | "decomposition";

  export interface Template {
    endpointBase: string;
    desiredFields: {
      fields: "all" | CharacterField[];
      languages: "all" | Language.Language[];
    };
  }

  export function urlFromTemplate(template: Template, route: string): URL {
    const {
      endpointBase,
      desiredFields: { fields, languages },
    } = template;
    const url = new URL(`/kanji/${route}`, endpointBase);
    switch (fields) {
      case "all": {
        url.searchParams.append("field", "all");
        break;
      }
      default: {
        for (const field of fields) {
          url.searchParams.append("field", field);
        }
      }
    }
    switch (languages) {
      case "all": {
        break;
      }
      default: {
        for (const language of languages) {
          url.searchParams.append("language", language);
        }
      }
    }
    return url;
  }
}
