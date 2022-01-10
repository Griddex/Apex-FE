import React from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import DialogOneCancelButtons from "../DialogButtons/DialogOneCancelButtons";
import TextDialog from "../Dialogs/TextDialog";

export interface IApexNavPrompt {
  when: boolean;
  name: string;
  title: string;
  dialogText: string;
  afterConfirm: (() => void) | undefined;
  onOK: () => Promise<any>;
  onCancel: () => Promise<any>;
  currentLocation: string;
}

export function ApexNavPrompt(props: IApexNavPrompt) {
  const { name, when, onOK, onCancel, title, dialogText, currentLocation } =
    props;
  console.log(
    "🚀 ~ file: ApexNavPrompt.tsx ~ line 20 ~ ApexNavPrompt ~ currentLocation",
    currentLocation
  );

  const history = useHistory();
  const location = useLocation();
  console.log(
    "🚀 ~ file: ApexNavPrompt.tsx ~ line 22 ~ ApexNavPrompt ~ location",
    location
  );

  const [showPrompt, setShowPrompt] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("");
  console.log(
    "🚀 ~ file: ApexNavPrompt.tsx ~ line 25 ~ ApexNavPrompt ~ currentPath",
    currentPath
  );

  React.useEffect(() => {
    if (when) {
      history.block((prompt) => {
        setCurrentPath(prompt.pathname);
        setShowPrompt(true);
        return "true";
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

  const handleOK = React.useCallback(async () => {
    if (onOK) {
      const canRoute = await Promise.resolve(onOK());

      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  const handleCancel = React.useCallback(async () => {
    if (onCancel) {
      const canRoute = await Promise.resolve(onCancel());

      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);

  return showPrompt ? (
    <TextDialog
      name={name}
      title={title}
      type={"textDialog"}
      show={showPrompt}
      exclusive={true}
      maxWidth={"xs"}
      dialogText={dialogText}
      iconType={"navigation"}
      actionsList={() =>
        DialogOneCancelButtons(
          [true, true],
          [false, false],
          [handleCancel, handleOK],
          "Proceed",
          "doneOutlined",
          false,
          "All"
        )
      }
      dialogContentStyle={{ paddingTop: 40, paddingBottom: 40 }}
    />
  ) : null;
}
