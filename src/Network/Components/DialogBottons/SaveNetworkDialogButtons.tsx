import { Button } from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import React from "react";
import { useDispatch } from "react-redux";
import { ButtonProps } from "../../../Application/Components/Dialogs/DialogTypes";
import { hideDialogAction } from "../../../Application/Redux/Actions/DialogsAction";
import { IIsSaveNetworkValid } from "../Dialogs/SaveNetworkDialogTypes";

const SaveNetworkDialogButtons = ({
  isSaveNetworkValid,
}: IIsSaveNetworkValid) => {
  const dispatch = useDispatch();

  const buttonsData: ButtonProps[] = [
    {
      title: "Cancel",
      variant: "contained",
      color: "secondary",
      startIcon: <CloseOutlinedIcon />,
      handleAction: () => dispatch(hideDialogAction()),
    },
    {
      title: "Save",
      variant: "contained",
      color: "primary",
      startIcon: <DoneOutlinedIcon />,
      handleAction: () => {
        //dispatch confirmation dialog parameters
      },
    },
  ];

  return (
    <>
      {buttonsData.map((button, i) => (
        <Button
          key={i}
          variant={button.variant}
          color={button.color}
          onClick={button.handleAction}
          startIcon={button.startIcon}
          disabled={button.title === "Save" ? isSaveNetworkValid : false}
        >
          {button.title}
        </Button>
      ))}
    </>
  );
};

export default SaveNetworkDialogButtons;
