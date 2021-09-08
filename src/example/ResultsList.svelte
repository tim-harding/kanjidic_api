<script lang="ts">
	import type { Character } from "../lib";
	import Kanji from "./Kanji.svelte";
	import SectioningBox from "./SectioningBox.svelte";

	export let kanjis: Character[];
</script>

{#if kanjis.length > 0}
	<SectioningBox>
		<ul class="results">
			{#each kanjis as kanji}
				<li class="kanji-list-item">
					<Kanji character={kanji} />
				</li>
			{/each}
		</ul>
	</SectioningBox>
{/if}

<style lang="scss">

  .results {
    grid-auto-rows: max-content;
    margin-top: 1.4rem;
    margin-bottom: 1.4rem;
    gap: 1.4rem;
  }

  .kanji-list-item {
    padding-bottom: 1.4rem;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: var(--gray-300);

    &:last-child {
      border-bottom-style: none;
      padding-bottom: 0rem;
    }
  }
</style>