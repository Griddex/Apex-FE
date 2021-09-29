import { ListItemIcon, Typography, useTheme } from "@material-ui/core";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import DialogSaveCancelButtons from "../../../Application/Components/DialogButtons/DialogSaveCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import noEventPropagation from "../../../Application/Events/NoEventPropagation";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { IEconomicsParametersValue } from "./IParametersType";

const EconomicsParametersValue = ({
  row,
  valueTitle,
  nameOfTableOrEquation,
  additionalColumnsObj,
}: IEconomicsParametersValue) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const additionalColumnsObjDefined = additionalColumnsObj as NonNullable<
    IEconomicsParametersValue["additionalColumnsObj"]
  >;
  const economicsTableDataDefined = {
    row,
    additionalColumnsObj: additionalColumnsObjDefined,
  };

  const letterIcon = valueTitle === "Table" ? "T" : "E";
  const valueText = nameOfTableOrEquation ? nameOfTableOrEquation : "No value";

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

  const finalStyle =
    valueText === "No value" ? noValuePresentStyle : valuePresentStyle;
  const letterIconStyle =
    valueText === "No value"
      ? { color: theme.palette.secondary.main }
      : { color: theme.palette.primary.main };

  const handleAction = () => {
    const dialogParameters: DialogStuff = {
      name: "Create_EconomicsParameters_Table_Dialog",
      title: "Create EconomicsParameters Table",
      type: "createEconomicsParametersTableDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "information",
      economicsTableData: economicsTableDataDefined,
      actionsList: () =>
        DialogSaveCancelButtons(
          [true, true],
          [true, false],
          [unloadDialogsAction, () => console.log("hello")],
          false,
          "All"
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
