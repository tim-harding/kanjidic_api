import { defineStore } from "pinia"
import { queryAllRadicals, RadicalAll } from "../../lib/radical_all_access"

interface State {
  recentErrorMessage: string | undefined,
  all: RadicalAll[],
}

const endpointBase = "http://localhost:8000"

export const useRadkAllStore = defineStore("radk_all", {
  state(): State {
    return {
      recentErrorMessage: undefined,
			all: [],
    }
  },

  actions: {
    async fetchRadkAll(): Promise<void> {
      if (this.all.length === 0) {
        return
      }
			const all = await queryAllRadicals(endpointBase)
			if (all instanceof Error) {
				this.recentErrorMessage = all.message
				return
			}
      all.sort((a, b) => a.stroke - b.stroke)
			this.all = all
    }
  },
})