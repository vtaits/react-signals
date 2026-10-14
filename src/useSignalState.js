import { useState } from "react";
import { Signal } from "signal-polyfill";

/**
 * Hook that creates a local state signal for the component.
 *
 * @template S
 * @param {S | (() => S)} initialState Initial value of the signal or initializer function of the initial value
 * @param {Signal.Options<S>} [options] Signal's options
 * @returns {Signal.State<S>}
 */
export function useSignalState(initialState, options) {
	const [signal] = useState(() => {
		if (typeof initialState === "function") {
			return new Signal.State(/** @type {() => S} */ (initialState)(), options);
		}

		return new Signal.State(initialState, options);
	});

	return signal;
}
