import { Button, MenuItem, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { ISelectOption } from "./../../../Application/Components/Selects/SelectItemsType";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    width: 40,
  },
  label: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const EconomicsChartSelectionMenu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [plotChartOption, setPlotChartOption] = React.useState({
    value: "select",
    label: "Select Chart...",
  } as ISelectOption);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const economicsPlotCharts = [
    {
      value: "stackedAreaChart",
      label: "Stacked Area",
    },
    {
      value: "lineChart",
      label: "Line",
    },
    {
      value: "doughnutChart",
      label: "Doughnut",
    },
    {
      value: "barChart",
      label: "Bar",
    },
  ];

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        className={classes.label}
        onClick={handleClick}
        startIcon={<ShowChartOutlinedIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          height: 28,
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 250,
        }}
      >
        {plotChartOption.label}
      </Button>
      <Menu
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
        {economicsPlotCharts.map((chart, i) => {
          const avatar = getFirstCharFromEveryWord(chart.label);

          return (
            <MenuItem
              key={i}
              onClick={() => {
                setPlotChartOption(chart);
                dispatch(
                  updateEconomicsParameterAction(
                    "selectedEconomicsPlotChartOption",
                    chart
                  )
                );
                handleClose();
              }}
            >
              <ListItemAvatar className={classes.listItemAvatar}>
                <>{avatar}</>
              </ListItemAvatar>
              <Typography variant="inherit">{chart.label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default EconomicsChartSelectionMenu;
