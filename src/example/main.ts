import { createApp } from "vue"
import { Access, queryLiterals } from "../lib"
import App from "./App.vue"

async function main() {
	const access: Access = {
		endpointBase: "http://localhost:8000",
		desiredFields: {
			fields: [
				"codepoints",
				"radicals",
				"grade",
				"strokeCounts",
				"variants",
				"frequency",
				"radicalNames",
				"jlpt",
				"references",
				"queryCodes",
				"readings",
				"translations",
				"nanori",
				"decomposition",
			],
			languages: "all",
		}
	}
	const response = await queryLiterals(access, ["亜"])
	console.log(response)
	createApp(App).mount("#app")
}

main()