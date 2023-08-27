import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
  const [state, setState] = useState(() => {
    const stored = JSON.parse(localStorage.getItem(key)) || initialState;
    return stored;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
