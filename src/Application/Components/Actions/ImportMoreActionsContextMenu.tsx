import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import ImportMoreActionsPopover, {
  TImportMoreActionsData,
} from "../Popovers/ImportMoreActionsPopover";

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
  },
}));

const ImportMoreActionsContextMenu = ({
  children,
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

  const importMoreActionsData = data as TImportMoreActionsData;

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
        <ImportMoreActionsPopover
          anchorEl={anchorEl}
          handleClose={handleClose}
          importMoreActionsData={importMoreActionsData}
        />
      </Menu>
    </div>
  );
};

export default ImportMoreActionsContextMenu;
