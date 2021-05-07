import { makeStyles, useTheme } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import Fuse from "fuse.js";
import findIndex from "lodash.findindex";
import pullAll from "lodash.pullall";
import uniq from "lodash.uniq";
import uniqBy from "lodash.uniqby";
import zipObject from "lodash.zipobject";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch, useSelector } from "react-redux";
import Select, { OptionsType, ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import {
  ISelectOption,
  SelectOptionsType,
} from "../../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import ApexMuiSwitch from "../../../../Application/Components/Switches/ApexMuiSwitch";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  TRawTable,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import { IAllWorkflowProcesses } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { saveUserMatchAction } from "../../../../Application/Redux/Actions/ApplicationActions";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getDuplicates from "../../../../Application/Utils/GetDuplicates";
import { updateUnitsSettingsParameterAction } from "../../../../Settings/Redux/Actions/UnitSettingsActions";
import {
  IUnit,
  IUnitSettingsData,
} from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import DoughnutChart from "../../../../Visualytics/Components/DoughnutChart";
import {
  persistChosenApplicationUnitIndicesAction,
  persistChosenApplicationUnitsAction,
  persistFileUnitsMatchAction,
  updateInputParameterAction,
} from "../../../Redux/Actions/InputActions";
import generateMatchData from "../../../Utils/GenerateMatchData";
import getChosenApplicationUnits from "../../../Utils/GetChosenApplicationUnits";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import { TUnit, TUserMatchObject } from "./MatchHeadersTypes";
import getWorkflowClass from "./../../../../Application/Utils/GetWorkflowClass";
import computeFileUnitMatches from "../../../Utils/ComputeFileUnitMatches";
import { IconButton, Tooltip } from "@material-ui/core";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import getInitialRowValueOrDefault from "../../../Utils/GetInitialRowValueOrDefault";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";

const useStyles = makeStyles(() => ({
  rootMatchUnits: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
  },
  chart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  table: {
    width: "100%",
    height: "80%",
    padding: 20,
  },
  select: {
    top: 0,
    height: 30,
    width: 250,
    fontSize: 14,
  },
  unitClassification: {
    top: 0,
    height: 30,
    width: 170,
    fontSize: 14,
  },
  score: { fontSize: 14 },
}));

export default function MatchUnits({
  reducer,
  wrkflwPrcss,
}: IAllWorkflowProcesses) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const workflowClass = getWorkflowClass(wp);

  const {
    savedMatchObjectAll,
  }: { savedMatchObjectAll: TUserMatchObject } = useSelector(
    (state: RootState) => state.applicationReducer
  );

  const specificSavedMatchObjectValues = Object.values(
    savedMatchObjectAll[workflowClass]["units"]
  );

  const { fileUnits, chosenApplicationHeadersWithNone } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  //File units with "none" columns excluded
  const fileUnitsWithUnitless = fileUnits.map((u: string) =>
    u == "" ? "unitless" : u
  );

  const fileUnitsWithoutNone = (fileUnitsWithUnitless as string[]).filter(
    (u: string, i) => {
      const header = chosenApplicationHeadersWithNone[i];
      if (header.toLowerCase() !== "none") return u;
    }
  );

  //File headers with "none" columns excluded
  const fileHeadersWithoutNone = (chosenApplicationHeadersWithNone as string[]).filter(
    (u: string, i) => {
      if (u.toLowerCase() !== "none") return u;
    }
  );

  const fileHeadersUnitsWithoutNoneObj = zipObject(
    fileHeadersWithoutNone,
    fileUnitsWithoutNone
  );

  //Application units
  const { variableUnits } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  //Get units list from Gift
  //[{unitTitle:"bbl/D", group:"Field"}, {unitTitle:"psi", group:"Field"}]
  //TODO: Memoize for performance boost or tell Gift to provide object
  const applicationUnitsCollection = variableUnits.reduce(
    (acc: IUnit[], row) => {
      const units = row.units.map((u) => ({
        title: u.title,
        group: u.group,
        unitId: u.unitId,
      }));

      return [...acc, ...units];
    },
    []
  );
  const applicationUnitsUniqueCollection = uniqBy(
    applicationUnitsCollection,
    (o) => o.title
  );
  const applicationUnitsUniqueCollectionFinal: Record<
    string,
    string
  > = applicationUnitsUniqueCollection.reduce(
    (acc, u) => ({ ...acc, [u.title]: u.group }),
    {}
  );
  const applicationUnits = Object.keys(applicationUnitsUniqueCollectionFinal);

  const fileUnitMatches = React.useMemo(
    () =>
      computeFileUnitMatches(
        fileUnitsWithoutNone,
        applicationUnits,
        savedMatchObjectAll,
        workflowClass
      ),
    []
  );

  const keyedFileUnitMatches = zipObject(
    fileHeadersWithoutNone,
    fileUnitMatches
  );
  const unitsMatchChartData = generateMatchData(fileUnitMatches);

  //Application Unit
  const appUnitOptions: SelectOptionsType[] = fileHeadersWithoutNone.map(
    (fileHeader: string) => {
      const unitMatch = keyedFileUnitMatches[fileHeader];

      return generateSelectOptions(Object.keys(unitMatch));
    }
  );
  const keyedApplicationUnitOptions = zipObject(
    fileHeadersWithoutNone,
    appUnitOptions
  );

  //Score match
  const scoreOptions: SelectOptionsType[] = fileHeadersWithoutNone.map(
    (fileHeader: string) => {
      const fileUnitMatch = keyedFileUnitMatches[fileHeader];

      return generateSelectOptions(
        Object.values(fileUnitMatch).map((u) => u.toString())
      );
    }
  );
  const keyedScoreOptions = zipObject(fileHeadersWithoutNone, scoreOptions);

  //TODO: Saga Api to select unit family the current selected
  //unit belongs to. lookup data should be a dictionary
  const matchObjectHeaders = specificSavedMatchObjectValues.map(
    (h) => h.header
  );
  const initialTableRows = fileHeadersWithoutNone.map(
    (fileHeader: string, i: number) => {
      const unitOptions = keyedApplicationUnitOptions[fileHeader];
      const selectedApplicationUnit = unitOptions[0];
      const initialUnitType = getInitialRowValueOrDefault<TUnit>(
        selectedApplicationUnit.label,
        "type",
        specificSavedMatchObjectValues,
        "Single"
      );
      const selectedUnitClassification =
        applicationUnitsUniqueCollectionFinal[selectedApplicationUnit.label];
      const scoreOpts = keyedScoreOptions[fileHeader];
      const score = scoreOpts[0];
      const acceptMatch = matchObjectHeaders.includes(
        selectedApplicationUnit.label
      )
        ? true
        : false;

      return {
        sn: i + 1,
        fileHeader: fileHeader,
        fileUnit: fileHeadersUnitsWithoutNoneObj[fileHeader],
        type: initialUnitType,
        applicationUnit: selectedApplicationUnit.value,
        unitClassification: selectedUnitClassification,
        match: score.value,
        acceptMatch,
      };
    }
  );

  const tableRows = React.useRef<TRawTable>(initialTableRows);
  const rerenderRef = React.useRef<boolean>(false);
  const [rerender, setRerender] = React.useState(rerenderRef.current);

  //{"MMstb":0,...}
  const snChosenApplicationUnitIndices = fileHeadersWithoutNone.reduce(
    (acc: Record<string, number>, header: string) => {
      return { ...acc, [header]: 0 };
    },
    {}
  );

  const [
    chosenApplicationUnitIndicesAction,
    setChosenApplicationUnitIndices,
  ] = React.useState<Record<string, number | number[]>>(
    snChosenApplicationUnitIndices
  );

  type fileAppUnitType = Record<string, React.Key | boolean>;
  const initialFileUnitChosenAppUnitObj: fileAppUnitType = initialTableRows.reduce(
    (acc: fileAppUnitType, row) => {
      return { ...acc, [row.fileUnit]: row.applicationUnit };
    },
    {}
  );
  const [
    fileUnitChosenAppUnitObj,
    setFileUnitChosenAppUnitObj,
  ] = React.useState(initialFileUnitChosenAppUnitObj);

  const initialFileUnitChosenUnitTypeObj = initialTableRows.reduce(
    (
      acc: Record<string, React.Key | boolean | TUnit>,
      row: Record<string, React.Key | boolean | TUnit>
    ) => {
      const fileUnitDefined = row.fileUnit as string;
      return { ...acc, [fileUnitDefined]: row.type };
    },
    {}
  );
  const [
    fileUnitChosenUnitTypeObj,
    setFileUnitChosenUnitTypeObj,
  ] = React.useState(initialFileUnitChosenUnitTypeObj);

  const [
    userMatchObject,
    setUserMatchObject,
  ] = React.useState<TUserMatchObject>(savedMatchObjectAll);

  const generateColumns = (keyedApplicationUnitOptions: {
    [index: string]: SelectOptionsType;
  }) => {
    const handleUnitTypeChange = (
      value: ValueType<ISelectOption, false>,
      row: IRawRow
    ) => {
      const { sn, fileUnit } = row;
      const rowSN = sn as number;
      const fileUnitDefined = fileUnit as string;

      const selectedValue = value && value.label;
      const selectedUnitType = selectedValue as TUnit;

      setFileUnitChosenUnitTypeObj((prev) => ({
        ...prev,
        [fileUnitDefined]: selectedUnitType,
      }));

      //TODO: From Gift Need an object with unit:group pairs
      const currentRows = tableRows.current;
      const selectedRow = currentRows[rowSN - 1];
      currentRows[rowSN - 1] = {
        ...selectedRow,
        type: selectedUnitType,
      };

      tableRows.current = currentRows;

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

    const handleApplicationUnitChange = <T extends boolean>(
      value: NonNullable<ValueType<ISelectOption, T>>,
      row: IRawRow,
      fileHeader: string,
      type: TUnit,
      unitOptions: ISelectOption[],
      scoreOptions: ISelectOption[]
    ) => {
      const { sn, applicationUnit } = row;
      const applicationUnitDefined = applicationUnit as string;
      const rowSN = sn as number;

      if (type === "Multiple") {
        const selectedAppUnitsOptions = value
          ? (value as OptionsType<ISelectOption>)
          : [];
        const selectedAppUnits = selectedAppUnitsOptions.map((u) => u.label);
        const selectedUnitGroupArr = selectedAppUnits.map(
          (u) => applicationUnitsUniqueCollectionFinal[u]
        );
        const selectedUnitGroupUniqueArr = uniq(selectedUnitGroupArr);

        let selectedUnitGroup = "";
        if (selectedUnitGroupUniqueArr.length === 1)
          selectedUnitGroup = selectedUnitGroupUniqueArr[0];
        else if (selectedUnitGroupUniqueArr.length === 0)
          selectedUnitGroup = "";
        else selectedUnitGroup = "Mixed";

        //option indices
        const selectedUnitOptionIndices: number[] = [];
        for (const unit of selectedAppUnits) {
          const selectedUnitOptionIndex = findIndex(
            unitOptions,
            (option) => option.value === unit
          );
          selectedUnitOptionIndices.push(selectedUnitOptionIndex);
        }

        //Highest score
        const selectedScore = selectedUnitOptionIndices.reduce(
          (highestScore, i) => {
            const score = parseInt(scoreOptions[i].value);
            if (score > highestScore) return score;
            else return highestScore;
          },
          0
        );

        setChosenApplicationUnitIndices((prev) => ({
          ...prev,
          [fileHeader]: selectedUnitOptionIndices,
        }));

        setFileUnitChosenAppUnitObj((prev) => ({
          ...prev,
          [fileHeader]: applicationUnitDefined,
        }));
        //TODO: From Gift Need an object with unit:group pairs
        const currentRows = tableRows.current;
        const selectedRow = currentRows[rowSN - 1];
        currentRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnits,
          unitClassification: selectedUnitGroup,
          match: selectedScore,
        };
      } else {
        const selectedValue = value && (value as ISelectOption).label;
        const selectedAppUnit = selectedValue as string;

        const selectedUnitGroup =
          applicationUnitsUniqueCollectionFinal[selectedAppUnit];
        const selectedUnitOptionIndex = findIndex(
          unitOptions,
          (option) => option.value === selectedValue
        );
        const selectedScore = scoreOptions[selectedUnitOptionIndex];

        setChosenApplicationUnitIndices((prev) => ({
          ...prev,
          [`${fileHeader}`]: selectedUnitOptionIndex,
        }));

        setFileUnitChosenAppUnitObj((prev) => ({
          ...prev,
          [fileHeader]: applicationUnitDefined,
        }));
        //TODO: From Gift Need an object with unit:group pairs
        const currentRows = tableRows.current;
        const selectedRow = currentRows[rowSN - 1];
        currentRows[rowSN - 1] = {
          ...selectedRow,
          applicationUnit: selectedAppUnit,
          unitClassification: selectedUnitGroup,
          match: selectedScore.value,
        };

        tableRows.current = currentRows;

        rerenderRef.current = !rerenderRef.current;
        setRerender(rerenderRef.current);
      }
    };

    const handleAcceptMatchSwitchChange = (
      row: IRawRow,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const isChecked = event.target.checked;

      const { fileUnit, type, applicationUnit } = row;
      const strFileUnit = fileUnit as string;
      const strApplicationUnit = applicationUnit as string;
      const strUnitType = type as TUnit;

      const selectedRowSN = row.sn as number;
      const currentRows = tableRows.current;
      const selectedRow = currentRows[selectedRowSN - 1];

      currentRows[selectedRowSN - 1] = {
        ...selectedRow,
        acceptMatch: isChecked,
      };
      tableRows.current = currentRows;

      //Update usermatchobject
      if (isChecked) {
        setUserMatchObject((prev) => ({
          ...prev,
          [workflowClass]: {
            ...prev[workflowClass],
            ["units"]: {
              ...prev[workflowClass]["units"],
              [strFileUnit]: {
                header: strApplicationUnit,
                type: strUnitType,
                acceptMatch: true,
              },
            },
          },
        }));
      } else {
        setUserMatchObject((prev) => {
          const matchObject = prev;
          delete matchObject[workflowClass]["units"][strFileUnit];

          return matchObject;
        });
      }

      rerenderRef.current = !rerenderRef.current;
      setRerender(rerenderRef.current);
    };

    const columns: Column<IRawRow>[] = [
      { key: "sn", name: "SN", editable: false, resizable: true, width: 50 },
      {
        key: "actions",
        name: "ACTIONS",
        editable: false,
        formatter: ({ row }) => (
          <div>
            <EditOutlinedIcon onClick={() => alert(`Edit Row is:${row}`)} />
            <DeleteOutlinedIcon onClick={() => alert(`Delete Row is:${row}`)} />
            <MenuOpenOutlinedIcon onClick={() => alert(`Menu Row is:${row}`)} />
          </div>
        ),
        width: 100,
      },
      {
        key: "fileUnit",
        name: "FILE UNIT",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "fileHeader",
        name: "FILE HEADER",
        editable: false,
        resizable: true,
        width: 200,
      },
      {
        key: "type",
        name: "TYPE",
        resizable: true,
        formatter: ({ row }) => {
          const type = row.type as string;
          const typeOptions = generateSelectOptions(["Single", "Multiple"]);
          const valueOption = generateSelectOptions([type])[0];

          const RSStyles = getRSStyles(theme);
          type IsMulti = false;

          return (
            <Select<ISelectOption, IsMulti>
              value={valueOption}
              options={typeOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, IsMulti>) => {
                handleUnitTypeChange(value, row);
              }}
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
            />
          );
        },
        width: 250,
      },
      {
        key: "applicationUnit",
        name: "APPLICATION UNIT",
        resizable: true,
        formatter: ({ row }) => {
          const fileHeader = row.fileHeader as string;
          const type = row.type as TUnit;

          const unitOptions = keyedApplicationUnitOptions[fileHeader];
          const scoreOptions = keyedScoreOptions[fileHeader];

          let appUnit: string | string[];
          let valueOption: ISelectOption | ISelectOption[];
          let IsMulti: boolean;
          if (type === "Single") {
            appUnit = row.applicationUnit as string;
            valueOption = generateSelectOptions([appUnit])[0];
            IsMulti = false;
          } else {
            const multiAppUnit = row.applicationUnit;
            if (Array.isArray(multiAppUnit)) {
              valueOption = generateSelectOptions(multiAppUnit as string[]);
            } else {
              valueOption = generateSelectOptions([multiAppUnit as string]);
            }

            IsMulti = true;
          }

          const RSStyles = getRSStyles(theme);

          type IsMultiType = typeof IsMulti;

          return (
            <Select<ISelectOption, IsMultiType>
              value={valueOption}
              options={unitOptions}
              styles={RSStyles}
              onChange={(value: ValueType<ISelectOption, IsMultiType>) =>
                handleApplicationUnitChange<IsMultiType>(
                  value as NonNullable<ValueType<ISelectOption, IsMultiType>>,
                  row,
                  fileHeader,
                  type,
                  unitOptions,
                  scoreOptions
                )
              }
              menuPortalTarget={document.body}
              theme={(thm) => getRSTheme(thm, theme)}
              isMulti={IsMulti}
            />
          );
        },
        width: 300,
      },
      {
        key: "unitClassification", //appUnit match selection will define this using units package
        name: "UNIT GROUP",
        resizable: true,
        formatter: ({ row }) => {
          const unitClassification = row.unitClassification as number;

          return <CenteredStyle>{unitClassification}</CenteredStyle>;
        },
        width: 200,
      },
      {
        key: "match",
        name: "MATCH [%]",
        editable: false,
        resizable: true,
        formatter: ({ row }) => {
          const match = row.match as number;

          return <CenteredStyle>{match}</CenteredStyle>;
        },
        //Look at his a lot more
        headerRenderer: ({ column }) => {
          const header = column.name;

          return <CenteredStyle>{header}</CenteredStyle>;
        },
        width: 150,
      },
      {
        key: "acceptMatch",
        name: "ACCEPT MATCH",
        resizable: true,
        formatter: ({ row }) => {
          const checked = row.acceptMatch as boolean;

          return (
            <CenteredStyle>
              <ApexMuiSwitch
                name="acceptMatch"
                handleChange={(event) =>
                  handleAcceptMatchSwitchChange(row, event)
                }
                checked={checked}
                checkedColor={theme.palette.success.main}
                notCheckedColor={theme.palette.warning.main}
              />
            </CenteredStyle>
          );
        },
        width: 150,
      },
    ];

    return columns;
  };

  const columns = React.useMemo(
    () => generateColumns(keyedApplicationUnitOptions),
    [keyedApplicationUnitOptions]
  );

  const [rows, setRows] = React.useState(tableRows.current);
  const chosenApplicationUnitsWithoutNone = getChosenApplicationUnits(
    fileHeadersWithoutNone,
    keyedFileUnitMatches,
    chosenApplicationUnitIndicesAction
  );

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: true,
    extraButtons: () => (
      <Tooltip
        key={"acceptAllToolTip"}
        title={"Accept All"}
        placement="bottom-end"
        arrow
      >
        <IconButton
          style={{
            height: "28px",
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
          }}
          onClick={() => {
            const rowsAllAcceptMatch = rows.map((row) => {
              const rowAccept = { ...row, acceptMatch: true };
              return rowAccept;
            });

            const fileHeaderKeys = Object.keys(fileUnitChosenAppUnitObj);
            for (const header of fileHeaderKeys) {
              const chosenAppUnit = fileUnitChosenAppUnitObj[header];
              const chosenUnitType = fileUnitChosenUnitTypeObj[header] as TUnit;

              userMatchObject[workflowClass]["units"][header] = {
                header: chosenAppUnit as string,
                type: chosenUnitType,
                acceptMatch: true,
              };
            }

            setRows(rowsAllAcceptMatch);
            setUserMatchObject(userMatchObject);
          }}
        >
          <AllInclusiveOutlinedIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  React.useEffect(() => {
    dispatch(
      updateUnitsSettingsParameterAction(
        "applicationUnitsCollection",
        applicationUnitsUniqueCollection
      )
    );
    dispatch(persistFileUnitsMatchAction(reducer, fileUnitMatches, wp));
    dispatch(
      persistChosenApplicationUnitIndicesAction(
        reducer,
        chosenApplicationUnitIndicesAction,
        wp
      )
    );

    dispatch(
      persistChosenApplicationUnitsAction(
        reducer,
        chosenApplicationUnitsWithoutNone,
        wp
      )
    );

    dispatch(
      updateInputParameterAction(
        reducer,
        `fileUnitsWithoutNone`,
        fileUnitsWithoutNone
      )
    );

    dispatch(saveUserMatchAction(userMatchObject));

    dispatch(hideSpinnerAction());
  }, [rerender]);

  return (
    <div className={classes.rootMatchUnits}>
      <div className={classes.chart}>
        <DoughnutChart data={unitsMatchChartData} />
      </div>
      <div className={classes.table}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => (
            <ApexGrid<IRawRow, ITableButtonsProps>
              columns={columns}
              rows={rows}
              tableButtons={tableButtons}
              onRowsChange={setRows}
              // mappingErrors={getDuplicates(chosenApplicationUnitsUniqueSingle)}
              size={size}
              adjustTableDimAuto={true}
              showTableHeader={true}
              showTablePagination={true}
            />
          )}
        </SizeMe>
      </div>
    </div>
  );
}
