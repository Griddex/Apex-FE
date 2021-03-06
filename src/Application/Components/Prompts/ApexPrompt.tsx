import React from "react";
import NavigationPrompt from "react-router-navigation-prompt";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import TextDialog from "../Dialogs/TextDialog";

export interface IApexPrompt {
  whenFunc: (crntLocation: any, nextLocation: any) => boolean;
  name: string;
  title: string;
  dialogText: string;
  afterConfirm: (() => void) | undefined;
}

export const NavigationApexPrompt = ({
  afterConfirm,
}: Partial<IApexPrompt>) => (
  <ApexPrompt
    afterConfirm={afterConfirm}
    whenFunc={(crntLoc: any, nxtLoc: any) => {
      if (crntLoc.pathname === nxtLoc.pathname) return false;

      const crntModule = crntLoc.pathname.split("/")[2];
      const nxtModule = nxtLoc.pathname.split("/")[2];

      if (crntModule && crntModule !== nxtModule) return true;
      else return false;
    }}
    name={"Navigation_Confirmation_Dialog"}
    title={"Navigation Confirmation"}
    dialogText={`You are about to leave this page and lose all workflow progress to this point. 
  Confirm Navigation?`}
  />
);

const ApexPrompt = ({
  whenFunc,
  name,
  title,
  dialogText,
  afterConfirm,
}: IApexPrompt) => {
  return (
    <NavigationPrompt
      when={whenFunc}
      renderIfNotActive={true}
      afterConfirm={afterConfirm}
    >
      {({ isActive, onConfirm, onCancel }) => {
        if (isActive) {
          return (
            <TextDialog
              name={name}
              title={title}
              type={"textDialog"}
              show={true}
              exclusive={true}
              maxWidth={"xs"}
              dialogText={dialogText}
              iconType={"navigation"}
              actionsList={() =>
                DialogOneCancelButtons(
                  [true, true],
                  [false, false],
                  [onCancel, onConfirm],
                  "Proceed",
                  "doneOutlined",
                  false,
                  "All"
                )
              }
              dialogContentStyle={{ paddingTop: 40, paddingBottom: 40 }}
            />
          );
        }
        return <div />;
      }}
    </NavigationPrompt>
  );
};

export default ApexPrompt;
