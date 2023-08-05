---
layout: base.njk
title: History system using React Redux
date: 2023-08-06
---

Start from here.

```tsx
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h1>History system - Single file example</h1>
    </div>
  );
};

export default Home;
```

And the result code: https://gist.github.com/ginpei/4a6842db2efd5159e1accf2bbe121121

## Add Redux to your page

Hints:

- Separate a state you want to enable undo/redo from other states into a sub-state.

Install Redux packages.

```
$ npm install @reduxjs/toolkit react-redux
```

Prepare a sub-state. This portion will have own undo/redo history.

```tsx
// partial state for a section (an undo target)
interface NumberState {
  value: number;
}

const initialNumberState: NumberState = {
  value: 0,
};

// methods to update the state
// (They are NOT invoked directly)
const numberReducers = {
  set: (state: NumberState, action: PayloadAction<number>): NumberState => {
    const value = action.payload;
    return {
      ...state,
      value,
    };
  },
};

// combine above into an object called "slice"
const numberSlice = createSlice({
  name: "number",
  initialState: initialNumberState,
  reducers: numberReducers,
});

// kind of getters
function useNumberValue() {
  return useSelector((state: StoreState) => state.number.value);
}

// kind of setters generated from reducers to update the state
// e.g. dispatch(numberActions.set(10));
const numberActions = numberSlice.actions;
```

Create a store for a page.

```tsx
// whole state for a page
// (Why separated to sub-states? See below sections)
interface StoreState {
  number: NumberState;
}

// finally, create a store
const store = configureStore<StoreState>({
  reducer: {
    number: numberSlice.reducer,
  },
});
```

Use the store in a page.

```tsx
// components that use the state have to be wrapped by Provider
const Home: NextPage = () => {
  // const value = useNumberValue();
  // ^ this does not work
  //   Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>

  return (
    <Provider store={store}>
      <PageContent />
    </Provider>
  );
};

// to get, use selectors. e.g. `useNumberValue()` (prepared above)
// to update, use dispatch. e.g. `dispatch(numberActions.set())`
function PageContent() {
  const dispatch = useDispatch();
  const value = useNumberValue();

  return (
    <div>
      <h1>History system - Single file example</h1>
      <div>
        Value: {value}{" "}
        <button onClick={() => dispatch(numberActions.set(value + 10))}>
          +10
        </button>
      </div>
    </div>
  );
}
```

## Set up undo/redo

Hints:

- Wrap the sub-state reducer by `undoable()`.
- Wrap the sub-state interface by `StateWithHistory`.
- Update `state.subState.value` to `state.subState.present.value`.
- To undo, run `dispatch(ActionCreators.undo())`. To redo, as well.

Use [redux-undo](https://www.npmjs.com/package/redux-undo).

```
$ npm install redux-undo
```

Wrap the sub-state reducer by `undoable()`. Don't forget to update the store state interface because the sub-state is wrapped by `StateWithHistory` by the `undoable()`.

```tsx
import undoable from "redux-undo";
```

```tsx
// whole state for a page
// (The sub-state will be wrapped by `undoable()`)
interface StoreState {
  number: StateWithHistory<NumberState>;
}

// finally, create a store wrapping the sub-state
const store = configureStore<StoreState>({
  reducer: {
    number: undoable(numberSlice.reducer),
  },
});
```

Update the selector to follow the above changes.

By the `undoable()`, the sub-state now has `past` and `future` along with `present`.

```tsx
function useNumberValue() {
  return useSelector((state: StoreState) => state.number.present.value);
}
```

Now it's ready to undo/redo. To invoke, use action creators provided by `redux-undo`.

```tsx
import { ActionCreators } from "redux-undo";
```

```tsx
<div>
  <button onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
  <button onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
</div>
```

You can disable those buttons by seeing if histories are empty.

```tsx
function useNumberPast() {
  return useSelector((state: StoreState) => state.number.past);
}
function useNumberFuture() {
  return useSelector((state: StoreState) => state.number.future);
}
```

```tsx
const past = useNumberPast();
const future = useNumberFuture();
```

```tsx
<button
  disabled={past.length < 1}
  onClick={() => dispatch(ActionCreators.undo())}
>
  Undo
</button>
```

## Make a history list

You can show the history of past, present, and future.

```tsx
function useNumberPast(): NumberState[] {
  return useSelector((state: StoreState) => state.number.past);
}
function useNumberPresent(): NumberState {
  return useSelector((state: StoreState) => state.number.present);
}
function useNumberFuture(): NumberState[] {
  return useSelector((state: StoreState) => state.number.future);
}
```

```tsx
const past = useNumberPast();
const present = useNumberPresent();
const future = useNumberFuture();
```

```tsx
<ul>
  {past.map((v) => (
    <li>{v.value}</li>
  ))}
  <li>{present.value}</li>
  {future.map((v) => (
    <li>{v.value}</li>
  ))}
</ul>
```

Use `dispatch(ActionCreators.jumpToPast(index))` to jump as well as future.

```tsx
{past.map((v, i) => (
  <li key={v.id} onClick={() => dispatch(ActionCreators.jumpToPast(i))}>
    {v.title}
  </li>
))}
```

## Title histories

To make it look better, and also give `key` to each item, update state interface.

```tsx
// partial state for a section (undo target)
interface NumberState {
  id: string;
  title: string;
  value: number;
}

const initialNumberState: NumberState = {
  id: "initial",
  value: 0,
  title: "Initial",
};
```

And give the `id` and `title` too when you update the state.

```tsx
// methods to update the state
// (They are NOT invoked directly)
const numberReducers = {
  set: (state: NumberState, action: PayloadAction<number>): NumberState => {
    const value = action.payload;
    return {
      ...state,
      id: crypto.randomUUID(),
      value,
      title: `Set ${value}`,
    };
  },
};
```

Now you can use them.

```tsx
<ul>
  {past.map((v) => (
    <li key={v.id}>{v.title}</li>
  ))}
  <li>{present.title}</li>
  {future.map((v) => (
    <li key={v.id}>{v.title}</li>
  ))}
</ul>
```

## Separate from the others

A history is still shared between whole store state. You can separate it by giving a specific name to the `undoable()`.

```tsx
const numberStateUndoableOption: UndoableOptions = {
  undoType: "NUMBER_UNDO",
  redoType: "NUMBER_REDO",
  jumpToPastType: "NUMBER_JUMP_TO_PAST",
  jumpToFutureType: "NUMBER_JUMP_TO_FUTURE",
};
```

```tsx
// finally, create a store wrapping the sub state
const store = configureStore<StoreState>({
  reducer: {
    number: undoable(numberSlice.reducer, numberStateUndoableOption),
  },
});
```

Prepare action creators with the names in the options.

```tsx
const numberHistoryActions = {
  undo: () => ({ type: numberStateUndoableOption.undoType }),
  redo: () => ({ type: numberStateUndoableOption.redoType }),
  jumpToPast: (index: number) => ({
    type: numberStateUndoableOption.jumpToPastType,
    index,
  }),
  jumpToFuture: (index: number) => ({
    type: numberStateUndoableOption.jumpToFutureType,
    index,
  }),
};
```

And replace the existing ones, like `ActionCreators.undo()` with `numberHistoryActions.undo()`.

```tsx
<button
  disabled={past.length < 1}
  onClick={() => dispatch(numberHistoryActions.undo())}
>
  Undo
</button>
```

```tsx
{past.map((v, i) => (
  <li key={v.id} onClick={() => dispatch(numberHistoryActions.jumpToPast(i))}>
    {v.title}
  </li>
))}
```

As a result, you'll see code like this: https://gist.github.com/ginpei/4a6842db2efd5159e1accf2bbe121121
