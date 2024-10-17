import type { Signal } from "signal-polyfill";
import { useSignalState } from "./useSignalState";

export function useSignalify<S>(
	value: S,
	options?: Signal.Options<S> | undefined,
): Signal.State<S> {
	const signal = useSignalState(value, options);

	signal.set(value);

	return signal;
}
