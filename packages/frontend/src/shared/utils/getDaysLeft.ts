const getDaysLeft = (dueDate: string) => {
  const dueDat = dueDate.split("T")[0];
  const dueDateObj: Date = new Date(dueDat);
  const today: Date = new Date();

  // Calculate the difference in time
  const diffTime: number = dueDateObj.getTime() - today.getTime();

  // Convert milliseconds to days
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Return the result in a human-readable format
  if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} days`;
  }
  if (diffDays === 0) {
    return "Due today";
  }
  if (diffDays === 1) {
    return "1 day left";
  }
  return `${diffDays} days left`;
};

export default getDaysLeft;
