import {
  ListItemIcon,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AllInclusiveOutlinedIcon from "@material-ui/icons/AllInclusiveOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ImageAspectRatioOutlinedIcon from "@material-ui/icons/ImageAspectRatioOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogOpenCancelButtons from "../../../Application/Components/DialogButtons/DialogOpenCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { fetchExistingForecastingResultsRequestAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { fetchExistingDataRequestAction } from "../../../Import/Redux/Actions/ExistingDataActions";
import {
  fetchExistingProjectsAction,
  openRecentProjectAction,
} from "../../Redux/Actions/ProjectActions";
import { IProject } from "../../Redux/State/ProjectStateTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: "auto",
    paddingLeft: 10,
    paddingRight: 10,
  },
  demarcation: {
    borderBottom: "1px solid #999",
    padding: 3,
  },
  primaryIcon: {
    minWidth: 32,
    minHeight: 32,
    color: theme.palette.primary.main,
  },
  secondaryIcon: {
    minWidth: 32,
    minHeight: 32,
    color: theme.palette.secondary.main,
  },
}));

const ProjectPopover = React.forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    selectedProjectId,
    selectedProjectTitle,
    selectedProjectDescription,
  } = useSelector((state: RootState) => state.projectReducer);

  const ApexMenuItem = ({
    projectId,
    projectTitle,
    handleClick,
    icon,
    sn,
    toggleSN,
    recentProjectsStyles,
  }: IProject) => {
    return (
      <MenuItem
        onClick={() => {
          handleClick && handleClick();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          ...recentProjectsStyles,
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
              alignItems: "center",
              marginLeft: 30,
              width: "100%",
              minHeight: 40,
            }}
          >
            {`${sn}.`}
            <span>&nbsp;</span>
            <Typography variant="body2">{projectTitle}</Typography>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="body2">{projectTitle}</Typography>
          </div>
        )}
      </MenuItem>
    );
  };

  const createNewProject = () => {
    const dialogParameters: DialogStuff = {
      name: "New_Project_Dialog",
      title: "Create New Project",
      type: "newProjectWorkflowDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "select",
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const extrudeMoreExistingProjects = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Existing_Projects_Dialog",
      title: "Existing Projects",
      type: "existingProjectsDialog",
      show: true,
      exclusive: false,
      maxWidth: "md",
      iconType: "information",
      actionsList: () =>
        DialogOpenCancelButtons(
          [true, true],
          [true, true],
          [
            () =>
              openRecentProjectAction(
                "Gideon",
                selectedProjectId as string,
                selectedProjectTitle as string,
                selectedProjectDescription as string
              ),
            unloadDialogsAction,
          ]
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  const recentProjects = useSelector(
    (state: RootState) => state.projectReducer["recentProjects"]
  ) as IProject[];

  return (
    <div className={classes.root}>
      <div className={classes.demarcation}>
        <ApexMenuItem
          projectTitle="New Project"
          icon={
            <CheckBoxOutlineBlankOutlinedIcon
              fontSize="small"
              className={classes.primaryIcon}
            />
          }
          handleClick={() => {
            createNewProject();
          }}
        />
      </div>
      <div className={classes.demarcation}>
        <ApexMenuItem
          projectTitle="Recent Projects"
          recentProjectsStyles={{ pointerEvents: "none" }}
          icon={
            <ImageAspectRatioOutlinedIcon
              fontSize="small"
              className={classes.primaryIcon}
            />
          }
        />
        {recentProjects &&
          recentProjects.map((project: IProject, i: number) => {
            const { projectTitle, projectId, projectDescription } = project;
            return (
              <ApexMenuItem
                key={i}
                projectTitle={projectTitle as string}
                handleClick={() => {
                  //TODO:Economics table, production etc
                  dispatch(fetchExistingDataRequestAction(projectId as string));
                  dispatch(
                    openRecentProjectAction(
                      "Gideon",
                      projectId as string,
                      projectTitle as string,
                      projectDescription as string
                    )
                  );
                  dispatch(
                    fetchExistingForecastingResultsRequestAction(
                      projectId as string
                    )
                  );
                }}
                sn={i + 1}
                toggleSN={true}
              />
            );
          })}
      </div>
      <div className={classes.demarcation}>
        <ApexMenuItem
          projectTitle="All Projects"
          icon={
            <AllInclusiveOutlinedIcon
              fontSize="small"
              className={classes.primaryIcon}
            />
          }
          handleClick={extrudeMoreExistingProjects}
        />
      </div>
      <div>
        <ApexMenuItem
          projectTitle="Close Project"
          icon={
            <CloseOutlinedIcon
              fontSize="default"
              className={classes.secondaryIcon}
            />
          }
          handleClick={() => console.log("close project")} //Will dispatch new project workflow
        />
      </div>
    </div>
  );
});

export default ProjectPopover;
