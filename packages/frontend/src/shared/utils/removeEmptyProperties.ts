const removeEmptyProperties = (obj: Record<string, string>): Record<string, string> =>
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== "")
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

export default removeEmptyProperties;
