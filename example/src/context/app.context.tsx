import React, {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from 'react';
import type { AppContextData, AppStateData, AppStateReducer } from './types';
import { reducer } from '../redux/reducer';

const initialState: AppStateData = {
  secret: '',
  view: 'encrypt',
};

export const AppContext = createContext<AppContextData>({} as AppContextData);

type AppContextProviderProps = PropsWithChildren<{}>;

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = useReducer<AppStateReducer>(reducer, initialState);

  const stateAndDispatch = { state, dispatch } as const;

  return (
    <AppContext.Provider value={stateAndDispatch}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
