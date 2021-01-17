import { Dispatch } from "redux";
import { DialogStuff } from "../../../Application/Components/Dialogs/DialogTypes";
import { showDialogAction } from "../../../Application/Redux/Actions/DialogsAction";

const saveNetworkExtrude = (dispatch: Dispatch<any>) => {
  const dialogParameters: DialogStuff = {
    name: "Save_Network_Dialog",
    title: "Save Network",
    type: "saveNetworkDialog",
    show: true,
    exclusive: true,
    maxWidth: "md",
    iconType: "select",
  };

  dispatch(showDialogAction(dialogParameters));
};

export default saveNetworkExtrude;
