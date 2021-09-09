<script lang="ts">
	export let href: string;
</script>

<a class="link" href={href} target="_blank">
	<slot></slot>
</a>

<style lang="scss">
	.link {
		color: var(--frost-3);
		text-decoration: underline;
		cursor: pointer;
		display: inline;
		
		&:visited {
			color: var(--aurora-purple);
		}
	}
</style>