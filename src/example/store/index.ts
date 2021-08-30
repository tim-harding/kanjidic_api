import { InjectionKey, State } from 'vue'
import { createStore, Store } from 'vuex'

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state () {
    return {
      count: 0,
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
  },
})