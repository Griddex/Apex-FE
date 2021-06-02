import pullAll from "lodash.pullall";
import sortBy from "lodash.sortby";
import React from "react";
import stringSimilarity, { BestMatch } from "string-similarity";
import { ISelectOption } from "../../Application/Components/Selects/SelectItemsType";
import { IUnit } from "../../Settings/Redux/State/UnitSettingsStateTypes";
import { TUserMatchObject } from "../Routes/Common/Workflows/MatchHeadersTypes";

const computeFileUnitMatches = (
  variableNameUnitsMap: Record<string, IUnit[]>,
  currentAppHeaderOptions: ISelectOption[],
  fileHeadersUnitsAppHeadersWithoutNoneMap: Record<
    string,
    Record<string, string>
  >,
  savedMatchObjectAll: TUserMatchObject,
  workflowClass: string
) => {
  const fileUnitsWithoutNone = Object.values(
    fileHeadersUnitsAppHeadersWithoutNoneMap
  ).map((o) => o.unit);

  const chosenAppHeadersWithoutNone = Object.values(
    fileHeadersUnitsAppHeadersWithoutNoneMap
  ).map((obj) => obj.chosenAppHeader);

  const chosenAppHeaderNamesWithoutNone = [];
  for (const header of chosenAppHeadersWithoutNone) {
    for (const option of currentAppHeaderOptions) {
      if (header === option.label) {
        chosenAppHeaderNamesWithoutNone.push(option.value);
        break;
      }
    }
  }

  const specificSavedMatchObject = savedMatchObjectAll[workflowClass]["units"];
  const specificSavedMatchObjectKeys = Object.keys(specificSavedMatchObject);

  let i = 0;
  const fileUnitMatches: Record<string, Record<string, React.Key>>[] = [];
  for (const fileUnit of fileUnitsWithoutNone) {
    const appHeaderName = chosenAppHeaderNamesWithoutNone[i];
    const unitsCollection = variableNameUnitsMap[appHeaderName];

    const appUnitsByHeaderName = unitsCollection
      ? unitsCollection.map((u) => u.title)
      : ["unitless"];

    let searchResult = {} as BestMatch["ratings"];
    let sortedSearchResultDesc = {} as BestMatch["ratings"];
    if (fileUnit === "unitless")
      searchResult = [{ target: "unitless", rating: 1 }];
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
    const matchedUnitIds = [] as string[];
    if (unitsCollection) {
      for (const unit of matchedUnits) {
        for (const unitObj of unitsCollection) {
          if (unit === unitObj.title) {
            matchedUnitIds.push(unitObj.unitId);
            break;
          }
        }
      }
    } else {
      matchedUnitIds.push("NoId");
    }

    const mtchdUnits = matchedUnits;
    const mtchdScores = matchedScores;

    const cleanedMatchedScores = mtchdScores.map((score: number | undefined) =>
      score !== undefined ? Math.round(score * 100) : 0
    );

    if (specificSavedMatchObjectKeys.includes(fileUnit.trim())) {
      const matchUnit = specificSavedMatchObject[fileUnit];

      pullAll(mtchdUnits, [matchUnit.header]);
      mtchdUnits.unshift(matchUnit.header);

      cleanedMatchedScores.unshift(100);

      const matchUnitIndex = matchedUnits.indexOf(matchUnit.header);
      const matchUnitId = matchedUnitIds[matchUnitIndex];
      pullAll(matchedUnitIds, [matchUnitId]);
      matchedUnitIds.unshift(matchUnitId);
    }

    if (!mtchdUnits.includes("None")) {
      mtchdUnits.push("None");
      cleanedMatchedScores.push(0);
    }

    const unitMatchObj = mtchdUnits.reduce(
      (acc, u, i) => ({
        ...acc,
        [u]: { score: cleanedMatchedScores[i], unitId: matchedUnitIds[i] },
      }),
      {}
    );

    fileUnitMatches.push(unitMatchObj);

    i = i + 1;
  }

  return fileUnitMatches;
};

export default computeFileUnitMatches;
