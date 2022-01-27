import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { OnChangeValue } from "react-select";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { utils, WorkBook } from "xlsx";
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
import { persistWorksheetAction } from "../../../Redux/Actions/InputActions";
import FileIconService from "../../../Services/FileIconService";

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
  fileImage: {
    width: 115,
    height: 139,
  },
  fileSizeProgress: {
    width: 120,
    height: 120,
  },
}));

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const dayFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.dayFormat,
  (data) => data
);
const monthFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.monthFormat,
  (data) => data
);
const yearFormatSelector = createDeepEqualSelector(
  (state: RootState) => state.unitSettingsReducer.yearFormat,
  (data) => data
);

const SelectSheet = ({
  wrkflwCtgry,
  wrkflwPrcss,
  reducer,
  inputWorkbook,
}: IAllWorkflows) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const wc = wrkflwCtgry;
  const wp = wrkflwPrcss;

  const fileLastModifiedSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileLastModified"],
    (data) => data
  );
  const fileNameSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileName"],
    (data) => data
  );
  const fileSizeSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileSize"],
    (data) => data
  );
  const fileTypeSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileType"],
    (data) => data
  );
  const fileAuthorSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileAuthor"],
    (data) => data
  );
  const fileCreatedSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["fileCreated"],
    (data) => data
  );
  const workSheetNamesSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["workSheetNames"],
    (data) => data
  );
  const selectedWorksheetNameSelector = createDeepEqualSelector(
    (state: RootState) => state[reducer][wc][wp]["selectedWorksheetName"],
    (data) => data
  );

  const fileLastModified = useSelector(fileLastModifiedSelector);
  const fileName = useSelector(fileNameSelector);
  const fileSize = useSelector(fileSizeSelector);
  const fileType = useSelector(fileTypeSelector);
  const fileAuthor = useSelector(fileAuthorSelector);
  const fileCreated = useSelector(fileCreatedSelector);
  const workSheetNames = useSelector(workSheetNamesSelector);
  const selectedWorksheetName = useSelector(selectedWorksheetNameSelector);

  const dayFormat = useSelector(dayFormatSelector);
  const monthFormat = useSelector(monthFormatSelector);
  const yearFormat = useSelector(yearFormatSelector);

  const [worksheetName, setWorksheetName] = React.useState(
    selectedWorksheetName
  );

  const handleSelectChange = (option: OnChangeValue<ISelectOption, false>) => {
    const sWN = option?.label as string;

    setWorksheetName(sWN);

    const selectedWorksheetDataXLSX = (inputWorkbook as WorkBook).Sheets[sWN];

    let selectedWorksheetData = utils.sheet_to_json<Record<string, React.Key>>(
      selectedWorksheetDataXLSX
    );

    const tableDataTemp = selectedWorksheetData.map((row: any, i: number) => {
      if (i > 0) {
        const keysData = Object.keys(row);
        const nRows = keysData.length;
        let iRow = 0;

        for (iRow = 0; iRow < nRows; iRow++) {
          if (row[keysData[iRow]] instanceof Date) {
            const date = row[keysData[iRow]] as Date;

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            row[keysData[iRow]] = `${day}/${month}/${year}` as string;
          }
        }
      }

      return row;
    }) as [];

    selectedWorksheetData = [...tableDataTemp];

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
        containerWidth={400}
        valueOption={worksheetNameOption}
        data={worksheetNameOptions}
        handleSelect={handleSelectChange}
        isSelectOptionType={true}
        menuPortalTarget={document.body}
        containerHeight={40}
      />
    );
  };

  const FileSizeProgressCircle = () => {
    const fileSizePercentNumber = ((fileSize as number) * 100) / 10485760;

    let fileSizePercent: number;
    if (fileSizePercentNumber < 1)
      fileSizePercent = Number(fileSizePercentNumber.toFixed(2));
    else if (fileSizePercentNumber >= 1 && fileSizePercentNumber < 10)
      fileSizePercent = Number(fileSizePercentNumber.toFixed(1));
    else fileSizePercent = Number(fileSizePercentNumber.toFixed(0));

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
                {`${sizeConversions(fileSize)}`}
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
