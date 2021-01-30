import { TextareaAutosize, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../Application/Components/Basic/AnalyticsComp";
import { updateProjectAction } from "./Redux/Actions/ProjectActions";
import { INewProjectWorkflowProps } from "./Redux/State/ProjectStateTypes";

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

const NewProjectNameAndDescription = ({
  projectTitle,
  projectDescription,
  errors,
  touched,
  handleChange,
}: INewProjectWorkflowProps) => {
  const dispatch = useDispatch();

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    dispatch(updateProjectAction(name, value));
  };

  const helperText =
    touched && touched.projectTitle ? errors && errors.projectTitle : "";

  return (
    <div>
      <AnalyticsComp
        title="Project Name"
        direction="Vertical"
        content={
          <TextField
            name="projectTitle"
            variant="outlined"
            style={{ width: "100%" }}
            helperText={helperText}
            error={Boolean(helperText)}
            value={projectTitle}
            onChange={handleChange}
            onBlur={handleBlur}
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
            style={{ height: 400, width: "100%" }}
            rowsMin={20}
            value={projectDescription}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        }
      />
    </div>
  );
};

export default NewProjectNameAndDescription;
