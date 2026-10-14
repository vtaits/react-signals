import { memo } from "react";
import { useRerender, useSignalify } from "../index.js";

/**
 * @import { Signal } from "signal-polyfill"
 */

/**
 * @typedef {Object} ITextProps
 * @property {Signal.State<string>} textSignal
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ITextProps} props
 */
function InnerText({ textSignal, logRender }) {
	logRender("InnerText");

	useRerender([textSignal]);

	return <span data-testid="text">{textSignal.get()}</span>;
}

const OuterText = memo(
	/**
	 * @param {ITextProps} props
	 */
	({ textSignal, logRender }) => {
		logRender("OuterText");

		return <InnerText textSignal={textSignal} logRender={logRender} />;
	},
);

/**
 * @typedef {Object} ISignalifyProps
 * @property {string} text
 * @property {(componentName: string) => void} logRender
 */

/**
 * @param {ISignalifyProps} props
 */
export function Signalify({ text, logRender }) {
	logRender("root");

	const textSignal = useSignalify(text);

	return (
		<>
			<p>
				This example demonstrates how to convert non-signal values (e.g.
				component props) to signals.
			</p>

			<p>
				If the `text` prop is changed, the `InnerText` component will be
				re-rendered, but the `OuterText` will remain unchanged.
			</p>

			<hr />

			<OuterText textSignal={textSignal} logRender={logRender} />
		</>
	);
}
