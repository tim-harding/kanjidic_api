import { render } from "solid-js/web";
import "./index.scss";
import App from "./App";
import "solid-styled-jsx"

const root = document.getElementById("root")
if (root !== null) {
	render(() => <App />, root);
}