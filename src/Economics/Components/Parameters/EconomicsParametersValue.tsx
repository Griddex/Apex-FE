import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { ListItemIcon, Typography, useTheme } from "@mui/material";
import omit from "lodash.omit";
import uniq from "lodash.uniq";
import React from "react";
import { useDispatch } from "react-redux";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import noEventPropagation from "../../../Application/Events/NoEventPropagation";
import {
  hideDialogAction,
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { IEconomicsParametersValue } from "./IParametersType";

const EconomicsParametersValue = ({
  rows,
  rowIndex,
  valueTitle,
  genericAddtnlColumnsObj,
  customAddtnlColumnsObj,
}: IEconomicsParametersValue) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const genericAddtnlColumnsObjDefined = genericAddtnlColumnsObj as Record<
    string,
    string
  >;
  const customAddtnlColumnsObjDefined = customAddtnlColumnsObj as Record<
    string,
    string
  >;
  const row = rows[rowIndex as number];
  const economicsTableDataDefined = {
    rows,
    rowIndex,
    genericAddtnlColumnsObj: genericAddtnlColumnsObjDefined,
    customAddtnlColumnsObj: customAddtnlColumnsObjDefined,
  };

  const letterIcon = valueTitle === "Table" ? "T" : "E";

  const valuePresentStyle = {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
  };

  const noValuePresentStyle = {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.main}`,
  };

  const rowValues = row["value"];
  let finalStyle = {} as React.CSSProperties;
  let letterIconStyle = {} as React.CSSProperties;
  let valueText: string;
  if (typeof rowValues === "string") {
    if (rowValues === "") {
      finalStyle = noValuePresentStyle;
      letterIconStyle = { color: theme.palette.secondary.main };
      valueText = "No value";
    } else {
      finalStyle = valuePresentStyle;
      letterIconStyle = { color: theme.palette.primary.main };
      valueText = "Table";
    }
  } else {
    const omittedRowValues = Object.values(
      omit((rowValues as Record<string, any>)[0], "sn")
    );
    const rowsDataPresent = uniq(omittedRowValues)[0] !== "";
    finalStyle = rowsDataPresent ? valuePresentStyle : noValuePresentStyle;

    letterIconStyle = rowsDataPresent
      ? { color: theme.palette.primary.main }
      : { color: theme.palette.secondary.main };

    valueText = rowsDataPresent ? "Table" : "No value";
  }

  const handleAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_EconomicsParameters_Table_Dialog",
      title: "Create Economics Parameters Table",
      type: "createEconomicsParametersTableDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "information",
      economicsTableData: economicsTableDataDefined,
      actionsList: (rows?: IRawRow[]) =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => {
              dispatch(hideDialogAction());
              dispatch(
                updateEconomicsParameterAction(
                  `inputDataWorkflows.economicsParametersDeckManual.tableData`,
                  rows
                )
              );
            },
          ],
          "Load",
          "loadOutlined",
          false,
          "None"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  return (
    <ApexFlexContainer justifyContent="space-between" height="95%">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          height: "90%",
          ...finalStyle,
        }}
        {...noEventPropagation()}
      >
        <ListItemIcon style={{ minWidth: 20, ...letterIconStyle }}>
          {letterIcon}
        </ListItemIcon>
        <Typography variant="inherit">{valueText}</Typography>
      </div>
      <LaunchOutlinedIcon {...noEventPropagation(handleAction)} />
    </ApexFlexContainer>
  );
};

export default EconomicsParametersValue;
