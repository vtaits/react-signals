import type { Signal } from "signal-polyfill";

export type AnySignal<S> = Signal.State<S> | Signal.Computed<S>;
