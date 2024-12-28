const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

  return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`;
};

export default formatDateTime;
