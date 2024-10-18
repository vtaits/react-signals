[![NPM](https://img.shields.io/npm/v/@vtaits/react-signals.svg)](https://www.npmjs.com/package/@vtaits/react-signals)
![dependencies status](https://img.shields.io/librariesio/release/npm/@vtaits/react-signals)

# @vtaits/react-signals

This is an integration of `react` and [TC39 signals](https://github.com/tc39/proposal-signals)

## Motivation

This library not only integrates `react` with the proposed signals but also alleviates some state-management cases in `react` components:

* Access to current state value in the callback

  Without signals:

  ```ts
  const [value, setValue] = useState(0);

  const someCallback = useCallback(async () => {
    await someAsyncAction();

    // how to get an actual value???
  }, [value]);
  ```

  With signals:

  ```ts
  const value = useSignalState(0);

  const someCallback = useCallback(async () => {
    const valueBeforeAction = value.get();

    await someAsyncAction();

    // You can get it easyly
    const valueAfterAction = value.get();
  }, [value]);
  ```

* Callbacks that depend on signals are unchanged:

  Without signals:

  ```ts
  const [value, setValue] = useState(0);

  // Create new callback on every value change
  const someCallback = useCallback(async () => {
    // ...
  }, [value]);
  ```

  With signals:

  ```ts
  const value = useSignalState(0);

  // The value refers to the same signal
  const someCallback = useCallback(async () => {
    // ...
  }, [value]);
  ```

* Re-render only the leaf component when prop drilling

  ```tsx
  function InnerComponent({ counter }) {
    useRerender([counter]);

    return (
      <div>
        {counter.get()}
      </div>
    );
  }

  function OuterComponent({ counter }) {
    return <InnerComponent signal={counter} />
  }

  function RootComponent() {
    const counter = useSignalState(0);

    return (
      <>
        <OuterComponent counter={counter} />

        <button
          type="button"
          onClick={() => {
            counter.set(counter.get() + 1);
          }}
        >
          Increase
        </button>
      </>
    );
  }
  ```

  Only the `InnerComponent` component is re-rendered after clicking the increase button.

## API

### useSignalState

Create a signal as a local state of the component. This is an alternative to `useState`.

```tsx
import { useRerender, useSignalState } from "@vtaits/react-signals";

function App() {
  const counter = useSignalState(0);

  useRerender([counter]);

  return (
    <>
      <span>{counter.get()}</span>

      <button
        type="button"
        onClick={() => {
          counter.set(counter.get() + 1);
        }}
      >
        Increase
      </button>
    </>
  );
}
```

<b>NOTE</b> that unlike `useState`, the component will not re-render automatically. Therefore, if you want to bind component rendering to the signal, you have to call `useRerender`.

### useSignalComputed

Create a computed signal. This is an alternative to `useMemo`.

```tsx
import { useRerender, useSignalComputed, useSignalState } from "@vtaits/react-signals";

function App() {
  const counter = useSignalState(0);
  const isEven = useSignalComputed(() => (counter.get() & 1) == 0);
  const parity = useSignalComputed(() => isEven.get() ? "even" : "odd");

  useRerender([counter, parity]);

  return (
    <>
      <div>{counter.get()}</div>
      <div>{parity.get()}</div>

      <button
        type="button"
        onClick={() => {
          counter.set(counter.get() + 1);
        }}
      >
        Increase
      </button>
    </>
  );
}
```

<b>NOTE</b> that unlike `useMemo`, the component will not re-render automatically. Therefore, if you want to bind component rendering to the signal, you have to call `useRerender`.

### useRerender

Bind component rendering to the signal. The signal can be both local and external.

The example with a global signal:

```tsx
import { useRerender } from "@vtaits/react-signals";
import { Signal } from "signal-polyfill";

const clock = new Signal.State(new Date()); // Create a global signal that stores the current date

setInterval(() => {
	clock.set(new Date());
}, 100);

export function App() {
	useRerender([clock]); // Bind rendering to global signal

	return (
    <div>
      {new Intl.DateTimeFormat("en-US", {
        dateStyle: undefined,
        timeStyle: "medium",
        hour12: false,
      }).format(clock.get())}
    </div>
	);
}
```

### useSignalEffect

This is an alternative to `useEffect`. This hook automatically tracks changes to signals within the callback.

```tsx
import { useSignalEffect, useSignalState } from "@vtaits/react-signals";

export function App() {
	const counter = useSignalState(0);

	useSignalEffect(() => {
		const counterValue = counter.get();

		// init logic

		return () => {
		  // destroy logic
		};
	}, []);

	return (
    <button
      type="button"
      onClick={() => {
        counter.set(counter.get() + 1);
      }}
    >
      Increase
    </button>
  );
}
```

<b>NOTE</b> that this hook tracks automatically only signals. If you want also to track some non-signal values, you can use the second argument like to `useEffect`.

```tsx
const log = useLogger();

useSignalEffect(() => {
  const counterValue = counter.get();

  log(counterValue);
}, [log]);
```

### useSignalify

Wrap non-signal value to the signal to allow to use it with signal-flow.

```tsx
import { useSignalify } from "@vtaits/react-signals";

function App({
  id,
}: {
  id: string;
}) {
  const idSignal = useSignalify(id);

  // ...
}
```

## Local development

* `npm run storybook` - start `storybook` with examples
* `npm lint` - run linter
* `npm test:ts` - check typescript
* `npm test:storybook` - run storybook tests
* `npm test` - run all validators
* `npm lint:fix` - auto-correct some linter errors
* `npm test:storybook:dev` - run storybook tests in watch mode
