<script lang="ts">
	import type { Kuten } from "../lib";
	import Url from "./Url.svelte";

	export let kuten: Kuten;
</script>

<p>
	<Url
		href="http://unicode-iphone.blogspot.com/2010/05/kuten-code-to-unicode.html"
	>
		Kuten code info
	</Url>
</p>
<dl class="passthrough">
	<div class="text-line">
		<dt>Plane</dt>
		<dd>
			{kuten.plane}
		</dd>
	</div>

	<div class="text-line">
		<dt>Ku</dt>
		<dd>
			{kuten.ku}
		</dd>
	</div>

	<div class="text-line">
		<dt>Ten</dt>
		<dd>
			{kuten.ten}
		</dd>
	</div>
</dl>
