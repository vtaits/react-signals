import { Signal } from "signal-polyfill";
import { useRerender } from "../index";

const clock = new Signal.State(new Date());

setInterval(() => {
	clock.set(new Date());
}, 100);

export function WatchGlobalSignal() {
	useRerender([clock]);

	return (
		<>
			<p>In this example, the date is stored in the global signal.</p>

			<p>The component subscribed to it using the `useRerender` hook.</p>

			<hr />

			<div>
				{new Intl.DateTimeFormat("en-US", {
					dateStyle: undefined,
					timeStyle: "medium",
					hour12: false,
				}).format(clock.get())}
			</div>
		</>
	);
}
