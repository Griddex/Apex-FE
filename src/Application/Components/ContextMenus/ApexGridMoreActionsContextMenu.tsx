import makeStyles from "@mui/styles/makeStyles";
import Menu from "@mui/material/Menu";
import React from "react";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";

const useStyles = makeStyles(() => ({
  list: {
    padding: 0,
  },
}));

const ApexGridMoreActionsContextMenu = ({
  children,
  component,
  data,
}: IContextMenuProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Component = component as NonNullable<React.FC<any>>;

  return (
    <div
      ref={anchorRef}
      onClick={handleClick}
      style={{ cursor: "context-menu" }}
    >
      {children}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        classes={{ list: classes.list }}
      >
        <Component anchorEl={anchorEl} handleClose={handleClose} data={data} />
      </Menu>
    </div>
  );
};

export default ApexGridMoreActionsContextMenu;
