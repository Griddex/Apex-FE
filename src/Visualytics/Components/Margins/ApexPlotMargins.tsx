import { IconButton, Input, useTheme } from "@material-ui/core";
import React from "react";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import ApexFlexContainer from "../../../Application/Components/Styles/ApexFlexContainer";
import Typography from "@material-ui/core/Typography";

export interface IApexPlotMarginsOption extends ISelectOption<number, string> {
  action?: (event: React.ChangeEvent<any>) => void;
}

export interface IApexPlotMargins {
  plotMarginData: IApexPlotMarginsOption[][];
}

const ApexPlotMargins = ({ plotMarginData }: IApexPlotMargins) => {
  const theme = useTheme();

  return (
    <ApexFlexContainer flexDirection="column">
      {plotMarginData.map((row, i) => (
        <ApexFlexContainer key={i}>
          {row.map((option, j) => (
            <div key={j}>
              <Typography>{option.label}</Typography>
              <Input
                onChange={option.action}
                value={option.value}
                style={{
                  backgroundColor: theme.palette.grey[200],
                }}
              ></Input>
            </div>
          ))}
        </ApexFlexContainer>
      ))}
    </ApexFlexContainer>
  );
};

export default ApexPlotMargins;
