<script lang="ts">
  import type { Kanji } from "../lib/types/kanji";
  import { Literals } from "../lib/access/literals";
  import { Translation } from "../lib/access/translation";

  import Popover from "./Popover.svelte";
  import ResultsList from "./ResultsList.svelte";
  import SectioningBox from "./SectioningBox.svelte";
  import { kanjiEndpoint } from "./shared";

  let results: Kanji[] = [];
  let error: string | undefined;

  let updatePending = false;
  let needsUpdate = false;

  async function updateResults() {
    if (updatePending) {
      needsUpdate = true;
      return;
    }
    updatePending = true;

    await doQuery();

    updatePending = false;
    if (needsUpdate) {
      needsUpdate = false;
      updateResults();
    }
  }

  async function doQuery() {
    term = term.trim();
    if (term.length === 0) {
      results = [];
      return;
    }
    const [translations, literals] = await Promise.all([
      Translation.queryChecked(kanjiEndpoint, term),
      Literals.queryChecked(kanjiEndpoint, term),
    ]);
    if (translations instanceof Error) {
      error = translations.message;
      return;
    }
    if (literals instanceof Error) {
      error = literals.message;
      return;
    }
    // We're just ignoring errors on the literals response
    results = [...translations.kanji, ...literals.kanji];
  }

  let term: string = "";

  $: {
    term; // Get that reactivity
    console.log("hit");
    updateResults();
  }
</script>

<div class="root">
  <SectioningBox>
    <form on:submit|preventDefault={() => {}} class="form">
      <Popover>
        <label for="search-term" class="search-term-label">
          Enter one of the following:
          <ul class="passthrough">
            <li class="label-item">
              A word in another language to find a kanji for. Translations are
              available in English, French, Spanish, and Portuguese at this
              time.
            </li>
            <li class="label-item">
              A kanji or several kanji you want more details for.
            </li>
          </ul>
        </label>
      </Popover>
      <input
        type="text"
        name="search-term"
        id="search-term"
        class="search-term"
        bind:value={term}
      />
    </form>
  </SectioningBox>
  {#if error !== undefined}
    <div class="error">
      {error}
    </div>
  {/if}
  <ResultsList kanjis={results} />
</div>

<style lang="scss">
  .root {
    grid-auto-rows: min-content;
    gap: 0.5rem;
    width: 100%;
    max-width: 30rem;
  }

  .search-term {
    background-color: var(--snow-storm-0);
    border-color: var(--gray-300);
    border-radius: 0.25rem;
    border-width: 2px;
    border-style: solid;
    padding: 0.5rem;
  }

  .form {
    grid-template-columns: max-content 1fr;
    padding: 1rem;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 40rem;
  }

  .error {
    color: var(--aurora-red);
  }

  .search-term-label {
    grid-auto-rows: max-content;
    gap: 0.5rem;
  }

  .label-item {
    margin-left: 0.75rem;
    grid-template-columns: max-content 1fr;

    &::before {
      content: "– ";
      white-space: pre;
      font-weight: 700;
    }
  }
</style>
