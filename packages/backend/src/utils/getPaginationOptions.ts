export interface IPaginationOptions {
  page: number;
  limit: number;
  skip: number;
  sortField: string;
  sortOrder: "asc" | "desc";
}

const getPaginationOptions = (pagination: Record<string, string>): IPaginationOptions => {
  // Use destructuring and optional chaining for cleaner syntax
  const { page = "1", limit = "10", sortField = "userId", sortOrder = "asc" } = pagination || {};

  // Type assertions for clarity (optional)
  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  // Validate and handle invalid page or limit values (consider default values)
  if (isNaN(parsedPage) || parsedPage <= 0) {
    throw new Error("Invalid page number");
  }

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    throw new Error("Invalid limit value");
  }

  const skip = (parsedPage - 1) * parsedLimit; // Corrected calculation

  return {
    page: parsedPage,
    limit: parsedLimit,
    skip,
    sortField,
    sortOrder: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" // Normalize sort order
  };
};

export default getPaginationOptions;
