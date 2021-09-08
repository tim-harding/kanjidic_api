<script lang="ts">
  import type { Character, Uint } from "../lib";
  import { queryDecompositionChecked } from "../lib/decomposition_access";

  import { queryAllRadicals } from "../lib/radical_all_access";
  import RadicalGroup from "./RadicalGroup.svelte";
  import ResultsList from "./ResultsList.svelte";
  import SectioningBox from "./SectioningBox.svelte";
  import { ENDPOINT, kanjiAccess } from "./shared";

  interface Group {
    strokes: Uint;
    radicals: {
      literal: string;
      id: string;
      checked: boolean;
    }[];
  }

  let isInitialized = false;
  let error: Error | undefined = undefined;
  let validNext: Record<string, boolean> = {};
  let kanjis: Character[] = [];
  let groups: Group[] = [];
  let isValidNextUpdateOngoing = false;

  async function initialize() {
    const response = await queryAllRadicals(ENDPOINT);
    if (response instanceof Error) {
      error = response;
      return;
    }
    groups = response.map((group) => ({
      strokes: group.strokes,
      radicals: group.literals.map((literal) => {
        validNext[literal] = true;
        return {
          literal,
          id: `radical-${literal}`,
          checked: false,
        };
      }),
    }));
    isInitialized = true;
  }

  // Start new request when a response comes back.
  // Or else only apply response if no more recent
  // request has been handled.

  async function updateValidNext() {
    if (isValidNextUpdateOngoing) {
      return;
    }
    isValidNextUpdateOngoing = true;
    const queryRadicals = groups.flatMap((group) =>
      group.radicals
        .filter((radical) => radical.checked)
        .map((radical) => radical.literal)
    );
    const decomposition = await queryDecompositionChecked(
      kanjiAccess,
      queryRadicals
    );
    if (decomposition instanceof Error) {
      error = decomposition;
      return;
    }
    validNext = {};
    for (const radical of decomposition.validNext) {
      validNext[radical] = true;
    }
    kanjis = decomposition.kanji;
    isValidNextUpdateOngoing = false;
  }

  initialize();

  $: {
    groups; // Get that reactivity
    updateValidNext();
  }
</script>

<div class="root">
  <SectioningBox>
    {#if error !== undefined}
      <div class="error">
        <p>{error}</p>
      </div>
    {:else if !isInitialized}
      <div>Loading radicals&#8230;</div>
    {:else}
      <form on:submit|preventDefault={() => {}} class="form">
        <fieldset class="fieldset">
          <legend>Select radicals to find a matching kanji.</legend>
          <ol class="list">
            {#each groups as group}
              <li class="item">
                <RadicalGroup bind:group {validNext} />
              </li>
            {/each}
          </ol>
        </fieldset>
      </form>
    {/if}
  </SectioningBox>

  <div class="results">
    <ResultsList {kanjis} />
  </div>
</div>

<style lang="scss">
  .root {
    gap: 0.5rem;
    grid-template-rows: max-content 1fr;
  }

  .error {
    color: var(--aurora-red);
  }

  $button-size: 1.75rem;

  .list {
    grid-template-columns: repeat(auto-fill, $button-size);
  }

  .list,
  .results {
    width: $button-size * 24;
    grid-auto-rows: $button-size;
  }

  .form {
    margin: 1rem;
  }

  .fieldset {
    grid-template-rows: 0.75rem 1fr;
  }

  .item {
    display: contents;
  }
</style>
