<script lang="ts">
	import { serializeUnicode } from "./lib/unicode";
	import type { Unicode } from "./lib/unicode";
	import Url from "./Url.svelte";

	export let codepoint: Unicode;

	const serialized = serializeUnicode(codepoint);
</script>

<Url href={`https://www.compart.com/en/unicode/${serialized}`}>More info</Url>
