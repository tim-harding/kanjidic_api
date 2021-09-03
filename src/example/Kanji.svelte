<script lang="ts">
import type { Character } from "../lib";


	export let character: Character;
</script>

<div class="root">
	<div class="literal">
		Literal: {character.literal}
	</div>
</div>

<style>
	.root {
		margin: 1rem;
	}
</style>