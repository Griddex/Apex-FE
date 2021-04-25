import Fuse from "fuse.js";
import pullAll from "lodash.pullall";
import { UserMatchObjectType } from "../Routes/Common/Workflows/MatchHeadersTypes";
import zipObject from "lodash.zipobject";

const computeFileUnitMatches = (
  fileUnitsWithoutNone: string[],
  applicationUnits: string[],
  savedMatchObjectAll: UserMatchObjectType,
  workflowClass: string
) => {
  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];

  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  //Setup fuzzy logic matching
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    keys: [],
  };
  const fuse = new Fuse(applicationUnits, options);

  const fileUnitMatches: Record<string, number>[] = [];
  for (const fileUnit of fileUnitsWithoutNone) {
    let searchResult = [] as Fuse.FuseResult<string>[];
    if (fileUnit === "unitless")
      searchResult = [{ item: "unitless", score: 0, refIndex: 1 }];
    else searchResult = fuse.search(fileUnit);

    const matchedUnits = searchResult.map((match) => match["item"]);
    const matchedScores = searchResult.map((match) => match["score"]);

    if (matchedUnits.length > 0) {
      const mtchdUnits = matchedUnits;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round((1 - score) * 100) : 0
      );

      if (!mtchdUnits.includes("None")) {
        mtchdUnits.push("None");
        cleanedMatchedScores.push(0);
      }

      if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
        const matchUnit = specificSavedMatchObject[fileUnit];

        pullAll(mtchdUnits, [matchUnit.header]);
        mtchdUnits.unshift(matchUnit.header);
        cleanedMatchedScores.unshift(100);
      }

      fileUnitMatches.push(zipObject(mtchdUnits, cleanedMatchedScores));
    } else {
      const appUnits = applicationUnits;
      const zeroScores: number[] = new Array(applicationUnits.length).fill(0);

      if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
        const matchUnit = specificSavedMatchObject[fileUnit];
        pullAll(appUnits, [matchUnit.header]);

        appUnits.unshift(matchUnit.header);
        zeroScores.unshift(100);
      }

      appUnits.push("Date");
      zeroScores.push(0);

      fileUnitMatches.push(zipObject(appUnits, zeroScores));
    }
  }

  return fileUnitMatches;
};

export default computeFileUnitMatches;
