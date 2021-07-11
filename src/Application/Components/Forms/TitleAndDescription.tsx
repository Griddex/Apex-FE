import { Input, TextareaAutosize, useTheme } from "@material-ui/core";
import { ErrorMessage, FormikProps } from "formik";
import React from "react";
import AnalyticsComp from "../Basic/AnalyticsComp";
import {
  ITitleAndDescriptionFormProps,
  ITitleAndDescriptionFormValues,
} from "./FormTypes";

const TitleAndDescription = ({
  setTitle,
  setDescription,
  setDisable,
  values,
  errors,
  touched,
  isValid,
  dirty,
  handleChange,
}: ITitleAndDescriptionFormProps &
  FormikProps<ITitleAndDescriptionFormValues>) => {
  const theme = useTheme();
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 22 ~ dirty",
    dirty
  );
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 22 ~ isValid",
    isValid
  );
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 22 ~ values",
    values
  );
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 21 ~ errors",
    errors
  );
  const { title, description } = values;

  const helperTextTitle =
    touched && touched.title ? errors && errors.title : "";

  const hasValues = Object.values(values).every((v) => v !== "");

  const handleTitleDescChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;

    if (name === "title") {
      setTitle && setTitle(value);
    } else {
      setDescription && setDescription(value);
    }

    setDisable && setDisable(!isValid || !dirty);
  };

  const style = isValid
    ? { width: "100%" }
    : { width: "100%", border: `1px solid ${theme.palette.secondary.main}` };

  React.useEffect(() => {
    setDisable && setDisable(!isValid || !dirty);
  }, []);

  return (
    <>
      <AnalyticsComp
        title="title"
        direction="Vertical"
        content={
          <>
            <Input
              name="title"
              style={style}
              error={Boolean(helperTextTitle)}
              value={title}
              onChange={handleTitleDescChange}
              required
              autoFocus
              fullWidth
            />
            <ErrorMessage name="title" />
          </>
        }
      />
      <AnalyticsComp
        title="description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <>
            <TextareaAutosize
              name="description"
              style={{ height: 400, width: "100%" }}
              minRows={20}
              value={description}
              onChange={handleTitleDescChange}
            />
            <ErrorMessage name="description" />
          </>
        }
      />
    </>
  );
};

export default TitleAndDescription;
