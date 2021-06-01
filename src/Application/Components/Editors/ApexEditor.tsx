import { Divider, Input, makeStyles } from "@material-ui/core";
import React from "react";
import { TUseState } from "../../Types/ApplicationTypes";
import AnalyticsComp from "../Basic/AnalyticsComp";
import ApexFlexStyle from "../Styles/ApexFlexStyle";

const useStyles = makeStyles({
  input: {
    width: 60,
    fontSize: 14,
  },
});

export interface IApexEditorRow {
  name: string;
  title: string;
  value: React.Key;
}
export interface IApexEditor {
  setEditedTableData: TUseState<any>;
  editorData: IApexEditorRow[];
  dividerPositions: number[];
}

const ApexEditor = ({
  setEditedTableData,
  editorData,
  dividerPositions,
}: IApexEditor) => {
  const classes = useStyles();

  const indexRef = React.useRef(0);
  const [formEditorData, setFormEditorData] = React.useState(editorData);
  const [shouldSubmit, setShouldSubmit] = React.useState(false);

  React.useEffect(() => {
    setEditedTableData(formEditorData);
  }, [shouldSubmit]);

  return (
    <>
      <ApexFlexStyle>
        {editorData.map((row, i) => {
          const { name, title, value } = row;
          indexRef.current = i;

          return (
            <AnalyticsComp
              title={title}
              direction="Vertical"
              containerStyle={{ marginTop: 20 }}
              content={
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={(event) => {
                    const { value } = event.target;

                    const editedRow = formEditorData[i];
                    formEditorData[i] = { ...editedRow, [name]: value };

                    setFormEditorData(formEditorData);
                  }}
                  // onBlur={handleBlur}
                  // inputProps={{
                  //   step: step,
                  //   min: min,
                  //   max: max,
                  //   type: "number",
                  //   "aria-labelledby": "input-slider",
                  // }}
                />
              }
            />
          );
        })}
      </ApexFlexStyle>
      {dividerPositions.includes(indexRef.current) && <Divider />}
    </>
  );
};

export default ApexEditor;
