import { useSignalState } from "./useSignalState.js";
/**
 * @import { Signal } from "signal-polyfill"
 */

/**
 * Hook that wraps a non-signal value with a local state signal for the component.
 *
 * @template S
 * @param {S} value Value that will be set to the signal on each call of the hook
 * @param {Signal.Options<S>} [options] Signal's options
 * @returns {Signal.State<S>}
 */
export function useSignalify(value, options) {
	const signal = useSignalState(value, options);

	signal.set(value);

	return signal;
}
