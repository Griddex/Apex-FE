import {
  Button,
  makeStyles,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Menu from "@material-ui/core/Menu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@material-ui/icons/ShowChartOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { ISelectOption } from "../../../Application/Components/Selects/SelectItemsType";

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

export interface IChartSelectionMenu {
  chartOptions: ISelectOption[];
  selectedChartType: string;
  updateAction: (selectedChartType: string, value: any) => void;
}

const ChartSelectionMenu = ({
  chartOptions,
  selectedChartType,
  updateAction,
}: IChartSelectionMenu) => {
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

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        onClick={handleClick}
        startIcon={<ShowChartOutlinedIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          height: 28,
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 250,
        }}
        classes={{ label: classes.label }}
      >
        {plotChartOption.label}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {chartOptions.map((chart, i) => {
          const avatar = getFirstCharFromEveryWord(chart.label);

          return (
            <MenuItem
              key={i}
              onClick={() => {
                setPlotChartOption(chart);
                dispatch(updateAction("selectedForecastChartOption", chart));
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

export default ChartSelectionMenu;
