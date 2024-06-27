import { useEffect, useState } from "react";

const useLocalStorageState = <T>(key: string, initialState: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error);
    }
  }, [state]);

  return [state, setState] as const;
};

export default useLocalStorageState