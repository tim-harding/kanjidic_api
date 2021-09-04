<script lang="ts">
	import type { Variant as VariantType } from "../lib";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Variant from "./Variant.svelte";

	export let variants: VariantType[];
</script>

<KanjiDropdown>
	<span slot="Summary"> Variants </span>
	<div slot="content">
		<ul>
			{#each variants as variant}
				<li>
					<Variant {variant} />
				</li>
			{/each}
		</ul>
	</div>
</KanjiDropdown>
