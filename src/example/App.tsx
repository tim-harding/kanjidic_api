import type { Component } from "solid-js";
import RadicalSelector from "./RadicalSelector";

const App: Component = (_props) => {
  return (
    <>
      <div class="App__selector">
        <RadicalSelector></RadicalSelector>
      </div>
      
      <style jsx>{`

.App__selector {
  width: 40rem;
  justify-self: center;
  background-color: var(--gray-100);
  margin: 2rem;
  padding: 1rem;
  border-radius: 0.25rem;
}

    `}</style>
    </>
  );
};

export default App;
