import { createApp } from "vue"
import { Access, queryLiterals } from "../lib"
import App from "./App.vue"
import { key, store } from "./store"

function main() {
	createApp(App)
		.use(store, key)
		.mount("#app")
}

async function testAccess() {
	const access: Access = {
		endpointBase: "http://localhost:8000",
		desiredFields: {
			fields: "all",
			languages: "all",
		},
	}
	const response = await queryLiterals(access, ["亜"])
	console.log(response)
}

main()