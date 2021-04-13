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
import { useHistory, useRouteMatch } from "react-router-dom";
import { IEconomicsInputButton } from "../../../Import/Routes/Common/Workflows/InputWorkflowsTypes";

const useStyles = makeStyles((theme) => ({
  button: {
    height: 25,
    padding: "0px 10px",
    width: "auto",
    textTransform: "none",
    margin: theme.spacing(0),
  },
}));

const EconomicsInputButtonsMenu = ({
  children,
}: {
  children: (props: IEconomicsInputButton) => JSX.Element;
}) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttons: {
    title: string;
    action: () => void;
    icon: JSX.Element;
  }[] = [
    {
      title: "Economics Costs",
      action: () => history.push(`${url}/costsrevenue`),
      icon: <AttachMoneyOutlinedIcon color="primary" fontSize="small" />,
    },
    {
      title: "Economics Parameters",
      action: () => history.push(`${url}/parameters`),
      icon: <VerticalSplitOutlinedIcon color="primary" fontSize="small" />,
    },
  ];

  const childrenProps = {
    name: "Economics Input",
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
