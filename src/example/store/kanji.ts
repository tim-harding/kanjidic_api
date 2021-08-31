import { Character, KanjiAccess, queryLiterals } from '../../lib'
import { defineStore } from "pinia"

interface State {
  recentErrorMessages: string[],
  kanji: Record<string, Character>,
}

export const access: KanjiAccess = {
  endpointBase: "http://localhost:8000",
  desiredFields: {
    fields: "all",
    languages: "all",
  }
}

export const useKanjiStore = defineStore("kanji", {
  state(): State {
    return {
      recentErrorMessages: [],
      kanji: {},
    }
  },

  actions: {
    async fetchKanji(literals: string[]): Promise<void> {
      const toFetch = literals.filter(literal => !(literal in this.kanji))
      const response = await queryLiterals(access, toFetch)
      if (response instanceof Error) {
        this.recentErrorMessages = [response.message]
        return
      }
      if (response.errors) {
        this.recentErrorMessages = response.errors
      }
      for (const kanji of response.kanji) {
        this.kanji[kanji.literal] = kanji
      }
    }
  },
})