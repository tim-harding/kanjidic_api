import { Store } from 'vuex'
import { Character } from "./lib/index"

declare module '@vue/runtime-core' {
  interface State {
    recentErrors: Error[]
    kanji: Record<string, Character>
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}