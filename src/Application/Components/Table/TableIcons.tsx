import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import SortIcon from "@material-ui/icons/Sort";
import React from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import ToTitleCase from "../../Utils/ToTitleCase";
import FilterPopover from "../Popovers/FilterPopover";
import MoreIconsPopover from "../Popovers/MoreIconsPopover";
import SortPopover from "../Popovers/SortPopover";
import { ITableIconsOptions } from "./ReactDataGrid/ApexGridTypes";

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
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    // fontWeight: "bold",
    // width: 150,
  },
}));

export interface ITableIconsProps {
  localDispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
  options: ITableIconsOptions;
}

export interface IPopoverWidgets {
  sort: typeof SortPopover;
  filter: typeof FilterPopover;
  save: typeof FilterPopover; //TODO correct it
}
export interface ITableIconsData {
  name: "sort" | "filter" | "save";
  display: boolean;
  action?: () => void;
  icon?: JSX.Element;
  hasPopover: boolean;
  popover: {
    isOpen: boolean;
    cancelAction: () => void;
    toggleAction: () => void;
  };
}

const TableIcons: React.FC<ITableIconsProps> = ({ localDispatch, options }) => {
  const classes = useStyles();
  const [isSortPopoverOpen, setIsSortPopoverOpen] = React.useState(false);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = React.useState(false);
  const [isMoreIconsPopoverOpen, setIsMoreIconsPopoverOpen] = React.useState(
    false
  );

  const PopoverWidgets: IPopoverWidgets = {
    sort: SortPopover,
    filter: FilterPopover,
    save: FilterPopover,
  };

  const iconsData: ITableIconsData[] = [
    {
      name: "sort",
      display: options["sort"].show,
      action: options["sort"].action,
      icon: <SortIcon />,
      hasPopover: true,
      popover: {
        isOpen: isSortPopoverOpen,
        cancelAction: () => setIsSortPopoverOpen(false),
        toggleAction: () => setIsSortPopoverOpen(!isSortPopoverOpen),
      },
    },
    {
      name: "filter",
      display: options["filter"].show,
      action: options["filter"].action,
      icon: <FilterListOutlinedIcon />,
      hasPopover: true,
      popover: {
        isOpen: isFilterPopoverOpen,
        cancelAction: () => setIsFilterPopoverOpen(false),
        toggleAction: () => setIsFilterPopoverOpen(!isFilterPopoverOpen),
      },
    },
    {
      name: "save",
      display: options["save"].show,
      action: options["save"].action,
      icon: <SaveTwoToneIcon />,
      hasPopover: false,
      popover: {
        isOpen: false,
        cancelAction: () => {},
        toggleAction: () => {},
      },
    },
  ];

  return (
    <>
      {iconsData.map((data: ITableIconsData) => {
        const {
          name,
          display,
          action,
          icon,
          hasPopover,
          popover: { isOpen, cancelAction, toggleAction },
        } = data;

        if (display) {
          if (hasPopover) {
            const PopoverComp = PopoverWidgets[name];

            return (
              <Popover
                isOpen={isOpen}
                position={["bottom", "right", "top", "left"]}
                padding={5}
                transitionDuration={0.1}
                onClickOutside={cancelAction}
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
                    <PopoverComp
                      title="Sort By"
                      action={cancelAction}
                      handleCancel={cancelAction}
                      localDispatch={localDispatch}
                    />
                  </ArrowContainer>
                )}
              >
                <Button
                  className={classes.button}
                  onClick={toggleAction}
                  startIcon={icon}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {ToTitleCase(name)}
                </Button>
              </Popover>
            );
          } else {
            <Button
              className={classes.button}
              onClick={action}
              startIcon={icon}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {ToTitleCase(name)}
            </Button>;
          }
        }
      })}

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
