import { useEffect, useState } from 'react';

const useLocalStorage = (key: any, value: any) => {
  const [state, setState] = useState(() => {
    const localItem = localStorage.getItem(key);
    return localItem ? localItem : value;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
