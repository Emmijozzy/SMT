import log from "./log";

function saveToLocalStorage(key: string, data: string | Record<string, string>): void {
  localStorage.setItem(key, JSON.stringify(data));
}

type RetrievedData = string | Record<string, string> | null;

function getDataFromLocalStorage(key: string): RetrievedData {
  const dataString: string | null = localStorage.getItem(key);
  if (dataString) {
    try {
      return JSON.parse(dataString) as RetrievedData;
    } catch (e: unknown) {
      const error = e as Error;
      log("error", "Error parsing data at local storage:", error.message, error.stack as string);
      return null;
    }
  }
  return null;
}

export default {
  saveToLocalStorage,
  getDataFromLocalStorage,
};
