import * as React from 'react';
import createReducerContext from '../src';

// Define some typescript shennanigans
type State = { animals: string[] };
type Action =
  | { type: 'add_animal'; payload: string }
  | { type: 'delete_animal'; payload: number };

// Prepare the initial state of your container
const initialState = {
  animals: ['serval', 'caracal', 'fennec'],
};

// Build out your reducer (see https://reactjs.org/docs/hooks-reference.html#usereducer)
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_animal':
      return {
        ...state,
        animals: [...state.animals, action.payload],
      };
    case 'delete_animal':
      return {
        ...state,
        animals: state.animals.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
}

const [Container, useReducerContext] = createReducerContext(
  reducer,
  initialState
);

const AnimalDisplayer = () => {
  const { state, dispatch } = useReducerContext();
  return (
    <ul>
      {state.animals.map((animal, index) => (
        <li key={animal}>
          {animal} -{' '}
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'delete_animal', payload: index });
            }}
          >
            remove
          </button>
        </li>
      ))}
    </ul>
  );
};

const AnimalAdder = () => {
  const [state, setState] = React.useState('');
  const { dispatch } = useReducerContext();

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

export default {
  title: 'Reducer',
};

export const Default = () => {
  return (
    <Container>
      Japari Park Zoo
      <AnimalAdder />
      <AnimalDisplayer />
    </Container>
  );
};
