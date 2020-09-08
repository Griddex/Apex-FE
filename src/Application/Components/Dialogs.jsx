import React from "react";
import { useSelector } from "react-redux";
import MainDialog from "./MainDialog";

const Dialogs = () => {
  const dialogs = useSelector((state) => state.dialogsReducer.dialogs);
  if (dialogs === undefined) return;
  const showDialogs = dialogs.filter((dialog) => dialog.show === true);

  return (
    <>
      {showDialogs.map((dialog) => {
        return (
          <MainDialog
            Open={dialog.show}
            Icon={dialog.icon}
            Title={dialog.title}
            Content={dialog.content}
            Actions={dialog.actions}
            handleHide={dialog.handleHide}
            maxWidth={dialog.maxWidth}
          />
        );
      })}
    </>
  );
};

export default Dialogs;
