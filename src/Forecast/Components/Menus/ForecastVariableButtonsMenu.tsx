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
import { updateForecastChartParameterAction } from "../../Redux/ForecastActions/ForecastActions";
import { variablesObj } from "../../Utils/ForecastVariables";

const useStyles = makeStyles((theme) => ({
  listItemAvatar: {
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    // minWidth: 20,
    width: 40,
  },
}));

const ForecastVariableButtonsMenu = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [variable, setVariable] = React.useState("Oil Rate");

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  type VariableObjType = keyof typeof variablesObj;

  return (
    <div style={{ cursor: "context-menu", backgroundColor: "#F7F7F7" }}>
      <Button
        onClick={handleClick}
        startIcon={<ShowChartOutlinedIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        style={{
          height: "28px",
          backgroundColor: theme.palette.primary.light,
          border: `1px solid ${theme.palette.primary.main}`,
          width: 250,
        }}
      >
        {variable}
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
        {(Object.keys(variablesObj) as VariableObjType[]).map(
          (k: VariableObjType, i) => {
            const avatar = getFirstCharFromEveryWord(k);

            return (
              <MenuItem
                key={i}
                onClick={() => {
                  setVariable(k);
                  dispatch(
                    updateForecastChartParameterAction(
                      "selectedForecastChartVariable",
                      k
                    )
                  );
                  handleClose();
                }}
              >
                <ListItemAvatar className={classes.listItemAvatar}>
                  {avatar}
                </ListItemAvatar>
                {/* <ListItemIcon style={{ minWidth: 36 }}>{icon}</ListItemIcon> */}
                <Typography variant="inherit">{k}</Typography>
              </MenuItem>
            );
          }
        )}
      </Menu>
    </div>
  );
};

export default ForecastVariableButtonsMenu;
