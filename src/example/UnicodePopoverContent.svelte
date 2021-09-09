<script lang="ts">
	import { Unicode } from "../lib/types/unicode";
	import Url from "./Url.svelte";

	export let codepoint: Unicode.Unicode;

	const serialized = Unicode.serialize(codepoint);
</script>

<Url href={`https://www.compart.com/en/unicode/${serialized}`}>More info</Url>
