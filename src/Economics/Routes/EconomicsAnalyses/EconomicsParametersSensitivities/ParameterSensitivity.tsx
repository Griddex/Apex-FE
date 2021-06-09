import { useTheme } from "@material-ui/core";
import set from "lodash.set";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Select, { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { TParametersSensitivitiesObj } from "../../../Data/EconomicsDataTypes";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { TParametersId } from "../EconomicsAnalysesTypes";
import { IParameterSensitivity } from "./EconomicsParametersSensitivitiesTypes";

const initialRows = [
  {
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    p5: "",
    p6: "",
    p7: "",
  },
];

const ParameterSensitivity = ({
  parIndex,
  parId,
  parameterSensitivitiesObj,
  setParameterSensitivitiesObj,
}: IParameterSensitivity) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const sensitivityRef = React.useRef<HTMLDivElement>(null);

  const {
    analysisName,
    targetParameterOptions,
    selectedTargetParameterOption,
    sensitivityValues,
  } = parameterSensitivitiesObj[parId];

  const targetValueOption = selectedTargetParameterOption
    ? selectedTargetParameterOption
    : targetParameterOptions[0];
  const [valueOption, setValueOption] = React.useState(targetValueOption);

  const [rows, setRows] = React.useState(
    sensitivityValues ? sensitivityValues : initialRows
  );

  const RSStyles = getRSStyles(theme);

  const handleSelectTargetParameterChange = (
    selectedOption: ValueType<ISelectOption, false>,
    parId: TParametersId
  ) => {
    // const updatedOthers = set(
    //   parameterSensitivitiesObj,
    //   `${parId}.selectedTargetParameterOption`,
    //   selectedOption
    // );

    const selectedTargetParameterOption = selectedOption as ISelectOption;

    const parSenObj = parameterSensitivitiesObj[parId];
    parameterSensitivitiesObj[parId] = {
      ...parSenObj,
      selectedTargetParameterOption,
    };
    //Update list for other sensitivities
    setParameterSensitivitiesObj(parameterSensitivitiesObj);
    setValueOption(selectedTargetParameterOption);
  };

  const columns: Column<IRawRow>[] = [
    {
      key: "p1",
      name: "1",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p2",
      name: "2",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p3",
      name: "3",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p4",
      name: "4",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p5",
      name: "5",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p6",
      name: "6",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
    {
      key: "p7",
      name: "7",
      editable: true,
      editor: TextEditor,
      resizable: true,
      width: 50,
    },
  ];

  React.useEffect(() => {
    const parSenObj = parameterSensitivitiesObj[parId];
    parameterSensitivitiesObj[parId] = {
      ...parSenObj,
      sensitivityValues: rows,
    };

    //transform and store in sensitivitiestable
    const parameters = Object.keys(parameterSensitivitiesObj);
    const selectedParameterTitles = parameters.map((p) => {
      const selectedOption =
        parameterSensitivitiesObj[p as TParametersId]
          .selectedTargetParameterOption;
      return selectedOption.label;
    });
    const parameterValues = parameters.map((p) => {
      const sensitivityValues =
        parameterSensitivitiesObj[p as TParametersId].sensitivityValues;
      const onlySensitivityValues = Object.values(sensitivityValues[0]).filter(
        (p) => p != ""
      );

      return onlySensitivityValues.join(", ");
    });

    const sensitivitiesTable = parameters.map((p, i) => ({
      sn: i + 1,
      parameter: p,
      parameterTitle: selectedParameterTitles[i],
      parameterValues: parameterValues[i],
    }));

    const path = `economicsAnalysisWorkflows.selectedSensitivitiesTable`;
    dispatch(updateEconomicsParameterAction(path, sensitivitiesTable));
  }, [rows]);

  return (
    <ApexFlexContainer key={parIndex} flexDirection="column">
      <AnalyticsComp
        title={parId}
        direction="Horizontal"
        contentStyle={{ width: 300 }}
        content={
          <Select<ISelectOption, false>
            value={valueOption}
            options={targetParameterOptions}
            styles={RSStyles}
            onChange={(value: ValueType<ISelectOption, false>) => {
              handleSelectTargetParameterChange(value, parId);
            }}
            menuPortalTarget={sensitivityRef.current as HTMLDivElement}
            theme={(thm) => getRSTheme(thm, theme)}
          />
        }
      />

      {/*width chosen to fit properly*/}
      <div style={{ width: 562, height: 80, marginTop: 2 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => {
            return (
              <ApexGrid<IRawRow, ITableButtonsProps>
                columns={columns}
                rows={rows}
                newTableRowHeight={35}
                onRowsChange={setRows}
                size={size}
                autoAdjustTableDim={false}
                showTableHeader={false}
                showTablePagination={false}
                staticTableHeight={77}
              />
            );
          }}
        </SizeMe>
      </div>
    </ApexFlexContainer>
  );
};

export default ParameterSensitivity;
