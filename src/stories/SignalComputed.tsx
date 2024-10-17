import type { Signal } from "signal-polyfill";
import {
	type AnySignal,
	useRerender,
	useSignalComputed,
	useSignalState,
} from "../index";

type ITextProps = Readonly<{
	computed: AnySignal<number>;
	logRender: (componentName: string) => void;
}>;

function Text({ computed, logRender }: ITextProps) {
	logRender("Text");

	useRerender([computed]);

	return <span>Math.floor(counter / 3) = {computed.get()}</span>;
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

type ISignalComputedProps = Readonly<{
	logRender: (componentName: string) => void;
}>;

export function SignalComputed({ logRender }: ISignalComputedProps) {
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
