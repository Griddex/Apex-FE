import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";

const useStyles = makeStyles((theme) => ({
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
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
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
