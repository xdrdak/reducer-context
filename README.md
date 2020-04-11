# reducer-context

Simple state management using pretty much only the React context and a hook.

## Why?

This is a pattern I regularly use that works for most of my use cases for quick and dirty projects.

Simple, lightweight and no-nonsense way of having some sort of state held within a React context.

## Getting Started

```jsx
import createReducerContext from 'reducer-context';

// (optional) Define some typescript shennanigans
type State = { animals: string[] };
type Action = { type: 'add_animal', payload: string };

// Prepare the initial state of your container
const initialState: State = {
  animals: ['serval', 'caracal', 'fennec'],
};

// Build out your reducer as per React docs (see https://reactjs.org/docs/hooks-reference.html#usereducer)
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_animal':
      return {
        ...state,
        animals: [...state.animals, action.payload],
      };
    default:
      return state;
  }
}

// Pass in your reducer and initialState into the createReducerContext
const [AnimalProvider, useAnimalContext] = createReducerContext(
  reducer,
  initialState
);

// Wrap whatever with the provider
const App: React.FC = () => (
  <AnimalProvider>
    <h1>List of animals</h1>
    <AnimalAdder />
    <AnimalDisplayer />
  </AnimalProvider>
);

// Use the included hook to access state...
const AnimalDisplayer = () => {
  const { state } = useAnimalContext();
  return (
    <ul>
      {state.animals.map((animal) => (
        <li key={animal}>{animal}</li>
      ))}
    </ul>
  );
};

// Or use it to dispatch events!
const AnimalAdder = () => {
  const { dispatch } = useAnimalContext();
  const [state, setState] = React.useState('');

  return (
    <div>
      <input
        onChange={(e) => {
          setState(e.target.value);
        }}
        value={state}
      />
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'add_animal', payload: state });
          setState('');
        }}
        disabled={state.length === 0}
      >
        add animal
      </button>
    </div>
  );
};
```
