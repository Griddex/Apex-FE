import Button from "@material-ui/core/Button";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { Formik, FormikProps } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { createNewProjectAction } from "../../Redux/Actions/ProjectActions";
import projectState from "../../Redux/State/ProjectState";
import AnalyticsComp from "../Basic/AnalyticsComp";
import { ButtonProps } from "../Dialogs/DialogTypes";
import { DialogStuff } from "./../Dialogs/DialogTypes";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Divider, TextareaAutosize, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #C4C4C4",
    backgroundColor: "#FFF",
    padding: 20,
  },
  topSection: {
    height: "40%",
    borderBottom: "1px solid #C4C4C4",
  },
  bottomSection: {
    height: "50%",
    paddingTop: 20,
  },
  connect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
  button: {
    color: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
  },
  form: { height: "100%" },
  connectButton: {
    color: "#FFF",
    backgroundColor: theme.palette.primary.main,
    border: `1.5px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    width: 184,
  },
  grid: { width: "100%", height: "100%" },
  checkBox: { margin: 0 },
  selectItem: {},
}));

interface INewProjectFormProps {
  actionsList?: (() => JSX.Element) | (() => JSX.Element[]);
}

interface IFormValues {
  projectName: string;
  projectDescription: string;
}

const NewProjectForm = ({ actionsList }: INewProjectFormProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const DialogContent = withStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      padding: theme.spacing(1.5),
      width: "100%",
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1.5),
    },
  }))(MuiDialogActions);

  const newProjectDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Okay",
        variant: "outlined",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        onClick={button.handleAction}
        startIcon={button.startIcon}
      >
        {button.title}
      </Button>
    ));
  };

  const successDialogParameters: DialogStuff = {
    name: "New_Project_Success_Dialog",
    title: "New Project Success",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "sm",
    dialogText: "New Project Creation Successful",
    iconType: "success",
    actionsList: () => newProjectDialogActions(),
  };

  const failureDialogParameters: DialogStuff = {
    name: "New_Project_Failure_Dialog",
    title: "New Project Failure",
    type: "textDialog",
    show: true,
    exclusive: true,
    maxWidth: "sm",
    dialogText: "New Project Creation failure",
    iconType: "error",
    actionsList: () => newProjectDialogActions(),
  };

  return (
    <div>
      <DialogContent dividers>
        <Formik
          initialValues={projectState}
          validationSchema={Yup.object().shape({
            projectName: Yup.string().required("projectName is required"),
            projectDescription: Yup.string().required(
              "projectDescription is required"
            ),
          })}
          onSubmit={({ projectName, projectDescription }) => {
            dispatch(
              createNewProjectAction(
                projectName,
                projectDescription,
                successDialogParameters,
                failureDialogParameters
              )
            );
          }}
        >
          {(props: FormikProps<IFormValues>) => {
            const {
              values: { projectName, projectDescription },
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
            } = props;

            return (
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                style={{ height: 350, width: "100%" }}
              >
                <AnalyticsComp
                  title="Project Name"
                  direction="Vertical"
                  content={
                    <TextField
                      name="projectName"
                      variant="outlined"
                      style={{ width: "100%" }}
                      helperText={touched.projectName ? errors.projectName : ""}
                      error={Boolean(errors.projectName && touched.projectName)}
                      label="projectName"
                      value={projectName}
                      onChange={handleChange}
                      required
                      autoFocus
                      fullWidth
                    />
                  }
                />
                <AnalyticsComp
                  title="Project Description"
                  direction="Vertical"
                  containerStyle={{ marginTop: 30 }}
                  content={
                    <TextareaAutosize
                      name="projectDescription"
                      style={{ height: 200, width: "100%" }}
                      rowsMin={10}
                      value={projectDescription}
                      onChange={handleChange}
                    />
                  }
                />
                <Divider />
                <DialogActions>{actionsList && actionsList()}</DialogActions>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
    </div>
  );
};

export default NewProjectForm;
