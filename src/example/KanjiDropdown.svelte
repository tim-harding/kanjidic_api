<script lang="ts">
	export let summary: string;
</script>

<details open={true} class="details">
	<summary class="summary">
		<div class="disclosure-triangle">
			<span class="material-icons-outlined open-disclosure"
				>arrow_right</span
			>
			<span class="material-icons-outlined close-disclosure"
				>arrow_drop_down</span
			>
		</div>
		<span>
			{summary}
		</span>
	</summary>
	<slot></slot>
</details>

<style>
	.summary {
		grid-template-columns: 1.4rem 1fr;
		cursor: pointer;
		margin-bottom: 0.25rem;
	}

	.disclosure-triangle {
		transform: translateY(-0.2rem);
		grid-template-areas: "center";
	}

	.open-disclosure,
	.close-disclosure {
		grid-area: center;
	}

	.close-disclosure {
		visibility: hidden;
	}

	.details[open] .close-disclosure {
		visibility: initial;
	}

	.details[open] .open-disclosure {
		visibility: hidden;
	}
</style>