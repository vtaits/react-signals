import { useState } from "react";
import { Signal } from "signal-polyfill";

export function useSignalComputed<S>(
	computation: () => S,
	options?: Signal.Options<S> | undefined,
): Signal.Computed<S> {
	const [signal] = useState(() => {
		return new Signal.Computed(computation, options);
	});

	return signal;
}
