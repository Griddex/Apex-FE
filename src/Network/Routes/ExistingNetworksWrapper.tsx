import React from "react";
import { DialogStuff } from "../../Application/Components/Dialogs/DialogTypes";
import ExistingNetworksDialog from "../Components/Dialogs/ExistingNetworksDialog";
import ExistingNetworks from "./ExistingNetworks";

const ExistingNetworksWrapper = (props: DialogStuff) => {
  return (
    <ExistingNetworksDialog {...props}>
      <ExistingNetworks />
    </ExistingNetworksDialog>
  );
};

export default ExistingNetworksWrapper;
