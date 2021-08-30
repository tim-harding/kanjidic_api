import { createApp } from "vue"
import App from "./components/App.vue"
import { key, store } from "./store"

function main() {
	createApp(App)
		.use(store, key)
		.mount("#app")
}

main()