import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  ClickAwayListener,
  DialogActions,
  Divider,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
import React from "react";
import { Column } from "react-data-griddex";
import { useDispatch } from "react-redux";
import { SizeMe } from "react-sizeme";
import MainTitle from "../../../Application/Components/Basic/MainTitle";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import {
  ButtonProps,
  DialogStuff,
  IDialogData,
} from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import ApexGrid from "../../../Application/Components/Table/ReactDataGrid/ApexGrid";
import {
  IRawRow,
  ISize,
} from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { ITableButtonsProps } from "../../../Application/Components/Table/TableButtonsTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const useStyles = makeStyles((theme: Theme) => ({
  economicParameterDialogContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

const EconomicsParametersDialog: React.FC<DialogStuff> = (
  props: DialogStuff
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { title, show, maxWidth, iconType, dialogData } = props;
  const { columns, rows } = dialogData as IDialogData<IRawRow>;
  const [sRow, setSRow] = React.useState(-1);

  const tableButtons: ITableButtonsProps = {
    showExtraButtons: false,
    extraButtons: () => <div></div>,
  };

  const getApexGridProps = (size: ISize) => ({
    columns: columns,
    rows: rows,
    tableButtons: tableButtons,
    size: size,
    autoAdjustTableDim: true,
    showTableHeader: true,
    showTablePagination: true,
  });

  const economicsParametersDialogContent = (
    columns: Column<IRawRow>[],
    rows: IRawRow[]
  ) => {
    return (
      <ClickAwayListener onClickAway={() => setSRow && setSRow(-1)}>
        <div className={classes.economicParameterDialogContent}>
          <MainTitle title="Economics Parameters 1" />
          <div style={{ width: "100%", height: "500px" }}>
            <SizeMe monitorHeight refreshRate={32}>
              {({ size }) => (
                <ApexGrid apexGridProps={getApexGridProps(size)} />
              )}
            </SizeMe>
          </div>
        </div>
      </ClickAwayListener>
    );
  };

  const economicsParametersDialogActions = () => {
    const buttonsData: ButtonProps[] = [
      {
        title: "Cancel",
        variant: "contained",
        color: "secondary",
        startIcon: <CloseOutlinedIcon />,
        handleAction: () => dispatch(hideDialogAction()),
      },
    ];

    return buttonsData.map((button, i) => (
      <Button
        key={i}
        variant={button.variant}
        color={button.color}
        startIcon={button.startIcon}
        onClick={() =>
          button?.handleAction && button?.handleAction(i as number)
        }
      >
        {button.title}
      </Button>
    ));
  };

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
        {economicsParametersDialogContent(columns, rows)}
        <Divider />
      </DialogContent>
      <DialogActions>{economicsParametersDialogActions()}</DialogActions>
    </Dialog>
  );
};
export default EconomicsParametersDialog;
