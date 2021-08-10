import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValueType } from "react-select";
import * as xlsx from "xlsx";
import AnalyticsComp from "../../../../Application/Components/Basic/AnalyticsComp";
import ApexSelectRS from "../../../../Application/Components/Selects/ApexSelectRS";
import {
  ISelectOption,
  TSelectOptions,
} from "../../../../Application/Components/Selects/SelectItemsType";
import { IAllWorkflows } from "../../../../Application/Components/Workflows/WorkflowTypes";
import { hideSpinnerAction } from "../../../../Application/Redux/Actions/UISpinnerActions";
import { RootState } from "../../../../Application/Redux/Reducers/AllReducers";
import formatDate from "../../../../Application/Utils/FormatDate";
import generateSelectOptions from "../../../../Application/Utils/GenerateSelectOptions";
import sizeConversions from "../../../../Application/Utils/SizeConversions";
import { IUnitSettingsData } from "../../../../Settings/Redux/State/UnitSettingsStateTypes";
import { persistWorksheetAction } from "../../../Redux/Actions/InputActions";
import FileIconService from "../../../Services/FileIconService";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    minWidth: theme.breakpoints.values["sm"],
    alignItems: "center",
    justifyContent: "space-evenly",
    border: "1px solid #707070",
    boxShadow: theme.shadows[2],
    backgroundColor: "#FFF",
  },
  fileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "65%",
    width: "100%",
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
    width: 120,
    height: 120,
  },
}));

const SelectSheet = ({
  wrkflwPrcss,
  reducer,
  inputWorkbook,
}: IAllWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const wc = "inputDataWorkflows";
  const wp = wrkflwPrcss;

  const {
    fileLastModified,
    fileName,
    fileSize,
    fileType,
    fileAuthor,
    fileCreated,
  } = useSelector((state: RootState) => state[reducer][wc][wp]);

  const { dayFormat, monthFormat, yearFormat } = useSelector(
    (state: RootState) => state.unitSettingsReducer
  ) as IUnitSettingsData;

  const { workSheetNames, selectedWorksheetName } = useSelector(
    (state: RootState) => state[reducer][wc][wp]
  );

  const [worksheetName, setWorksheetName] = React.useState(
    selectedWorksheetName
  );

  const handleSelectChange = (option: ValueType<ISelectOption, false>) => {
    const selectedWorksheetName = option && option.label;
    const sWN = selectedWorksheetName as string;

    setWorksheetName(sWN);

    const selectedWorksheetDataXLSX = (inputWorkbook as xlsx.WorkBook).Sheets[
      sWN
    ];
    const selectedWorksheetData = xlsx.utils.sheet_to_json<
      Record<string, React.Key>
    >(selectedWorksheetDataXLSX);

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
    } else {
      enqueueSnackbar("Worksheet loaded!", {
        persist: false,
        variant: "success",
      });
    }

    dispatch(persistWorksheetAction(reducer, sWN, selectedWorksheetData, wp));
  };

  const SelectWorksheet = () => {
    const worksheetNameOptions: TSelectOptions =
      generateSelectOptions(workSheetNames);

    const worksheetNameOption = generateSelectOptions([worksheetName])[0];

    return (
      <ApexSelectRS
        className={classes.selectWorksheet}
        containerWidth={400}
        valueOption={worksheetNameOption}
        data={worksheetNameOptions}
        handleSelect={handleSelectChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
      />
    );
  };

  const FileSizeProgressCircle = () => {
    const fileSizePercent = Math.round(((fileSize as number) * 100) / 10485760);

    return (
      <CircularProgressbar
        className={classes.fileSizeProgress}
        value={fileSizePercent}
        text={`${fileSizePercent}%`}
        strokeWidth={3}
        styles={{
          path: {
            stroke:
              fileSizePercent >= 100
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            strokeLinecap: "butt",
          },
          text: {
            fill: theme.palette.primary.main,
            fontSize: "16px",
          },
        }}
      />
    );
  };

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, [dispatch]);

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
            direction="Vertical"
          />
        </Grid>
        <Grid item xs>
          <AnalyticsComp
            title="File Name"
            content={fileName}
            direction="Vertical"
          />
        </Grid>
        <Grid item xs>
          <AnalyticsComp
            title="Select Worksheet"
            content={<SelectWorksheet />}
            direction="Vertical"
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
              direction="Vertical"
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
            <AnalyticsComp
              title="File Author"
              content={fileAuthor}
              direction="Vertical"
            />
          </Grid>
          <Grid item container xs spacing={1}>
            <Grid item xs>
              <AnalyticsComp
                title="File Created"
                content={formatDate(
                  new Date(fileCreated),
                  dayFormat,
                  monthFormat,
                  yearFormat
                ).toString()}
                direction="Vertical"
              />
            </Grid>
            <Grid item xs>
              <AnalyticsComp
                title="File Last Modified"
                content={formatDate(
                  new Date(fileLastModified),
                  dayFormat,
                  monthFormat,
                  yearFormat
                ).toString()}
                direction="Vertical"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectSheet;
