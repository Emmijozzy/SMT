import { v4 as uuidv4 } from "uuid";

function generateAlertId(): string {
  return uuidv4(); // Generates a version 4 UUID (random)
}

export default generateAlertId;
