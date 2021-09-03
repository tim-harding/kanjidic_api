<script lang="ts">
  import type { RadicalGroup } from "./radical_group";

  export let group: RadicalGroup;
</script>

<ul class="root">
  <li class="strokes">
    <span class="hidden">Radicals with</span>
    {group.strokes}
    <span class="hidden">strokes</span>
  </li>
  {#each group.radicals as radical}
    <li class="radical">
      <input
        class="hidden"
        type="checkbox"
        name="radical-selector"
        id={radical.id}
        value={radical.literal}
        bind:checked={radical.checked}
      />
      <label class="radical-checkbox noto" for={radical.id}>
        {radical.literal}
      </label>
    </li>
  {/each}
</ul>

<style lang="scss">
  .root {
    user-select: none;
  }

  .root,
  .radical {
    display: contents;
  }

  .radical-checkbox,
  .strokes {
    justify-items: center;
    align-items: center;
  }

  .strokes {
    font-weight: 700;
    cursor: none;
  }

  .radical-checkbox {
    cursor: pointer;
    border-radius: 0.25rem;

    &:hover {
      background-color: var(--snow-storm-2);
    }

    &:active {
      background-color: var(--gray-300);
    }
  }

  input:checked + .radical-checkbox {
    background-color: var(--gray-300);
  }
</style>
