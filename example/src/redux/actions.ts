export const AppActions = {
  setSecret: (secret: string) => ({
    type: 'SET_SECRET',
    payload: { secret },
  }),
  setView: (text: string) => ({
    type: 'SET_VIEW',
    payload: { text },
  }),
};
