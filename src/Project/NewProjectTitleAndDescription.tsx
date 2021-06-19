import { Input, TextareaAutosize, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import AnalyticsComp from "../Application/Components/Basic/AnalyticsComp";
import { updateProjectParameterAction } from "./Redux/Actions/ProjectActions";
import { INewProjectWorkflowProps } from "./Redux/State/ProjectStateTypes";

const NewProjectTitleAndDescription = ({
  projectTitle,
  projectDescription,
  errors,
  touched,
  handleChange,
}: INewProjectWorkflowProps) => {
  const dispatch = useDispatch();

  const handleBlur = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;
    dispatch(updateProjectParameterAction(name, value));
  };

  const helperText =
    touched && touched.projectTitle ? errors && errors.projectTitle : "";

  return (
    <div>
      <AnalyticsComp
        title="Title"
        direction="Vertical"
        content={
          <Input
            name="projectTitle"
            style={{ width: "100%" }}
            error={Boolean(helperText)}
            value={projectTitle}
            // onChange={handleTitleDescChange}
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

export default NewProjectTitleAndDescription;
