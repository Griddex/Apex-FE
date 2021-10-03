import { IconButton, useTheme } from "@mui/material";
import { LegendAnchor, LegendProps } from "@nivo/legends";
import React from "react";
import { useDispatch } from "react-redux";
import { IChart } from "../../../Visualytics/Redux/State/VisualyticsStateTypes";
import { IAction } from "../../Redux/Actions/ActionTypes";
import { TUseState } from "../../Types/ApplicationTypes";
import ApexFlexContainer from "../Styles/ApexFlexContainer";
import { ISelectOption } from "./../Selects/SelectItemsType";

export interface IApexLegendAnchorOption extends ISelectOption {
  action?: () => void;
}

export interface IApexLegendAnchor {
  basePath: string;
  legends: LegendProps;
  currentAnchor: LegendAnchor;
  setAnchor: TUseState<IChart>;
  updateParameterAction: (path: string, value: any) => IAction;
  anchorData: IApexLegendAnchorOption[][];
}

const ApexLegendAnchor = ({
  basePath,
  legends,
  currentAnchor,
  setAnchor,
  updateParameterAction,
  anchorData,
}: IApexLegendAnchor) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAnchorClick =
    (anchorType: LegendAnchor, chtKey: keyof IChart) =>
    (event: React.ChangeEvent<any>) => {
      setAnchor((prev) => ({
        ...prev,
        [chtKey]: [{ ...prev[chtKey][0], anchor: anchorType }],
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.${chtKey}`, [
            {
              ...legends,
              anchor: anchorType,
            },
          ])
        );
    };

  return (
    <ApexFlexContainer flexDirection="column">
      {anchorData.map((row, i) => (
        <ApexFlexContainer key={i}>
          {row.map((option, j) => {
            const labelDefined = option.label;
            const valueDefined = option.value as LegendAnchor;

            return (
              <IconButton
                key={j}
                onClick={handleAnchorClick(valueDefined, "legends")}
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor:
                    currentAnchor === option.value
                      ? theme.palette.grey[300]
                      : "",
                }}
                size="large">
                {option.label}
              </IconButton>
            );
          })}
        </ApexFlexContainer>
      ))}
    </ApexFlexContainer>
  );
};

export default ApexLegendAnchor;
