import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { unloadDialogsAction } from "../../../Application/Redux/Actions/DialogsAction";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import DialogOneCancelButtons from "./../../../Application/Components/DialogButtons/DialogOneCancelButtons";

const useStyles = makeStyles((theme) => ({
  rootFill: {
    width: "100%",
    height: "auto",
  },
  colorPicker: { width: "91%", boxShadow: "none" },
}));

export interface IApexSketchPicker {
  oneButtonAction?: () => void;
  solidColor: string;
  setSolidColor?: TUseState<string>;
  presetColors: string[];
  setPresetColors: TUseState<string[]>;
  showButtons: boolean;
  sketchPickerContextFxn?: (value: any) => void;
}

export default function ApexSketchPicker({
  oneButtonAction,
  solidColor,
  setSolidColor,
  presetColors,
  setPresetColors,
  showButtons,
  sketchPickerContextFxn,
}: IApexSketchPicker) {
  const classes = useStyles();

  const handleSolidColorChangeComplete = (
    solidColor: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hexColor = solidColor.hex;
    setSolidColor && setSolidColor(hexColor);

    sketchPickerContextFxn && sketchPickerContextFxn(hexColor);
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
            [unloadDialogsAction, oneButtonAction as () => void | IAction],
            "Select",
            "doneOutlined"
          )}
        </ApexFlexContainer>
      )}
    </div>
  );
}
