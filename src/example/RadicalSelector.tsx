import { Component, createResource, Show, For } from "solid-js";
import { queryAllRadicals } from "../lib/radical_all_access";
import { RadicalGroup } from "./RadicalGroup";
import { ENDPOINT_BASE } from "./shared";

export const RadicalSelector: Component = (_props) => {
  const [radicalsAll] = createResource(async () => {
    const response = await queryAllRadicals(ENDPOINT_BASE)
    if (response instanceof Error) {
      throw response
    }
    return response
  })

  return (
    <>
      <Show when={!radicalsAll.loading} fallback="Loading...">
        <Show when={!radicalsAll.error} fallback={`Error: ${radicalsAll.error}`}>
          <ol class="RadicalSelector__list">
            <For each={radicalsAll()}>{(radical, _i) => (
              <li class="RadicalSelector__item">
                <RadicalGroup radical={radical}></RadicalGroup>
              </li>
            )}</For>
          </ol>
        </Show>
      </Show>

      <style jsx>{`

.RadicalSelector__list {
  grid-auto-rows: min-content;
  gap: 0.5rem;
}

.RadicalSelector__item {
  background-color: var(--gray-200);
  border-radius: 0.25rem;
}

    `}</style>
    </>
  );
};

export default RadicalSelector;
