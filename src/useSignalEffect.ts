import { useEffect } from "react";
import { effect } from "./effect";

/**
 * Call effect that depends on signals. Signals inside are tracked automatically.
 *
 * @param callback Imperative function that can return a cleanup function
 * @param deps Non-signal dependencies
 */
export function useSignalEffect(
	callback: () => void | VoidFunction,
	deps: readonly unknown[],
) {
	useEffect(() => {
		const cleanup = effect(callback);

		return cleanup;
		// biome-ignore lint/correctness/useExhaustiveDependencies: pass deps through
	}, deps);
}
