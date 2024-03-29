<script lang="ts">
  import type { Uint } from "../lib/types/uint";
  import type { Kanji } from "../lib/types/kanji";
  import { Decomposition } from "../lib/access/decomposition";
  import { AllRadicals } from "../lib/access/all_radicals";
  import RadicalGroup from "./RadicalGroup.svelte";
  import ResultsList from "./ResultsList.svelte";
  import SectioningBox from "./SectioningBox.svelte";
  import { ENDPOINT_BASE, kanjiEndpoint } from "./shared";

  interface Group {
    strokes: Uint;
    radicals: RadicalInfo[];
  }

  interface RadicalInfo {
    literal: string;
    id: string;
    checked: boolean;
  }

  let isInitialized = false;
  let error: Error | undefined = undefined;
  let validNext: Record<string, boolean> = {};
  let kanjis: Kanji.Kanji[] = [];
  let groups: Group[] = [];

  let isValidNextUpdateOngoing = false;
  let needsValidNextUpdate = false;

  async function initialize() {
    const response = await AllRadicals.queryChecked(ENDPOINT_BASE);
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

  async function updateValidNext() {
    if (isValidNextUpdateOngoing) {
      needsValidNextUpdate = true;
      return;
    }
    isValidNextUpdateOngoing = true;

    await doQuery();

    isValidNextUpdateOngoing = false;
    if (needsValidNextUpdate) {
      updateValidNext();
    }
  }

  async function doQuery() {
    const queryRadicals = groups
      .flatMap((group) =>
        group.radicals
          .filter((radical) => radical.checked)
          .map((radical) => radical.literal)
      )
      .join("");
    if (queryRadicals.length === 0) {
      validNext = {};
      for (const group of groups) {
        for (const radical of group.radicals) {
          validNext[radical.literal] = true;
        }
      }
      kanjis = [];
      return;
    }
    const decomposition = await Decomposition.queryChecked(
      kanjiEndpoint,
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
    for (const groupIndex in groups) {
      const group = groups[groupIndex] as Group;
      for (const radicalIndex in group.radicals) {
        // Have to do it this way for reactivity
        (
          (groups[groupIndex] as Group).radicals[radicalIndex] as RadicalInfo
        ).checked = false;
      }
    }
  }

  let previous_selection: string | undefined = undefined;

  $: {
    const selection = groups
      .map((group) => {
        return group.radicals
          .filter((radical) => radical.checked)
          .map((radical) => radical.literal);
      })
      .join("");
    if (selection !== previous_selection) {
      previous_selection = selection;
      updateValidNext();
    }
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
        <fieldset>
          <div class="fieldset">
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
          </div>
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
    gap: 0.75rem;
  }

  .item {
    display: contents;
  }
</style>
