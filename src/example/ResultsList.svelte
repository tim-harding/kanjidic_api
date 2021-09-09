<script lang="ts">
	import type { Kanji as KanjiType } from "../lib/kanji";
	import Kanji from "./Kanji.svelte";
	import SectioningBox from "./SectioningBox.svelte";

	export let kanjis: KanjiType[];
</script>

{#if kanjis.length > 0}
	<SectioningBox>
		<ul class="results">
			{#each kanjis as kanji}
				<li class="kanji-list-item">
					<Kanji kanji={kanji} />
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