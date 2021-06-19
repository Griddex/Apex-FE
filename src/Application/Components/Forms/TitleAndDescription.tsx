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
  handleChange,
}: ITitleAndDescriptionFormProps) => {
  console.log(
    "Logged output --> ~ file: TitleAndDescription.tsx ~ line 15 ~ title",
    title
  );
  const helperText = touched && touched.title ? errors && errors.title : "";

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
  };

  return (
    <div>
      <AnalyticsComp
        title="title"
        direction="Vertical"
        content={
          <Input
            name="title"
            style={{ width: "100%" }}
            error={Boolean(helperText)}
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
            rowsMin={20}
            value={description}
            onChange={handleTitleDescChange}
          />
        }
      />
    </div>
  );
};

export default TitleAndDescription;
