import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { IRawRow } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { updateEconomicsParameterAction } from "../../Redux/Actions/EconomicsActions";
import EconomicsParametersTable from "../Parameters/EconomicsParametersTable";
import { IEconomicsParametersTable } from "../Parameters/IParametersType";

const CreateEconomicsParametersTableDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();

  const { title, show, maxWidth, iconType, actionsList, economicsTableData } =
    props;

  const {
    rows: manualRows,
    rowIndex,
    genericAddtnlColumnsObj,
    customAddtnlColumnsObj,
  } = economicsTableData as IEconomicsParametersTable;

  const rowIndexDefined = rowIndex as number;

  const currentManualRow = manualRows[rowIndexDefined];
  const valueTableRows = currentManualRow["value"] as IRawRow[];

  const parameterName = currentManualRow.parameterName as string;
  const isRoyalty = ["oilRoyalty", "gasRoyalty"].includes(parameterName);

  const [toggleSwitch, setToggleSwitch] = React.useState(
    isRoyalty ? true : false
  );

  let columnsObjKeys = [] as string[];
  if (isRoyalty && toggleSwitch) {
    columnsObjKeys = Object.keys(
      customAddtnlColumnsObj as Record<string, string>
    );
  } else {
    columnsObjKeys = Object.keys(
      genericAddtnlColumnsObj as Record<string, string>
    );
  }

  const createInitialRows = (
    numberOfRows = 3,
    colsObjKeys: string[]
  ): IRawRow[] => {
    const fakeRows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const fakeRow = {
        sn: i + 1,
        from: "",
        to: "",
        ...colsObjKeys.reduce((acc, k) => {
          acc[k] = "";
          return acc;
        }, {} as Record<string, string>),
      };

      fakeRows.push(fakeRow);
    }

    return fakeRows;
  };

  const initialRows = React.useMemo(
    () => createInitialRows(3, columnsObjKeys),
    [toggleSwitch, columnsObjKeys]
  );

  const currentTableRows =
    Object.entries(valueTableRows).length > 0 ? valueTableRows : initialRows;

  const [tableRows, setTableRows] = React.useState(currentTableRows);

  const fromString = tableRows.map((row) => row["from"]).join();
  const toString = tableRows.map((row) => row["to"]).join();
  const valueString = tableRows.map((row) => row["value"]).join();
  const govtRoyRateString = tableRows.map((row) => row["govtRoyRate"]).join();
  const ovrrToHeadFarmorString = tableRows
    .map((row) => row["ovrrToHeadFarmor"])
    .join();

  React.useEffect(() => {
    const currentManualRow = manualRows[rowIndexDefined];
    const updatedCurrentManualRow = { ...currentManualRow, value: tableRows };
    manualRows[rowIndexDefined] = updatedCurrentManualRow as IRawRow;

    dispatch(
      updateEconomicsParameterAction(
        `inputDataWorkflows.economicsParametersDeckManual.tableData`,
        manualRows
      )
    );
  }, [
    fromString,
    toString,
    valueString,
    govtRoyRateString,
    ovrrToHeadFarmorString,
  ]);

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
      <DialogContent
        dividers
        style={{ display: "flex", flexDirection: "column", height: 650 }}
      >
        <EconomicsParametersTable
          isRoyalty={isRoyalty}
          toggleSwitch={toggleSwitch}
          setToggleSwitch={React.useCallback(setToggleSwitch, [])}
          columnsObjKeys={React.useMemo(
            () => columnsObjKeys,
            [JSON.stringify(columnsObjKeys)]
          )}
          row={React.useMemo(() => currentManualRow, [])}
          rows={tableRows}
          setRows={React.useCallback(setTableRows, [])}
          genericCustomAddtnlColumnsObj={React.useMemo(
            () => ({ ...genericAddtnlColumnsObj, ...customAddtnlColumnsObj }),
            []
          )}
        />
      </DialogContent>
      <DialogActions>{actionsList && actionsList(manualRows)}</DialogActions>
    </Dialog>
  );
};

export default CreateEconomicsParametersTableDialog;
