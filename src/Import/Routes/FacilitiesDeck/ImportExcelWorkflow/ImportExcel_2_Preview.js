import {
  makeStyles,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React from "react";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import TimelineIcon from "@material-ui/icons/Timeline";
import LaunchIcon from "@material-ui/icons/Launch";
import { useSelector } from "react-redux";
import * as xlsx from "xlsx";
import MaterialUITable from "./../../../../Application/Components/MaterialUITable";

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

function getDataRows(sheetData) {
  const headerRow = getHeadCells(sheetData);

  const bodyData = sheetData.slice(2, 349);
  const bodyRows = bodyData.map((rowArray, i) => {
    const bodyRow = Object.fromEntries(
      headerRow.map((r, j) => {
        const rowArrayWithSN = [i + 1, ...rowArray];
        return [r.id, rowArrayWithSN[j]];
      })
    );
    return bodyRow;
  });

  return bodyRows;
}

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

const ImportExcel_2_Preview = (props) => {
  const classes = useStyles();
  const wb = useSelector((state) => state.ImportReducer.AcceptedFile);
  const sheetName = useSelector(
    (state) => state.ImportReducer.SelectedWorksheetName
  );
  const selectedSheet = wb.Sheets[sheetName];
  const sheetData = xlsx.utils.sheet_to_json(selectedSheet, { header: 1 });

  const headerRow = getHeadCells(sheetData);
  const dataRows = getDataRows(sheetData);

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
      <MaterialUITable
        className={classes.paper2}
        headerRow={headerRow}
        dataRows={dataRows}
      />
    </div>
  );
};

ImportExcel_2_Preview.propTypes = {};

export default ImportExcel_2_Preview;
