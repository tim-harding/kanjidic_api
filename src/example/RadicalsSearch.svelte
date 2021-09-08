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
  let needsValidNextUpdate = false

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
      needsValidNextUpdate = true
      return;
    }
    isValidNextUpdateOngoing = true;
    
    await doQuery()

    isValidNextUpdateOngoing = false;
    if (needsValidNextUpdate) {
      updateValidNext()
    }
  }
  
  async function doQuery() {
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
  }

  initialize();
  
  function reset() {
    for (const group of groups) {
      for (const radical of group.radicals) {
        radical.checked = false
      }
    }
  }

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
            <li>
              <button on:click={reset} class="reset">
                <span class="hidden">Reset selection</span>
                <span class="material-icons-outlined">replay</span>
              </button>
            </li>
            {#each groups as group (group.strokes)}
              <li class="item">
                <RadicalGroup bind:group {validNext} />
              </li>
            {/each}
          </ol>
        </fieldset>
      </form>
    {/if}
  </SectioningBox>

  <ResultsList {kanjis} />
</div>

<style lang="scss">
  $button-size: 1.65rem;
  
  .reset {
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      background-color: var(--snow-storm-2);
    }
  
    &:active {
      background-color: var(--gray-300);
    }
  }

  .root {
    gap: 0.5rem;
    grid-template-rows: max-content 1fr;
    width: 100%;
    max-width: $button-size * 24 - 1rem;
  }

  .error {
    color: var(--aurora-red);
  }

  .list {
    grid-template-columns: repeat(auto-fit, $button-size);
    grid-auto-rows: $button-size;
    gap: 1px;
  }

  .form {
    margin: 1rem;
  }

  .fieldset {
    grid-template-rows: 1rem 1fr;
    justify-content: center;
  }

  .item {
    display: contents;
  }
</style>
