import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Button, DialogActions, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { utils, WorkBook } from "xlsx";
import { persistWorksheetAction } from "../../../Import/Redux/Actions/InputActions";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import { hideSpinnerAction } from "../../Redux/Actions/UISpinnerActions";
import { workflowNextAction } from "../../Redux/Actions/WorkflowActions";
import { RootState } from "../../Redux/Reducers/AllReducers";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import ApexListSingle from "../List/ApexListSingle";
import { IInputWorkflows, ReducersType } from "../Workflows/WorkflowTypes";
import { ButtonProps, DialogStuff } from "./DialogTypes";

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const useStyles = makeStyles(() => ({
  listDialogContent: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 5,
  },
  listBorder: {
    height: 200,
    overflow: "auto",
    border: "1px solid #F7F7F7",
  },
}));

const SelectWorksheetDialog: React.FC<DialogStuff> = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const {
    title,
    show,
    maxWidth,
    iconType,
    contentList,
    workflowProcess,
    workflowCategory,
    reducer,
    inputWorkbook,
  } = props;

  const wc = workflowCategory as IInputWorkflows["wkCy"];
  const wp = workflowProcess as IInputWorkflows["wkPs"];
  const reducerDefined = reducer as NonNullable<ReducersType>;

  const workflowSelector = createDeepEqualSelector(
    (state: RootState) => state.workflowReducer[wc][wp],
    (workflowProps) => workflowProps
  );

  const { skipped, isStepSkipped, activeStep, steps } =
    useSelector(workflowSelector);

  const [selectedWorksheetName, setSelectedWorksheetName] = React.useState("");

  const selectWorksheetDialogContent = () => {
    return (
      <div className={classes.listDialogContent}>
        <Typography variant="body1" style={{ marginTop: 10, marginBottom: 10 }}>
          Workbook contains more than one worksheet. Please select the worksheet
          that contains the Facilities Deck
        </Typography>
        <ApexListSingle
          contentList={contentList}
          selectedName={selectedWorksheetName}
          apexListemAction={(name: string) => {
            setSelectedWorksheetName(name);
            dispatch(persistWorksheetAction(reducerDefined, name, [], wp));
          }}
          Icon={DescriptionOutlinedIcon}
        />
      </div>
    );
  };

  const persistSelectedWorksheet = (workbook: WorkBook) => {
    const selectedWorksheetDataXLSX = (workbook as WorkBook).Sheets[
      selectedWorksheetName
    ];

    let selectedWorksheetData = utils.sheet_to_json<Record<string, React.Key>>(
      selectedWorksheetDataXLSX
    );

    if (selectedWorksheetData.length === 0) {
      enqueueSnackbar("Empty worksheet!", { persist: false, variant: "error" });
      return;
    }

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

      return { ...row } as any;
    }) as [];

    selectedWorksheetData = [...tableDataTemp];

    dispatch(
      persistWorksheetAction(
        reducerDefined,
        selectedWorksheetName,
        selectedWorksheetData,
        wp
      )
    );

    dispatch(
      workflowNextAction(
        skipped as Set<number>,
        isStepSkipped as (step: number) => boolean,
        activeStep,
        steps,
        "Loading",
        wp,
        wc
      )
    );

    dispatch(hideDialogAction());
  };

  const selectWorksheetDialogActions = (inputWorkbook: WorkBook) => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
      {
        title: "Okay",
        variant: "contained",
        color: "primary",
        startIcon: <DoneOutlinedIcon />,
        handleAction: () => {
          if (selectedWorksheetName === "")
            enqueueSnackbar("Select a worksheet", {
              persist: false,
              variant: "error",
            });
          else persistSelectedWorksheet(inputWorkbook);
        },
      },
    ];

    return buttonsData.map((button, i) => {
      const { variant, color, startIcon, handleAction, title } = button;

      return (
        <Button
          key={i}
          variant={variant}
          color={color}
          startIcon={startIcon}
          onClick={() => handleAction && handleAction(i as number)}
          disabled={title === "Okay" && (selectedWorksheetName ? false : true)}
        >
          {title}
        </Button>
      );
    });
  };

  React.useEffect(() => {
    dispatch(hideSpinnerAction());
  }, []);

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={show as boolean}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle
        onClose={() => dispatch(hideDialogAction())}
        iconType={iconType}
      >
        <div>{title}</div>
      </DialogTitle>
      <DialogContent dividers>
        {selectWorksheetDialogContent()}
        <Divider />
      </DialogContent>
      <DialogActions>
        {selectWorksheetDialogActions(inputWorkbook)}
      </DialogActions>
    </Dialog>
  );
};
export default SelectWorksheetDialog;
