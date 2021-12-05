import makeStyles from "@mui/styles/makeStyles";
import Menu from "@mui/material/Menu";
import React from "react";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import ImportMoreActionsPopover, {
  TImportMoreActionsData,
} from "../Popovers/ImportMoreActionsPopover";

const useStyles = makeStyles(() => ({
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

  const handleClick = React.useCallback((event: React.ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const importMoreActionsData = React.useMemo(
    () => data as TImportMoreActionsData,
    []
  );

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
