import { useRerender, useSignalState } from "../index.js";

/**
 * @import { Signal } from "signal-polyfill"
 */

/**
 * @typedef {Object} ITextProps
 * @property {Signal.State<number>} counter
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ITextProps} props
 */
function Text({ counter, logRender }) {
	logRender("Text");

	useRerender([counter]);

	return <span data-testid="counter">{counter.get()}</span>;
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
 * @typedef {Object} ISignalStateProps
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ISignalStateProps} props
 */
export function SignalState({ logRender }) {
	logRender("root");

	const counter = useSignalState(0);

	return (
		<>
			<p>
				This example demonstrates an implementation of a simple counter using
				signal as state.
			</p>

			<p>
				You can also notice that only the `Text` component is re-rendered after
				clicking the increase button.
			</p>

			<p>
				But there are no `react` optimizations such as `memo` and `useCallback`.
			</p>

			<hr />

			<div>
				<Text counter={counter} logRender={logRender} />
			</div>

			<div>
				<Button counter={counter} logRender={logRender} />
			</div>
		</>
	);
}
