import { Button, Divider, makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import TimelineIcon from "@material-ui/icons/Timeline";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AutoSizer, Column, Table } from "react-virtualized";
import ToTitleCase from "../../../../Application/Utils/ToTitleCase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "100%",
    "& > *": { margin: theme.spacing(2) },
  },

  paper1: {
    display: "flex",
    height: "15%",
    // padding: theme.spacing(1),
    "& > *": { margin: theme.spacing(2) },
  },
  paper2: {
    display: "flex",
    flexDirection: "column",
    height: "85%",
    padding: theme.spacing(1),
    // alignItems: "center",
    // justifyContent: "center",
  },
  table: {
    height: "inherit",
    width: "inherit",
    alignItems: "center",
    justifyContent: "center",
  },
  gridroot: { margin: theme.spacing(1) },
  gridItem: {
    "& > *": {
      alignSelf: "center",
    },
  },
  alignCenter: {
    alignSelf: "center",
  },
  alignTextCenter: {
    textAlign: "center",
  },
}));

/*START HERE */

// function getDataRows(sheetData) {
//   const headerRow = getHeadCells(sheetData);

//   const bodyData = sheetData.slice(2, 349);
//   const bodyRows = bodyData.map((rowArray, i) => {
//     const bodyRow = Object.fromEntries(
//       headerRow.map((r, j) => {
//         const rowArrayWithSN = [i + 1, ...rowArray];
//         return [r.id, rowArrayWithSN[j]];
//       })
//     );
//     return bodyRow;
//   });

//   return bodyRows;
// }

function getHeadCells(sheetData) {
  const headerRow = sheetData[0];
  const headerRowSniff = sheetData[2];
  const headCells = headerRow.map((headName, i) => {
    return {
      id: headName.replace(/\s+/g, "").toLowerCase(),
      numeric: !isNaN(headerRowSniff[i]),
      disablePadding: true,
      label: headName,
    };
  });

  const snheader = {
    id: "sn",
    numeric: true,
    disablePadding: true,
    label: "S/N",
  };
  const headCellsWithSN = [snheader, ...headCells];

  return headCellsWithSN;
}

const ImportExcelPreview = (props) => {
  const classes = useStyles();

  const [columnWidths, setColumnWidths] = useState([]);

  const headerData = useSelector(
    (state) => state.importReducer.tableHeaderData
  );
  const bodyData = useSelector((state) => state.importReducer.tableBodyData);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper1}>
        <Grid container className={classes.gridroot} spacing={1}>
          <Grid item container xs direction="column">
            <Typography variant="overline">Summary</Typography>
            <Typography variant="caption">No. of Columns</Typography>
            <Typography variant="caption">No. of Rows</Typography>
            <Typography variant="caption">No. of Cells with blanks</Typography>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            justify="space-between"
            direction="column"
            xs={3}
          >
            <Grid item className={classes.alignTextCenter}>
              <Typography variant="overline">Validation Checks</Typography>
            </Grid>
            <Grid item className={classes.alignTextCenter}>
              <Button variant="outlined" endIcon={<BeenhereIcon />}>
                Run
              </Button>
            </Grid>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            container
            justify="space-between"
            direction="column"
            xs={3}
          >
            <Grid item className={classes.alignTextCenter}>
              <Typography variant="overline">Visual Checks</Typography>
            </Grid>
            <Grid item className={classes.alignTextCenter}>
              <Button variant="outlined" endIcon={<TimelineIcon />}>
                Run
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.table}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              width={width}
              headerHeight={30}
              rowHeight={30}
              rowCount={bodyData.length}
              rowGetter={({ index }) => bodyData[index]}
            >
              {headerData &&
                headerData.map((key) => {
                  return (
                    <Column
                      className={classes.column}
                      key={key}
                      label={ToTitleCase(key)}
                      dataKey={key}
                      width={columnWidths[key] * width}
                      // headerRenderer={headerRenderer}
                      // noRowsRenderer={_noRowsRenderer}
                      // overscanRowCount={overscanRowCount}
                      // rowClassName={_rowClassName}
                      // rowHeight={useDynamicRowHeight ? _getRowHeight : rowHeight}
                      // rowGetter={rowGetter}
                      // rowCount={rowCount}
                      // scrollToIndex={scrollToIndex}
                      // sort={_sort}
                      // sortBy={sortBy}
                      // sortDirection={sortDirection}
                    />
                  );
                })}
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

ImportExcelPreview.propTypes = {};

export default ImportExcelPreview;
