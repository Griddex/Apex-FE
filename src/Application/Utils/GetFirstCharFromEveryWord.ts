const getFirstCharFromEveryWord = (sentence: string) => {
  if (!sentence) return "";
  const parts = sentence.split(" ");

  const abbreviation = parts.reduce((final, part) => {
    const firstChar = part.charAt(0).toUpperCase();
    return final.concat(firstChar);
  }, "");

  return abbreviation;
};

export default getFirstCharFromEveryWord;
