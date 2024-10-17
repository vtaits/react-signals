import { useState } from "react";
import { Signal } from "signal-polyfill";

export function useSignalState<S>(
	initialState: S | (() => S),
	options?: Signal.Options<S> | undefined,
): Signal.State<S> {
	const [signal] = useState(() => {
		if (typeof initialState === "function") {
			return new Signal.State((initialState as () => S)(), options);
		}

		return new Signal.State(initialState, options);
	});

	return signal;
}
