import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Popover, { ArrowContainer } from "react-tiny-popover";
import SortPopover from "./../Popovers/SortPopover";
import FilterPopover from "./../Popovers/FilterPopover";
import MoreIconsPopover from "./../Popovers/MoreIconsPopover";
import SortIcon from "@material-ui/icons/Sort";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 0,
  },
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const TableIcons = ({ localDispatch }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSortPopoverOpen, setIsSortPopoverOpen] = React.useState(false);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = React.useState(false);
  const [isMoreIconsPopoverOpen, setIsMoreIconsPopoverOpen] = React.useState(
    false
  );

  return (
    <>
      <Popover
        isOpen={isSortPopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsSortPopoverOpen(false)}
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
            <SortPopover
              icon={<SortIcon />}
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsSortPopoverOpen(false)}
                />
              }
              title="Sort By"
              handleCancel={() => setIsSortPopoverOpen(false)}
              localDispatch={localDispatch}
            />
          </ArrowContainer>
        )}
      >
        <Button
          className={classes.button}
          onClick={() => setIsSortPopoverOpen(!isSortPopoverOpen)}
          startIcon={<SortIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Sort
        </Button>
      </Popover>
      <Popover
        isOpen={isFilterPopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsFilterPopoverOpen(false)}
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
            <FilterPopover
              icon={<FilterListOutlinedIcon />}
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsFilterPopoverOpen(false)}
                />
              }
              title="Filter By"
              handleCancel={() => setIsFilterPopoverOpen(false)}
              localDispatch={localDispatch}
            />
          </ArrowContainer>
        )}
      >
        <Button
          className={classes.button}
          onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
          startIcon={<FilterListOutlinedIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Filter
        </Button>
      </Popover>
      <Popover
        isOpen={isMoreIconsPopoverOpen}
        position={["bottom", "right", "top", "left"]}
        padding={5}
        transitionDuration={0.1}
        onClickOutside={() => setIsMoreIconsPopoverOpen(false)}
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
            <MoreIconsPopover
              closeIcon={
                <CloseOutlinedIcon
                  onClick={() => setIsMoreIconsPopoverOpen(false)}
                />
              }
              handleCancel={() => setIsMoreIconsPopoverOpen(false)}
              localDispatch={localDispatch}
            />
          </ArrowContainer>
        )}
      >
        <MoreHorizOutlinedIcon
          onClick={() => setIsMoreIconsPopoverOpen(!isMoreIconsPopoverOpen)}
        />
      </Popover>
    </>
  );
};

export default TableIcons;
