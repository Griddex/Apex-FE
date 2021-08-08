const getFirstCharFromEveryWord = (sentence: string) => {
  if (sentence === undefined) return "";
  const parts = sentence.split(" ");

  const abbreviation = parts.reduce((final, part) => {
    const firstChar = part.charAt(0).toUpperCase();
    return final.concat(firstChar);
  }, "");

  return abbreviation;
};

export default getFirstCharFromEveryWord;
