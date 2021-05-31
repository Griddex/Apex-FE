import pullAll from "lodash.pullall";
import sortBy from "lodash.sortby";
import zipObject from "lodash.zipobject";
import stringSimilarity, { BestMatch } from "string-similarity";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { IUnit } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { TUserMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const computeFileUnitMatches = (
  variableNameUnitsMap: Record<string, IUnit[]>,
  currentApplicationHeaderOptions: ISelectOption[],
  chosenApplicationHeadersWithoutNone: string[],
  fileUnitsWithoutNone: string[],
  applicationUnits: string[],
  savedMatchObjectAll: TUserMatchObject,
  workflowClass: string
) => {
  console.log(
    "Logged output --> ~ file: ComputeFileUnitMatches.ts ~ line 18 ~ variableNameUnitsMap",
    variableNameUnitsMap
  );
  console.log(
    "Logged output --> ~ file: ComputeFileUnitMatches.ts ~ line 18 ~ currentApplicationHeaderOptions",
    currentApplicationHeaderOptions
  );
  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];
  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  const chosenAppHeaderNamesWithoutNone = [];
  for (const header of chosenApplicationHeadersWithoutNone) {
    for (const option of currentApplicationHeaderOptions) {
      if (header === option.label) {
        chosenAppHeaderNamesWithoutNone.push(option.value);
        break;
      }
    }
  }
  console.log(
    "Logged output --> ~ file: ComputeFileUnitMatches.ts ~ line 22 ~ chosenAppHeaderNamesWithoutNone",
    chosenAppHeaderNamesWithoutNone
  );

  let i = 0;
  const fileUnitMatches: Record<string, number>[] = [];
  for (const fileUnit of fileUnitsWithoutNone) {
    const appHeaderName = chosenAppHeaderNamesWithoutNone[i];
    const unitsCollection = variableNameUnitsMap[appHeaderName];
    const appUnitsByHeaderName = unitsCollection
      ? unitsCollection.map((u) => u.title)
      : ["unitless"];

    let searchResult = {} as BestMatch["ratings"];
    let sortedSearchResultDesc = {} as BestMatch["ratings"];
    if (fileUnit === "unitless")
      searchResult = [{ target: "unitless", rating: 0 }];
    else
      searchResult = stringSimilarity.findBestMatch(
        fileUnit,
        appUnitsByHeaderName
      )["ratings"];

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

      if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
        const matchUnit = specificSavedMatchObject[fileUnit];

        pullAll(mtchdUnits, [matchUnit.header]);
        mtchdUnits.unshift(matchUnit.header);
        cleanedMatchedScores.unshift(100);
      }

      if (!mtchdUnits.includes("None")) {
        mtchdUnits.push("None");
        cleanedMatchedScores.push(0);
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
    i = i + 1;
  }

  return fileUnitMatches;
};

export default computeFileUnitMatches;
