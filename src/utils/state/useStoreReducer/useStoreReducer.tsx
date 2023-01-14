import React, { Dispatch } from 'react';

type Toast = {
  severity: 'success' | 'warning' | 'error' | 'info';
  duration: number;
};

type State = {
  message: string | null;
  data?: Toast;
};

type Action = {
  type: 'toast';
  payload: {
    message: string;
    data?: Toast;
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'toast': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export const useStoreReducer = (): [State, Dispatch<Action>] => {
  const [message, dispatch]: [State, Dispatch<Action>] = React.useReducer(
    reducer,
    {
      message: null,
      data: null,
    }
  );

  return [message, dispatch];
};

export default useStoreReducer;
