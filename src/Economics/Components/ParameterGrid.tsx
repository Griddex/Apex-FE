import { makeStyles, useTheme } from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ExposureNeg1TwoToneIcon from "@material-ui/icons/ExposureNeg1TwoTone";
import PlusOneTwoToneIcon from "@material-ui/icons/PlusOneTwoTone";
import React from "react";
import AnalyticsTitle from "../../Application/Components/Basic/AnalyticsTitle";

const useStyles = makeStyles((theme) => ({
  primaryButton: {
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: "bold",
    height: 30,
  },
  secondaryButton: {
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: "bold",
    height: 30,
  },
  parameterGridControl: {
    display: "flex",
    flexDirection: "column",
    // "& div:nth-child(2)": {
    //   width: "100%",
    // },
  },
  gridIcons: {
    display: "flex",
    alignSelf: "flex-end",
    "& > *": { marginTop: "2px", marginLeft: "2px" },
  },
}));

const ParameterGrid = ({ parameter }: { parameter: string }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [rowCount, setRowCount] = React.useState(1);
  const columnCount = 7;
  const columnWidth = 80;
  const width = columnCount * columnWidth;
  const initialRowHeight = 30;
  const [rowHeight, setRowHeight] = React.useState(initialRowHeight);

  // function cellRenderer(props: GridCellProps) {
  //   const { key, style } = props;

  //   const enhancedStyle = {
  //     ...style,
  //     border: "1px solid #999",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: `${initialRowHeight}px`,
  //   };
  //   return <input type="text" key={key} style={enhancedStyle} />;
  // }

  return (
    <div className={classes.parameterGridControl}>
      <div style={{ display: "flex", marginBottom: "2px" }}>
        <AnalyticsTitle title={parameter} />
        <div className={classes.gridIcons}>
          <PlusOneTwoToneIcon
            style={{ border: `2px solid ${theme.palette.primary.main}` }}
            onClick={() => {
              setRowCount(rowCount + 1);
              setRowHeight((prev) => prev + initialRowHeight);
            }}
          />
          <ExposureNeg1TwoToneIcon
            style={{ border: `2px solid ${theme.palette.secondary.main}` }}
            onClick={() => {
              setRowCount(rowCount - 1);
              setRowHeight((prev) => prev - initialRowHeight);
            }}
          />
          <DeleteForeverTwoToneIcon
            style={{ border: `2px solid ${theme.palette.secondary.main}` }}
            onClick={() => {
              setRowCount(1);
              setRowHeight((prev) => initialRowHeight);
            }}
          />
          <EditTwoToneIcon
            style={{ border: `2px solid ${theme.palette.primary.main}` }}
          />
        </div>
      </div>
      {/* <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={rowHeight}
        rowCount={rowCount}
        rowHeight={initialRowHeight}
        width={width}
      /> */}
    </div>
  );
};

export default ParameterGrid;
