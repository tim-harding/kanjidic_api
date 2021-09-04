<script lang="ts">
	export let literal: string;
</script>

<div class="root">
	Literal:&nbsp;
	<span class="noto">
		{literal}
	</span>
</div>

<style lang="scss">
	.root {
		grid-template-columns: min-content 1fr;
		align-items: flex-end;
		margin-left: 1.4rem;
	}
</style>