import { createApp } from "vue"
import { Access, queryLiterals } from "../lib"
import App from "./App.vue"

async function main() {
	const access: Access = {
		endpointBase: "http://localhost:8000",
		desiredFields: {
			fields: "all",
			languages: "all",
		}
	}
	const response = await queryLiterals(access, ["亜"])
	console.log(response)
	createApp(App).mount("#app")
}

main()