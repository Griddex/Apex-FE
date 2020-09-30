import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import React from "react";
import Progress from "react-circle-progress-bar_no-css";
import { useDispatch, useSelector } from "react-redux";
import * as xlsx from "xlsx";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import sizeConversions from "../../../../Application/Utils/SizeConversions";
import { persistWorksheetAction } from "../../../Redux/Actions/ImportActions";
import FileIconService from "../../../Services/FileIconService";
import { useSnackbar } from "notistack";
import AnalyticsComp from "./../../../../Application/Components/Basic/AnalyticsComp";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1px solid #707070",
    backgroundColor: "#FFF",
  },
  fileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "65%",
    width: "100%",
    // borderBottom: "1px solid #969498",
    // borderBottom: "1px solid #707070",
    padding: 20,
  },
  fileContent: {
    display: "flex",
    justifyContent: "space-between",
    height: "35%",
    width: "100%",
    padding: 20,
  },
  divider: {
    margin: 20,
  },
  selectWorksheet: {
    height: 55,
    width: 400,
  },
  fileImage: {
    width: 115,
    height: 139,
  },
  fileSizeProgress: {
    width: 145,
    height: 145,
  },
}));

const SelectSheet = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const importData = useSelector((state) => state.importReducer);

  React.useEffect(() => {
    // setTimeout(() => dispatch(hideSpinnerAction()), 4000);
    dispatch(hideSpinnerAction());
  }, [dispatch]);

  const {
    fileLastModified,
    fileName,
    fileSize,
    fileType,
    fileAuthor,
    fileCreated,
  } = importData;

  const { workSheetNames, selectedWorksheetName, file } = useSelector(
    (state) => state.importReducer
  );

  const [worksheetName, setWorksheetName] = React.useState(
    selectedWorksheetName
  );
  const handleSelectChange = (event) => {
    const selectedWorksheetName = event.target.value;

    setWorksheetName(selectedWorksheetName);

    const selectedWorksheetDataXLSX = file.Sheets[selectedWorksheetName];
    const selectedWorksheetData = xlsx.utils.sheet_to_json(
      selectedWorksheetDataXLSX
    );

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: true, variant: "error" });
    }

    dispatch(
      persistWorksheetAction(selectedWorksheetName, selectedWorksheetData)
    );
  };

  const SelectWorksheet = () => {
    return (
      <TextField
        className={classes.selectWorksheet}
        id="outlined-select-worksheet"
        select
        label=""
        value={worksheetName}
        onChange={handleSelectChange}
        variant="outlined"
      >
        {workSheetNames.map((worksheetName) => (
          <MenuItem key={worksheetName} value={worksheetName}>
            {worksheetName}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  const FileSizeProgressCircle = () => {
    const fileSizePercent = Math.round((fileSize * 100) / 10485760);
    return (
      <Progress
        className={classes.fileSizeProgress}
        progress={fileSizePercent}
        strokeWidth={3}
        reduction={0}
        background={
          fileSizePercent >= 100 ? `${theme.palette.secondary.main}` : "#969498"
        }
        ballStrokeWidth={12}
      />
    );
  };

  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <Grid container spacing={3} className={classes.fileHeader}>
        <Grid item xs>
          <AnalyticsComp
            title="File Type"
            content={
              <img
                className={classes.fileImage}
                src={FileIconService(fileType)}
                alt="Analytics diagram"
              />
            }
          />
        </Grid>
        <Grid item xs>
          <AnalyticsComp title="File Name" content={fileName} />
        </Grid>
        <Grid item xs>
          <AnalyticsComp
            title="Select Worksheet"
            content={<SelectWorksheet />}
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.fileContent}>
        <Grid item container xs={12} sm={3}>
          <Grid item xs>
            <AnalyticsComp
              title="File Size"
              content={<FileSizeProgressCircle />}
            />
          </Grid>
          <Grid item container direction="column" alignItems="flex-start" xs>
            <Grid item xs>
              <StorageOutlinedIcon />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2">
                {`${sizeConversions(fileSize, "MB")} of 10MB`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={9}>
          <Grid item xs>
            <AnalyticsComp title="File Author" content={fileAuthor} />
          </Grid>
          <Grid item container xs spacing={1}>
            <Grid item xs>
              <AnalyticsComp
                title="File Created"
                content={fileCreated.toString()}
              />
            </Grid>
            <Grid item xs>
              <AnalyticsComp
                title="File Last Modified"
                content={fileLastModified.toString()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectSheet;
