import pullAll from "lodash.pullall";
import sortBy from "lodash.sortby";
import zipObject from "lodash.zipobject";
import stringSimilarity, { BestMatch } from "string-similarity";
import { TUserMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const computeFileHeaderMatches = (
  fileHeaders: string[],
  applicationHeaders: string[],
  savedMatchObjectAll: TUserMatchObject,
  workflowClass: string
) => {
  const specificSavedMatchObject =
    savedMatchObjectAll[workflowClass]["headers"];

  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  const fileHeaderMatches: Record<string, number>[] = [];
  for (const fileHeader of fileHeaders) {
    let searchResult = {} as BestMatch["ratings"];
    let sortedSearchResultDesc = {} as BestMatch["ratings"];
    searchResult = stringSimilarity.findBestMatch(
      fileHeader,
      applicationHeaders
    )["ratings"];

    sortedSearchResultDesc = sortBy(searchResult, (o) => o.rating).reverse();

    const matchedHeaders = sortedSearchResultDesc.map(
      (match) => match["target"]
    );
    const matchedScores = sortedSearchResultDesc.map(
      (match) => match["rating"]
    );

    if (matchedHeaders.length > 0) {
      const mtchdHeaders = matchedHeaders;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round(score * 100) : 0
      );

      if (!mtchdHeaders.includes("None")) {
        mtchdHeaders.push("None");
        cleanedMatchedScores.push(0);
      }

      if (specificSavedMatchObjectKeys.includes(fileHeader.trim())) {
        const matchHeader = specificSavedMatchObject[fileHeader];
        pullAll(mtchdHeaders, [matchHeader.header]);

        mtchdHeaders.unshift(matchHeader.header);
        cleanedMatchedScores.unshift(100);
      }

      fileHeaderMatches.push(zipObject(mtchdHeaders, cleanedMatchedScores));
    } else {
      const appHeaders = applicationHeaders;
      const zeroScores: number[] = new Array(appHeaders.length).fill(0);

      if (specificSavedMatchObjectKeys.includes(fileHeader.trim())) {
        const matchHeader = specificSavedMatchObject[fileHeader];
        pullAll(appHeaders, [matchHeader.header]);

        appHeaders.unshift(matchHeader.header);
        zeroScores.unshift(100);
      }

      if (!appHeaders.includes("None")) {
        appHeaders.push("None");
        zeroScores.push(0);
      }

      fileHeaderMatches.push(zipObject(appHeaders, zeroScores));
    }
  }

  return fileHeaderMatches;
};

export default computeFileHeaderMatches;
