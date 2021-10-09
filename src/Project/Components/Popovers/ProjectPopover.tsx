import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ImageAspectRatioOutlinedIcon from "@mui/icons-material/ImageAspectRatioOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DialogOneCancelButtons from "../../../Application/Components/DialogButtons/DialogOneCancelButtons";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import {
  showDialogAction,
  unloadDialogsAction,
} from "../../../Application/Redux/Actions/DialogsAction";
import { RootState } from "../../../Application/Redux/Reducers/AllReducers";
import { IApplicationStoredDataRow } from "../../../Application/Types/ApplicationTypes";
import {
  fetchStoredEconomicsDataRequestAction,
  fetchStoredEconomicsResultsRequestAction,
  fetchStoredEconomicsSensitivitiesRequestAction,
} from "../../../Economics/Redux/Actions/EconomicsActions";
import { fetchStoredForecastingResultsRequestAction } from "../../../Forecast/Redux/Actions/ForecastActions";
import { fetchStoredInputDeckRequestAction } from "../../../Import/Redux/Actions/StoredInputDeckActions";
import {
  fetchStoredDeclineCurveParametersRequestAction,
  fetchStoredForecastingParametersRequestAction,
  fetchStoredNetworkDataRequestAction,
  fetchStoredProductionPrioritizationRequestAction,
} from "../../../Network/Redux/Actions/NetworkActions";
import { fetchStoredVisualyticsDataRequestAction } from "../../../Visualytics/Redux/Actions/VisualyticsActions";
import {
  closeProjectAction,
  openRecentProjectAction,
  updateProjectParametersAction,
} from "../../Redux/Actions/ProjectActions";
import { IProject } from "../../Redux/State/ProjectStateTypes";
import { showSpinnerAction } from "./../../../Application/Redux/Actions/UISpinnerActions";

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
  const history = useHistory();
  const classes = useStyles();

  const { storedProjects } = useSelector(
    (state: RootState) => state.projectReducer
  );

  const recentProjects = storedProjects.slice(0, 6);

  const {
    selectedProjectId,
    selectedProjectTitle,
    selectedProjectDescription,
    currentProjectId,
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

  const createProject = () => {
    const dialogParameters: DialogStuff = {
      name: "New_Project_Dialog",
      title: "Create Project",
      type: "newProjectWorkflowDialog",
      show: true,
      exclusive: true,
      maxWidth: "md",
      iconType: "select",
      isDialog: true,
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const extrudeMoreStoredProjects = () => {
    const confirmationDialogParameters: DialogStuff = {
      name: "Stored_Projects_Dialog",
      title: "Stored Projects",
      type: "storedProjectsDialog",
      show: true,
      exclusive: false,
      maxWidth: "lg",
      iconType: "table",
      actionsList: (isFinalButtonDisabled: boolean) =>
        DialogOneCancelButtons(
          [true, true],
          [true, true],
          [
            unloadDialogsAction,
            () =>
              openRecentProjectAction(
                "Gideon",
                selectedProjectId as string,
                selectedProjectTitle as string,
                selectedProjectDescription as string
              ),
          ],
          "Open",
          "openOutlined",
          isFinalButtonDisabled,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(confirmationDialogParameters));
  };

  //TODO These actions will be registered in a central area
  //based on what modules are licensed
  const openProject = (id: string, title: string, description: string) => {
    dispatch(showSpinnerAction(`Loading ${title}...`));
    dispatch(fetchStoredForecastingParametersRequestAction(id));
    dispatch(fetchStoredDeclineCurveParametersRequestAction(id));
    dispatch(fetchStoredProductionPrioritizationRequestAction(id));
    dispatch(fetchStoredInputDeckRequestAction(id));
    dispatch(fetchStoredEconomicsDataRequestAction(id));
    dispatch(openRecentProjectAction("Gideon", id, title, description));
    dispatch(fetchStoredNetworkDataRequestAction(id));
    dispatch(fetchStoredForecastingResultsRequestAction(id));
    dispatch(fetchStoredEconomicsSensitivitiesRequestAction(id, false));
    dispatch(fetchStoredEconomicsResultsRequestAction(id, false));
    dispatch(fetchStoredVisualyticsDataRequestAction(id));
  };

  const openProjectConfirmation = (
    id: string,
    title: string,
    description: string,
    openProject: (id: string, title: string, description: string) => void
  ) => {
    const dialogParameters: DialogStuff = {
      name: "Open_Project_Confirmation",
      title: "Open Project Confirmation",
      type: "openProjectConfirmationDialog",
      show: true,
      exclusive: true,
      maxWidth: "xs",
      dialogText: `Do you want to open the current project?
      You will lose all unsaved project data in the current project.
      
      Proceed?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => {
              dispatch(closeProjectAction());
              dispatch(
                openRecentProjectAction("Gideon", id, title, description)
              );
              openProject(id, title, description);

              history.push("/apex");
            },
          ],
          "Open",
          "openOutlined",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

  const closeProjectConfirmation = () => {
    const dialogParameters: DialogStuff = {
      name: "Close_Project_Confirmation",
      title: "Close Project Confirmation",
      type: "textDialog",
      show: true,
      exclusive: true,
      maxWidth: "xs",
      dialogText: `Do you want to close the current project?
      You will lose all unsaved project data.
      
      Proceed?`,
      iconType: "confirmation",
      actionsList: () =>
        DialogOneCancelButtons(
          [true, true],
          [true, false],
          [
            unloadDialogsAction,
            () => {
              dispatch(closeProjectAction());
              dispatch(
                updateProjectParametersAction({
                  currentProjectId: "",
                  currentProjectTitle: "",
                  currentProjectDescription: "",
                })
              );
              history.push("/apex");
            },
          ],
          "Close",
          "closeWithBorder",
          false,
          "All"
        ),
      dialogContentStyle: { paddingTop: 40, paddingBottom: 40 },
    };

    dispatch(showDialogAction(dialogParameters));
  };

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
            createProject();
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
          recentProjects.map(
            (project: IApplicationStoredDataRow, i: number) => {
              const { id, title, description } = project;

              const idDefined = id as string;
              const titleDefined = title as string;
              const descriptionDefined = description as string;

              return (
                <ApexMenuItem
                  key={i}
                  projectTitle={titleDefined}
                  handleClick={() => {
                    if (currentProjectId === "") {
                      openProject(idDefined, titleDefined, descriptionDefined);
                    } else {
                      openProjectConfirmation(
                        idDefined,
                        titleDefined,
                        descriptionDefined,
                        openProject
                      );
                    }
                  }}
                  sn={i + 1}
                  toggleSN={true}
                />
              );
            }
          )}
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
          handleClick={extrudeMoreStoredProjects}
        />
      </div>
      <div>
        <ApexMenuItem
          projectTitle="Close Project"
          icon={
            <CloseOutlinedIcon
              fontSize="medium"
              className={classes.secondaryIcon}
            />
          }
          handleClick={closeProjectConfirmation}
        />
      </div>
    </div>
  );
});

export default ProjectPopover;
