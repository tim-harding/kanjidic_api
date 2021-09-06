<script lang="ts">
import Popover from "./Popover.svelte";

export let decomposition: string[];
</script>

<dl class="text-line root">
	<dt>
		Decomposition
	</dt>
	:&nbsp;
	<dd>
		<ul class="radicals">
			{#each decomposition as radical}
				<li class="radical noto">
					{radical}
				</li>
			{/each}
		</ul>
	</dd>
	&nbsp;
	<Popover>
		The constituent radicals in the kanji.
	</Popover>
</dl>

<style lang="scss">
	.root {
		margin-left: 1.4rem;
	}
	
	.radicals {
		grid-auto-flow: column;
	}
	
	.radical {
		grid-template-columns: max-content max-content;
		align-items: flex-end;
		font-weight: 700;

		&::after {
			content: ", ";
			white-space: pre;
			font-family: "Roboto";
			font-weight: 400;
		}
		
		&:last-of-type::after {
			content: none;
		}
	}
</style>