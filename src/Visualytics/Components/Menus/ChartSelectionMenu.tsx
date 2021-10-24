import { Button, MenuItem, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import React, { ChangeEvent } from "react";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";

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

export interface IChartSelectionMenu {
  chartOptions: ISelectOption[];
  initialChartIndex?: number;
  putChartOptionAction: (chartOption: ISelectOption) => void;
}

const ChartSelectionMenu = ({
  chartOptions,
  initialChartIndex,
  putChartOptionAction,
}: IChartSelectionMenu) => {
  const classes = useStyles();
  const theme = useTheme();

  const initialChartIndexDefined = initialChartIndex as number;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [plotChartOption, setPlotChartOption] = React.useState(
    chartOptions[
      initialChartIndexDefined ? initialChartIndexDefined : 0
    ] as ISelectOption
  );

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
          width: 200,
          color: theme.palette.grey["800"],
        }}
      >
        {plotChartOption.label}
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
        {chartOptions.map((chartOption, i) => {
          const avatar = getFirstCharFromEveryWord(chartOption.label);

          return (
            <MenuItem
              key={i}
              onClick={() => {
                setPlotChartOption(chartOption);
                putChartOptionAction(chartOption);

                handleClose();
              }}
            >
              <ListItemAvatar className={classes.listItemAvatar}>
                <>{avatar}</>
              </ListItemAvatar>
              <Typography variant="inherit">{chartOption.label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ChartSelectionMenu;
