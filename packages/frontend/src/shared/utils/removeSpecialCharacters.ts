const removeSpecialCharacters = (inputString: string) => {
  const specialCharsRegex = /[^\w\s]/g;

  const resultString = inputString.replace(specialCharsRegex, "");

  return resultString;
};

export default removeSpecialCharacters;
