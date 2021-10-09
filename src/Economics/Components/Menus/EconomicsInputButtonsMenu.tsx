import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";
import { ListItemIcon, MenuItem, Typography, useTheme } from "@mui/material";
import Menu from "@mui/material/Menu";
import makeStyles from "@mui/styles/makeStyles";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { subNavbarSetMenuAction } from "../../../Application/Redux/Actions/ApplicationActions";
import { IEconomicsInputButton } from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import { initialEconomicsWorkflowState } from "../../Redux/State/EconomicsState";

const useStyles = makeStyles((theme) => ({
  button: {
    height: 25,
    padding: "0px 10px",
    width: "auto",
    textTransform: "none",
    margin: theme.spacing(0),
    color: theme.palette.grey["800"],
  },
}));

export interface IEconomicsInputButtonsMenu {
  title: string;
  action: () => void;
  icon: JSX.Element;
}

const EconomicsInputButtonsMenu = ({
  children,
}: {
  children: (props: IEconomicsInputButton) => JSX.Element;
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttons = [
    {
      title: "Economics Costs & Revenues",
      action: () => {
        dispatch(
          updateEconomicsParameterAction("loadCostsRevenueWorkflow", false)
        );
        dispatch(
          updateEconomicsParameterAction(
            "inputDataWorkflows.economicsCostsRevenuesDeckExcel",
            initialEconomicsWorkflowState
          )
        );

        history.push(`${url}/costsrevenue`);
      },
      icon: <AttachMoneyOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Economics Parameters",
      action: () => {
        dispatch(
          updateEconomicsParameterAction(
            "loadEconomicsParametersWorkflow",
            false
          )
        );
        history.push(`${url}/parameters`);
      },
      icon: <VerticalSplitOutlinedIcon color="primary" fontSize="small" />,
    },
  ] as IEconomicsInputButtonsMenu[];

  const [economicsInput, setEconomicsInput] = React.useState("Economics Input");

  const childrenProps = {
    name: economicsInput,
    startIcon: <LocalAtmOutlinedIcon htmlColor={theme.palette.grey["800"]} />,
    endIcon: <KeyboardArrowDownIcon htmlColor={theme.palette.grey["800"]} />,
    className: classes.button,
    handleClick,
  };

  return (
    <div style={{ cursor: "context-menu" }}>
      {children({ ...childrenProps })}
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
        {buttons.map((row, i) => {
          const { title, action, icon } = row;

          return (
            <MenuItem
              key={i}
              onClick={() => {
                action();
                dispatch(subNavbarSetMenuAction(title));
                setEconomicsInput(title);

                handleClose();
              }}
            >
              <ListItemIcon style={{ minWidth: 36 }}>{icon}</ListItemIcon>
              <Typography variant="inherit">{title}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default EconomicsInputButtonsMenu;
