import Fuse from "fuse.js";
import pullAll from "lodash.pullall";
import { UserMatchObjectType } from "../Routes/Common/Workflows/MatchHeadersTypes";
import zipObject from "lodash.zipobject";

const computeFileHeaderMatches = (
  fileHeaders: string[],
  applicationHeaders: string[],
  savedMatchObjectAll: UserMatchObjectType,
  workflowClass: string
) => {
  const specificSavedMatchObject =
    savedMatchObjectAll[workflowClass]["headers"];

  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  //Setup fuzzy logic matching
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationHeaders, options);

  const fileHeaderMatches: Record<string, number>[] = [];
  for (const fileHeader of fileHeaders) {
    const searchResult = fuse.search(fileHeader);
    const matchedHeaders = searchResult.map((match) => match["item"]);
    const matchedScores = searchResult.map((match) => match["score"]);

    if (matchedHeaders.length > 0) {
      const mtchdHeaders = matchedHeaders;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round((1 - score) * 100) : 0
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
