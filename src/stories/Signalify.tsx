import { memo } from "react";
import type { Signal } from "signal-polyfill";
import { useRerender, useSignalify } from "../index";

type ITextProps = Readonly<{
	textSignal: Signal.State<string>;
	logRender: (componentName: string) => void;
}>;

function InnerText({ textSignal, logRender }: ITextProps) {
	logRender("InnerText");

	useRerender([textSignal]);

	return <span>{textSignal.get()}</span>;
}

const OuterText = memo(({ textSignal, logRender }: ITextProps) => {
	logRender("OuterText");

	return <InnerText textSignal={textSignal} logRender={logRender} />;
});

type ISignalifyProps = Readonly<{
	text: string;
	logRender: (componentName: string) => void;
}>;

export function Signalify({ text, logRender }: ISignalifyProps) {
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
