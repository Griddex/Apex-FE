import { useTheme } from "@material-ui/core";
import set from "lodash.set";
import React from "react";
import { Column, TextEditor } from "react-data-griddex";
import Select, { ValueType } from "react-select";
import { SizeMe } from "react-sizeme";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import { ISelectOption } from "../../../../Application/Components/Selects/SelectItemsType";
import CenteredStyle from "../../../../Application/Components/Styles/CenteredStyle";
import { ApexGrid } from "../../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import { IRawRow } from "../../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../../Application/Components/Table/TableButtonsTypes";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import getRSStyles from "../../../../Application/Utils/GetRSStyles";
import getRSTheme from "../../../../Application/Utils/GetRSTheme";
import { TParametersSensitivitiesObj } from "../../../Data/EconomicsDataTypes";
import { IParameterSensitivity } from "./EconomicsParametersSensitivitiesTypes";

const initialRows = [
  {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
    p6: 0,
    p7: 0,
  },
];

const ParameterSensitivity = ({
  sensitivitiesIndex,
  sensitivitiesTitle,
  parameterSensitivitiesObj,
  setParameterSensitivitiesObj,
  variableTitlesNamesObj,
}: IParameterSensitivity) => {
  const theme = useTheme();

  const allSensitivitiesTitles = Object.keys(parameterSensitivitiesObj);
  const parametersTitles =
    parameterSensitivitiesObj[sensitivitiesTitle].parameters;
  const parametersNames = parametersTitles.map(
    (title) => variableTitlesNamesObj[title]
  );
  const parameterOptions = generateSelectOptions(
    parametersTitles,
    true,
    parametersNames
  );
  const valueOption = generateSelectOptions([parametersTitles[0]], true, [
    parametersNames[0],
  ])[0];

  const [parSensitivity, setParSensitivity] = React.useState(
    {} as TParametersSensitivitiesObj
  );

  const [rows, setRows] = React.useState(initialRows);

  const RSStyles = getRSStyles(theme);
  type IsMulti = false;

  const handleSelectParameterSensitivityChange = (
    row: ValueType<ISelectOption, false>,
    sensitivitiesTitle: string
  ) => {
    const selectedParameterTitle = row?.label as string;
    const otherSensitivitiesArr = allSensitivitiesTitles.filter(
      (s) => s !== sensitivitiesTitle
    );

    const nonSelectedParametersTitles = parametersTitles.filter(
      (p) => p !== selectedParameterTitle
    );
    const updatedOthers = set(
      parameterSensitivitiesObj,
      `${sensitivitiesTitle}.parameters`,
      nonSelectedParametersTitles
    );

    setParameterSensitivitiesObj(updatedOthers);
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

  return (
    <CenteredStyle flexDirection="column">
      <AnalyticsComp
        title={sensitivitiesTitle}
        direction="Horizontal"
        contentStyle={{ width: 300 }}
        content={
          <Select<ISelectOption, IsMulti>
            value={valueOption}
            options={parameterOptions}
            styles={RSStyles}
            onChange={(value: ValueType<ISelectOption, IsMulti>) => {
              handleSelectParameterSensitivityChange(value, sensitivitiesTitle);
            }}
            menuPortalTarget={document.body}
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
                adjustTableDimAuto={false}
                showTableHeader={false}
                showTablePagination={false}
                staticTableHeight={77}
              />
            );
          }}
        </SizeMe>
      </div>
    </CenteredStyle>
  );
};

export default ParameterSensitivity;
