import { ListItemIcon, MenuItem, Typography } from "@material-ui/core";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ImageAspectRatioOutlinedIcon from "@material-ui/icons/ImageAspectRatioOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { fetchRecentProjectsAction } from "../../Redux/Actions/ProjectActions";

interface IRecentProject {
  sn?: number;
  projectId?: string;
  projectName: string;
  icon?: JSX.Element;
  handleClick: () => void;
  toggleSN?: boolean;
}

const NewProjectPopover = React.forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useDispatch();

  const ApexMenuItem = ({
    projectId,
    projectName,
    handleClick,
    icon,
    sn,
    toggleSN,
  }: IRecentProject) => {
    return (
      <MenuItem
        onClick={() => {
          handleClick();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon && (
          <ListItemIcon style={{ minWidth: 40, minHeight: 40 }}>
            {icon}
          </ListItemIcon>
        )}
        {toggleSN ? (
          <div
            style={{
              display: "flex",
              marginLeft: 30,
              width: "100%",
              minHeight: 40,
            }}
          >
            {`${sn}.`}
            <span>&nbsp;</span>
            <Typography variant="body2">{projectName}</Typography>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <Typography variant="body2">{projectName}</Typography>
          </div>
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
  const recentProjectsA = useSelector(
    (state: RootState) => state.projectReducer
  );
  const recentProjects: IRecentProject[] = [
    {
      projectId: "Apex1",
      projectName: "Forecast Project_May 2020",
      handleClick: () => console.log("hello"),
    },
    {
      projectId: "Apex2",
      projectName: "Forecast Project_June 2019",
      handleClick: () => console.log("hello"),
    },
    {
      projectId: "Apex3",
      projectName: "Forecast Project_September 2018",
      handleClick: () => console.log("hello"),
    },
    {
      projectId: "Apex4",
      projectName: "Forecast Project_May 2017",
      handleClick: () => console.log("hello"),
    },
    {
      projectId: "Apex5",
      projectName: "Forecast Project_January 2016",
      handleClick: () => console.log("hello"),
    },
    {
      projectId: "Apex6",
      projectName: "Forecast Project_April 2015",
      handleClick: () => console.log("hello"),
    },
  ];

  React.useEffect(() => {
    dispatch(fetchRecentProjectsAction());
  }, []);

  return (
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
          projectName="New Project"
          icon={
            <CheckBoxOutlineBlankOutlinedIcon
              fontSize="small"
              style={{ minWidth: 32, minHeight: 32 }}
            />
          }
          handleClick={() => createNewProject()} //Will dispatch new project workflow
        />
      </div>
      <div style={{ borderBottom: "1px solid #999" }}>
        <ApexMenuItem
          projectName="Recent Projects"
          icon={
            <ImageAspectRatioOutlinedIcon
              fontSize="small"
              style={{ minWidth: 32, minHeight: 32 }}
            />
          }
          handleClick={() => console.log("recent projects")} //Will dispatch new project workflow
        />
        {recentProjects.map((project, i: number) => {
          const { projectName, handleClick } = project;
          return (
            <ApexMenuItem
              key={i}
              projectName={projectName}
              handleClick={handleClick}
              sn={i + 1}
              toggleSN={true}
            />
          );
        })}
      </div>
      <div style={{ padding: 3 }}>
        <ApexMenuItem
          projectName="Close Project"
          icon={
            <CloseOutlinedIcon
              color="secondary"
              fontSize="small"
              style={{ minWidth: 32 }}
            />
          }
          handleClick={() => console.log("close project")} //Will dispatch new project workflow
        />
      </div>
    </div>
  );
});

export default NewProjectPopover;
