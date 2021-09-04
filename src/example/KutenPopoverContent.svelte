<script lang="ts">
	import type { Kuten } from "../lib";
	import Link from "./Link.svelte";

	export let kuten: Kuten;
</script>

<div class="kuten-details">
	<p>
		<Link
			href="http://unicode-iphone.blogspot.com/2010/05/kuten-code-to-unicode.html"
		>
			Kuten code info
		</Link>
	</p>
	<p>
		Plane: {kuten.plane}
	</p>
	<p>
		Ku: {kuten.ku}
	</p>
	<p>
		Ten: {kuten.ten}
	</p>
</div>
