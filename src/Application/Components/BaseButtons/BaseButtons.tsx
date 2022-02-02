import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { IButtonsConfigProps } from "../../Layout/LayoutTypes";

const BaseButtons = ({
  buttonTexts,
  variants,
  colors,
  startIcons,
  endIcons,
  disableds,
  shouldExecute,
  shouldDispatch,
  finalActions,
  applySpace,
}: IButtonsConfigProps) => {
  const dispatch = useDispatch();

  return (
    <>
      {buttonTexts.map((text, i) => {
        const variant =
          variants && (variants[i] as NonNullable<ButtonProps["variant"]>);
        const color =
          colors && (colors[i] as NonNullable<ButtonProps["color"]>);
        const startIcon =
          startIcons &&
          (startIcons[i] as NonNullable<ButtonProps["startIcon"]>);
        const endIcon =
          endIcons && (endIcons[i] as NonNullable<ButtonProps["endIcon"]>);
        const disabled =
          disableds && (disableds[i] as NonNullable<ButtonProps["disabled"]>);
        return (
          <Button
            key={i}
            variant={variant}
            color={color}
            onClick={() => {
              if (shouldExecute[i]) {
                const action = finalActions[i];
                if (shouldDispatch[i]) dispatch(action());
                else action();
              }
            }}
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            style={applySpace ? { marginLeft: 10 } : {}}
          >
            {text}
          </Button>
        );
      })}
    </>
  );
};

export default BaseButtons;
