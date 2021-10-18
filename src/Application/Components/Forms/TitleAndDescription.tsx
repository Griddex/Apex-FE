import { alpha, Input, TextareaAutosize, Theme, useTheme } from "@mui/material";
import { ErrorMessage, FormikProps } from "formik";
import React from "react";
import AnalyticsComp from "../Basic/AnalyticsComp";
import {
  ITitleAndDescriptionFormProps,
  ITitleAndDescriptionFormValues,
} from "./FormTypes";
import makeStyles from "@mui/styles/makeStyles";
import grey from "@mui/material/colors/grey";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${grey[500]}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
    "&:active": {
      outline: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
}));

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
  const classes = useStyles();

  const { title, description } = values;

  const helperTextTitle =
    touched && touched.title ? errors && errors.title : "";

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
              className={classes.root}
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
              className={classes.root}
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
