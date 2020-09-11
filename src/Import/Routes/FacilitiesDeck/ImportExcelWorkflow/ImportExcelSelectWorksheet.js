import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileIconService from "./../../../Services/FileIconService";
import { persistSelectedWorksheetAction } from "./../../../Redux/Actions/ImportActions";
import Progress from "react-circle-progress-bar_no-css";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import sizeConversions from "./../../../../Application/Utils/SizeConversions";

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
    justifyContent: "space-evenly",
    height: "75%",
    width: "80%",
    // borderBottom: "1px solid #969498",
  },
  fileContent: {
    display: "flex",
    justifyContent: "space-between",
    height: "25%",
    width: "80%",
  },
  selectWorksheet: {
    height: 55,
    width: 400,
  },
  analyticsComp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  analyticsTitle: {
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderLeftWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 5,
    lineHeight: "100%",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
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

const ImportExcelSelectWorksheet = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const importData = useSelector((state) => state.importReducer);

  const {
    fileLastModified,
    fileName,
    fileSize,
    fileType,
    fileAuthor,
    fileCreated,
  } = importData;
  console.log(
    "Logged output -->: ImportExcelSelectWorksheet -> fileSize",
    fileSize
  );
  const workSheetNames = useSelector(
    (state) => state.importReducer.workSheetNames
  );
  const selectedWorksheetName = useSelector(
    (state) => state.importReducer.selectedWorksheetName
  );

  const [worksheetName, setWorksheetName] = React.useState(
    selectedWorksheetName
  );
  const handleChange = (event) => {
    setWorksheetName(event.target.value);
    persistSelectedWorksheetAction(event.target.value);
  };

  const AnalyticsComp = ({ title, content }) => {
    return (
      <div className={classes.analyticsComp}>
        <Typography className={classes.analyticsTitle}>{title}</Typography>
        <div>{content}</div>
      </div>
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
        onChange={handleChange}
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
        background={"#969498"}
        ballStrokeWidth={12}
      />
    );
  };
  return (
    <Container className={classes.container} maxWidth="md" fixed disableGutters>
      <div className={classes.fileHeader}>
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
        <AnalyticsComp title="File Name" content={fileName} />
        <AnalyticsComp title="Select Worksheet" content={<SelectWorksheet />} />
      </div>
      <Divider />
      <div className={classes.fileContent}>
        <Grid container spacing={3}>
          <Grid item container xs={12} sm={4}>
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
          <Grid item container direction="column" xs={12} sm={8}>
            <Grid item xs>
              <AnalyticsComp title="File Author" content={fileAuthor} />
            </Grid>
            <Grid item container xs>
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
      </div>
    </Container>
  );
};

export default ImportExcelSelectWorksheet;
