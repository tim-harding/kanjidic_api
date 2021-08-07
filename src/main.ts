import { Access } from "./access"

async function main() {
	const access = new Access();
	const result = await access.query(
		`query {
			kanji {
				_id
				frequency
				jlpt
				literal
				radical_names
			}
		}`
	);
	console.log(result);
}

main()