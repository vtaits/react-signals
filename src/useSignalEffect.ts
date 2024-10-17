import { useEffect } from "react";
import { effect } from "./effect";

export function useSignalEffect(
	callback: () => void | VoidFunction,
	deps: readonly unknown[],
) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: it is assumed that the callback does not change
	useEffect(() => {
		const cleanup = effect(callback);

		return cleanup;
	}, deps);
}
