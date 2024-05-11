function saveToLocalStorage(key: string, data: string | Record<string, string>): void {
  localStorage.setItem(key, JSON.stringify(data));
}

type RetrievedData = string | Record<string, string> | null;

function getDataFromLocalStorage(key: string): RetrievedData {
  const dataString: string | null = localStorage.getItem(key);
  if (dataString) {
    try {
      return JSON.parse(dataString) as RetrievedData;
    } catch (error) {
      console.error("Error parsing data:", error);
      return null;
    }
  }
  return null;
}

export default {
  saveToLocalStorage,
  getDataFromLocalStorage,
};
