<script lang="ts">
	import { serializeUnicode } from "../lib/unicode";
	import type { Unicode } from "../lib/unicode";

	import Link from "./Link.svelte";

	export let codepoint: Unicode;

	const serialized = serializeUnicode(codepoint);
</script>

<Link href={`https://www.compart.com/en/unicode/${serialized}`}>More info</Link>
