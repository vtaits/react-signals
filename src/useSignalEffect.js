import { useEffect } from "react";
import { effect } from "./effect.js";

/**
 * Call effect that depends on signals. Signals inside are tracked automatically.
 *
 * @param {() => void | VoidFunction} callback Imperative function that can return a cleanup function
 * @param {readonly unknown[]} deps Non-signal dependencies
 */
export function useSignalEffect(callback, deps) {
	useEffect(() => {
		const cleanup = effect(callback);

		return cleanup;
	}, deps);
}
