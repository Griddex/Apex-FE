import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import "react-color-gradient-picker/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { updateEconomicsParameterAction } from "../../../Economics/Redux/Actions/EconomicsActions";
import DialogOneCancelButtons from "./../../../Application/Components/DialogButtons/DialogOneCancelButtons";

const useStyles = makeStyles((theme) => ({
  rootFill: {
    width: "100%",
    height: "auto",
  },
  colorPicker: { width: "91%", boxShadow: "none" },
}));

export interface IApexSketchPicker {
  oneButtonAction: () => void;
  solidColor: string;
  setSolidColor: TUseState<string>;
  presetColors: string[];
  setPresetColors: TUseState<string[]>;
  showButtons: boolean;
}
//
export default function ApexSketchPicker({
  oneButtonAction,
  solidColor,
  setSolidColor,
  presetColors,
  setPresetColors,
  showButtons,
}: IApexSketchPicker) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSolidColorChangeComplete = (
    solidColor: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hexColor = solidColor.hex;
    setSolidColor(hexColor);

    // setPresetColors((prevState) => [...prevState, hexColor]);
  };

  return (
    <div className={classes.rootFill}>
      <SketchPicker
        className={classes.colorPicker}
        color={solidColor}
        onChangeComplete={handleSolidColorChangeComplete}
        presetColors={presetColors}
        // onSwatchHover={(color, event) => console.log(color, event)}
      />
      {showButtons && (
        <ApexFlexContainer>
          {DialogOneCancelButtons(
            [true, true],
            [true, false],
            [unloadDialogsAction, oneButtonAction],
            "Select",
            "doneOutlined"
          )}
        </ApexFlexContainer>
      )}
    </div>
  );
}
