import {
  Button,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import VerticalSplitOutlinedIcon from "@material-ui/icons/VerticalSplitOutlined";
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
  console.log(
    "Logged output --> ~ file: EconomicsInputButtonsMenu.tsx ~ line 91 ~ economicsInput",
    economicsInput
  );

  const childrenProps = {
    name: economicsInput,
    startIcon: <TrendingUpOutlinedIcon />,
    endIcon: <KeyboardArrowDownIcon />,
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
        {buttons.map((row, i) => {
          const { title, action, icon } = row;

          return (
            <MenuItem
              key={i}
              onClick={() => {
                action();
                dispatch(subNavbarSetMenuAction(title));
                setEconomicsInput(title);
                console.log(
                  "Logged output --> ~ file: EconomicsInputButtonsMenu.tsx ~ line 124 ~ {buttons.map ~ title",
                  title
                );
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
