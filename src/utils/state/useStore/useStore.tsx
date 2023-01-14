import React from 'react';
import { Store } from '../../../../pages/_app';

export const useStore = () => {
  return React.useContext(Store);
};

export default useStore;
