<script lang="ts">
	import type { DeRoo } from "../lib";

	import Link from "./Link.svelte";

	export let deRoo: DeRoo;
</script>

<div class="root">
	<p class="block">
		The classification of a kanji in the De Roo system. See
		<Link href="http://www.edrdg.org/wwwjdic/deroo.html">here</Link>
		for more information.
	</p>
	<p>
		Extreme top: {deRoo.top}
	</p>
	<p>
		Extreme bottom: {deRoo.bottom}
	</p>
</div>

<style>
	.root {
		grid-auto-rows: max-content;
	}
	
	.block {
		display: block;
	}
</style>
