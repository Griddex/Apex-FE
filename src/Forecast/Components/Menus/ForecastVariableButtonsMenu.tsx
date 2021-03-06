import { Button, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { updateForecastResultsParameterAction } from "../../Redux/Actions/ForecastActions";
import { forecastVariablesMap } from "../../Utils/ForecastVariables";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "react-fast-compare";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const variableUnitsSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.variableUnits,
  (data) => data
);

const ForecastVariableButtonsMenu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const variableUnits = useSelector(variableUnitsSelector);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [forecastVariableTitle, setForecastVariableTitle] =
    React.useState("Oil Rate");

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  type forecastVariableTitle = keyof typeof forecastVariablesMap;

  return (
    <div
      style={{
        cursor: "context-menu",
        backgroundColor: "#F7F7F7",
        marginLeft: 4,
      }}
    >
      <Tooltip key="forecastVariable" title="Variable" placement="bottom" arrow>
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
          {forecastVariableTitle}
        </Button>
      </Tooltip>
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
        {(Object.keys(forecastVariablesMap) as forecastVariableTitle[]).map(
          (title, i) => {
            const avatar = getFirstCharFromEveryWord(title);
            const selectedVar = forecastVariablesMap[title];

            return (
              <MenuItem
                key={i}
                onClick={() => {
                  setForecastVariableTitle(title);

                  dispatch(
                    updateForecastResultsParameterAction(
                      "selectedForecastChartVariable",
                      selectedVar
                    )
                  );

                  handleClose();
                }}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  <>{avatar}</>
                </ListItemAvatar>
                <Typography variant="inherit">{title}</Typography>
              </MenuItem>
            );
          }
        )}
      </Menu>
    </div>
  );
};

export default ForecastVariableButtonsMenu;
