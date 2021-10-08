import { Button, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import getFirstCharFromEveryWord from "../../../Application/Utils/GetFirstCharFromEveryWord";
import { forecastAggregationLevels } from "../../Data/ForecastData";
import { updateForecastResultsParameterAction } from "../../Redux/Actions/ForecastActions";
import { forecastVariablesMap } from "../../Utils/ForecastVariables";

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

const ForecastAggregationLevelButtonsMenu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [forecastAggregationOption, setForecastAggregationOption] =
    React.useState(forecastAggregationLevels[0]);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setForecastAggregationOption({ value: "none", label: "None" });
  }, []);

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Tooltip
        key="forecastAggregationLevel"
        title="Level"
        placement="bottom"
        arrow
      >
        <Button
          className={classes.label}
          onClick={handleClick}
          startIcon={<ShowChartOutlinedIcon />}
          endIcon={<KeyboardArrowDownIcon />}
          style={{
            height: 28,
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.main}`,
            width: 120,
            marginRight: 4,
          }}
        >
          {forecastAggregationOption.label}
        </Button>
      </Tooltip>
      <Menu
        keepMounted
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
        {forecastAggregationLevels.map((option, i) => {
          const { value, label } = option;
          const avatar = getFirstCharFromEveryWord(label);

          return (
            <MenuItem
              key={i}
              onClick={() => {
                setForecastAggregationOption(option);

                dispatch(
                  updateForecastResultsParameterAction(
                    "selectedForecastAggregationLevel",
                    value
                  )
                );

                handleClose();
              }}
            >
              <ListItemAvatar className={classes.listItemAvatar}>
                <>{avatar}</>
              </ListItemAvatar>
              <Typography variant="inherit">{label}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ForecastAggregationLevelButtonsMenu;
