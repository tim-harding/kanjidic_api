<script lang="ts">
	import Link from "./Link.svelte";

	export let amazon: string | undefined = undefined;
</script>

<div class="root">
	<p class="hanging-indent">
		<slot />
	</p>
	{#if amazon !== undefined}
		<p>
			<Link href={amazon}>Amazon</Link>
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
