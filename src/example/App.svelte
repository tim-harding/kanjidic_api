<script lang="ts">
  import LiteralSearch from "./LiteralSearch.svelte";
  import RadicalsSelector from "./RadicalsSelector.svelte";
  import TranslationSearch from "./TranslationSearch.svelte";

  type SearchMethod = "decomposition" | "literal" | "translation";

  let searchMethod: SearchMethod = "decomposition";
</script>

<div class="root">
  <header class="header">
    <h1 class="title">Kanjidic Example</h1>
    <div class="search-method-container">
      <label for="search-method"> Search method: </label>
      <select
        id="search-method"
        class="search-method"
        bind:value={searchMethod}
      >
        <option value="decomposition"> Decomposition </option>
        <option value="translation"> Translation </option>
        <option value="literal"> Kanji </option>
      </select>
    </div>
  </header>
  <main class="main">
    {#if searchMethod === "decomposition"}
      <RadicalsSelector />
    {:else if searchMethod === "literal"}
      <LiteralSearch />
    {:else}
      <TranslationSearch />
    {/if}
  </main>
  <footer class="footer">Put some information here about licensing.</footer>
</div>

<style lang="scss">
  .root {
    grid-template-rows: max-content max-content 1fr;
    gap: 2rem;
    min-height: 100vh;
  }

  .main {
    grid-template-columns: max-content;
    justify-content: center;
  }

  .header {
    background-color: var(--snow-storm-1);
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: var(--snow-storm-2);
    width: 100%;
    grid-template-columns: max-content 1fr;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    align-items: center;
  }

  .footer {
    background-color: var(--snow-storm-1);
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: var(--snow-storm-2);
    width: 100%;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    align-self: flex-end;
  }

  .title {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .search-method-container {
    align-items: center;
    align-self: center;
    justify-self: flex-end;
    grid-template-columns: max-content max-content;
    gap: 0.5rem;
  }

  .search-method {
    background-color: var(--snow-storm-0);
    padding: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 1.75rem;
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    border-color: var(--gray-300);
    background: url(./assets/expand_more.svg) 96% / 15% no-repeat #eee;
  }

  .kanji {
    max-width: 40rem;
  }
</style>
