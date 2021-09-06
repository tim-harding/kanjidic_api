<script lang="ts">
  import RadicalsSelector from "./RadicalsSelector.svelte";
</script>

<div class="root">
  <header class="header">
    <h1 class="title">Kanjidic Example</h1>
    <div class="search-method-container">
      <label for="search-method"> Search method: </label>
      <select id="search-method" class="search-method">
        <option value="decomposition"> Decomposition </option>
      </select>
    </div>
  </header>
  <main class="main">
    <RadicalsSelector />
  </main>
  <footer class="footer">
    Put some information here about licensing. 
  </footer>
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
    padding-right: 0.5rem;
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    border-color: var(--gray-300);
  }

  .kanji {
    max-width: 40rem;
  }
</style>
