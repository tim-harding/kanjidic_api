import { InjectionKey, State } from 'vue'
import { createStore, Store } from 'vuex'
import { Access, Character, queryLiterals } from '../../lib'

export const key: InjectionKey<Store<State>> = Symbol()

const access: Access = {
  endpointBase: "http://localhost:8000",
  desiredFields: {
    fields: "all",
    languages: "all",
  } 
}

export const store = createStore<State>({
  state(): State {
    return {
      recentErrors: [],
      kanji: {},
    }
  },

  mutations: {
    addKanji(state: State, kanji: Character): void {
      const { literal } = kanji
      const cached = state.kanji[literal]
      switch (cached) {
        case undefined: {
          state.kanji[literal] = kanji
          break
        }
        default: {
          state.kanji[literal] = {
            ...cached,
            ...kanji,
          }
        }
      }
    },
    
    replaceErrors(state, errors: Error[]): void {
      state.recentErrors = errors
    }
  },
  
  actions: {
    async fetchKanji(context, literal: string): Promise<void> {
      if (literal in context.state.kanji) {
        return
      }
      const response = await queryLiterals(access, [literal])
      if (response instanceof Error) {
        context.commit("replaceErrors", response)
        return
      }
      if (response.errors) {
        const errors = response.errors.map(errorMessage => new Error(errorMessage))
        context.commit("replaceErrors", errors)
      }
    }
  }
})