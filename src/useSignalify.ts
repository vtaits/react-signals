import type { Signal } from "signal-polyfill";
import { useSignalState } from "./useSignalState";

/**
 * Hook that wraps a non-signal value with a local state signal for the component.
 *
 * @param value Value that will be set to the signal on each call of the hook
 * @param options Signal's options
 */
export function useSignalify<S>(
	value: S,
	options?: Signal.Options<S> | undefined,
): Signal.State<S> {
	const signal = useSignalState(value, options);

	signal.set(value);

	return signal;
}
