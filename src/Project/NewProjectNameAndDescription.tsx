import { TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../Application/Components/Basic/AnalyticsComp";
import { updateProjectAction } from "./Redux/Actions/ProjectActions";
import { INewProjectWorkflowProps } from "./Redux/State/ProjectStateTypes";

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
        title="Title"
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
        title="Description"
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
