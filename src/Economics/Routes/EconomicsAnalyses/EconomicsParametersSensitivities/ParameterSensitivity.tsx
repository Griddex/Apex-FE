import { useTheme } from "@mui/material";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import { useDispatch } from "react-redux";
import Select, { OnChangeValue } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../../Application/Components/Styles/ApexFlexContainer";
import {
  IRawRow,
  ISize,
} from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { updateEconomicsParameterAction } from "../../../Redux/Actions/EconomicsActions";
import { TParametersId } from "../EconomicsAnalysesTypes";
import { IParameterSensitivity } from "./EconomicsParametersSensitivitiesTypes";
import ApexGrid from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";

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
    selectedOption: OnChangeValue<ISelectOption, false>,
    parId: TParametersId
  ) => {
    const selectedTargetParameterOption = selectedOption as ISelectOption;

    const parSenObj = parameterSensitivitiesObj[parId];
    parameterSensitivitiesObj[parId] = {
      ...parSenObj,
      selectedTargetParameterOption,
    };

    //TODO Update list for other sensitivities
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

    const parameters = (
      Object.keys(parameterSensitivitiesObj) as TParametersId[]
    ).reduce((acc: TParametersId[], key: TParametersId) => {
      const pObj = parameterSensitivitiesObj[key as TParametersId];

      const isSensitivity = Object.values(pObj["sensitivityValues"][0]).some(
        (v) => v !== ""
      );

      if (isSensitivity) return [...acc, key];
      else return acc;
    }, [] as TParametersId[]);

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

    const path = `economicsAnalysisWorkflows.sensitivitiesTable`;
    dispatch(updateEconomicsParameterAction(path, sensitivitiesTable));
  }, [rows]);

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    newTableRowHeight: 35,
    onRowsChange: setRows,
    size: size,
    autoAdjustTableDim: false,
    showTableHeader: false,
    showTablePagination: false,
    staticTableHeight: 77,
  });

  const TargetParametersSelect = () => {
    return (
      <ApexSelectRS
        valueOption={valueOption}
        data={targetParameterOptions}
        handleSelect={(value: OnChangeValue<ISelectOption, false>) => {
          handleSelectTargetParameterChange(value, parId);
        }}
        menuPortalTarget={sensitivityRef.current as HTMLDivElement}
        isSelectOptionType={true}
        containerHeight={40}
      />
    );
  };

  return (
    <ApexFlexContainer key={parIndex} flexDirection="column">
      <AnalyticsComp
        title={parId}
        direction="Horizontal"
        contentStyle={{ width: 300 }}
        content={<TargetParametersSelect />}
      />

      {/*width chosen to fit properly*/}
      <div style={{ width: 562, height: 80, marginTop: 2 }}>
        <SizeMe monitorHeight refreshRate={32}>
          {({ size }) => {
            return <ApexGrid apexGridProps={getApexGridProps(size)} />;
          }}
        </SizeMe>
      </div>
    </ApexFlexContainer>
  );
};

export default ParameterSensitivity;
