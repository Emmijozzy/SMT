export const toSentenceCase = (input: string): string => {
  // Split the input string into sentences based on punctuation marks
  const sentences = input.split(/([.!?])/);

  // Process each sentence
  for (let i = 0; i < sentences.length; i += 2) {
    if (sentences[i]) {
      // Capitalize the first word of the sentence
      sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1).toLowerCase();
    }
  }

  // Join the sentences back together with their respective punctuation marks
  let result = "";
  for (let i = 0; i < sentences.length; i += 2) {
    result += sentences[i];
    if (i + 1 < sentences.length) {
      result += sentences[i + 1];
    }
  }

  return result;
};
