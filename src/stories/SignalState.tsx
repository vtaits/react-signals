import type { Signal } from "signal-polyfill";
import { useRerender, useSignalState } from "../index";

type ITextProps = Readonly<{
	counter: Signal.State<number>;
	logRender: (componentName: string) => void;
}>;

function Text({ counter, logRender }: ITextProps) {
	logRender("Text");

	useRerender([counter]);

	return <span>{counter.get()}</span>;
}

type IButtonProps = Readonly<{
	counter: Signal.State<number>;
	logRender: (componentName: string) => void;
}>;

function Button({ counter, logRender }: IButtonProps) {
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

type ISignalStateProps = Readonly<{
	logRender: (componentName: string) => void;
}>;

export function SignalState({ logRender }: ISignalStateProps) {
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
