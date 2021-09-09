<script lang="ts">
	import Url from "./Url.svelte";

	export let amazonAsin: string | undefined = undefined;
</script>

<div class="root">
	<p class="hanging-indent">
		<slot />
	</p>
	{#if amazonAsin !== undefined}
		<p>
			<Url href={`https://amzn.com/${amazonAsin}`}>Amazon product page</Url>
		</p>
	{/if}
</div>

<style lang="scss">
	.root {
		grid-auto-rows: min-content;
	}

	.hanging-indent {
		display: block;
		text-indent: -2rem;
		padding-left: 2rem;
	}
</style>
