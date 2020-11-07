import React from "react";
import { useSelector } from "react-redux";
import ListDialog from "./ListDialog";
import TextDialog from "./TextDialog";
import { RootState } from "../../Redux/Reducers/RootReducer";
import { IApexDialogs, IDialogStateProps } from "./Types";

const apexDialogs: IApexDialogs = {
  listDialog: ListDialog,
  textDialog: TextDialog,
};

const Dialogs: React.FC<IDialogStateProps> = ({
  dialogTitleProps,
  ...rest
}) => {
  const dialogs = useSelector(
    (state: RootState) => state.dialogsReducer.dialogs
  );

  return (
    <div>
      {(dialogs as any[]).map((dialog: IDialogStateProps, i: number) => {
        const { dialogType, dialogProps } = dialog;

        if (dialog === undefined || dialog.dialogProps.show === false)
          return null;

        const SpecificDialog = apexDialogs[dialogType];

        return (
          <SpecificDialog
            key={i}
            {...dialogProps}
            {...dialogTitleProps}
            {...rest}
          />
        );
      })}
    </div>
  );
};

export default Dialogs;
