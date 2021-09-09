<script lang="ts">
	import type { DeRoo } from "../lib/types/de_roo";

	import Url from "./Url.svelte";

	export let deRoo: DeRoo.DeRoo;
</script>

<p>
	The classification of a kanji in the De Roo system. See
	<Url href="http://www.edrdg.org/wwwjdic/deroo.html">here</Url>
	for more information.
</p>
<dl class="passthrough">
	<div class="text-line">
		<dt>Extreme top</dt>
		:&nbsp;
		<dd>
			{deRoo.top}
		</dd>
	</div>

	<div class="text-line">
		<dt>Extreme bottom</dt>
		:&nbsp;
		<dd>
			{deRoo.bottom}
		</dd>
	</div>
</dl>
