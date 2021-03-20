import uniq from "lodash.uniq";

const getMappingErrors = (chosenApplicationHeaders: string[]) => {
  const chosenApplicationHeadersNoNone = chosenApplicationHeaders.filter(
    (v) => v.toLowerCase() !== "none"
  );

  const uniqueChosenApplicationHeaders = uniq(chosenApplicationHeadersNoNone);
  if (
    chosenApplicationHeadersNoNone.length >
    uniqueChosenApplicationHeaders.length
  ) {
    return "Some selected application headers are duplicated";
  } else "";
};

export default getMappingErrors;
