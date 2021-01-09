import {
  ClickAwayListener,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@material-ui/core";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ImageAspectRatioOutlinedIcon from "@material-ui/icons/ImageAspectRatioOutlined";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { showDialogAction } from "../../Redux/Actions/DialogsAction";
import { DialogStuff } from "../Dialogs/DialogTypes";

interface IApexMenuItemProps {
  name: string;
  icon?: JSX.Element;
  handleClick: () => void;
  toggleSN?: boolean;
  sn?: number;
}
interface IProjectMenuProps {
  name: string;
}

const NewProjectPopover = React.forwardRef<HTMLDivElement, IProjectMenuProps>(
  (props, ref) => {
    const dispatch = useDispatch();

    const ApexMenuItem = ({
      name,
      handleClick,
      icon,
      sn,
      toggleSN,
    }: IApexMenuItemProps) => {
      return (
        <MenuItem
          onClick={() => {
            handleClick();
          }}
          style={{ padding: 0, marginTop: 4, marginBottom: 4 }}
        >
          {icon && <ListItemIcon style={{ minWidth: 30 }}>{icon}</ListItemIcon>}
          {toggleSN ? (
            <div style={{ display: "flex", marginLeft: 30, width: "100%" }}>
              {`${sn}.`}
              <span>&nbsp;</span>
              <Typography variant="body2">{name}</Typography>
            </div>
          ) : (
            <Typography variant="body2">{name}</Typography>
          )}
        </MenuItem>
      );
    };

    const createNewProject = () => {
      const dialogParameters: DialogStuff = {
        name: "New_Project_Dialog",
        title: "New Project",
        type: "newProjectDialogWorkflow",
        show: true,
        exclusive: true,
        maxWidth: "md",
        iconType: "select",
      };

      dispatch(showDialogAction(dialogParameters));
    };

    //TODO: Saga Api to fetch recently opened projects from server
    const recentProjects: IApexMenuItemProps[] = [
      {
        name: "Forecast Project_May 2020",
        handleClick: () => console.log("hello"),
      },
      {
        name: "Forecast Project_June 2019",
        handleClick: () => console.log("hello"),
      },
      {
        name: "Forecast Project_September 2018",
        handleClick: () => console.log("hello"),
      },
      {
        name: "Forecast Project_May 2017",
        handleClick: () => console.log("hello"),
      },
      {
        name: "Forecast Project_January 2016",
        handleClick: () => console.log("hello"),
      },
      {
        name: "Forecast Project_April 2015",
        handleClick: () => console.log("hello"),
      },
    ];

    const handleClickAway = (event: ChangeEvent<any>) => {};

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          style={{
            width: 400,
            height: "auto",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <div style={{ borderBottom: "1px solid #999", padding: 3 }}>
            <ApexMenuItem
              name="New Project"
              icon={
                <CheckBoxOutlineBlankOutlinedIcon
                  fontSize="small"
                  style={{ minWidth: 30 }}
                />
              }
              handleClick={() => createNewProject()} //Will dispatch new project workflow
            />
          </div>
          <div style={{ borderBottom: "1px solid #999" }}>
            <ApexMenuItem
              name="Recent Projects"
              icon={
                <ImageAspectRatioOutlinedIcon
                  fontSize="small"
                  style={{ minWidth: 30 }}
                />
              }
              handleClick={() => console.log("recent projects")} //Will dispatch new project workflow
            />
            {recentProjects.map((project, i: number) => {
              const { name, handleClick } = project;
              return (
                <ApexMenuItem
                  key={i}
                  name={name}
                  handleClick={handleClick}
                  sn={i + 1}
                  toggleSN={true}
                />
              );
            })}
          </div>
          <div style={{ padding: 3 }}>
            <ApexMenuItem
              name="Close Project"
              icon={
                <CloseOutlinedIcon
                  color="secondary"
                  fontSize="small"
                  style={{ minWidth: 30 }}
                />
              }
              handleClick={() => console.log("close project")} //Will dispatch new project workflow
            />
          </div>
        </div>
      </ClickAwayListener>
    );
  }
);

export default NewProjectPopover;
