import { BabbiLocalStorage } from "../types";

export function getLocalStorageValue(key: string): string {
  const storage = localStorage;

  const item = storage.getItem(key);

  if (item) return item;

  throw new Error("LocalStorage Key 'ibabbi' not found.");
}

export function setLocalStorage(key: string, value: BabbiLocalStorage): void {
  const storage = localStorage;
  const stringified = JSON.stringify(value);
  storage.setItem(key, stringified);
}

export function localStorageKeyExists(key: string): boolean {
  try {
    getLocalStorageValue(key);
    return true;
  } catch {
    return false;
  }
}
