import { DialogActions, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import ApexTableFilterer from "../../../Application/Components/TableFilterer/ApexTableFilterer";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const CostsRevenueAggregationDialog: React.FC<DialogStuff> = (
  props: DialogStuff
) => {
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    costsRevenueAgrregationProps,
  } = props;

  const {
    costsRevenueAggregationLevelOption,
    setCostsRevenueAggregationLevelOption,
    costsRevenueAggregationLevelOptions,
    rows,
    setRows,
    Icon,
  } = costsRevenueAgrregationProps;

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
        <ApexTableFilterer
          aggregationLevelOption={costsRevenueAggregationLevelOption}
          setAggregationLevelOption={setCostsRevenueAggregationLevelOption}
          aggregationLevelOptions={costsRevenueAggregationLevelOptions}
          rows={rows}
          setRows={setRows}
          Icon={Icon}
        />
        <Divider />
      </DialogContent>
      <DialogActions>{actionsList && actionsList()}</DialogActions>
    </Dialog>
  );
};
export default CostsRevenueAggregationDialog;
