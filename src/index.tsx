import * as React from 'react';

type Reducer<State, Action> = (state: State, action: Action) => any;
interface ProviderValue<State, Type> {
  state: State;
  dispatch?: (action: Type) => void;
}

/**
 * @name createReducerContext
 * @description Generate a React context with an associated reducer attached to it.
 *
 * @param reducer a reducer function as per react documentation (https://reactjs.org/docs/hooks-reference.html#usereducer)
 * @param initialState Initial state object
 *
 * @returns Context.Provider, useReducerContext
 */
export default function createReducerContext<State, Action, InitialState>(
  reducer: Reducer<State, Action>,
  initialState: InitialState
): [React.FC, () => ProviderValue<State | InitialState, Action>] {
  const Context = React.createContext<ProviderValue<InitialState, Action>>({
    state: initialState,
  });

  const Container: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    );
  };

  const useReducerContext = () => React.useContext(Context);

  return [Container, useReducerContext];
}
