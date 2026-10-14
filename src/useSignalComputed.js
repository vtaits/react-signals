import { useState } from "react";
import { Signal } from "signal-polyfill";

/**
 * Hook that creates a local computed signal for the component.
 *
 * @template S
 * @param {() => S} computation Signal's computation function
 * @param {Signal.Options<S>} [options] Signal's options
 * @returns {Signal.Computed<S>}
 */
export function useSignalComputed(computation, options) {
	const [signal] = useState(() => {
		return new Signal.Computed(computation, options);
	});

	return signal;
}
