import { useRerender, useSignalComputed, useSignalState } from "../index.js";

/**
 * @import { Signal } from "signal-polyfill"
 * @import { AnySignal } from "../index.js"
 */

/**
 * @typedef {Object} ITextProps
 * @property {AnySignal<number>} computed
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ITextProps} props
 */
function Text({ computed, logRender }) {
	logRender("Text");

	useRerender([computed]);

	return (
		<span>
			Math.floor(counter / 3) ={" "}
			<span data-testid="counter">{computed.get()}</span>
		</span>
	);
}

/**
 * @typedef {Object} IButtonProps
 * @property {Signal.State<number>} counter
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {IButtonProps} props
 */
function Button({ counter, logRender }) {
	logRender("Button");

	return (
		<button
			type="button"
			onClick={() => {
				counter.set(counter.get() + 1);
			}}
		>
			Increase
		</button>
	);
}

/**
 * @typedef {Object} ISignalComputedProps
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ISignalComputedProps} props
 */
export function SignalComputed({ logRender }) {
	logRender("root");

	const counter = useSignalState(0);
	const computed = useSignalComputed(() => Math.floor(counter.get() / 3));

	return (
		<>
			<p>This example demonstrates an usage of a computed signal.</p>

			<p>
				You can also notice that only the `Text` component is re-rendered after
				3 clicks on the increase button.
			</p>

			<hr />

			<div>
				<Text computed={computed} logRender={logRender} />
			</div>

			<div>
				<Button counter={counter} logRender={logRender} />
			</div>
		</>
	);
}
