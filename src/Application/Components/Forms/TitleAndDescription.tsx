import { Input, TextareaAutosize } from "@material-ui/core";
import React from "react";
import AnalyticsComp from "../Basic/AnalyticsComp";
import { ITitleAndDescriptionFormProps } from "./FormTypes";

const TitleAndDescription = ({
  title,
  setTitle,
  description,
  setDescription,
  errors,
  touched,
  setFieldTouched,
  handleChange,
}: ITitleAndDescriptionFormProps) => {
  const helperTextTitle =
    touched && touched.title ? errors && errors.title : "";
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 17 ~ helperTextTitle",
    helperTextTitle
  );
  const helperTextDescription =
    touched && touched.description ? errors && errors.description : "";

  const handleTitleDescChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleChange && handleChange(event);
    const { name, value } = event.target;

    if (name === "title") {
      setTitle && setTitle(value);
      setFieldTouched && setFieldTouched("title", true, true);
    } else {
      setDescription && setDescription(value);
    }
  };

  return (
    <>
      <AnalyticsComp
        title="title"
        direction="Vertical"
        content={
          <Input
            name="title"
            style={{ width: "100%" }}
            error={Boolean(helperTextTitle)}
            value={title}
            onChange={handleTitleDescChange}
            required
            autoFocus
            fullWidth
          />
        }
      />
      <AnalyticsComp
        title="description"
        direction="Vertical"
        containerStyle={{ marginTop: 30 }}
        content={
          <TextareaAutosize
            name="description"
            style={{ height: 400, width: "100%" }}
            minRows={20}
            value={description}
            onChange={handleTitleDescChange}
          />
        }
      />
    </>
  );
};

export default TitleAndDescription;
