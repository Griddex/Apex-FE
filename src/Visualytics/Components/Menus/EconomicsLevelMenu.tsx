import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import { Button, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import makeStyles from "@mui/styles/makeStyles";
import React, { ChangeEvent } from "react";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import { TChartStory } from "../Charts/ChartTypes";
import ChartTypeWidget from "../ChartTypeWidget/ChartTypeWidget";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    minWidth: 40,
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export interface IEconomicsLevelMenuMenu {
  chartStory: TChartStory;
  secondaryChartStory: TChartStory;
  chartOptions: ISelectOption[];
  chartSecondaryOptions?: ISelectOption[];
  initialChartIndex?: number;
  initialSecondaryChartIndex?: number;
  putChartOptionAction: (chartOption: ISelectOption) => void;
  putChartSecondaryOptionAction?: (chartOption: ISelectOption) => void;
}

const EconomicsLevelMenuMenu = ({
  chartStory,
  secondaryChartStory,
  chartOptions,
  chartSecondaryOptions,
  initialChartIndex,
  initialSecondaryChartIndex,
  putChartOptionAction,
  putChartSecondaryOptionAction,
}: IEconomicsLevelMenuMenu) => {
  const classes = useStyles();
  const theme = useTheme();

  const initialChartIndexDefined = initialChartIndex as number;
  const initialSecondaryChartIndexDefined =
    initialSecondaryChartIndex as number;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [plotChartOption, setPlotChartOption] = React.useState(
    chartOptions[
      initialChartIndexDefined ? initialChartIndexDefined : 0
    ] as ISelectOption
  );
  const [plotSecondaryChartOption, setPlotSecondaryChartOption] =
    React.useState(
      chartOptions[
        initialSecondaryChartIndexDefined
          ? initialSecondaryChartIndexDefined
          : 0
      ] as ISelectOption
    );

  const action = (option: ISelectOption) => {
    setPlotChartOption(option);
    putChartOptionAction(option);
  };
  const secondaryAction = (option: ISelectOption) => {
    setPlotSecondaryChartOption(option);
    putChartSecondaryOptionAction && putChartSecondaryOptionAction(option);
  };

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        className={classes.label}
        onClick={handleClick}
        startIcon={
          <ShowChartOutlinedIcon htmlColor={theme.palette.grey["800"]} />
        }
        endIcon={
          <KeyboardArrowDownIcon htmlColor={theme.palette.grey["800"]} />
        }
        style={{
          height: 28,
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 250,
          color: theme.palette.grey["800"],
        }}
      >
        {`${plotChartOption.label} | ${plotSecondaryChartOption.label}`}
      </Button>
      <Menu
        style={{ paddingRight: 8 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ width: 200 }}>
          <div style={{ width: 200, height: 120 }}>
            <div>Primary Charts</div>
            <ChartTypeWidget
              chartStory={chartStory}
              chartTypeState="icon"
              chartTypeOptions={chartOptions}
              selectedOption={plotChartOption}
              action={action}
            />
          </div>
          <div style={{ width: 200, height: 120, marginTop: 40 }}>
            <div>Secondary Charts</div>
            <ChartTypeWidget
              chartStory={secondaryChartStory}
              chartTypeState="icon"
              chartTypeSecondaryOptions={chartSecondaryOptions}
              selectedOption={plotSecondaryChartOption}
              action={secondaryAction}
            />
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default EconomicsLevelMenuMenu;
