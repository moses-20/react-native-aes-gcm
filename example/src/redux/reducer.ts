import type { AppStateAction, AppStateData } from '../context/types';

export const reducer = (
  state: AppStateData,
  action: AppStateAction
): AppStateData => {
  switch (action.type) {
    case 'SET_SECRET':
      return {
        ...state,
        secret: action.payload.secret!,
      };
    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload.view!,
      };
    default:
      return state;
  }
};
