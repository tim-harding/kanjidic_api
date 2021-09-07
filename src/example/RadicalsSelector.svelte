<script lang="ts">
  import type { Character, KanjiAccess, Uint } from "../lib";
  import { queryDecompositionChecked } from "../lib/decomposition_access";

  import { queryAllRadicals } from "../lib/radical_all_access";
  import Kanji from "./Kanji.svelte";
  import RadicalGroup from "./RadicalGroup.svelte";
  import SectioningBox from "./SectioningBox.svelte";
  import { ENDPOINT } from "./shared";

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
    const access: KanjiAccess = {
      endpointBase: ENDPOINT,
      desiredFields: {
        fields: "all",
        languages: "all",
      },
    };
    const decomposition = await queryDecompositionChecked(
      access,
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
  
  .list, .results {
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
