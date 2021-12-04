import { DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import { useDispatch } from "react-redux";
import { hideDialogAction } from "../../Redux/Actions/DialogsAction";
import DialogContent from "../DialogContents/DialogContent";
import DialogTitle from "../DialogTitles/DialogTitle";
import ApexEditor, { IApexEditor } from "../Editors/ApexEditor";
import { DialogStuff } from "./DialogTypes";

const TableEditorDialog: React.FC<DialogStuff> = (props) => {
  const dispatch = useDispatch();

  const {
    title,
    show,
    maxWidth,
    iconType,
    actionsList,
    isCustomComponent,
    apexEditorProps,
    apexEditorComponent,
  } = props;

  const apexEditorPropsDefined = apexEditorProps as NonNullable<IApexEditor>;

  const { editedRow } = apexEditorPropsDefined;
  const [formEditorRow, setFormEditorRow] = React.useState(editedRow);

  const titleDesc = {
    title: formEditorRow["title"],
    description: formEditorRow["description"],
  } as Record<string, string>;

  const ApexEditorComponent = apexEditorComponent as NonNullable<
    DialogStuff["apexEditorComponent"]
  >;

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
        {(isCustomComponent as boolean) ? (
          <ApexEditorComponent
            formEditorRow={formEditorRow}
            setFormEditorRow={setFormEditorRow}
          />
        ) : (
          <ApexEditor
            {...apexEditorPropsDefined}
            formEditorRow={formEditorRow}
            setFormEditorRow={setFormEditorRow}
          />
        )}
      </DialogContent>
      <DialogActions>{actionsList && actionsList(titleDesc)}</DialogActions>
    </Dialog>
  );
};

export default TableEditorDialog;
