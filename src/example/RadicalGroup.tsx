import { Component, For } from "solid-js"
import { RadicalAll } from "../lib/radical_all_access"

interface Props {
	radical: RadicalAll
}

export const RadicalGroup: Component<Props> = (props) => {
	return (
		<>
			<div class="RadicalGroup">
				<div class="RadicalGroup__strokes">
					{props.radical.strokes}
				</div>
				<ul class="RadicalGroup__list">
					<For each={props.radical.literals}>{(literal, _i) => (
						<li>
							<button class="RadicalGroup__button">
								{literal}
							</button>
						</li>
					)}</For>
				</ul>
			</div>

			<style jsx>{`

.RadicalGroup {
	grid-template-columns: 2rem 1fr;
}

.RadicalGroup__list {
	grid-template-columns: repeat(auto-fill, 2rem);
	grid-auto-rows: 2rem;
	padding: 0.5rem;
}

.RadicalGroup__strokes {
	align-items: center;
	justify-items: center;
	border-right-style: solid;
	border-right-width: 1px;
	border-right-color: var(--gray-300);
	font-weight: 700;
}

.RadicalGroup__button {
	align-items: center;
	justify-items: center;
	border-radius: 0.25rem;

	&:hover {
			background-color: var(--gray-300);
	}
	
	&:active {
			background-color: var(--gray-400);
	}
}

		`}</style>
		</>
	)
}