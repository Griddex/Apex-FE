import Menu from "@material-ui/core/Menu";
import React from "react";
import { XYPosition } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers/AllReducers";
import { IContextMenuProps } from "../../../Network/Components/ContextMenu/ContextMenuTypes";
import ImportMoreActionsPopover, {
  TImportMoreActionsData,
} from "../Popovers/ImportMoreActionsPopover";

const ImportMoreActionsContextMenu = ({
  children,
  data,
}: IContextMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const nodePosition = {
    x: 334,
    y: 152,
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pos = nodePosition as XYPosition;
  const anchorPosition =
    pos.y !== null && pos.x !== null ? { top: pos.y, left: pos.x } : undefined;

  const importMoreActionsData = data as TImportMoreActionsData;

  return (
    <div
      ref={anchorRef}
      onClick={handleClick}
      style={{ cursor: "context-menu" }}
    >
      {children}
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
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
          horizontal: "center",
        }}
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
