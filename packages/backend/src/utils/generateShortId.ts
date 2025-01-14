import { v4 as uuidv4 } from "uuid";

function generateShortId(length: number = 6): string {
  // Generate a full UUID
  const fullUuid = uuidv4();

  // Remove hyphens and take the first `length` characters
  const shortId = fullUuid.replace(/-/g, "").substring(0, length);

  return shortId;
}
export default generateShortId;
