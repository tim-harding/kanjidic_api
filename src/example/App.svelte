<script lang="ts">
  import RadicalsSearch from "./RadicalsSearch.svelte";
  import TranslationSearch from "./TextSearch.svelte";
  import Url from "./Url.svelte";

  type SearchMethod = "radicals" | "text";

  let searchMethod: SearchMethod = "radicals";
</script>

<div class="root">
  <header class="header">
    <h1 class="title">Kanjidic Example</h1>
    <div class="search-method-container">
      <label for="search-method"> Search </label>
      <select
        id="search-method"
        class="search-method"
        bind:value={searchMethod}
      >
        <option value="radicals"> Radicals </option>
        <option value="text"> Text </option>
      </select>
    </div>
  </header>
  <main class="main">
    {#if searchMethod === "radicals"}
      <RadicalsSearch />
    {:else}
      <TranslationSearch />
    {/if}
  </main>
  <footer class="footer">
    The data distributed on this site and by the Kanjidic REST API are subject to
    the Electronic Dictionary Research and Development Group <Url
      href="http://www.edrdg.org/edrdg/licence.html">license statement</Url
    >. It is sourced from the <Url
      href="http://www.edrdg.org/wiki/index.php/KANJIDIC_Project">Kanjidic</Url
    > and <Url href="http://www.edrdg.org/krad/kradinf.html">Radkfile</Url> projects.
    It may be copied, distributed, and transmitted under the <Url
      href="https://creativecommons.org/licenses/by-sa/3.0/legalcode"
      >Creative Commons Attribution-ShareAlike 3.0 licence</Url
    >.
  </footer>
</div>

<style lang="scss">
  .root {
    grid-template-rows: max-content max-content 1fr;
    gap: 2rem;
    min-height: 100vh;
  }

  .main {
    justify-items: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .header {
    background-color: var(--snow-storm-1);
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: var(--snow-storm-2);
    width: 100%;
    grid-template-columns: max-content 1fr;
    padding: 1rem;
    align-items: center;
  }

  @media (min-width: 440px) {
    .header {
      padding-left: 2rem;
      padding-right: 2rem;
    }
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
    display: block;
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
</style>
