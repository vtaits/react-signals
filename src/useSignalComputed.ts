import { useState } from "react";
import { Signal } from "signal-polyfill";

/**
 * Hook that creates a local computed signal for the component.
 *
 * @param computation Signal's computation function
 * @param options Signal's options
 */
export function useSignalComputed<S>(
	computation: () => S,
	options?: Signal.Options<S> | undefined,
): Signal.Computed<S> {
	const [signal] = useState(() => {
		return new Signal.Computed(computation, options);
	});

	return signal;
}
