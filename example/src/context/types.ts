import type { Dispatch } from 'react';

export interface AppStateData {
  secret: string;
  view: 'encrypt' | 'decrypt';
}

export interface AppStatePayload {
  secret?: string;
  view?: 'encrypt' | 'decrypt';
}

export interface AppStateAction {
  type: 'SET_SECRET' | 'SET_VIEW';
  payload: AppStatePayload;
}

export interface AppStateReducer {
  (state: AppStateData, action: AppStateAction): AppStateData;
}

export interface AppContextData {
  state: AppStateData;
  dispatch: Dispatch<AppStateAction>;
}
