"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored !== null) {
      try {
        setValue(JSON.parse(stored) as T);
      } catch (error) {
        console.error(`Could not read "${key}" from local storage:`, error);
      }
    }
    setIsLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, isLoaded]);

  return [value, setValue, isLoaded] as const;
}