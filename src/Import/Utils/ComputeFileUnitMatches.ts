import pullAll from "lodash.pullall";
import sortBy from "lodash.sortby";
import zipObject from "lodash.zipobject";
import stringSimilarity, { BestMatch } from "string-similarity";
import { TUserMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const computeFileUnitMatches = (
  fileUnitsWithoutNone: string[],
  applicationUnits: string[],
  savedMatchObjectAll: TUserMatchObject,
  workflowClass: string
) => {
  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];

  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  const fileUnitMatches: Record<string, number>[] = [];
  for (const fileUnit of fileUnitsWithoutNone) {
    let searchResult = {} as BestMatch["ratings"];
    let sortedSearchResultDesc = {} as BestMatch["ratings"];
    if (fileUnit === "unitless")
      searchResult = [{ target: "unitless", rating: 0 }];
    else
      searchResult = stringSimilarity.findBestMatch(fileUnit, applicationUnits)[
        "ratings"
      ];

    sortedSearchResultDesc = sortBy(searchResult, (o) => o.rating).reverse();

    const matchedUnits = sortedSearchResultDesc.map((match) => match["target"]);
    const matchedScores = sortedSearchResultDesc.map(
      (match) => match["rating"]
    );

    if (matchedUnits.length > 0) {
      const mtchdUnits = matchedUnits;
      const mtchdScores = matchedScores;

      const cleanedMatchedScores = mtchdScores.map(
        (score: number | undefined) =>
          score !== undefined ? Math.round(score * 100) : 0
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
