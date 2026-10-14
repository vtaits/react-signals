import { useEffect, useRef, useState } from "react";
import { effect } from "./effect.js";

/**
 * @import { AnySignal } from "./types.js"
 */

/**
 * Hook that monitors a list of signals and triggers re-render of the component if one of them is changed.
 *
 * @param {readonly AnySignal<any>[]} signals
 */
export function useRerender(signals) {
	const [_, setCounter] = useState(0);
	const isFirstRenderRef = useRef(true);

	useEffect(() => {
		const cleanup = effect(() => {
			for (const signal of signals) {
				signal.get();
			}

			if (isFirstRenderRef.current) {
				isFirstRenderRef.current = false;
			} else {
				setCounter((value) => value + 1);
			}
		});

		return cleanup;
	}, []);
}
