export default function getRelativeTimeString(dateJoined: string | Date): string {
  // Ensure dateJoined is a Date object
  const date = new Date(typeof dateJoined === "string" ? dateJoined : dateJoined);

  // Get the difference in milliseconds between now and the provided date
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  // Calculate the difference in seconds, minutes, hours, days, months, and years
  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  // Determine the appropriate unit and format the string
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
