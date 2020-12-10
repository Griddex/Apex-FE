import { makeStyles } from "@material-ui/core/styles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import React from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import EditDeleteActionsPopover from "../Popovers/EditDeleteActionsPopover";
import RolesActionPopover from "../Popovers/RolesActionPopover";
// import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
// import HorizontalSplitOutlinedIcon from "@material-ui/icons/HorizontalSplitOutlined";
// import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";

const useStyles = makeStyles((theme) => ({
  rootTableAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "& > *": {
      width: 24,
      height: 24,
      "&:hover": { color: theme.palette.primary.main },
    },
    alignSelf: "center",
    // color: theme.palette.text,
    width: 80,
  },
}));

export interface ITableAction {
  i?: number;
  handleEditAction?: () => void;
  handleDeleteAction?: () => void;
  handlePickAction?: () => void;
}

const TableAction = (props: ITableAction) => {
  const { i, handleEditAction, handleDeleteAction, handlePickAction } = props;

  const classes = useStyles();
  const [isEditPopoverOpen, setIsEditPopoverOpen] = React.useState(false);
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = React.useState(false);
  const [isPickPopoverOpen, setIsPickPopoverOpen] = React.useState(false);

  return (
    <div className={classes.rootTableAction}>
      <Popover
        isOpen={isEditPopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsEditPopoverOpen(false)}
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={"grey"}
            arrowSize={10}
            arrowStyle={{
              opacity: 1,
            }}
          >
            <EditDeleteActionsPopover
              icon={<HelpOutlineOutlinedIcon />}
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsEditPopoverOpen(false)}
                />
              }
              title="Edit Confirmation"
              description={`Do you want to edit row ${i}?`}
              handleCancel={() => setIsEditPopoverOpen(false)}
              handleYes={handleEditAction}
            />
          </ArrowContainer>
        )}
      >
        <EditOutlinedIcon
          onClick={() => setIsEditPopoverOpen(!isEditPopoverOpen)}
        />
      </Popover>
      <Popover
        isOpen={isDeletePopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsDeletePopoverOpen(false)}
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={"grey"}
            arrowSize={10}
            arrowStyle={{
              opacity: 1,
            }}
          >
            <EditDeleteActionsPopover
              icon={<HelpOutlineOutlinedIcon />}
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsDeletePopoverOpen(false)}
                />
              }
              title="Delete Confirmation"
              description={`Do you want to delete row ${i}?`}
              handleCancel={() => setIsDeletePopoverOpen(false)}
              handleYes={handleDeleteAction}
            />
          </ArrowContainer>
        )}
      >
        <DeleteOutlinedIcon
          onClick={() => setIsDeletePopoverOpen(!isDeletePopoverOpen)}
        />
      </Popover>
      <Popover
        isOpen={isPickPopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsPickPopoverOpen(false)}
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={"grey"}
            arrowSize={10}
            arrowStyle={{
              opacity: 1,
            }}
          >
            <RolesActionPopover
              icon={<HelpOutlineOutlinedIcon />}
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsPickPopoverOpen(false)}
                />
              }
              // title="Assignment Confirmation"
              title="Confirmation"
              handleCancel={() => setIsPickPopoverOpen(false)}
              handleYes={handlePickAction}
            />
          </ArrowContainer>
        )}
      >
        <MenuOpenOutlinedIcon
          onClick={() => setIsPickPopoverOpen(!isPickPopoverOpen)}
        />
      </Popover>
    </div>
  );
};
export default TableAction;
