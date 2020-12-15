import { Button, makeStyles, TextField, useTheme } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import ReactDataGrid, { Column } from "react-data-griddex";
import { Grid, GridCellProps } from "react-virtualized";
import PlusOneTwoToneIcon from "@material-ui/icons/PlusOneTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ExposureNeg1TwoToneIcon from "@material-ui/icons/ExposureNeg1TwoTone";

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
    //   flexGrow: 1,
    // },
  },
  gridIcons: {
    display: "flex",
    alignSelf: "flex-end",
    "& > *": { marginTop: "2px", marginLeft: "2px" },
  },
}));

const ParameterGrid = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [rowCount, setRowCount] = React.useState(1);
  const columnCount = 6;
  const columnWidth = 80;
  const width = columnCount * columnWidth;
  const initialRowHeight = 30;
  const [rowHeight, setRowHeight] = React.useState(initialRowHeight);

  function cellRenderer(props: GridCellProps) {
    const { key, style } = props;

    const enhancedStyle = {
      ...style,
      border: "1px solid #999",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${columnWidth}px`,
      height: `${initialRowHeight}px`,
    };
    return (
      // <div key={key} style={enhancedStyle}>
      //   <TextField
      //     style={{
      //       display: "flex",
      //       alignItems: "center",
      //       justifyContent: "center",
      //       width: "100%",
      //       height: "100%",
      //     }}
      //   ></TextField>
      // </div>
      <input type="text" key={key} style={enhancedStyle} />
    );
  }

  const data: Record<string, React.Key>[] = [];
  const columns: Column<Record<string, React.ReactText>>[] | undefined = [
    { key: "par1", name: "ID" },
    { key: "par2", name: "Title" },
    { key: "par3", name: "Title" },
    { key: "par4", name: "Title" },
    { key: "par5", name: "Title" },
  ];
  // const rows: ReactDataGrid.Column<Record<string, number>>[] | undefined = [
  //   { par1: 0, par2: 1, par3: 2, par4: 3, par5: 4 },
  // ];

  return (
    <div className={classes.parameterGridControl}>
      {/* <ReactDataGrid
        columns={columns}
        rowGetter={(i: number) => data[i]}
        rowsCount={rowCount}
        minHeight={rowHeight}
        rows={rows}
      /> */}
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
      <Grid
        cellRenderer={cellRenderer}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={rowHeight}
        rowCount={rowCount}
        rowHeight={initialRowHeight}
        width={width}
      />
    </div>
  );
};

export default ParameterGrid;
