import { useEffect, useRef, useState } from "react";
import { effect } from "./effect";
import type { AnySignal } from "./types";

export function useRerender(
	// biome-ignore lint/suspicious/noExplicitAny: supports any type of signal
	signals: readonly AnySignal<any>[],
) {
	const [_, setCounter] = useState(0);
	const isFirstRenderRef = useRef(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: it is assumed that the list of signals does not change
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
