<script lang="ts">
  import { queryAllRadicals } from "../lib/radical_all_access";
  import RadicalGroup from "./RadicalGroup.svelte";
  import { ENDPOINT } from "./shared";

  const radicalGroups = queryAllRadicals(ENDPOINT).then((groups) => {
    if (groups instanceof Error) {
      throw groups;
    }
    return groups.map((group) => ({
      strokes: group.strokes,
      radicals: group.literals.map((literal) => ({
        literal,
        id: `radical-${literal}`,
        checked: false,
      })),
    }));
  });

  // Todo
  function handleSubmit() {}
</script>

{#await radicalGroups}
  <div>Loading radicals &#8230;</div>
{:then radicalGroups}
  <form on:submit|preventDefault={handleSubmit} class="form">
    <fieldset class="fieldset">
      <legend>Select radicals to find a matching kanji.</legend>
      <ol class="list">
        {#each radicalGroups as group}
          <li class="item">
            <RadicalGroup bind:group />
          </li>
        {/each}
      </ol>
    </fieldset>
  </form>
{:catch error}
  <div class="error">
    <p>Could not load the list of radicals:</p>
    <p>{error}</p>
  </div>
{/await}

<style lang="scss">
  .error {
    color: var(--aurora-red);
  }

  $button-size: 1.75rem;

  .list {
    width: $button-size * 24;
    grid-template-columns: repeat(auto-fill, $button-size);
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
