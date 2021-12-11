import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import DialogContent from "../../../Application/Components/DialogContents/DialogContent";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import DialogTitle from "../../../Application/Components/DialogTitles/DialogTitle";
import { TRawTable } from "../../../Application/Components/Table/ReactDataGrid/ApexGridTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import EconomicsParametersTable from "../Parameters/EconomicsParametersTable";
import { IEconomicsParametersTable } from "../Parameters/IParametersType";

const CreateEconomicsParametersTableDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();

  const { title, show, maxWidth, iconType, actionsList, economicsTableData } =
    props;

  const { row, genericAddtnlColumnsObj, customAddtnlColumnsObj } =
    economicsTableData as IEconomicsParametersTable;

  const parameterName = row.parameterName as string;
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
  ): TRawTable => {
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

  //Construct reducer to take economicsParametersManual rows
  //and use the current variable to modify the value key
  //and then overwrite
  //EconomicsParamtersManual must be initialized from above
  //use if state in store is empty, then create initial rows,
  //else initialize from store
  //EconomicsParamtersManual value cell will then have "value"
  //with green color

  const [rows, setRows] = React.useState(initialRows);

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
          row={React.useMemo(() => row, [])}
          rows={React.useMemo(() => rows, [JSON.stringify(rows)])}
          setRows={React.useCallback(setRows, [])}
          genericCustomAddtnlColumnsObj={React.useMemo(
            () => ({ ...genericAddtnlColumnsObj, ...customAddtnlColumnsObj }),
            []
          )}
        />
      </DialogContent>
      <DialogActions>{actionsList && actionsList(rows)}</DialogActions>
    </Dialog>
  );
};

export default CreateEconomicsParametersTableDialog;
