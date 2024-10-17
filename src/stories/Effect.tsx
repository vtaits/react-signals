import { useSignalEffect, useSignalState } from "../index";

type IEffectProps = Readonly<{
	logCounter: (action: string, value: number) => void;
	logRender: (componentName: string) => void;
}>;

export function Effect({ logCounter, logRender }: IEffectProps) {
	logRender("root");

	const counter = useSignalState(0);

	useSignalEffect(() => {
		const counterValue = counter.get();

		logCounter("init", counterValue);

		return () => {
			logCounter("destroy", counterValue);
		};
	}, [logCounter]);

	return (
		<>
			<p>
				This example demonstrates logging of the counter through
				`useSignalEffect`.
			</p>

			<p>
				It's not necessary to track signals that used in the callback as
				dependencies.
			</p>

			<hr />

			<button
				type="button"
				onClick={() => {
					counter.set(counter.get() + 1);
				}}
			>
				Increase
			</button>
		</>
	);
}
