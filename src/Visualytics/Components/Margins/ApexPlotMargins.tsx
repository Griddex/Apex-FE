import { Input, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Margin } from "@nivo/core";
import React from "react";
import { useDispatch } from "react-redux";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import { IAction } from "../../../Application/Redux/Actions/ActionTypes";
import { TUseState } from "../../../Application/Types/ApplicationTypes";
import { IChart } from "../../Redux/State/VisualyticsStateTypes";

export interface IApexPlotMarginsOption extends ISelectOption<number, string> {
  width: number;
}

export interface IApexPlotMargins {
  basePath: string;
  margin: Partial<Margin>;
  setMargins: TUseState<IChart>;
  updateParameterAction: (path: string, value: any) => IAction;
  plotMarginData: IApexPlotMarginsOption[][];
}

const ApexPlotMargins = ({
  basePath,
  margin,
  updateParameterAction,
  setMargins,
  plotMarginData,
}: IApexPlotMargins) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleMarginChange =
    (marginType: keyof Margin) => (event: React.ChangeEvent<any>) => {
      const { value } = event.target;

      setMargins((prev) => ({
        ...prev,
        margin: { ...prev.margin, [marginType]: Number(value) },
      }));

      updateParameterAction &&
        dispatch(
          updateParameterAction(`${basePath}.margin`, {
            ...margin,
            [marginType]: Number(value),
          })
        );
    };

  return (
    <ApexFlexContainer flexDirection="column">
      {plotMarginData.map((row, i) => (
        <ApexFlexContainer
          key={i}
          moreStyles={{ justifyContent: "space-between" }}
        >
          {row.map((option, j) => {
            const labelDefined = option.label as keyof Margin;

            return (
              <div key={j}>
                <Typography>{option.label}</Typography>
                <Input
                  onChange={handleMarginChange(labelDefined)}
                  value={margin[labelDefined]}
                  style={{
                    backgroundColor: theme.palette.grey[200],
                    width: option.width,
                  }}
                />
              </div>
            );
          })}
        </ApexFlexContainer>
      ))}
    </ApexFlexContainer>
  );
};

export default ApexPlotMargins;
