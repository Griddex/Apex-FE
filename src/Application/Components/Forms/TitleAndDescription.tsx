import { alpha, Input, TextareaAutosize, Theme, useTheme } from "@mui/material";
import grey from "@mui/material/colors/grey";
import makeStyles from "@mui/styles/makeStyles";
import { FormikProps } from "formik";
import React from "react";
import AnalyticsComp from "../Basic/AnalyticsComp";
import {
  ITitleAndDescriptionFormProps,
  ITitleAndDescriptionFormValues,
} from "./FormTypes";

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
  storedTitles,
}: ITitleAndDescriptionFormProps &
  FormikProps<ITitleAndDescriptionFormValues>) => {
  const theme = useTheme();
  const classes = useStyles();

  const [style, setStyle] = React.useState({
    width: "100%",
  } as React.CSSProperties);

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

    const alreadyExists = storedTitles
      ?.map((v) => v.toLowerCase())
      .includes(value.toLowerCase());

    if (alreadyExists) setDisable && setDisable(true);
    else setDisable && setDisable(false);

    if (alreadyExists)
      setStyle({
        width: "100%",
        outline: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      });
    else setStyle({ width: "100%" });
  };

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
            <div style={{ height: 24, color: theme.palette.secondary.main }}>
              {Object.keys(style).includes("outline") && "Title already exists"}
            </div>
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
          </>
        }
      />
    </>
  );
};

export default TitleAndDescription;
