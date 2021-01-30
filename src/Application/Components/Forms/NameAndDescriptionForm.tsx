import { TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import { INewProjectWorkflowProps } from "../../../Project/Redux/State/ProjectStateTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";

const NameAndDescription = ({
  projectTitle,
  projectDescription,
  errors,
  touched,
  handleChange,
}: INewProjectWorkflowProps) => {
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
          />
        }
      />
    </div>
  );
};

export default NameAndDescription;
