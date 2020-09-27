import React from "react";
import { useSelector } from "react-redux";
import PlainTextDialog from "./PlainTextDialog";

const apexDialogs = {
  plainTextDialog: PlainTextDialog,
};

const Dialogs = (props) => {
  const dialogs = useSelector((state) => state.dialogsReducer.dialogs);

  if (dialogs === undefined || dialogs === []) return;
  else
    return (
      <div>
        {dialogs.map((dialog, i) => {
          const { dialogType, dialogProps } = dialog;

          if (dialog === undefined || dialog.show === false) return;

          const SpecificDialog = apexDialogs[dialogType];

          return <SpecificDialog key={i} {...dialogProps} {...props} />;
        })}
      </div>
    );
};

export default Dialogs;
