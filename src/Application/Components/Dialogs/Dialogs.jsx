import React from "react";
import { useSelector } from "react-redux";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";

const apexDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
};

const Dialogs = (props) => {
  const dialogs = useSelector((state) => state.dialogsReducer.dialogs);

  if (dialogs === undefined || dialogs === []) return;
  else
    return (
      <div>
        {dialogs.map((dialog, i) => {
          const { dialogType, dialogProps } = dialog;

          if (dialog === undefined || dialog.show === false) return null;

          const SpecificDialog = apexDialogs[dialogType];

          return <SpecificDialog key={i} {...dialogProps} {...props} />;
        })}
      </div>
    );
};

export default Dialogs;
